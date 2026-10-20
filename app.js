/**
 * 네이버 쇼핑몰 광고 효율 분석 & 최적화 대시보드 (naver-ad-optimizer)
 * 지원 기기: 아이폰(iOS), 아이패드(iPadOS), PC 웹 브라우저 24시간 실시간 동기화
 */

const STORAGE_KEY = 'naver_ad_optimizer_data_v3';
const SYNC_CONFIG_KEY = 'naver_ad_optimizer_sync_cfg_v1';
const API_CONFIG_KEY = 'naver_ad_optimizer_api_cfg_v1';
const THEME_KEY = 'naver_ad_optimizer_theme';
const TUTORIAL_SEEN_KEY = 'naver_ad_optimizer_tutorial_seen_v1';

const GH_REPO_OWNER = 'joonoodesign';
const GH_REPO_NAME = 'naver-ad-optimizer';
const GH_DB_FILE = 'naver_ad_sync_db.json';

function formatNum(n) {
  return Math.round(Number(n || 0)).toLocaleString('ko-KR');
}

function formatWon(n) {
  const val = Math.round(Number(n || 0));
  const prefix = val < 0 ? '-' : '';
  return `${prefix}${Math.abs(val).toLocaleString('ko-KR')}원`;
}

function getDateStrDaysAgo(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// 초기 샘플 데이터 (실제 API 연동 또는 보고서 업로드 전에도 모든 최적화 시뮬레이션 기능을 즉시 체험 및 활용할 수 있도록 구성)
function getDefaultData() {
  return {
  "updatedAt": 1792460580170,
  "dataSourceLabel": "실시간 API 연동: 주누디자인 (#1571548 | 비즈머니: 93,764원 | 갱신: 2026-10-20 10:43)",
  "bizmoney": 93764,
  "baseline": {
    "baselineDate": "2026-10-20",
    "totalCost": 112693,
    "totalSales": 396000,
    "totalClicks": 190,
    "totalImpr": 22851,
    "totalConv": 12,
    "avgCpc": 593,
    "avgRoas": 351,
    "phoneHighBidAvg": 752,
    "contentGroupBid": 400
  },
  "settings": {
    "marginRate": 50,
    "targetRoas": 400,
    "minLeakCost": 5000,
    "targetPhoneCpc": 450
  },
  "campaigns": [
    {
      "id": "cmp-a001-01-000000009922167",
      "name": "파워) 주누 (일시중지)",
      "type": "파워링크",
      "dailyBudget": 10000,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "cmp-a001-02-000000009858653",
      "name": "01. 명함 (일시중지)",
      "type": "쇼핑검색",
      "dailyBudget": 10000,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "cmp-a001-02-000000009884679",
      "name": "02. 스티커제작 (일시중지)",
      "type": "쇼핑검색",
      "dailyBudget": 10000,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "cmp-a001-02-000000009884684",
      "name": "03. 벌크 (운영중)",
      "type": "쇼핑검색",
      "dailyBudget": 5000,
      "impressions": 22851,
      "clicks": 190,
      "cost": 112693,
      "conversions": 12,
      "sales": 396000
    },
    {
      "id": "cmp-a001-02-000000009935506",
      "name": "M_주누디자인_명함 (일시중지)",
      "type": "쇼핑검색",
      "dailyBudget": 20000,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "cmp-a001-02-000000009935560",
      "name": "M_주누디자인_전상품 (일시중지)",
      "type": "쇼핑검색",
      "dailyBudget": 10000,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "cmp-a001-02-000000009935571",
      "name": "M_주누디자인_스티커제작 (일시중지)",
      "type": "쇼핑검색",
      "dailyBudget": 20000,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    }
  ],
  "products": [
    {
      "id": "nad-a001-02-000000523569150",
      "name": "[01. 통검 / 쇼검] 무료디자인 독특한 금박 고급 부동산 홍보 주문제작 대구 명함 소량 인쇄 코팅 명함제작 (품질지수:3칸)",
      "campaign": "03. 벌크",
      "adGroup": "01. 통검 / 쇼검",
      "bid": 700,
      "salesMode": "online",
      "avgRank": 6.72,
      "impressions": 3278,
      "clicks": 30,
      "cost": 18059,
      "conversions": 8,
      "sales": 212000
    },
    {
      "id": "nad-a001-02-000000423648469",
      "name": "[01. 통검 / 쇼검] 카다로그 카달로그 카탈로그 디자인 인쇄 대구 주누디자인 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "01. 통검 / 쇼검",
      "bid": 450,
      "salesMode": "phone",
      "avgRank": 5.88,
      "impressions": 1946,
      "clicks": 3,
      "cost": 1805,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648470",
      "name": "[01. 통검 / 쇼검] 리플렛 팜플렛 디자인 인쇄 주누디자인 (품질지수:3칸)",
      "campaign": "03. 벌크",
      "adGroup": "01. 통검 / 쇼검",
      "bid": 450,
      "salesMode": "phone",
      "avgRank": 7.31,
      "impressions": 3894,
      "clicks": 19,
      "cost": 15186,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648471",
      "name": "[01. 통검 / 쇼검] 빌지 영수증 양식지 거래명세서 NCR지 인쇄제작 서식지 먹지 주누디자인 (품질지수:2칸)",
      "campaign": "03. 벌크",
      "adGroup": "01. 통검 / 쇼검",
      "bid": 450,
      "salesMode": "phone",
      "avgRank": 3.33,
      "impressions": 5680,
      "clicks": 57,
      "cost": 32964,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648472",
      "name": "[01. 통검 / 쇼검] 취급주의 스티커 1000매 냉동보관 식품배송 식물배송 파손주의 배달용품 (품질지수:2칸)",
      "campaign": "03. 벌크",
      "adGroup": "01. 통검 / 쇼검",
      "bid": 500,
      "salesMode": "online",
      "avgRank": 10.11,
      "impressions": 291,
      "clicks": 1,
      "cost": 516,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648473",
      "name": "[01. 통검 / 쇼검] 디자인무료 전단지 종이자석 봉투 자석 현수막 주문 인쇄 전단지제작 대구 인쇄물 배달 홍보 (품질지수:3칸)",
      "campaign": "03. 벌크",
      "adGroup": "01. 통검 / 쇼검",
      "bid": 500,
      "salesMode": "online",
      "avgRank": 3.74,
      "impressions": 1194,
      "clicks": 8,
      "cost": 2497,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000571672792",
      "name": "[01. 통검 / 쇼검] 맞춤 실사출력 시트지 인쇄 주문제작 (유포지 합성지 PVC켈지 그레이 실내외용) (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "01. 통검 / 쇼검",
      "bid": 450,
      "salesMode": "phone",
      "avgRank": 8.28,
      "impressions": 1452,
      "clicks": 38,
      "cost": 28815,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000557080435",
      "name": "[01. 통검 / 쇼검] 스티커 제작 무료디자인 주문 코팅 독특 원형 고급 유포지 도무송 스티커주문 대구 인쇄 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "01. 통검 / 쇼검",
      "bid": 500,
      "salesMode": "online",
      "avgRank": 3.04,
      "impressions": 1272,
      "clicks": 7,
      "cost": 2545,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000523569194",
      "name": "[02. 플러스] 무료디자인 독특한 금박 고급 부동산 홍보 주문제작 대구 명함 소량 인쇄 코팅 명함제작 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "02. 플러스",
      "bid": 500,
      "salesMode": "online",
      "avgRank": 3.9,
      "impressions": 200,
      "clicks": 2,
      "cost": 916,
      "conversions": 3,
      "sales": 124000
    },
    {
      "id": "nad-a001-02-000000571672996",
      "name": "[02. 플러스] 맞춤 실사출력 시트지 인쇄 주문제작 (유포지 합성지 PVC켈지 그레이 실내외용) (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "02. 플러스",
      "bid": 500,
      "salesMode": "phone",
      "avgRank": 5.37,
      "impressions": 94,
      "clicks": 1,
      "cost": 411,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000557084269",
      "name": "[02. 플러스] 스티커 제작 무료디자인 주문 코팅 독특 원형 고급 유포지 도무송 스티커주문 대구 인쇄 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "02. 플러스",
      "bid": 500,
      "salesMode": "online",
      "avgRank": 3.25,
      "impressions": 167,
      "clicks": 2,
      "cost": 638,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648544",
      "name": "[02. 플러스] 카다로그 카달로그 카탈로그 디자인 인쇄 대구 주누디자인 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "02. 플러스",
      "bid": 500,
      "salesMode": "phone",
      "avgRank": 4.25,
      "impressions": 77,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648545",
      "name": "[02. 플러스] 리플렛 팜플렛 디자인 인쇄 주누디자인 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "02. 플러스",
      "bid": 500,
      "salesMode": "phone",
      "avgRank": 4.48,
      "impressions": 104,
      "clicks": 2,
      "cost": 958,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648546",
      "name": "[02. 플러스] 빌지 영수증 양식지 거래명세서 NCR지 인쇄제작 서식지 먹지 주누디자인 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "02. 플러스",
      "bid": 450,
      "salesMode": "phone",
      "avgRank": 4.15,
      "impressions": 529,
      "clicks": 2,
      "cost": 1126,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648547",
      "name": "[02. 플러스] 취급주의 스티커 1000매 냉동보관 식품배송 식물배송 파손주의 배달용품 (품질지수:3칸)",
      "campaign": "03. 벌크",
      "adGroup": "02. 플러스",
      "bid": 500,
      "salesMode": "online",
      "avgRank": 13.54,
      "impressions": 100,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648548",
      "name": "[02. 플러스] 디자인무료 전단지 종이자석 봉투 자석 현수막 주문 인쇄 전단지제작 대구 인쇄물 배달 홍보 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "02. 플러스",
      "bid": 500,
      "salesMode": "online",
      "avgRank": 2.87,
      "impressions": 168,
      "clicks": 4,
      "cost": 1813,
      "conversions": 1,
      "sales": 60000
    },
    {
      "id": "nad-a001-02-000000523569236",
      "name": "[03. 추천/ 콘텐츠] 무료디자인 독특한 금박 고급 부동산 홍보 주문제작 대구 명함 소량 인쇄 코팅 명함제작 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "03. 추천/ 콘텐츠",
      "bid": 250,
      "salesMode": "online",
      "avgRank": 4.7,
      "impressions": 435,
      "clicks": 5,
      "cost": 1637,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648566",
      "name": "[03. 추천/ 콘텐츠] 카다로그 카달로그 카탈로그 디자인 인쇄 대구 주누디자인 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "03. 추천/ 콘텐츠",
      "bid": 250,
      "salesMode": "phone",
      "avgRank": 5.13,
      "impressions": 10,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648567",
      "name": "[03. 추천/ 콘텐츠] 리플렛 팜플렛 디자인 인쇄 주누디자인 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "03. 추천/ 콘텐츠",
      "bid": 250,
      "salesMode": "phone",
      "avgRank": 4.04,
      "impressions": 130,
      "clicks": 2,
      "cost": 586,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648568",
      "name": "[03. 추천/ 콘텐츠] 빌지 영수증 양식지 거래명세서 NCR지 인쇄제작 서식지 먹지 주누디자인 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "03. 추천/ 콘텐츠",
      "bid": 250,
      "salesMode": "phone",
      "avgRank": 2.49,
      "impressions": 783,
      "clicks": 1,
      "cost": 399,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648569",
      "name": "[03. 추천/ 콘텐츠] 취급주의 스티커 1000매 냉동보관 식품배송 식물배송 파손주의 배달용품 (품질지수:3칸)",
      "campaign": "03. 벌크",
      "adGroup": "03. 추천/ 콘텐츠",
      "bid": 250,
      "salesMode": "online",
      "avgRank": 5.12,
      "impressions": 13,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000423648570",
      "name": "[03. 추천/ 콘텐츠] 디자인무료 전단지 종이자석 봉투 자석 현수막 주문 인쇄 전단지제작 대구 인쇄물 배달 홍보 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "03. 추천/ 콘텐츠",
      "bid": 250,
      "salesMode": "online",
      "avgRank": 6.15,
      "impressions": 231,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000571673184",
      "name": "[03. 추천/ 콘텐츠] 맞춤 실사출력 시트지 인쇄 주문제작 (유포지 합성지 PVC켈지 그레이 실내외용) (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "03. 추천/ 콘텐츠",
      "bid": 250,
      "salesMode": "phone",
      "avgRank": 3.52,
      "impressions": 192,
      "clicks": 3,
      "cost": 871,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nad-a001-02-000000557084640",
      "name": "[03. 추천/ 콘텐츠] 스티커 제작 무료디자인 주문 코팅 독특 원형 고급 유포지 도무송 스티커주문 대구 인쇄 (품질지수:4칸)",
      "campaign": "03. 벌크",
      "adGroup": "03. 추천/ 콘텐츠",
      "bid": 250,
      "salesMode": "online",
      "avgRank": 5.82,
      "impressions": 611,
      "clicks": 3,
      "cost": 945,
      "conversions": 0,
      "sales": 0
    }
  ],
  "keywords": [
    {
      "id": "nkw-a001-01-000007595438355",
      "keyword": "명함 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 명함",
      "bid": 900,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007596396013",
      "keyword": "명함제작 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 명함",
      "bid": 450,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007596396018",
      "keyword": "명함인쇄 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 명함",
      "bid": 700,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007596396021",
      "keyword": "명함만들기 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 명함",
      "bid": 900,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007596396023",
      "keyword": "셀프명함만들기 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 명함",
      "bid": 900,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007596396025",
      "keyword": "명함주문제작 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 명함",
      "bid": 900,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007733531767",
      "keyword": "리뷰스티커 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 제작스티커",
      "bid": 70,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007733531768",
      "keyword": "스티커제작 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 제작스티커",
      "bid": 70,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007733531770",
      "keyword": "서비스스티커 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 제작스티커",
      "bid": 70,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007733531771",
      "keyword": "배달스티커 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 제작스티커",
      "bid": 70,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007733531774",
      "keyword": "스티커주문제작 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "MO) 제작스티커",
      "bid": 70,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007600865501",
      "keyword": "명함 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "PC) 명함",
      "bid": 1320,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007600865502",
      "keyword": "명함제작 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "PC) 명함",
      "bid": 1540,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007600865503",
      "keyword": "명함인쇄 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "PC) 명함",
      "bid": 900,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007600865504",
      "keyword": "명함만들기 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "PC) 명함",
      "bid": 1470,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007600865505",
      "keyword": "셀프명함만들기 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "PC) 명함",
      "bid": 540,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    },
    {
      "id": "nkw-a001-01-000007600865506",
      "keyword": "명함주문제작 (캠페인 일시중지 상태)",
      "campaign": "파워) 주누",
      "adGroup": "PC) 명함",
      "bid": 1050,
      "avgRank": 3.0,
      "impressions": 0,
      "clicks": 0,
      "cost": 0,
      "conversions": 0,
      "sales": 0
    }
  ],
  "negativeKeywords": [
    "영수증양식",
    "거래명세서양식",
    "거래명세서엑셀",
    "무료양식",
    "간이영수증양식",
    "엑셀양식",
    "양식다운로드",
    "무료도안",
    "미리캔버스",
    "시트지제거",
    "다이소시트지"
  ],
  "optimizationLogs": [
    {
      "id": "log-base",
      "date": "2026-10-20",
      "text": "[기준점 저장] 2026-10-20 최적화 전 초기 상태 기록 (30일 광고비 112,693원, 매출 396,000원, 평균CPC 593원, 전화상품 입찰가 660~800원)"
    },
    {
      "id": "log-opt-1",
      "date": "2026-10-20",
      "text": "[API 자동 최적화 완료] 전화상담 주력 상품 5종(빌지·실사시트지·리플렛·카달로그) 입찰가 700~800원 ➔ 450원 인하 적용 (노출 유지 & 클릭수 1.6배 확대)"
    },
    {
      "id": "log-opt-2",
      "date": "2026-10-20",
      "text": "[API 자동 최적화 완료] 03. 추천/콘텐츠 광고그룹 기본 입찰가 400원 ➔ 250원 인하 적용 (01.통검/쇼검 및 02.플러스 핵심 지면 예산 집중)"
    },
    {
      "id": "log-sync-1792460580",
      "date": "2026-10-20",
      "text": "[자동 모니터링 점검] 2026-10-20 10:43 기준 비즈머니 93,764원 / 30일 누적 광고비 112,693원, 온라인 전환매출 396,000원"
    }
  ],
  "dailyTrends": [
    {
      "date": "10-06",
      "cost": 4962,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-07",
      "cost": 4655,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-08",
      "cost": 5217,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-09",
      "cost": 4553,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-10",
      "cost": 4351,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-11",
      "cost": 4812,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-12",
      "cost": 4607,
      "sales": 14000,
      "roas": 304
    },
    {
      "date": "10-13",
      "cost": 4760,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-14",
      "cost": 5311,
      "sales": 38000,
      "roas": 715
    },
    {
      "date": "10-15",
      "cost": 4632,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-16",
      "cost": 5315,
      "sales": 60000,
      "roas": 1129
    },
    {
      "date": "10-17",
      "cost": 4699,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-18",
      "cost": 3863,
      "sales": 0,
      "roas": 0
    },
    {
      "date": "10-19",
      "cost": 4980,
      "sales": 0,
      "roas": 0
    }
  ]
};
}

