/**
 * ============================================================================
 * [네이버 쇼핑몰 광고 효율 분석 & 최적화] 구글 드라이브 DB & 24시간 네이버 API 클라우드 브릿지
 * ============================================================================
 *
 * ★ 이 스크립트가 하는 일:
 * 1. 내 구글 드라이브 안에 'naver_ad_optimizer_db.json' 파일을 자동 생성하여
 *    광고 분석 데이터, 마진율 설정, 제외 키워드, 최적화 일지를 안전하게 저장합니다.
 * 2. 브라우저 보안(CORS) 정책 때문에 웹페이지에서 직접 호출하기 까다로운
 *    네이버 검색광고 API(https://api.searchad.naver.com)를 구글 클라우드 서버가 대신 호출해 줍니다!
 *    (내 컴퓨터를 꺼놓아도 아이폰·아이패드·PC 어디서나 24시간 실시간 API 조회 가능)
 *
 * ★ 1분 설치 방법:
 * 1. https://script.google.com 접속 -> [새 프로젝트] 클릭
 * 2. 기존 코드를 지우고 이 코드 전체를 붙여넣은 뒤 저장(Ctrl + S)
 * 3. 우측 상단 [배포] -> [새 배포] 클릭 -> 유형: [웹 앱] 선택
 *    - 다음 사용자로 실행: "나 (본인 구글 계정)"
 *    - 액세스 권한이 있는 사용자: "모든 사용자 (Anyone)"
 * 4. 배포 후 생성된 '웹 앱 URL (https://script.google.com/macros/s/.../exec)'을
 *    웹페이지 상단 [클라우드 동기화] 설정 창에 붙여넣으면 완료!
 */

const DB_FILE_NAME = 'naver_ad_optimizer_db.json';

function getOrCreateDbFile() {
  const files = DriveApp.getFilesByName(DB_FILE_NAME);
  if (files.hasNext()) {
    return files.next();
  }
  const initialData = JSON.stringify({ updatedAt: 0 });
  return DriveApp.createFile(DB_FILE_NAME, initialData, MimeType.PLAIN_TEXT);
}

function doGet(e) {
  try {
    const file = getOrCreateDbFile();
    const content = file.getBlob().getDataAsString('UTF-8') || '{"updatedAt":0}';
    return ContentService
      .createTextOutput(content)
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const rawBody = e.postData && e.postData.contents ? e.postData.contents : '{}';
    const parsed = JSON.parse(rawBody);

    // 1) 네이버 검색광고 API 프록시 요청인 경우
    if (parsed && parsed.action === 'naverApiProxy') {
      const targetUrl = 'https://api.searchad.naver.com' + parsed.uri;
      const resp = UrlFetchApp.fetch(targetUrl, {
        method: parsed.method || 'GET',
        headers: parsed.headers || {},
        muteHttpExceptions: true
      });
      const status = resp.getResponseCode();
      const text = resp.getContentText('UTF-8');
      let data = null;
      try {
        data = JSON.parse(text);
      } catch (err) {
        data = text;
      }
      return ContentService
        .createTextOutput(JSON.stringify({ ok: status >= 200 && status < 300, status: status, data: data }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2) 일반 DB 저장 요청인 경우
    const file = getOrCreateDbFile();
    file.setContent(rawBody);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, savedAt: Date.now() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