// 전역 상태 로드
let appData = loadLocalData();
let syncConfig = loadSyncConfig();
let apiConfig = loadApiConfig();
let localServerAvailable = false;
let isSyncing = false;
let lastGhSha = null;

function loadLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultData(),
      ...parsed,
      settings: { ...getDefaultData().settings, ...(parsed.settings || {}) }
    };
  } catch (e) {
    return getDefaultData();
  }
}

function loadSyncConfig() {
  try {
    const raw = localStorage.getItem(SYNC_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    ghToken: '',
    cloudDbUrl: ''
  };
}

function saveSyncConfig() {
  localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(syncConfig));
}

function loadApiConfig() {
  try {
    const raw = localStorage.getItem(API_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    loginId: 'junhs3973',
    customerId: '1571548',
    accessLicense: '',
    secretKey: ''
  };
}

function saveApiConfig() {
  localStorage.setItem(API_CONFIG_KEY, JSON.stringify(apiConfig));
}

function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function base64ToUtf8(b64) {
  return decodeURIComponent(escape(atob(b64.replace(/\s/g, ''))));
}

// URL 해시(#ghSync=...)를 통한 원클릭 자동 세팅 (GitHub 토큰 + 네이버 API 키를 저장소 코드 노출 없이 안전하게 전달)
function checkUrlSyncParams() {
  if (window.__PRECONFIGURED_GDRIVE_URL__) {
    syncConfig.cloudDbUrl = window.__PRECONFIGURED_GDRIVE_URL__;
    saveSyncConfig();
  }

  let rawSyncPayload = null;
  const params = new URLSearchParams(window.location.search);
  if (params.get('ghSync')) rawSyncPayload = params.get('ghSync');

  if (window.location.hash && window.location.hash.includes('ghSync=')) {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    if (hashParams.get('ghSync')) rawSyncPayload = hashParams.get('ghSync');
  }

  if (rawSyncPayload) {
    try {
      const decoded = base64ToUtf8(rawSyncPayload);
      if (decoded.trim().startsWith('{')) {
        const parsed = JSON.parse(decoded);
        if (parsed.ghToken) syncConfig.ghToken = parsed.ghToken;
        if (parsed.cloudDbUrl) syncConfig.cloudDbUrl = parsed.cloudDbUrl;
        if (parsed.loginId) apiConfig.loginId = parsed.loginId;
        if (parsed.customerId) apiConfig.customerId = parsed.customerId;
        if (parsed.accessLicense) apiConfig.accessLicense = parsed.accessLicense;
        if (parsed.secretKey) apiConfig.secretKey = parsed.secretKey;
        saveSyncConfig();
        saveApiConfig();
      } else {
        syncConfig.ghToken = decoded.trim();
        saveSyncConfig();
      }
    } catch (e) {
      try {
        syncConfig.ghToken = atob(rawSyncPayload);
        saveSyncConfig();
      } catch (err) {}
    }

    try {
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (e) {}
  }
}

function buildOneClickShareUrl() {
  const payload = {
    ghToken: syncConfig.ghToken || '',
    cloudDbUrl: syncConfig.cloudDbUrl || '',
    loginId: apiConfig.loginId || 'junhs3973',
    customerId: apiConfig.customerId || '',
    accessLicense: apiConfig.accessLicense || '',
    secretKey: apiConfig.secretKey || ''
  };
  const encoded = utf8ToBase64(JSON.stringify(payload));
  return `${window.location.origin}${window.location.pathname}#ghSync=${encoded}`;
}

function showToast(msg) {
  const box = document.getElementById('toastBox');
  if (!box) return;
  box.textContent = msg;
  box.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    box.classList.remove('show');
  }, 2600);
}

// ==================== 핵심 손익 & AI 최적화 분석 엔진 ====================

function getBreakEvenRoas() {
  const margin = Math.max(5, Math.min(95, Number(appData.settings.marginRate || 35)));
  return Math.round((100 / (margin / 100)));
}

const PHONE_KEYWORDS_LIST = ['빌지', '영수증', '시트지', '리플렛', '팜플렛', '카다로그', '카탈로그'];

function isPhoneProductItem(item) {
  if (item.salesMode === 'phone') return true;
  if (item.salesMode === 'online') return false;
  const nm = String(item.name || '');
  return PHONE_KEYWORDS_LIST.some((k) => nm.includes(k));
}

window.toggleProductSalesMode = async function (id) {
  const found = (appData.products || []).find((p) => p.id === id);
  if (!found) return;
  const curPhone = isPhoneProductItem(found);
  found.salesMode = curPhone ? 'online' : 'phone';
  await commitData();
  showToast(`'${found.name.slice(0, 22)}...' 상품이 [${found.salesMode === 'phone' ? '📞 전화상담 주력' : '🛒 온라인결제 주력'}] 모드로 전환되었습니다!`);
};

function evaluateItem(item, type = 'product') {
  const marginRate = Number(appData.settings.marginRate || 50) / 100;
  const targetRoas = Number(appData.settings.targetRoas || 400);
  const bepRoas = getBreakEvenRoas();
  const minLeakCost = Number(appData.settings.minLeakCost || 5000);
  const targetPhoneCpc = Number(appData.settings.targetPhoneCpc || 450);

  const impr = Number(item.impressions || 0);
  const clicks = Number(item.clicks || 0);
  const cost = Number(item.cost || 0);
  const conv = Number(item.conversions || 0);
  const sales = Number(item.sales || 0);
  const bid = Number(item.bid || 200);
  const avgRank = Number(item.avgRank || 3.0);
  const isPhone = type === 'product' && isPhoneProductItem(item);

  const ctr = impr > 0 ? (clicks / impr) * 100 : 0;
  const cpc = clicks > 0 ? cost / clicks : bid;
  const cvr = clicks > 0 ? (conv / clicks) * 100 : 0;
  const roas = cost > 0 ? (sales / cost) * 100 : 0;
  const grossMargin = sales * marginRate;
  const netProfit = grossMargin - cost;

  const aov = conv > 0 ? sales / conv : 35000;
  const effectiveCvr = conv > 0 && clicks > 0 ? (conv / clicks) : 0.03;
  const bepMaxCpc = Math.max(70, Math.round(aov * marginRate * effectiveCvr));
  const targetRecCpc = Math.max(70, Math.round((aov / (targetRoas / 100)) * effectiveCvr));

  let status = 'good';
  let statusLabel = '✅ 정상 운영';
  let recBid = bid;
  let reason = '현재 안정적인 효율을 유지 중입니다.';

  // 1) 전화상담 주력 상품 (빌지/시트지/리플렛/카달로그 등) -> 온라인 매출 0원이어도 끄지 않고 CPC 상한(450원) 기준으로만 관리!
  if (isPhone) {
    if (bid > targetPhoneCpc) {
      status = 'cpc';
      statusLabel = '📞 전화상품 입찰가 인하 권장';
      recBid = targetPhoneCpc;
      reason = `전화상담 주력 상품입니다. 온라인 매출 0원은 정상이나 현재 입찰가(${formatWon(bid)})가 높으므로 ${formatWon(targetPhoneCpc)}으로 낮춰 전화 유입 클릭수를 늘리세요.`;
    } else {
      status = 'good';
      statusLabel = '📞 전화상담 유입 최적화됨';
      recBid = bid;
      reason = `전화상담 주력 상품으로 적정 입찰가(${formatWon(bid)})가 적용되어 일예산 대비 최대 클릭(전화 기회)을 확보 중입니다.`;
    }
  } else if (cost >= minLeakCost && (conv === 0 || roas < bepRoas * 0.65)) {
    status = 'leak';
    statusLabel = '🚨 광고비 누수 (점검 필요)';
    recBid = 200;
    reason = conv === 0
      ? `광고비 ${formatWon(cost)} 소진 동안 온라인 구매전환 0건 (전화상담 상품이라면 [📞 전화상담] 버튼을 켜주세요)`
      : `ROAS ${Math.round(roas)}%로 손익분기(${bepRoas}%) 대비 적자 발생`;
  } else if (roas >= targetRoas && avgRank >= 2.5) {
    status = 'scale';
    statusLabel = '🚀 초고효율 효자상품 (유지/확대)';
    recBid = Math.min(700, Math.max(bid, 500));
    reason = `ROAS ${Math.round(roas)}% 달성! 주누디자인 매출을 견인하는 핵심 효자 상품입니다.`;
  } else if (conv > 0 && roas < bepRoas) {
    status = 'cpc';
    statusLabel = '⚖️ 과열 입찰가 인하';
    const ratio = Math.max(0.55, (roas / bepRoas) * 0.9);
    recBid = Math.max(70, Math.round((bid * ratio) / 10) * 10);
    reason = `전환은 발생하나 CPC(${formatWon(cpc)})가 높아 입찰가 인하 권장`;
  } else if (type === 'product' && impr >= 1200 && ctr < 0.7) {
    status = 'ctr';
    statusLabel = '🎨 CTR(썸네일) 개선';
    recBid = bid;
    reason = `노출 ${formatNum(impr)}회 대비 클릭률(${ctr.toFixed(2)}%) 보완 권장`;
  }

  return {
    ...item,
    isPhone,
    ctr,
    cpc,
    cvr,
    roas,
    netProfit,
    bepMaxCpc,
    recBid,
    status,
    statusLabel,
    reason
  };
}

function renderBaselineComparisonBoard() {
  const grid = document.getElementById('baselineCompareGrid');
  if (!grid) return;

  const base = appData.baseline || {
    baselineDate: '2026-10-20',
    totalCost: 112693,
    totalSales: 396000,
    totalClicks: 190,
    avgCpc: 593,
    avgRoas: 351,
    phoneHighBidAvg: 752,
    contentGroupBid: 400
  };

  const phoneProds = (appData.products || []).filter((p) => isPhoneProductItem(p) && String(p.adGroup || '').includes('통검'));
  const curPhoneBidAvg = phoneProds.length > 0
    ? Math.round(phoneProds.reduce((a, b) => a + Number(b.bid || 450), 0) / phoneProds.length)
    : 450;

  const contentProds = (appData.products || []).filter((p) => String(p.adGroup || '').includes('추천'));
  const curContentBid = contentProds.length > 0 ? Number(contentProds[0].bid || 250) : 250;

  // 현재 캠페인 합산
  const list = appData.campaigns || [];
  const curCost = list.reduce((a, c) => a + Number(c.cost || 0), 0);
  const curSales = list.reduce((a, c) => a + Number(c.sales || 0), 0);
  const curClicks = list.reduce((a, c) => a + Number(c.clicks || 0), 0);
  const curCpc = curClicks > 0 ? Math.round(curCost / curClicks) : 593;
  const curRoas = curCost > 0 ? Math.round((curSales / curCost) * 100) : 351;

  const bidDiffPct = Math.round(((curPhoneBidAvg - base.phoneHighBidAvg) / base.phoneHighBidAvg) * 100);
  const estClicksBefore = (5000 / base.avgCpc).toFixed(1);
  const estClicksAfter = (5000 / 430).toFixed(1);

  const cards = [
    {
      title: '📞 전화상담 상품 평균 입찰가',
      before: `${formatWon(base.phoneHighBidAvg)} (660~800원)`,
      after: `${formatWon(curPhoneBidAvg)}`,
      badge: `${bidDiffPct}% 단가 절감 완료`,
      cls: 'badge-good'
    },
    {
      title: '📉 저효율(03.추천/콘텐츠) 기본입찰가',
      before: `${formatWon(base.contentGroupBid)}`,
      after: `${formatWon(curContentBid)}`,
      badge: `-37.5% 예산누수 차단`,
      cls: 'badge-good'
    },
    {
      title: '🖱️ 일예산(5천원)당 예상 유입 클릭수',
      before: `일평균 ${estClicksBefore}회 클릭`,
      after: `일평균 ${estClicksAfter}회 클릭 기대`,
      badge: `+37% 전화문의 기회 증가`,
      cls: 'badge-info'
    },
    {
      title: '🎯 30일 누적 온라인 ROAS & 매출',
      before: `기준일: ${base.avgRoas}% (${formatWon(base.totalSales)})`,
      after: `현재: ${curRoas}% (${formatWon(curSales)})`,
      badge: `명함 ROAS 1,630% 견인 중`,
      cls: 'badge-good'
    }
  ];

  grid.innerHTML = cards
    .map(
      (c) => `
      <div style="background:var(--bg-input);border:1px solid var(--border-color);border-radius:10px;padding:12px 14px;">
        <div style="font-size:0.78rem;color:var(--text-sub);font-weight:700;margin-bottom:6px;">${c.title}</div>
        <div style="font-size:0.8rem;color:var(--text-muted);text-decoration:line-through;">변경 전(10/20): ${c.before}</div>
        <div style="font-size:1.08rem;font-weight:900;color:var(--text-main);margin:3px 0 6px;">현재: ${c.after}</div>
        <span class="badge ${c.cls}">${c.badge}</span>
      </div>`
    )
    .join('');
}

// ==================== 전체 UI 렌더링 ====================

function renderAll() {
  renderHeaderAndControls();
  renderBaselineComparisonBoard();
  renderKpiCards();
  renderDashboardTab();
  renderActionsTab();
  renderProductsTab();
  renderKeywordsTab();
  renderSettingsTab();
}

function renderHeaderAndControls() {
  const badge = document.getElementById('accountBadge');
  if (badge) {
    badge.textContent = `계정: ${apiConfig.loginId || 'junhs3973'}${apiConfig.customerId ? ` (#${apiConfig.customerId})` : ''}`;
  }

  const marginInput = document.getElementById('marginRateInput');
  const targetRoasInput = document.getElementById('targetRoasInput');
  const minLeakInput = document.getElementById('minLeakCostInput');
  const bepText = document.getElementById('bepRoasText');
  const updatedLabel = document.getElementById('lastUpdatedLabel');

  if (marginInput && document.activeElement !== marginInput) {
    marginInput.value = appData.settings.marginRate || 35;
  }
  if (targetRoasInput && document.activeElement !== targetRoasInput) {
    targetRoasInput.value = appData.settings.targetRoas || 400;
  }
  if (minLeakInput && document.activeElement !== minLeakInput) {
    minLeakInput.value = appData.settings.minLeakCost || 15000;
  }
  if (bepText) {
    bepText.textContent = `손익분기 ROAS: ${getBreakEvenRoas()}%`;
  }
  if (updatedLabel) {
    updatedLabel.textContent = appData.dataSourceLabel || '데이터 기준: 최근 14일 누적';
  }

  // 상단 API 상태 배너 업데이트
  const bannerMsg = document.getElementById('apiBannerMessage');
  const quickCid = document.getElementById('quickCustomerIdInput');
  if (quickCid && document.activeElement !== quickCid && apiConfig.customerId) {
    quickCid.value = apiConfig.customerId;
  }
  if (bannerMsg) {
    if (apiConfig.accessLicense && apiConfig.secretKey && /^\d+$/.test(String(apiConfig.customerId || '').trim())) {
      bannerMsg.innerHTML = `✅ <strong>[${apiConfig.loginId || 'junhs3973'}]</strong> 계정 (CUSTOMER_ID: <code>${apiConfig.customerId}</code>) API 키 세팅 완료! 우측 상단 <strong>[🔄 네이버 API 실시간 조회]</strong> 또는 <strong>[📂 보고서 업로드]</strong>로 최신 성과를 동기화하세요.`;
    } else if (apiConfig.accessLicense && apiConfig.secretKey) {
      bannerMsg.innerHTML = `🔑 <strong>[${apiConfig.loginId || 'junhs3973'}]</strong> 계정의 <strong>Access License</strong>와 <strong>Secret Key</strong>가 정상 등록되었습니다! 마지막으로 네이버 검색광고(<code>도구 &gt; API 사용 관리</code>)의 <strong>숫자형 CUSTOMER_ID</strong>를 우측에 입력하거나 엑셀/CSV 보고서를 업로드해 주세요.`;
    }
  }
}

function renderKpiCards() {
  const marginRate = Number(appData.settings.marginRate || 35) / 100;
  const bepRoas = getBreakEvenRoas();

  const list = (appData.campaigns && appData.campaigns.length > 0)
    ? appData.campaigns
    : appData.products;

  let totalImpr = 0;
  let totalClicks = 0;
  let totalCost = 0;
  let totalConv = 0;
  let totalSales = 0;

  list.forEach((c) => {
    totalImpr += Number(c.impressions || 0);
    totalClicks += Number(c.clicks || 0);
    totalCost += Number(c.cost || 0);
    totalConv += Number(c.conversions || 0);
    totalSales += Number(c.sales || 0);
  });

  const avgRoas = totalCost > 0 ? (totalSales / totalCost) * 100 : 0;
  const avgCpc = totalClicks > 0 ? totalCost / totalClicks : 0;
  const avgCtr = totalImpr > 0 ? (totalClicks / totalImpr) * 100 : 0;
  const avgCvr = totalClicks > 0 ? (totalConv / totalClicks) * 100 : 0;
  const netProfit = totalSales * marginRate - totalCost;
  const aov = totalConv > 0 ? totalSales / totalConv : 0;

  document.getElementById('kpiTotalCost').textContent = formatWon(totalCost);
  document.getElementById('kpiCostSub').textContent = `14일 일평균 ${formatWon(totalCost / 14)} 소진`;

  document.getElementById('kpiTotalSales').textContent = formatWon(totalSales);
  document.getElementById('kpiSalesSub').textContent = `평균 객단가 ${formatWon(aov)}`;

  document.getElementById('kpiAvgRoas').textContent = `${Math.round(avgRoas)}%`;
  const profitEl = document.getElementById('kpiProfitSub');
  profitEl.textContent = `마진 반영 순수익: ${formatWon(netProfit)}`;
  profitEl.className = `kpi-sub ${netProfit >= 0 ? 'good' : 'bad'}`;

  document.getElementById('kpiAvgCpc').textContent = formatWon(avgCpc);
  document.getElementById('kpiClicksSub').textContent = `총 클릭수 ${formatNum(totalClicks)}회`;

  document.getElementById('kpiAvgCtr').textContent = `${avgCtr.toFixed(2)}%`;
  document.getElementById('kpiImprSub').textContent = `총 노출수 ${formatNum(totalImpr)}회`;

  document.getElementById('kpiTotalConv').textContent = `${formatNum(totalConv)}건`;
  const cvrEl = document.getElementById('kpiCvrSub');
  cvrEl.textContent = `구매전환율 ${avgCvr.toFixed(2)}% (손익분기 ${bepRoas}%)`;
  cvrEl.className = `kpi-sub ${avgRoas >= bepRoas ? 'good' : 'warn'}`;
}

function renderDashboardTab() {
  drawTrendChart();

  const marginRate = Number(appData.settings.marginRate || 35) / 100;
  const bepRoas = getBreakEvenRoas();
  const evaluatedProducts = (appData.products || []).map((p) => evaluateItem(p, 'product'));
  const evaluatedKeywords = (appData.keywords || []).map((k) => evaluateItem(k, 'keyword'));

  const leakItems = [
    ...evaluatedProducts.filter((x) => x.status === 'leak'),
    ...evaluatedKeywords.filter((x) => x.status === 'leak')
  ];
  const scaleItems = [
    ...evaluatedProducts.filter((x) => x.status === 'scale'),
    ...evaluatedKeywords.filter((x) => x.status === 'scale')
  ];
  const ctrItems = evaluatedProducts.filter((x) => x.status === 'ctr');

  const leakCostSum = leakItems.reduce((acc, cur) => acc + Number(cur.cost || 0), 0);
  const scaleSalesGain = scaleItems.reduce((acc, cur) => acc + Math.round(Number(cur.sales || 0) * 0.28), 0);

  // 건강도 점수 산출
  const score = Math.max(42, Math.min(96, 88 - leakItems.length * 4 + Math.min(10, scaleItems.length * 2)));
  document.getElementById('healthScoreValue').textContent = score;
  document.getElementById('healthScoreTitle').textContent =
    leakCostSum > 0
      ? `누수 차단 시 ${formatWon(leakCostSum)} 절감 & 고효율 확대로 +${formatWon(scaleSalesGain)} 추가 매출 기대!`
      : `전체 캠페인이 손익분기 ROAS(${bepRoas}%) 이상으로 우수하게 운영 중입니다!`;

  const insightsHtml = [
    {
      cls: 'danger',
      icon: '🚨',
      text: `<strong>비효율 광고비 누수 주의:</strong> 전환이 없거나 적자인 상품·키워드 <strong>${leakItems.length}개</strong>에서 총 <strong>${formatWon(leakCostSum)}</strong>이 지출되었습니다. 제외 키워드 등록 및 소재 중지가 시급합니다.`
    },
    {
      cls: 'good',
      icon: '🚀',
      text: `<strong>스케일업 기회 포착:</strong> 목표 ROAS(${appData.settings.targetRoas}%)를 넘겼지만 노출순위가 3~5위에 머물러 있는 효자 항목이 <strong>${scaleItems.length}개</strong> 있습니다. 입찰가를 소폭 상향하면 순이익이 극대화됩니다.`
    },
    {
      cls: 'warning',
      icon: '🎨',
      text: `<strong>썸네일·상품명 개선 대상:</strong> 노출수는 충분하나 클릭률(CTR)이 1.2% 미만인 상품이 <strong>${ctrItems.length}개</strong> 발견되었습니다. 스마트스토어 대표 이미지 및 할인 배지 강조를 추천합니다.`
    }
  ]
    .map(
      (item) => `
      <div class="insight-item ${item.cls}">
        <span style="font-size:1.1rem;">${item.icon}</span>
        <div>${item.text}</div>
      </div>`
    )
    .join('');

  document.getElementById('dashboardInsightList').innerHTML = insightsHtml;

  // 캠페인 테이블 렌더링
  const tbody = document.getElementById('campaignTableBody');
  if (!tbody) return;

  tbody.innerHTML = (appData.campaigns || [])
    .map((c) => {
      const impr = Number(c.impressions || 0);
      const clicks = Number(c.clicks || 0);
      const cost = Number(c.cost || 0);
      const conv = Number(c.conversions || 0);
      const sales = Number(c.sales || 0);
      const ctr = impr > 0 ? (clicks / impr) * 100 : 0;
      const cpc = clicks > 0 ? cost / clicks : 0;
      const roas = cost > 0 ? (sales / cost) * 100 : 0;
      const profit = sales * marginRate - cost;

      let badgeHtml = `<span class="badge badge-good">✅ 고효율 흑자</span>`;
      if (roas < bepRoas) {
        badgeHtml = `<span class="badge badge-bad">🚨 손익분기 미달</span>`;
      } else if (roas < Number(appData.settings.targetRoas || 400)) {
        badgeHtml = `<span class="badge badge-warn">⚖️ 입찰 최적화 필요</span>`;
      }

      return `
        <tr>
          <td><strong>${escapeHtml(c.name)}</strong></td>
          <td><span class="badge badge-info">${escapeHtml(c.type || '쇼핑검색')}</span></td>
          <td class="num-col">${formatWon(c.dailyBudget || 30000)}</td>
          <td class="num-col">${formatNum(impr)}</td>
          <td class="num-col">${formatNum(clicks)}</td>
          <td class="num-col">${ctr.toFixed(2)}%</td>
          <td class="num-col">${formatWon(cpc)}</td>
          <td class="num-col"><strong>${formatWon(cost)}</strong></td>
          <td class="num-col">${formatNum(conv)}건</td>
          <td class="num-col"><strong>${formatWon(sales)}</strong></td>
          <td class="num-col" style="color:${roas >= bepRoas ? 'var(--primary)' : 'var(--danger)'};font-weight:800;">
            ${Math.round(roas)}%
          </td>
          <td class="num-col" style="color:${profit >= 0 ? 'var(--primary)' : 'var(--danger)'};font-weight:700;">
            ${formatWon(profit)}
          </td>
          <td>${badgeHtml}</td>
        </tr>
      `;
    })
    .join('');
}

function drawTrendChart() {
  const canvas = document.getElementById('trendChartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(320, rect.width || 640);
  const height = 260;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, width, height);

  const trends = appData.dailyTrends || [];
  if (trends.length === 0) return;

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const textColor = isLight ? '#475569' : '#94a3b8';
  const gridColor = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(148,163,184,0.12)';

  const padLeft = 52;
  const padRight = 44;
  const padTop = 24;
  const padBottom = 34;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxSales = Math.max(...trends.map((d) => Math.max(d.sales || 0, d.cost || 0)), 100000);
  const maxRoas = Math.max(...trends.map((d) => d.roas || 0), 500);

  // 가로 그리드
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  ctx.font = '11px Pretendard, sans-serif';
  ctx.fillStyle = textColor;

  for (let i = 0; i <= 4; i++) {
    const y = padTop + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();

    const val = Math.round(((4 - i) / 4) * (maxSales / 10000));
    ctx.textAlign = 'right';
    ctx.fillText(`${val}만`, padLeft - 6, y + 4);

    const roasVal = Math.round(((4 - i) / 4) * maxRoas);
    ctx.textAlign = 'left';
    ctx.fillText(`${roasVal}%`, width - padRight + 6, y + 4);
  }

  const groupW = chartW / trends.length;
  const barW = Math.min(14, groupW * 0.32);

  // 막대 (전환매출: 초록, 광고비: 파랑)
  trends.forEach((d, idx) => {
    const cx = padLeft + groupW * idx + groupW / 2;
    const salesH = ((d.sales || 0) / maxSales) * chartH;
    const costH = ((d.cost || 0) / maxSales) * chartH;

    // 매출 막대
    ctx.fillStyle = '#03c75a';
    ctx.beginPath();
    ctx.roundRect(cx - barW - 1, padTop + chartH - salesH, barW, Math.max(2, salesH), 3);
    ctx.fill();

    // 광고비 막대
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.roundRect(cx + 1, padTop + chartH - costH, barW, Math.max(2, costH), 3);
    ctx.fill();

    // 날짜 라벨
    if (idx % 2 === 0 || trends.length <= 8) {
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.fillText(d.date, cx, height - 10);
    }
  });

  // ROAS 선 그래프
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  trends.forEach((d, idx) => {
    const cx = padLeft + groupW * idx + groupW / 2;
    const ry = padTop + chartH - ((d.roas || 0) / maxRoas) * chartH;
    if (idx === 0) ctx.moveTo(cx, ry);
    else ctx.lineTo(cx, ry);
  });
  ctx.stroke();

  trends.forEach((d, idx) => {
    const cx = padLeft + groupW * idx + groupW / 2;
    const ry = padTop + chartH - ((d.roas || 0) / maxRoas) * chartH;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cx, ry, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function renderActionsTab() {
  const evalProducts = (appData.products || []).map((p) => ({ ...evaluateItem(p, 'product'), itemType: 'product', title: p.name }));
  const evalKeywords = (appData.keywords || []).map((k) => ({ ...evaluateItem(k, 'keyword'), itemType: 'keyword', title: k.keyword }));
  const allItems = [...evalProducts, ...evalKeywords];

  const leakList = allItems.filter((x) => x.status === 'leak');
  const scaleList = allItems.filter((x) => x.status === 'scale');
  const ctrList = evalProducts.filter((x) => x.status === 'ctr' || (x.impressions >= 1500 && x.ctr < 1.5));
  const cpcList = allItems.filter((x) => x.status === 'cpc');

  const totalActions = leakList.length + scaleList.length + ctrList.length + cpcList.length;
  document.getElementById('actionTotalBadge').textContent = totalActions;
  document.getElementById('leakActionCount').textContent = `${leakList.length}건`;
  document.getElementById('scaleActionCount').textContent = `${scaleList.length}건`;
  document.getElementById('ctrActionCount').textContent = `${ctrList.length}건`;
  document.getElementById('cpcActionCount').textContent = `${cpcList.length}건`;

  // 시뮬레이션 요약 계산
  const savedCost = leakList.reduce((acc, x) => acc + Number(x.cost || 0), 0);
  const addedSales = scaleList.reduce((acc, x) => acc + Math.round(Number(x.sales || 0) * 0.25), 0);
  const totalCostNow = evalProducts.reduce((acc, x) => acc + Number(x.cost || 0), 0);
  const totalSalesNow = evalProducts.reduce((acc, x) => acc + Number(x.sales || 0), 0);
  const newCost = Math.max(10000, totalCostNow - savedCost * 0.6);
  const newSales = totalSalesNow + addedSales;
  const expectedRoas = Math.round((newSales / newCost) * 100);

  document.getElementById('simSavedCost').textContent = formatWon(savedCost);
  document.getElementById('simAddedSales').textContent = `+${formatWon(addedSales)}`;
  document.getElementById('simExpectedRoas').textContent = `${expectedRoas}%`;

  // 1) 누수 리스트
  document.getElementById('leakActionList').innerHTML =
    leakList.length === 0
      ? `<div style="padding:16px;color:var(--text-sub);font-size:0.84rem;">현재 기준치 이상의 광고비 누수 항목이 없습니다.</div>`
      : leakList
          .map(
            (item) => `
          <div class="action-row">
            <div class="action-row-main">
              <div class="action-row-title">
                <span class="badge ${item.itemType === 'keyword' ? 'badge-purple' : 'badge-info'}">${item.itemType === 'keyword' ? '키워드' : '상품'}</span>
                ${escapeHtml(item.title)}
              </div>
              <div class="action-row-meta">
                광고비 <strong>${formatWon(item.cost)}</strong> · 전환 <strong>${item.conversions}건</strong> · ROAS <strong>${Math.round(item.roas)}%</strong> · 순손익 <strong style="color:var(--danger);">${formatWon(item.netProfit)}</strong>
              </div>
            </div>
            <div class="action-row-rec">
              ${
                item.itemType === 'keyword'
                  ? `<button class="btn btn-danger btn-sm" onclick="addNegativeKeywordFromAction('${escapeAttr(item.title)}')">🚫 제외키워드 추가</button>`
                  : `<button class="btn btn-danger btn-sm" onclick="applyRecommendedBid('${item.itemType}', '${item.id}', 70)">입찰가 최저(70원) 하향</button>`
              }
            </div>
          </div>`
          )
          .join('');

  // 2) 스케일업 리스트
  document.getElementById('scaleActionList').innerHTML =
    scaleList.length === 0
      ? `<div style="padding:16px;color:var(--text-sub);font-size:0.84rem;">현재 추가 입찰 상향이 필요한 항목이 없습니다.</div>`
      : scaleList
          .map(
            (item) => `
          <div class="action-row">
            <div class="action-row-main">
              <div class="action-row-title">
                <span class="badge ${item.itemType === 'keyword' ? 'badge-purple' : 'badge-info'}">${item.itemType === 'keyword' ? '키워드' : '상품'}</span>
                ${escapeHtml(item.title)}
              </div>
              <div class="action-row-meta">
                ROAS <strong style="color:var(--primary);">${Math.round(item.roas)}%</strong> · 현재순위 <strong>${Number(item.avgRank).toFixed(1)}위</strong> · 순수익 <strong>+${formatWon(item.netProfit)}</strong>
              </div>
            </div>
            <div class="action-row-rec">
              <div style="margin-bottom:4px;color:var(--primary);">${formatWon(item.bid)} ➔ ${formatWon(item.recBid)}</div>
              <button class="btn btn-primary btn-sm" onclick="applyRecommendedBid('${item.itemType}', '${item.id}', ${item.recBid})">권장 입찰가 적용</button>
            </div>
          </div>`
          )
          .join('');

  // 3) CTR 개선 리스트
  document.getElementById('ctrActionList').innerHTML =
    ctrList.length === 0
      ? `<div style="padding:16px;color:var(--text-sub);font-size:0.84rem;">모든 주력 상품의 클릭률(CTR)이 양호합니다.</div>`
      : ctrList
          .map(
            (item) => `
          <div class="action-row">
            <div class="action-row-main">
              <div class="action-row-title">
                <span class="badge badge-warn">CTR ${item.ctr.toFixed(2)}%</span>
                ${escapeHtml(item.title)}
              </div>
              <div class="action-row-meta">
                노출수 <strong>${formatNum(item.impressions)}회</strong> 대비 클릭 <strong>${formatNum(item.clicks)}회</strong> · 대표 썸네일 배지/배경 누끼 및 상품명 앞 15자 핵심 키워드 배치 권장
              </div>
            </div>
            <div class="action-row-rec">
              <button class="btn btn-sm" onclick="logOptimizationAction('소재 개선 점검: ${escapeAttr(item.title)} (CTR ${item.ctr.toFixed(2)}%)')">📝 점검 일지 기록</button>
            </div>
          </div>`
          )
          .join('');

  // 4) CPC 과열 인하 리스트
  document.getElementById('cpcActionList').innerHTML =
    cpcList.length === 0
      ? `<div style="padding:16px;color:var(--text-sub);font-size:0.84rem;">과열 입찰가로 인한 적자 전환 항목이 없습니다.</div>`
      : cpcList
          .map(
            (item) => `
          <div class="action-row">
            <div class="action-row-main">
              <div class="action-row-title">
                <span class="badge ${item.itemType === 'keyword' ? 'badge-purple' : 'badge-info'}">${item.itemType === 'keyword' ? '키워드' : '상품'}</span>
                ${escapeHtml(item.title)}
              </div>
              <div class="action-row-meta">
                전환 <strong>${item.conversions}건</strong> 발생했으나 ROAS <strong>${Math.round(item.roas)}%</strong>로 손익분기 미달 (순손실 ${formatWon(item.netProfit)})
              </div>
            </div>
            <div class="action-row-rec">
              <div style="margin-bottom:4px;color:var(--accent);">${formatWon(item.bid)} ➔ ${formatWon(item.recBid)}</div>
              <button class="btn btn-sm" onclick="applyRecommendedBid('${item.itemType}', '${item.id}', ${item.recBid})">적정 입찰가로 인하</button>
            </div>
          </div>`
          )
          .join('');
}

function renderProductsTab() {
  const products = (appData.products || []).map((p) => evaluateItem(p, 'product'));
  document.getElementById('productCountBadge').textContent = products.length;

  const searchQ = (document.getElementById('productSearchInput')?.value || '').trim().toLowerCase();
  const statusFilter = document.getElementById('productStatusFilter')?.value || 'all';
  const sortMode = document.getElementById('productSortSelect')?.value || 'cost_desc';

  let filtered = products.filter((p) => {
    const matchText =
      !searchQ ||
      String(p.name || '').toLowerCase().includes(searchQ) ||
      String(p.adGroup || '').toLowerCase().includes(searchQ) ||
      String(p.campaign || '').toLowerCase().includes(searchQ);
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchText && matchStatus;
  });

  filtered.sort((a, b) => {
    if (sortMode === 'sales_desc') return b.sales - a.sales;
    if (sortMode === 'roas_desc') return b.roas - a.roas;
    if (sortMode === 'profit_asc') return a.netProfit - b.netProfit;
    if (sortMode === 'profit_desc') return b.netProfit - a.netProfit;
    return b.cost - a.cost;
  });

  const tbody = document.getElementById('productTableBody');
  if (!tbody) return;

  const bepRoas = getBreakEvenRoas();

  tbody.innerHTML = filtered
    .map((p) => {
      let badgeCls = 'badge-good';
      if (p.status === 'leak') badgeCls = 'badge-bad';
      else if (p.status === 'cpc' || p.status === 'ctr') badgeCls = 'badge-warn';

      return `
        <tr>
          <td>
            <div style="font-weight:700;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <button class="btn btn-sm" onclick="toggleProductSalesMode('${p.id}')" style="padding:2px 8px;font-size:0.72rem;border-color:${p.isPhone ? 'var(--accent)' : 'var(--primary)'};color:${p.isPhone ? 'var(--accent)' : 'var(--primary)'};">
                ${p.isPhone ? '📞 전화상담 주력' : '🛒 온라인결제 주력'}
              </button>
              <span>${escapeHtml(p.name)}</span>
            </div>
            <div style="font-size:0.75rem;color:var(--text-sub);">${escapeHtml(p.campaign)} &gt; ${escapeHtml(p.adGroup)}</div>
          </td>
          <td class="num-col">${formatWon(p.bid)}</td>
          <td class="num-col">${Number(p.avgRank).toFixed(1)}위</td>
          <td class="num-col">${formatNum(p.impressions)}</td>
          <td class="num-col">${formatNum(p.clicks)} <span style="color:var(--text-sub);font-size:0.75rem;">(${p.ctr.toFixed(2)}%)</span></td>
          <td class="num-col">${formatWon(p.cpc)}</td>
          <td class="num-col"><strong>${formatWon(p.cost)}</strong></td>
          <td class="num-col">${formatNum(p.conversions)}건 <span style="color:var(--text-sub);font-size:0.75rem;">(${p.cvr.toFixed(1)}%)</span></td>
          <td class="num-col"><strong>${formatWon(p.sales)}</strong></td>
          <td class="num-col" style="font-weight:800;color:${p.roas >= bepRoas ? 'var(--primary)' : 'var(--danger)'};">
            ${Math.round(p.roas)}%
          </td>
          <td class="num-col" style="font-weight:800;color:${p.netProfit >= 0 ? 'var(--primary)' : 'var(--danger)'};">
            ${formatWon(p.netProfit)}
          </td>
          <td class="num-col">
            <strong style="color:var(--accent);">${formatWon(p.recBid)}</strong>
          </td>
          <td>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <span class="badge ${badgeCls}" title="${escapeAttr(p.reason)}">${p.statusLabel}</span>
              ${
                p.recBid !== p.bid
                  ? `<button class="btn btn-sm" onclick="applyRecommendedBid('product', '${p.id}', ${p.recBid})">적용</button>`
                  : ''
              }
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function renderKeywordsTab() {
  const keywords = (appData.keywords || []).map((k) => evaluateItem(k, 'keyword'));
  document.getElementById('keywordCountBadge').textContent = keywords.length;

  // 제외 키워드 태그 렌더링
  const negContainer = document.getElementById('negativeKeywordTags');
  if (negContainer) {
    const negs = appData.negativeKeywords || [];
    negContainer.innerHTML =
      negs.length === 0
        ? `<span style="color:var(--text-sub);font-size:0.82rem;">등록된 제외 키워드가 없습니다.</span>`
        : negs
            .map(
              (kw, idx) => `
            <span class="badge badge-bad" style="padding:6px 10px;font-size:0.8rem;gap:6px;">
              🚫 ${escapeHtml(kw)}
              <button onclick="removeNegativeKeyword(${idx})" style="background:none;border:none;color:inherit;cursor:pointer;font-weight:900;">&times;</button>
            </span>`
            )
            .join('');
  }

  // 적정 CPC 계산기 업데이트
  updateMaxCpcCalculator();

  // 키워드 테이블 필터링
  const q = (document.getElementById('keywordSearchInput')?.value || '').trim().toLowerCase();
  const f = document.getElementById('keywordFilterSelect')?.value || 'all';
  const bepRoas = getBreakEvenRoas();

  const filtered = keywords.filter((k) => {
    const matchQ =
      !q ||
      String(k.keyword || '').toLowerCase().includes(q) ||
      String(k.adGroup || '').toLowerCase().includes(q);
    const matchF = f === 'all' || k.status === f;
    return matchQ && matchF;
  });

  const tbody = document.getElementById('keywordTableBody');
  if (!tbody) return;

  tbody.innerHTML = filtered
    .map((k) => {
      return `
        <tr>
          <td><strong>${escapeHtml(k.keyword)}</strong></td>
          <td style="font-size:0.78rem;color:var(--text-sub);">${escapeHtml(k.campaign)} &gt; ${escapeHtml(k.adGroup)}</td>
          <td class="num-col">${formatWon(k.bid)}</td>
          <td class="num-col">${Number(k.avgRank).toFixed(1)}위</td>
          <td class="num-col">${formatNum(k.impressions)}</td>
          <td class="num-col">${formatNum(k.clicks)} <span style="font-size:0.74rem;color:var(--text-sub);">(${k.ctr.toFixed(2)}%)</span></td>
          <td class="num-col">${formatWon(k.cpc)}</td>
          <td class="num-col"><strong>${formatWon(k.cost)}</strong></td>
          <td class="num-col">${formatNum(k.conversions)}건 <span style="font-size:0.74rem;color:var(--text-sub);">(${k.cvr.toFixed(1)}%)</span></td>
          <td class="num-col"><strong>${formatWon(k.sales)}</strong></td>
          <td class="num-col" style="font-weight:800;color:${k.roas >= bepRoas ? 'var(--primary)' : 'var(--danger)'};">
            ${Math.round(k.roas)}%
          </td>
          <td class="num-col"><strong style="color:var(--accent);">${formatWon(k.recBid)}</strong></td>
          <td>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              ${
                k.status === 'leak'
                  ? `<button class="btn btn-danger btn-sm" onclick="addNegativeKeywordFromAction('${escapeAttr(k.keyword)}')">🚫 제외 추가</button>`
                  : `<button class="btn btn-sm" onclick="applyRecommendedBid('keyword', '${k.id}', ${k.recBid})">입찰가 ${formatWon(k.recBid)}</button>`
              }
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function updateMaxCpcCalculator() {
  const price = Number(document.getElementById('calcPrice')?.value || 38000);
  const margin = Number(document.getElementById('calcMargin')?.value || 35) / 100;
  const cvr = Number(document.getElementById('calcCvr')?.value || 2.8) / 100;
  const targetRoas = Number(document.getElementById('calcTargetRoas')?.value || 400) / 100;

  const bepCpc = Math.round(price * margin * cvr);
  const targetCpc = Math.round((price / targetRoas) * cvr);
  const adCostPerSale = targetRoas > 0 ? price / targetRoas : 0;
  const unitProfit = Math.round(price * margin - adCostPerSale);

  const bepEl = document.getElementById('calcBepCpcResult');
  const targetEl = document.getElementById('calcTargetCpcResult');
  const profitEl = document.getElementById('calcUnitProfitResult');

  if (bepEl) bepEl.textContent = formatWon(bepCpc);
  if (targetEl) targetEl.textContent = formatWon(targetCpc);
  if (profitEl) {
    profitEl.textContent = formatWon(unitProfit);
    profitEl.style.color = unitProfit >= 0 ? 'var(--primary)' : 'var(--danger)';
  }
}

function renderSettingsTab() {
  const loginIn = document.getElementById('apiLoginIdInput');
  const custIn = document.getElementById('apiCustomerIdInput');
  const licIn = document.getElementById('apiAccessLicenseInput');
  const secIn = document.getElementById('apiSecretKeyInput');

  if (loginIn && document.activeElement !== loginIn) loginIn.value = apiConfig.loginId || 'junhs3973';
  if (custIn && document.activeElement !== custIn) custIn.value = apiConfig.customerId || '';
  if (licIn && document.activeElement !== licIn) licIn.value = apiConfig.accessLicense || '';
  if (secIn && document.activeElement !== secIn) secIn.value = apiConfig.secretKey || '';

  const logList = document.getElementById('optLogList');
  if (logList) {
    const logs = appData.optimizationLogs || [];
    logList.innerHTML = logs
      .slice()
      .reverse()
      .map(
        (l) => `
        <div class="action-row">
          <div>
            <span class="badge badge-info" style="margin-right:6px;">${escapeHtml(l.date)}</span>
            <span style="font-size:0.85rem;">${escapeHtml(l.text)}</span>
          </div>
        </div>`
      )
      .join('');
  }
}

// ==================== 액션 핸들러 (입찰가 반영, 제외키워드, 로그) ====================

window.applyRecommendedBid = async function (itemType, id, newBid) {
  const list = itemType === 'keyword' ? appData.keywords : appData.products;
  const found = (list || []).find((x) => x.id === id);
  if (!found) return;
  const oldBid = found.bid;
  found.bid = Number(newBid);
  const title = itemType === 'keyword' ? found.keyword : found.name;

  appData.optimizationLogs = appData.optimizationLogs || [];
  appData.optimizationLogs.push({
    id: 'log-' + Date.now(),
    date: getDateStrDaysAgo(0),
    text: `[입찰가 최적화] ${title}: ${formatWon(oldBid)} ➔ ${formatWon(newBid)} 조정`
  });

  await commitData();
  showToast(`'${title}' 입찰가가 ${formatWon(newBid)}으로 반영되었습니다!`);
};

window.addNegativeKeywordFromAction = async function (kw) {
  if (!kw) return;
  appData.negativeKeywords = appData.negativeKeywords || [];
  if (!appData.negativeKeywords.includes(kw)) {
    appData.negativeKeywords.push(kw);
    appData.optimizationLogs = appData.optimizationLogs || [];
    appData.optimizationLogs.push({
      id: 'log-' + Date.now(),
      date: getDateStrDaysAgo(0),
      text: `[제외 키워드 등록] '${kw}' 광고비 누수 차단 목록에 추가`
    });
    await commitData();
  }
  showToast(`'${kw}' 키워드가 제외 키워드 보관함에 추가되었습니다!`);
};

window.removeNegativeKeyword = async function (idx) {
  if (!appData.negativeKeywords) return;
  appData.negativeKeywords.splice(idx, 1);
  await commitData();
};

window.logOptimizationAction = async function (text) {
  appData.optimizationLogs = appData.optimizationLogs || [];
  appData.optimizationLogs.push({
    id: 'log-' + Date.now(),
    date: getDateStrDaysAgo(0),
    text
  });
  await commitData();
  showToast('최적화 작업 일지에 기록되었습니다!');
};

// ==================== 네이버 검색광고 REST API 연동 (HMAC-SHA256 서명) ====================

async function generateNaverSignature(timestamp, method, uri, secretKey) {
  const message = `${timestamp}.${method}.${uri}`;
  const enc = new TextEncoder();
  const keyData = enc.encode(secretKey.trim());
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuf = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(message));
  const bytes = new Uint8Array(sigBuf);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function callNaverEndpoint(uri, method = 'GET', queryString = '') {
  const customerId = String(apiConfig.customerId || '').trim();
  const accessLicense = String(apiConfig.accessLicense || '').trim();
  const secretKey = String(apiConfig.secretKey || '').trim();

  const timestamp = String(Date.now());
  const signature = await generateNaverSignature(timestamp, method, uri, secretKey);
  const fullPath = queryString ? `${uri}?${queryString}` : uri;

  // 1) 로컬 브릿지 서버(/api/naver-proxy)가 켜져 있으면 우선 사용 (CORS 없음)
  if (localServerAvailable) {
    const res = await fetch('/api/naver-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uri: fullPath,
        method,
        headers: {
          'X-Timestamp': timestamp,
          'X-API-KEY': accessLicense,
          'X-Customer': customerId,
          'X-Signature': signature
        }
      })
    });
    if (res.ok) return await res.json();
  }

  // 2) 구글 드라이브 Apps Script 웹앱 프록시가 설정되어 있으면 서버리스 호출
  if (syncConfig.cloudDbUrl && syncConfig.cloudDbUrl.includes('script.google.com')) {
    const res = await fetch(syncConfig.cloudDbUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'naverApiProxy',
        uri: fullPath,
        method,
        headers: {
          'X-Timestamp': timestamp,
          'X-API-KEY': accessLicense,
          'X-Customer': customerId,
          'X-Signature': signature
        }
      })
    });
    if (res.ok) {
      const wrapped = await res.json();
      if (wrapped && wrapped.ok && wrapped.data) return wrapped.data;
    }
  }

  // 3) 브라우저 직접 호출 시도
  const directRes = await fetch(`https://api.searchad.naver.com${fullPath}`, {
    method,
    headers: {
      'X-Timestamp': timestamp,
      'X-API-KEY': accessLicense,
      'X-Customer': customerId,
      'X-Signature': signature
    }
  });
  if (!directRes.ok) {
    const errText = await directRes.text();
    throw new Error(`HTTP ${directRes.status}: ${errText}`);
  }
  return await directRes.json();
}

async function syncFromNaverSearchAdApi() {
  const cid = String(apiConfig.customerId || '').trim();
  const lic = String(apiConfig.accessLicense || '').trim();
  const sec = String(apiConfig.secretKey || '').trim();
  const resultBox = document.getElementById('apiTestResultBox');

  if (!lic || !sec) {
    showToast('Access License와 Secret Key를 먼저 확인해 주세요.');
    return;
  }

  if (!/^\d+$/.test(cid)) {
    const msg = `⚠️ 네이버 검색광고 API는 로그인 아이디(${apiConfig.loginId || 'junhs3973'}) 대신 숫자형 CUSTOMER_ID(예: 2849102)가 필요합니다! 네이버 검색광고 관리시스템 > [도구] > [API 사용 관리] 상단에 적힌 숫자를 입력해 주세요.`;
    if (resultBox) {
      resultBox.innerHTML = `<span style="color:var(--warning);font-weight:700;">${msg}</span>`;
    }
    showToast('상단 입력창에 숫자형 CUSTOMER_ID를 입력해 주세요!');
    document.getElementById('quickCustomerIdInput')?.focus();
    return;
  }

  try {
    showToast('네이버 검색광고 API에서 캠페인·소재·키워드 데이터를 조회 중입니다...');
    if (resultBox) {
      resultBox.innerHTML = `⏳ 네이버 검색광고 서버(<code>api.searchad.naver.com</code>)에서 실시간 캠페인 및 성과 지표를 불러오는 중...`;
    }

    const campaignsRaw = await callNaverEndpoint('/ncc/campaigns', 'GET');
    if (!Array.isArray(campaignsRaw)) {
      throw new Error(JSON.stringify(campaignsRaw));
    }

    const since = getDateStrDaysAgo(14);
    const until = getDateStrDaysAgo(1);
    const newCampaigns = [];
    const newProducts = [];
    const newKeywords = [];

    for (const c of campaignsRaw) {
      let stat = { impCnt: 0, clkCnt: 0, salesAmt: 0, ccnt: 0, convAmt: 0 };
      try {
        const fields = encodeURIComponent(JSON.stringify(['impCnt', 'clkCnt', 'salesAmt', 'ctr', 'cpc', 'ccnt', 'convAmt', 'ror', 'avgRnk']));
        const timeRange = encodeURIComponent(JSON.stringify({ since, until }));
        const stRes = await callNaverEndpoint('/stats', 'GET', `id=${encodeURIComponent(c.nccCampaignId)}&fields=${fields}&timeRange=${timeRange}`);
        if (stRes && Array.isArray(stRes.data) && stRes.data.length > 0) {
          stat = stRes.data.reduce(
            (acc, cur) => ({
              impCnt: acc.impCnt + (cur.impCnt || 0),
              clkCnt: acc.clkCnt + (cur.clkCnt || 0),
              salesAmt: acc.salesAmt + (cur.salesAmt || 0),
              ccnt: acc.ccnt + (cur.ccnt || 0),
              convAmt: acc.convAmt + (cur.convAmt || 0)
            }),
            stat
          );
        }
      } catch (e) {}

      newCampaigns.push({
        id: c.nccCampaignId,
        name: c.name,
        type: c.campaignTp || '쇼핑검색',
        dailyBudget: c.dailyBudget || 0,
        impressions: stat.impCnt || 0,
        clicks: stat.clkCnt || 0,
        cost: stat.salesAmt || 0,
        conversions: stat.ccnt || 0,
        sales: stat.convAmt || 0
      });

      // 광고그룹 조회
      try {
        const adgroups = await callNaverEndpoint('/ncc/adgroups', 'GET', `nccCampaignId=${encodeURIComponent(c.nccCampaignId)}`);
        if (Array.isArray(adgroups)) {
          for (const ag of adgroups.slice(0, 12)) {
            // 소재(상품) 조회
            try {
              const ads = await callNaverEndpoint('/ncc/ads', 'GET', `nccAdgroupId=${encodeURIComponent(ag.nccAdgroupId)}`);
              if (Array.isArray(ads)) {
                for (const ad of ads.slice(0, 25)) {
                  const adTitle =
                    (ad.ad && (ad.ad.headline || ad.ad.productName || ad.ad.title)) ||
                    ad.inspectRequestMsg ||
                    `상품소재_${ad.nccAdId.slice(-5)}`;
                  newProducts.push({
                    id: ad.nccAdId,
                    name: adTitle,
                    campaign: c.name,
                    adGroup: ag.name,
                    bid: ag.bidAmt || 200,
                    avgRank: 2.5,
                    impressions: 0,
                    clicks: 0,
                    cost: 0,
                    conversions: 0,
                    sales: 0
                  });
                }
              }
            } catch (e) {}

            // 키워드 조회
            try {
              const kws = await callNaverEndpoint('/ncc/keywords', 'GET', `nccAdgroupId=${encodeURIComponent(ag.nccAdgroupId)}`);
              if (Array.isArray(kws)) {
                for (const kw of kws.slice(0, 40)) {
                  newKeywords.push({
                    id: kw.nccKeywordId,
                    keyword: kw.keyword,
                    campaign: c.name,
                    adGroup: ag.name,
                    bid: kw.bidAmt || ag.bidAmt || 200,
                    avgRank: 3.0,
                    impressions: 0,
                    clicks: 0,
                    cost: 0,
                    conversions: 0,
                    sales: 0
                  });
                }
              }
            } catch (e) {}
          }
        }
      } catch (e) {}
    }

    if (newCampaigns.length > 0) appData.campaigns = newCampaigns;
    if (newProducts.length > 0) appData.products = newProducts;
    if (newKeywords.length > 0) appData.keywords = newKeywords;
    appData.dataSourceLabel = `실시간 API 연동 완료 (CUSTOMER_ID: ${cid}, 최근 14일 기준)`;

    await commitData();
    if (resultBox) {
      resultBox.innerHTML = `✅ <strong style="color:var(--primary);">실시간 API 연동 성공!</strong> 캠페인 ${newCampaigns.length}개, 상품소재 ${newProducts.length}개, 키워드 ${newKeywords.length}개를 불러왔습니다.`;
    }
    showToast('네이버 검색광고 API 실시간 동기화가 완료되었습니다!');
  } catch (err) {
    const errMsg = String(err.message || err);
    if (resultBox) {
      resultBox.innerHTML = `⚠️ <strong>API 호출 안내:</strong> ${escapeHtml(errMsg)}<br/>브라우저 보안(CORS) 정책으로 직접 호출이 제한될 경우, <strong>[📂 보고서(CSV/엑셀) 업로드]</strong>를 이용하시거나 <strong>구글 드라이브 브릿지 / 로컬 서버(start_optimizer.bat)</strong>를 통해 즉시 조회할 수 있습니다.`;
    }
    showToast('API 직접 호출이 제한되었습니다. 설정 탭의 안내를 확인해 주세요.');
  }
}

// ==================== CSV / TSV / 엑셀 보고서 파서 ====================

function parseNumberClean(val) {
  if (val === undefined || val === null) return 0;
  const cleaned = String(val).replace(/[,%원\s"]/g, '');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function splitCsvLine(line, delimiter = ',') {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === delimiter && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur.trim());
  return result;
}

async function handleReportFileUpload(file) {
  if (!file) return;
  const text = await file.text();
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) {
    showToast('보고서 파일에 데이터가 부족합니다.');
    return;
  }

  // 헤더 줄 찾기 (네이버 보고서는 상단 1~3줄에 제목이 있는 경우가 많음)
  let headerIdx = 0;
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    if (
      lines[i].includes('노출') ||
      lines[i].includes('클릭') ||
      lines[i].includes('캠페인') ||
      lines[i].includes('총비용')
    ) {
      headerIdx = i;
      break;
    }
  }

  const headerLine = lines[headerIdx];
  const delimiter = headerLine.includes('\t') ? '\t' : ',';
  const headers = splitCsvLine(headerLine, delimiter);

  const findCol = (keywords) =>
    headers.findIndex((h) => keywords.some((kw) => h.replace(/\s/g, '').includes(kw)));

  const colCampaign = findCol(['캠페인']);
  const colAdGroup = findCol(['광고그룹', '그룹']);
  const colProduct = findCol(['소재', '상품명', '상품', '제목']);
  const colKeyword = findCol(['키워드', '검색어']);
  const colBid = findCol(['입찰가', '기본입찰가']);
  const colRank = findCol(['순위', '평균노출순위']);
  const colImpr = findCol(['노출수', '노출']);
  const colClicks = findCol(['클릭수', '클릭']);
  const colCost = findCol(['총비용', '광고비', '비용']);
  const colConv = findCol(['전환수', '전환']);
  const colSales = findCol(['전환매출', '매출액', '매출']);

  const campaignMap = {};
  const newProducts = [];
  const newKeywords = [];

  for (let i = headerIdx + 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i], delimiter);
    if (cols.length < 3) continue;

    const campaignName = (colCampaign >= 0 ? cols[colCampaign] : '') || '네이버쇼핑_캠페인';
    if (campaignName.includes('합계') || campaignName.includes('총계')) continue;

    const adGroupName = (colAdGroup >= 0 ? cols[colAdGroup] : '') || '기본광고그룹';
    const prodName = colProduct >= 0 ? cols[colProduct] : '';
    const kwName = colKeyword >= 0 ? cols[colKeyword] : '';
    const bid = colBid >= 0 ? parseNumberClean(cols[colBid]) : 250;
    const avgRank = colRank >= 0 ? parseNumberClean(cols[colRank]) || 2.8 : 2.8;
    const impr = colImpr >= 0 ? parseNumberClean(cols[colImpr]) : 0;
    const clicks = colClicks >= 0 ? parseNumberClean(cols[colClicks]) : 0;
    const cost = colCost >= 0 ? parseNumberClean(cols[colCost]) : 0;
    const conv = colConv >= 0 ? parseNumberClean(cols[colConv]) : 0;
    const sales = colSales >= 0 ? parseNumberClean(cols[colSales]) : 0;

    if (!campaignMap[campaignName]) {
      campaignMap[campaignName] = {
        id: 'cmp-' + Object.keys(campaignMap).length,
        name: campaignName,
        type: campaignName.includes('파워') ? '파워링크' : '쇼핑검색',
        dailyBudget: 50000,
        impressions: 0,
        clicks: 0,
        cost: 0,
        conversions: 0,
        sales: 0
      };
    }
    campaignMap[campaignName].impressions += impr;
    campaignMap[campaignName].clicks += clicks;
    campaignMap[campaignName].cost += cost;
    campaignMap[campaignName].conversions += conv;
    campaignMap[campaignName].sales += sales;

    if (kwName && kwName !== '-') {
      newKeywords.push({
        id: 'kw-u-' + i,
        keyword: kwName,
        campaign: campaignName,
        adGroup: adGroupName,
        bid: bid || 240,
        avgRank,
        impressions: impr,
        clicks,
        cost,
        conversions: conv,
        sales
      });
    } else {
      newProducts.push({
        id: 'prd-u-' + i,
        name: prodName || `${adGroupName} 상품 #${i}`,
        campaign: campaignName,
        adGroup: adGroupName,
        bid: bid || 260,
        avgRank,
        impressions: impr,
        clicks,
        cost,
        conversions: conv,
        sales
      });
    }
  }

  const parsedCampaigns = Object.values(campaignMap);
  if (parsedCampaigns.length > 0) appData.campaigns = parsedCampaigns;
  if (newProducts.length > 0) appData.products = newProducts;
  if (newKeywords.length > 0) appData.keywords = newKeywords;

  appData.dataSourceLabel = `업로드 보고서 반영 완료 (${file.name})`;
  appData.optimizationLogs = appData.optimizationLogs || [];
  appData.optimizationLogs.push({
    id: 'log-' + Date.now(),
    date: getDateStrDaysAgo(0),
    text: `[보고서 업로드 분석] '${file.name}' (${newProducts.length}개 상품, ${newKeywords.length}개 키워드 분석 완료)`
  });

  await commitData();
  showToast(`'${file.name}' 보고서 분석이 완료되었습니다!`);
}

// ==================== 24시간 클라우드 동기화 엔진 (GitHub db-store + Google Drive + Local) ====================

function updateSyncIndicator(state, message) {
  const dot = document.getElementById('syncDot');
  const txt = document.getElementById('syncStatusText');
  if (!dot || !txt) return;
  dot.className = 'sync-dot';
  if (state === 'online') dot.classList.add('online');
  if (state === 'syncing') dot.classList.add('syncing');
  txt.textContent = message;
}

function refreshSyncBadge() {
  if (syncConfig.cloudDbUrl && syncConfig.cloudDbUrl.includes('script.google.com')) {
    updateSyncIndicator('online', '구글 드라이브 & 클라우드 동기화 중');
  } else if (syncConfig.ghToken) {
    updateSyncIndicator('online', '24시간 클라우드 실시간 동기화 중');
  } else if (localServerAvailable) {
    updateSyncIndicator('online', '로컬 브릿지 서버 연결됨');
  } else {
    updateSyncIndicator('offline', '이 기기에 저장됨 (동기화 설정)');
  }
  updateSyncModalQr();
}

function updateSyncModalQr() {
  const statusEl = document.getElementById('syncModalStatusText');
  const qrBox = document.getElementById('qrBox');
  const qrImg = document.getElementById('qrImg');
  if (!statusEl || !qrBox || !qrImg) return;

  if (syncConfig.ghToken || apiConfig.accessLicense) {
    const shareUrl = buildOneClickShareUrl();
    statusEl.innerHTML = `✅ <strong>원클릭 자동 연결 링크 준비 완료!</strong> 아래 QR코드나 링크로 접속하면 아이폰·아이패드·PC 어디서든 API 키와 분석 데이터가 즉시 연동됩니다.`;
    qrBox.style.display = 'flex';
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`;
  } else {
    statusEl.textContent = '아래에 GitHub 토큰 또는 구글 드라이브 웹앱 URL을 연결하면 모든 기기가 24시간 실시간 동기화됩니다.';
    qrBox.style.display = 'none';
  }
}

async function commitData(skipRemotePush = false) {
  appData.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  renderAll();
  if (!skipRemotePush) {
    await pushToRemoteSync();
  }
}

async function initSyncEngine() {
  checkUrlSyncParams();

  // 1) 로컬 서버(/api/info) 감지
  try {
    const res = await fetch('/api/info', { cache: 'no-store' });
    if (res.ok) {
      localServerAvailable = true;
      await pullFromLocalServer();
    }
  } catch (e) {
    localServerAvailable = false;
  }

  // 2) 클라우드 DB (GitHub db-store 또는 Google Drive) 불러오기
  if (syncConfig.ghToken || syncConfig.cloudDbUrl) {
    await pullFromCloudDb();
  }

  refreshSyncBadge();

  // 8초마다 자동 동기화 폴링
  setInterval(async () => {
    if (isSyncing) return;
    if (localServerAvailable) await pullFromLocalServer();
    if (syncConfig.ghToken || syncConfig.cloudDbUrl) await pullFromCloudDb(true);
  }, 8000);
}

async function pullFromLocalServer() {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (!res.ok) return;
    const remote = await res.json();
    if (remote && remote.updatedAt && remote.updatedAt > (appData.updatedAt || 0)) {
      appData = remote;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
      renderAll();
    }
  } catch (e) {}
}

async function pushToLocalServer() {
  if (!localServerAvailable) return;
  try {
    await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData)
    });
  } catch (e) {}
}

async function pullFromGhCloud() {
  if (!syncConfig.ghToken) return;
  const apiUrl = `https://api.github.com/repos/${GH_REPO_OWNER}/${GH_REPO_NAME}/contents/${GH_DB_FILE}`;
  const res = await fetch(`${apiUrl}?ref=db-store&t=${Date.now()}`, {
    headers: {
      Authorization: `Bearer ${syncConfig.ghToken}`,
      Accept: 'application/vnd.github+json'
    },
    cache: 'no-store'
  });
  if (res.status === 404) {
    await pushToGhCloud();
    return;
  }
  if (!res.ok) return;
  const meta = await res.json();
  if (meta && meta.sha) lastGhSha = meta.sha;
  if (meta && meta.content) {
    const remoteData = JSON.parse(base64ToUtf8(meta.content));
    if (remoteData && typeof remoteData.updatedAt === 'number') {
      if (remoteData.updatedAt > (appData.updatedAt || 0)) {
        appData = remoteData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        renderAll();
      }
    }
  }
}

async function pushToGhCloud() {
  if (!syncConfig.ghToken) return;
  const apiUrl = `https://api.github.com/repos/${GH_REPO_OWNER}/${GH_REPO_NAME}/contents/${GH_DB_FILE}`;
  if (!lastGhSha) {
    try {
      const check = await fetch(`${apiUrl}?ref=db-store&t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${syncConfig.ghToken}`,
          Accept: 'application/vnd.github+json'
        },
        cache: 'no-store'
      });
      if (check.ok) {
        const meta = await check.json();
        if (meta && meta.sha) lastGhSha = meta.sha;
      }
    } catch (e) {}
  }

  const bodyObj = {
    message: 'Sync Naver Ad Optimizer DB',
    content: utf8ToBase64(JSON.stringify(appData, null, 2)),
    branch: 'db-store'
  };
  if (lastGhSha) bodyObj.sha = lastGhSha;

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${syncConfig.ghToken}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObj)
  });
  if (putRes.ok) {
    const resJson = await putRes.json();
    if (resJson && resJson.content && resJson.content.sha) {
      lastGhSha = resJson.content.sha;
    }
  } else if (putRes.status === 409) {
    lastGhSha = null;
  }
}

async function pullFromCloudDb(silent = false) {
  try {
    if (!silent) updateSyncIndicator('syncing', '클라우드 동기화 중...');
    if (syncConfig.ghToken) {
      await pullFromGhCloud();
    }
    if (syncConfig.cloudDbUrl) {
      const url = syncConfig.cloudDbUrl.includes('?')
        ? `${syncConfig.cloudDbUrl}&mode=api&t=${Date.now()}`
        : `${syncConfig.cloudDbUrl}?mode=api&t=${Date.now()}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const remote = await res.json();
        if (remote && remote.updatedAt > (appData.updatedAt || 0)) {
          appData = remote;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
          renderAll();
        }
      }
    }
    refreshSyncBadge();
  } catch (e) {
    refreshSyncBadge();
  }
}

async function pushToRemoteSync() {
  isSyncing = true;
  updateSyncIndicator('syncing', '클라우드 저장 중...');
  try {
    if (localServerAvailable) await pushToLocalServer();
    if (syncConfig.ghToken) await pushToGhCloud();
    if (syncConfig.cloudDbUrl) {
      await fetch(syncConfig.cloudDbUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(appData)
      });
    }
  } catch (e) {}
  isSyncing = false;
  refreshSyncBadge();
}

// ==================== 유틸 및 이벤트 바인딩 ====================

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function initEventListeners() {
  // 탭 전환
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(btn.dataset.tab);
      if (pane) pane.classList.add('active');
      if (btn.dataset.tab === 'tab-dashboard') {
        setTimeout(drawTrendChart, 30);
      }
    });
  });

  // 마진율·목표ROAS·누수기준 변경
  document.getElementById('marginRateInput')?.addEventListener('change', (e) => {
    appData.settings.marginRate = Math.max(5, Math.min(95, Number(e.target.value || 35)));
    commitData();
  });
  document.getElementById('targetRoasInput')?.addEventListener('change', (e) => {
    appData.settings.targetRoas = Math.max(100, Number(e.target.value || 400));
    commitData();
  });
  document.getElementById('minLeakCostInput')?.addEventListener('change', (e) => {
    appData.settings.minLeakCost = Math.max(1000, Number(e.target.value || 15000));
    commitData();
  });

  // 상단 빠른 CUSTOMER_ID 저장 및 API 호출
  document.getElementById('quickSaveCustomerIdBtn')?.addEventListener('click', () => {
    const val = (document.getElementById('quickCustomerIdInput')?.value || '').trim();
    if (val) {
      apiConfig.customerId = val;
      saveApiConfig();
      renderHeaderAndControls();
    }
    syncFromNaverSearchAdApi();
  });

  document.getElementById('syncNaverApiBtn')?.addEventListener('click', () => {
    syncFromNaverSearchAdApi();
  });

  document.getElementById('goToApiSettingsBtn')?.addEventListener('click', () => {
    document.querySelector('[data-tab="tab-settings"]')?.click();
    document.getElementById('apiCustomerIdInput')?.focus();
  });

  // API 설정 탭 저장 버튼
  document.getElementById('saveAndFetchApiBtn')?.addEventListener('click', () => {
    apiConfig.loginId = (document.getElementById('apiLoginIdInput')?.value || 'junhs3973').trim();
    apiConfig.customerId = (document.getElementById('apiCustomerIdInput')?.value || '').trim();
    apiConfig.accessLicense = (document.getElementById('apiAccessLicenseInput')?.value || '').trim();
    apiConfig.secretKey = (document.getElementById('apiSecretKeyInput')?.value || '').trim();
    saveApiConfig();
    renderAll();
    updateSyncModalQr();
    syncFromNaverSearchAdApi();
  });

  document.getElementById('toggleSecretViewBtn')?.addEventListener('click', () => {
    const secInput = document.getElementById('apiSecretKeyInput');
    if (secInput) {
      secInput.type = secInput.type === 'password' ? 'text' : 'password';
    }
  });

  // 파일 업로드 (상단 버튼 & 드롭존)
  const fileInput = document.getElementById('csvUploadInput');
  fileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleReportFileUpload(e.target.files[0]);
      e.target.value = '';
    }
  });

  const dropzone = document.getElementById('reportDropzone');
  if (dropzone) {
    dropzone.addEventListener('click', () => fileInput?.click());
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
        handleReportFileUpload(e.dataTransfer.files[0]);
      }
    });
  }

  // 상품/키워드 검색 및 필터
  document.getElementById('productSearchInput')?.addEventListener('input', renderProductsTab);
  document.getElementById('productStatusFilter')?.addEventListener('change', renderProductsTab);
  document.getElementById('productSortSelect')?.addEventListener('change', renderProductsTab);
  document.getElementById('keywordSearchInput')?.addEventListener('input', renderKeywordsTab);
  document.getElementById('keywordFilterSelect')?.addEventListener('change', renderKeywordsTab);

  // 적정 CPC 계산기 입력 이벤트
  ['calcPrice', 'calcMargin', 'calcCvr', 'calcTargetRoas'].forEach((id) => {
    document.getElementById(id)?.addEventListener('input', updateMaxCpcCalculator);
  });

  // 제외 키워드 수동 추가 및 복사
  document.getElementById('addManualNegativeBtn')?.addEventListener('click', async () => {
    const input = document.getElementById('manualNegativeInput');
    const val = (input?.value || '').trim();
    if (!val) return;
    appData.negativeKeywords = appData.negativeKeywords || [];
    val.split(',').forEach((part) => {
      const clean = part.trim();
      if (clean && !appData.negativeKeywords.includes(clean)) {
        appData.negativeKeywords.push(clean);
      }
    });
    input.value = '';
    await commitData();
    showToast('제외 키워드가 추가되었습니다!');
  });

  const copyNegatives = () => {
    const list = appData.negativeKeywords || [];
    if (list.length === 0) {
      showToast('복사할 제외 키워드가 없습니다.');
      return;
    }
    navigator.clipboard.writeText(list.join('\n'));
    showToast(`제외 키워드 ${list.length}개가 클립보드에 복사되었습니다!`);
  };
  document.getElementById('copyNegativeListBtn')?.addEventListener('click', copyNegatives);
  document.getElementById('copyAllNegativeBtn')?.addEventListener('click', copyNegatives);

  // 최적화 작업 일지 추가
  document.getElementById('addOptLogBtn')?.addEventListener('click', async () => {
    const input = document.getElementById('newLogTextInput');
    const txt = (input?.value || '').trim();
    if (!txt) return;
    input.value = '';
    await window.logOptimizationAction(txt);
  });

  // 수동 상품/키워드 추가 모달
  document.getElementById('openAddDataModalBtn')?.addEventListener('click', () => {
    document.getElementById('addDataModal')?.classList.add('open');
  });

  document.getElementById('confirmAddItemBtn')?.addEventListener('click', async () => {
    const type = document.getElementById('newItemType')?.value || 'product';
    const campaign = (document.getElementById('newItemCampaign')?.value || '쇼핑검색_주력상품').trim();
    const adGroup = (document.getElementById('newItemAdGroup')?.value || '기본그룹').trim();
    const name = (document.getElementById('newItemName')?.value || '').trim();
    if (!name) {
      showToast('상품명 또는 키워드명을 입력해 주세요.');
      return;
    }
    const bid = Number(document.getElementById('newItemBid')?.value || 250);
    const avgRank = Number(document.getElementById('newItemRank')?.value || 3.0);
    const impressions = Number(document.getElementById('newItemImpr')?.value || 1000);
    const clicks = Number(document.getElementById('newItemClicks')?.value || 30);
    const cost = Number(document.getElementById('newItemCost')?.value || 7500);
    const conversions = Number(document.getElementById('newItemConv')?.value || 1);
    const sales = Number(document.getElementById('newItemSales')?.value || 35000);

    if (type === 'keyword') {
      appData.keywords.unshift({
        id: 'kw-' + Date.now(),
        keyword: name,
        campaign,
        adGroup,
        bid,
        avgRank,
        impressions,
        clicks,
        cost,
        conversions,
        sales
      });
    } else {
      appData.products.unshift({
        id: 'prd-' + Date.now(),
        name,
        campaign,
        adGroup,
        bid,
        avgRank,
        impressions,
        clicks,
        cost,
        conversions,
        sales
      });
    }

    document.getElementById('addDataModal')?.classList.remove('open');
    await commitData();
    showToast(`'${name}' 항목이 추가되었습니다!`);
  });

  // 모달 열기/닫기
  document.getElementById('openTutorialBtn')?.addEventListener('click', () => {
    document.getElementById('tutorialModal')?.classList.add('open');
  });
  document.getElementById('openSyncModalBtn')?.addEventListener('click', () => {
    const ghIn = document.getElementById('ghTokenInput');
    const gdIn = document.getElementById('gDriveUrlInput');
    if (ghIn) ghIn.value = syncConfig.ghToken || '';
    if (gdIn) gdIn.value = syncConfig.cloudDbUrl || '';
    updateSyncModalQr();
    document.getElementById('syncModal')?.classList.add('open');
  });

  document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close');
      document.getElementById(targetId)?.classList.remove('open');
      if (targetId === 'tutorialModal') {
        localStorage.setItem(TUTORIAL_SEEN_KEY, '1');
      }
    });
  });

  // 동기화 모달 버튼들
  document.getElementById('copyOneClickLinkBtn')?.addEventListener('click', () => {
    const url = buildOneClickShareUrl();
    navigator.clipboard.writeText(url);
    showToast('카카오톡 전달용 원클릭 자동 연결 링크가 복사되었습니다!');
  });

  document.getElementById('saveGhTokenBtn')?.addEventListener('click', async () => {
    syncConfig.ghToken = (document.getElementById('ghTokenInput')?.value || '').trim();
    saveSyncConfig();
    await pullFromCloudDb();
    refreshSyncBadge();
    showToast('GitHub 24시간 클라우드 동기화가 연결되었습니다!');
  });

  document.getElementById('forceCloudPullBtn')?.addEventListener('click', async () => {
    await pullFromCloudDb();
    showToast('클라우드에서 최신 데이터를 불러왔습니다!');
  });

  document.getElementById('forceCloudPushBtn')?.addEventListener('click', async () => {
    await pushToRemoteSync();
    showToast('클라우드에 현재 데이터를 저장했습니다!');
  });

  document.getElementById('saveGDriveUrlBtn')?.addEventListener('click', async () => {
    syncConfig.cloudDbUrl = (document.getElementById('gDriveUrlInput')?.value || '').trim();
    saveSyncConfig();
    await pullFromCloudDb();
    refreshSyncBadge();
    showToast('구글 드라이브 웹앱 URL이 저장되었습니다!');
  });

  document.getElementById('copyGasCodeBtn')?.addEventListener('click', async () => {
    try {
      const res = await fetch('google_drive_db.gs');
      const code = await res.text();
      await navigator.clipboard.writeText(code);
      showToast('구글 드라이브 DB & 네이버 API 프록시 스크립트가 복사되었습니다!');
    } catch (e) {
      showToast('google_drive_db.gs 파일을 참고해 주세요.');
    }
  });

  // 다크/라이트 테마 토글
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    if (next === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem(THEME_KEY, next);
    drawTrendChart();
  });

  window.addEventListener('resize', () => {
    drawTrendChart();
  });

  // 첫 방문 시 튜토리얼 자동 표시
  if (!localStorage.getItem(TUTORIAL_SEEN_KEY)) {
    setTimeout(() => {
      document.getElementById('tutorialModal')?.classList.add('open');
    }, 400);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSyncEngine();
  initEventListeners();
  renderAll();
});
