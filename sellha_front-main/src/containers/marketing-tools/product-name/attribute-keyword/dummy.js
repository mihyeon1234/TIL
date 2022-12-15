const dummyProducts = [
  {
    productTitle:
      '제로가드 국산 숨쉬기편한 3중필터 KF-AD 비말차단용 블랙 덴탈마스크',
    rank: 1,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF-AD'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지'],
    },
    id: '30258115618',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_3025811/30258115618.20220204180413.jpg',
    mallGrade: '',
    url: null,
  },
  {
    productTitle: '에스제이글로벌 버즈핏 숨쉬기편한 마스크 KF94',
    rank: 2,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '저자극'],
    },
    id: '28856358593',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_2885635/28856358593.20220103191416.jpg',
    mallGrade: '',
    url: null,
  },
  {
    productTitle:
      '시노텍스95 숨쉬기편한 귀편한 새부리형 화이트 컬러 마스크 골라담기 1매',
    rank: 3,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '시노텍스',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['컵형'],
      기능: ['미세먼지필터', '김서림방지', '저자극'],
      매수: ['10개이하'],
    },
    id: '83178657781',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8317865/83178657781.6.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5634160975',
  },
  {
    productTitle:
      '미마 마스크 KF94 대형 1매입 숨쉬기편한 귀편한 귀안아픈 김선호 마스크',
    rank: 4,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '몽쥬스토어',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극'],
      매수: ['10개이하'],
    },
    id: '83096447396',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8309644/83096447396.6.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5551951641',
  },
  {
    productTitle: '클린앤영 숨쉬기 편한 KF94 마스크 대형 100매',
    rank: 5,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '클린앤영',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '저자극'],
      매수: ['100개이상'],
    },
    id: '82774349523',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8277434/82774349523.10.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5229827280',
  },
  {
    productTitle: '웰킵스 황사방역마스크 KF94 숨쉬기편한 국산마스크',
    rank: 6,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '웰킵스 스토어',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['10~30개'],
    },
    id: '82517923402',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8251792/82517923402.13.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/4973403078',
  },
  {
    productTitle:
      '이비에 마스크 KF94 컬러 새부리형 10매 귀편한 숨쉬기편한 패션 김희철 연예인 홈쇼핑',
    rank: 7,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '폴리테크직영몰',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한'],
      매수: ['10~30개'],
    },
    id: '83165108659',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8316510/83165108659.5.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5620612144',
  },
  {
    productTitle:
      '블루본 마스크 소형 KF94 새부리형 50매 화이트 숨쉬기편한 귀안아픈 귀편한 먼지차단',
    rank: 8,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '대한청년상회',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한'],
      매수: ['30~50개'],
    },
    id: '82923381589',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8292338/82923381589.13.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5378888470',
  },
  {
    productTitle: '어반위즈 국산 제로가드 숨쉬기편한 황사방역 마스크 KF94',
    rank: 9,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: [
        '미세먼지필터',
        '김서림방지',
        '저자극',
        '방한',
        '자외선차단',
        '방수',
      ],
    },
    id: '30128452618',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_3012845/30128452618.20211216005255.jpg',
    mallGrade: '',
    url: null,
  },
  {
    productTitle: 'KF94마스크새부리형 귀편한 국산 일회용',
    rank: 10,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '에이큐브샵',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['30~50개'],
    },
    id: '82706824602',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8270682/82706824602.9.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5162303504',
  },
  {
    productTitle:
      '위즈윈 덴탈마스크 숨쉬기편한 귀안아픈 귀편한 국산 컬러 일회용마스크 대형 50매',
    rank: 11,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '위즈윈',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF-AD'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['50~70개'],
    },
    id: '82770896596',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8277089/82770896596.33.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5226374359',
  },
  {
    productTitle:
      '에어데이즈 KF94 새부리형 마스크 중형 화이트 컬러 조정석 귀편한 1매 숨쉬기편한',
    rank: 12,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '지 엔',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극'],
      매수: ['10개이하'],
    },
    id: '82870580594',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8287058/82870580594.21.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5326088027',
  },
  {
    productTitle:
      '시노텍스95 자외선차단 숨쉬기편한 귀편한 새부리형 국산 필터 컬러 베이지 살구색 마스크 50매',
    rank: 13,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '시노텍스',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['컵형'],
      기능: ['미세먼지필터', '김서림방지', '저자극'],
      매수: ['10~30개'],
    },
    id: '83457325989',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8345732/83457325989.7.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5912826501',
  },
  {
    productTitle:
      '아에르 KF94 어드밴스드 V 마스크 10개입 국산 일회용 귀안아픈 숨쉬기편한 새부리',
    rank: 14,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '아에르 샵',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터'],
      매수: ['10~30개'],
    },
    id: '83038954329',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8303895/83038954329.6.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5494459197',
  },
  {
    productTitle: '퓨랩 숨쉬기 편한 덴탈형 KF94 마스크 화이트 100매(50매X2ea)',
    rank: 15,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '하이커',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '저자극'],
      매수: ['100개이상'],
    },
    id: '83149736144',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8314973/83149736144.3.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5605239643',
  },
  {
    productTitle:
      '아에르마스크 KF94 어드밴스드 국산 일회용 귀안아픈 숨쉬기편한 새부리 보건용',
    rank: 16,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: 'REAL팜',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극'],
      매수: ['10개이하'],
    },
    id: '82925674426',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8292567/82925674426.3.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5381181314',
  },
  {
    productTitle:
      '시노텍스95 숨쉬기편한 귀편한 새부리형 국산 필터 컬러 화이트 마스크 25매',
    rank: 17,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '시노텍스',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['컵형'],
      기능: ['미세먼지필터', '김서림방지', '저자극'],
      매수: ['10~30개'],
    },
    id: '82825480034',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8282548/82825480034.2.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5280988041',
  },
  {
    productTitle:
      '에블린 박서준 컬러 마스크 새부리형 귀안아픈 숨쉬기편한 연예인 마스크',
    rank: 18,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '에블린공식총판',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['접이식'],
      기능: [
        '미세먼지필터',
        '김서림방지',
        '저자극',
        '방한',
        '자외선차단',
        '방수',
      ],
      매수: ['10개이하'],
    },
    id: '83345111600',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8334511/83345111600.8.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5800612186',
  },
  {
    productTitle:
      '참존 톤업핏 장나라 비 컬러 새부리형 마스크 리뉴얼 코랄 중형 숨쉬기 편한 1매',
    rank: 19,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '지 엔',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '자외선차단'],
      매수: ['10개이하'],
    },
    id: '83146563904',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8314656/83146563904.2.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5602067495',
  },
  {
    productTitle:
      '(30매 무배)김태희 아이바나리 컬러 마스크 인디핑크 대형 새부리형 숨쉬기편한',
    rank: 20,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '오픈마우스',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['10개이하'],
    },
    id: '83172006847',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8317200/83172006847.6.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5627510044',
  },
  {
    productTitle:
      '미마마스크 KF94 중형 30매 귀안아픈 귀편한 숨쉬기편한 김선호 마스크',
    rank: 21,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '몽쥬스토어',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['30~50개'],
    },
    id: '82670947820',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8267094/82670947820.5.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5126427239',
  },
  {
    productTitle:
      '아이바나리 김태희 KF94 컬러 마스크 대형 인디핑크 새부리형 1매 귀안아픈 숨쉬기편한',
    rank: 22,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '오픈마우스',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['10개이하'],
    },
    id: '83170185856',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8317018/83170185856.13.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5625689207',
  },
  {
    productTitle:
      '[30개입] 아에르 KF94 어드밴스드 V 마스크 국산 일회용 귀안아픈 숨쉬기편한 새부리',
    rank: 23,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '아에르 샵',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터'],
      매수: ['10~30개'],
    },
    id: '83209804076',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8320980/83209804076.5.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5665306653',
  },
  {
    productTitle: '숨쉬기편한 국산 휘퓨어 KF94 마스크 흰색 대형 1매',
    rank: 24,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: 'FOR THE FAMILY',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '자외선차단'],
      매수: ['10개이하'],
    },
    id: '82565065140',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8256506/82565065140.12.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5020544291',
  },
  {
    productTitle:
      '아이코코 마스크 KF94 새부리형 소형 화이트 유아 어린이 귀편한 귀안아픈 숨쉬기편한',
    rank: 25,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '찬이네마켓',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극'],
      매수: ['10~30개'],
    },
    id: '83700739581',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8370073/83700739581.2.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/6156240093',
  },
  {
    productTitle:
      '참존 톤업핏마스크 10매 장나라 비 컬러 새부리형마스크 귀편한 귀안아픈 색깔 연예인 국산',
    rank: 26,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '퍼스트렌탈',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['접이식'],
      기능: [
        '미세먼지필터',
        '김서림방지',
        '저자극',
        '방한',
        '자외선차단',
        '방수',
      ],
      매수: ['10개이하'],
    },
    id: '82976433732',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8297643/82976433732.14.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5431939752',
  },
  {
    productTitle:
      '크리넥스 데일리 황사 마스크 KF80 숨쉬기편한 귀안아픈 새부리형 1매',
    rank: 27,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '웰빙메디칼',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF80'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['10개이하'],
    },
    id: '83505331329',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8350533/83505331329.3.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5960831841',
  },
  {
    productTitle:
      'KF94 한마음 마스크 100매 k94 귀안아픈 귀편한 50매 숨쉬기편한',
    rank: 28,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '전삼일',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '저자극'],
      매수: ['100개이상'],
    },
    id: '83053232594',
    imageUrl: 'https://shopping-phinf.pstatic.net/main_8305323/83053232594.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5508737216',
  },
  {
    productTitle: '참존 톤업핏 마스크 장나라 비 새부리형 여름 숨쉬기편한 1매',
    rank: 29,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '브로스83',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['컵형'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['10개이하'],
    },
    id: '83168461559',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8316846/83168461559.1.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5623965044',
  },
  {
    productTitle:
      '아에르 프로 마스크 10개입 국산 일회용 컬러 연예인 패션 귀안아픈 숨쉬기편한 새부리',
    rank: 30,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '아에르 샵',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터'],
      매수: ['10~30개'],
    },
    id: '82763920258',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8276392/82763920258.8.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5219398288',
  },
  {
    productTitle:
      '국산 에버렉스 마스크 KF94 50매 /숨쉬기 편한 청소년 초등학생 어린이 마스크',
    rank: 31,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: 'ONESTORE',
    property: {
      '': [''],
    },
    id: '82999229864',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8299922/82999229864.2.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5454735508',
  },
  {
    productTitle: '아에르 마스크 프로 새부리형 컬러 접이식 숨쉬기편한 (10매)',
    rank: 32,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: 'Green Care',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '자외선차단'],
      매수: ['10~30개'],
    },
    id: '83058825664',
    imageUrl: 'https://shopping-phinf.pstatic.net/main_8305882/83058825664.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5514330206',
  },
  {
    productTitle: '숨쉬기편한마스크 에어그린 KF94 / 엠케이플러스',
    rank: 33,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '-엠케이플러스',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극'],
      매수: ['70~100개'],
    },
    id: '83007699872',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8300769/83007699872.1.jpg',
    mallGrade: '새싹',
    url: 'https://smartstore.naver.com/main/products/5463205426',
  },
  {
    productTitle:
      '시노텍스95 숨쉬기편한 귀편한 새부리형 국산 필터 컬러 마스크 100매',
    rank: 34,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '시노텍스',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['컵형'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '자외선차단'],
      매수: ['50~70개'],
    },
    id: '82826321770',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8282632/82826321770.3.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5281829692',
  },
  {
    productTitle:
      '국산 잇템 덴탈 마스크 100매 MB필터 일회용 비말 숨쉬기편한 귀안아픈 블랙 코로나19',
    rank: 35,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: 'It Item',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['50~70개'],
    },
    id: '82659241371',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8265924/82659241371.6.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5114720962',
  },
  {
    productTitle:
      '[200매] 블랙 일회용 덴탈 마스크 대형 검정 검은색 비말차단 숨쉬기편한 KF',
    rank: 36,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '비타마니아',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF-AD'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['100개이상'],
    },
    id: '82480601270',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8248060/82480601270.12.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/4936077038',
  },
  {
    productTitle: '에어뮤즈 패션 헤이즈 마스크 컬러 새부리형 숨쉬기편한 1개입',
    rank: 37,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '순수한쇼핑몰',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '방한', '자외선차단'],
      매수: ['10개이하'],
    },
    id: '83466797288',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8346679/83466797288.1.jpg',
    mallGrade: '빅파워',
    url: 'https://smartstore.naver.com/main/products/5922297800',
  },
  {
    productTitle: 'SJ글로벌 버즈핏 숨쉬기 편한 새부리형 컬러 마스크',
    rank: 38,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '',
    property: {
      사용횟수: ['일회용'],
      주요형태: ['접이식'],
      기능: ['저자극'],
    },
    id: '30315613619',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_3031561/30315613619.20211227172409.jpg',
    mallGrade: '',
    url: null,
  },
  {
    productTitle:
      '5+1 숨쉬기편한 사우나 아쿠아 마스크 목욕탕 수영장 워터파크 방수 마스크',
    rank: 39,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: 'MODAMS',
    property: {
      사용횟수: ['다회용'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '자외선차단', '방수'],
    },
    id: '83356685508',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8335668/83356685508.3.jpg',
    mallGrade: '파워',
    url: 'https://smartstore.naver.com/main/products/5812186094',
  },
  {
    productTitle:
      '아이코코마스크 KF94 10매 귀안아픈 귀편한 숨쉬기편한 새부리형마스크',
    rank: 40,
    category: '생활/건강 > 건강관리용품 > 먼지차단마스크',
    mallName: '퍼스트렌탈',
    property: {
      사용횟수: ['일회용'],
      차단지수: ['KF94/N95'],
      주요형태: ['접이식'],
      기능: ['미세먼지필터', '김서림방지', '저자극', '자외선차단'],
      매수: ['10개이하'],
    },
    id: '82951905863',
    imageUrl:
      'https://shopping-phinf.pstatic.net/main_8295190/82951905863.2.jpg',
    mallGrade: '프리미엄',
    url: 'https://smartstore.naver.com/main/products/5407412183',
  },
];

const dummyTags = [
  {
    id: '83178657781',
    tag: [
      'ePTFE',
      '국산마스크',
      '시노텍스마스크',
      '시노펙스마스크',
      'FDA승인마스크',
      '숨쉬기편한마스크',
      '귀편한마스크',
      '컬러마스크',
      '색깔마스크',
      '연예인마스크',
    ],
  },
  {
    id: '83096447396',
    tag: [
      '귀편한마스크',
      '김선호마스크',
      '숨쉬기편한마스크',
      '미마마스크소형',
      '미마마스크중형',
      '미마마스크초소형',
      '귀안아픈마스크',
      '미마중형',
      '미마소형',
      '미마초소형',
    ],
  },
  {
    id: '82774349523',
    tag: [
      '미세먼지',
      '식약처인증마스크',
      'KF94',
      'KF94마스크',
      'KF94황사마스크',
      '황사방역마스크',
      '식약처인증',
      'FDA승인',
      '숨쉬기편한',
      '깔끔하고편리',
    ],
  },
  {
    id: '82517923402',
    tag: [
      '숨쉬기편한',
      '미세먼지마스크',
      'KF94마스크',
      '블랙마스크',
      '어린이마스크',
      '대형마스크',
      '식약처인증마스크',
      '보건용마스크',
      '성인마스크',
      'KF94',
    ],
  },
  {
    id: '83165108659',
    tag: [
      '대형',
      '중형',
      '소형',
      '초소형',
      '특대',
      '블랙',
      '그레이',
      '50매',
      '100매',
      '먼지차단',
    ],
  },
  {
    id: '82923381589',
    tag: [
      '대형',
      '중형',
      '100매',
      '특대',
      '블랙',
      '미세먼지차단',
      '컬러마스크',
      'kf80마스크',
      '방역용마스크',
      '국산',
    ],
  },
  {
    id: '82706824602',
    tag: [
      '숨쉬기편한',
      '보건용마스크',
      '식약처인증',
      '빅사이즈',
      '패션웰빙마스크',
      '대형',
      '중형',
      '특대형',
      '3중필터',
      '블랙',
    ],
  },
  {
    id: '82770896596',
    tag: [
      '덴탈마스크',
      '일회용마스크',
      '일회용마스크50매',
      '대형마스크',
      '숨쉬기편한마스크',
      '블랙마스크',
      '숨쉬기편한',
      '식약처인증마스크',
      '컬러마스크',
      '개별포장',
    ],
  },
  {
    id: '82870580594',
    tag: [
      'KF94마스크',
      'kf80마스크',
      '어린이마스크',
      'KF94소형',
      '특대형',
      '에어데이즈중형',
      '에어데이즈소형',
      '에어데이즈중형와이드',
      '에어데이즈대형',
      '에어데이즈KF94대형',
    ],
  },
  {
    id: '83457325989',
    tag: [
      '귀안아픈마스크',
      '베이지마스크',
      '연예인마스크',
      '살색마스크',
      '국산일회용마스크',
      '국산마스크',
      '일회용마스크',
      '컬러마스크',
      '자외선차단마스크',
      '새부리마스크',
    ],
  },
  {
    id: '83038954329',
    tag: [
      'KF94마스크',
      '일회용마스크',
      '국산일회용마스크',
      '국산마스크',
      'KF94',
      '연예인마스크',
      '숨쉬기편한마스크',
      '귀안아픈마스크',
      '새부리마스크',
      '식약처인증마스크',
    ],
  },
  {
    id: '83149736144',
    tag: [],
  },
  {
    id: '82925674426',
    tag: [
      '스탠다드핏',
      'KF94마스크',
      'KF94황사마스크',
      'KF94',
      '블랙마스크',
      '일회용마스크',
      '대형마스크',
      '황사마스크',
      '황사마스크KF94',
      '미세먼지필터',
    ],
  },
  {
    id: '82825480034',
    tag: [
      '국산일회용마스크',
      '귀안아픈마스크',
      '귀편한마스크',
      '컬러마스크',
      '국산마스크',
      '일회용마스크',
      '숨쉬기편한마스크',
      '자외선차단마스크',
      '쯔양마스크',
      '쯔양',
    ],
  },
  {
    id: '83345111600',
    tag: [
      'KF94',
      'KF94마스크',
      'KF94황사마스크',
      '컬러마스크',
      '덴탈마스크',
      '일회용마스크',
      '국산',
      '핑크마스크',
      '숨쉬기편한마스크',
      '패션마스크',
    ],
  },
  {
    id: '83146563904',
    tag: [
      'KF94마스크',
      'kf80마스크',
      '황사방역마스크',
      '미세먼지마스크kf94',
      'KF94소형',
      '중형마스크',
      '새부리형',
      '컬러마스크',
      '장나라마스크',
      '비마스크',
    ],
  },
  {
    id: '83172006847',
    tag: [
      '숨쉬기편한',
      '사용이편리한',
      '패션웰빙마스크',
      '사계절',
      '30대여성',
      '40대여성',
      '컬러마스크',
    ],
  },
  {
    id: '82670947820',
    tag: [
      '귀편한마스크',
      '김선호마스크',
      '숨쉬기편한마스크',
      '미마마스크소형',
      '미마마스크대형',
      '미마마스크중형',
      '미마마스크초소형',
      '미마대형',
      '미마중형',
      '귀안아픈마스크',
    ],
  },
  {
    id: '83170185856',
    tag: [
      '숨쉬기편한',
      '사용이편리한',
      '패션웰빙마스크',
      '사계절',
      '30대여성',
      '40대여성',
      '컬러마스크',
      'KF94',
      'KF94마스크',
    ],
  },
  {
    id: '83209804076',
    tag: [
      'KF94마스크',
      '일회용마스크',
      '국산일회용마스크',
      '국산마스크',
      'KF94',
      '연예인마스크',
      '숨쉬기편한마스크',
      '귀안아픈마스크',
      '새부리마스크',
      '식약처인증마스크',
    ],
  },
  {
    id: '82565065140',
    tag: [
      'KF94마스크',
      'KF94',
      '대형마스크',
      '국산마스크',
      '일회용마스크',
      'KF94아동용마스크',
      'KF94국산',
      '숨쉬기편한마스크',
      'KFAD',
      '비말차단마스크',
    ],
  },
  {
    id: '83700739581',
    tag: ['피부저자극', '어린이마스크', '약국', '어린이집', '유치원'],
  },
  {
    id: '82976433732',
    tag: [
      '숨쉬기편한',
      '특대형',
      '블랙',
      '덴탈',
      '와이드',
      '중형',
      '소형',
      '대형',
      '살색',
      '약국',
    ],
  },
  {
    id: '83505331329',
    tag: [
      '숨쉬기편한',
      '새부리형',
      '100매',
      '국산',
      '식약처인증',
      '블랙컬러',
      '중형',
      '특대형',
      '소형',
      '대형',
    ],
  },
  {
    id: '83053232594',
    tag: [
      '블랙마스크',
      '검정마스크',
      '얇은',
      '개별포장',
      '200매',
      '150매',
      '대형',
      '국산',
      '황사마스크',
      '황사',
    ],
  },
  {
    id: '83168461559',
    tag: [
      '숨쉬기편한',
      '패션웰빙마스크',
      '장나라마스크',
      '참존마스크',
      '베이지마스크',
      '참존마스크중형',
      '참존마스크소형',
      '중형',
      '대형',
      '소형',
    ],
  },
  {
    id: '82763920258',
    tag: [
      '일회용마스크',
      '국산일회용마스크',
      '컬러마스크',
      '연예인마스크',
      '패션마스크',
      '귀안아픈마스크',
      '숨쉬기편한마스크',
      '대형마스크',
      '미세먼지마스크',
      '초미세먼지마스크',
    ],
  },
  {
    id: '82999229864',
    tag: [
      '황사마스크',
      'KF94',
      'KF94마스크',
      'KF94황사마스크',
      '일회용마스크',
      'kf80마스크',
      '미세먼지마스크',
      '여성용마스크',
      '어린이마스크',
      'kf80아동용마스크',
    ],
  },
  {
    id: '83058825664',
    tag: [
      '아에르마스크',
      '아에르KF80',
      '아에르정품',
      '아에르보건용마스크',
      '보건용건강마스크',
      '황사방역마스크',
      '컬러마스크',
      '패션마스크',
      '대형마스크',
      '마스크소형',
    ],
  },
  {
    id: '83007699872',
    tag: [
      '숨쉬기편한마스크',
      '에어그린마스크',
      '냄새안나는마스크',
      '엠케이플러스',
      '국산마스크추천',
      '국산대형마스크',
      '남자대형마스크',
      '화장안묻는마스크',
      '마스크새해선물',
      '대한민국마스크',
    ],
  },
  {
    id: '82826321770',
    tag: [
      '귀편한마스크',
      '귀안아픈마스크',
      '숨쉬기편한마스크',
      '일회용마스크',
      '국산일회용마스크',
      '국산마스크',
      '자외선차단마스크',
      '컬러마스크',
      '블랙마스크',
    ],
  },
  {
    id: '82659241371',
    tag: [
      '덴탈마스크',
      '일회용마스크',
      '일회용마스크50매',
      '국산',
      '미세먼지마스크',
      '대형마스크',
      '3중필터마스크',
      '블랙마스크',
      '숨쉬기편한',
      '화이트마스크',
    ],
  },
  {
    id: '82480601270',
    tag: [
      '검정마스크',
      '숨쉬기편한마스크',
      '블랙마스크',
      '미세먼지차단마스크',
      '검은색마스크',
      '일회용마스크',
      '일회용마스크50매',
      '덴탈마스크',
      '3중필터마스크',
      '검은색일회용마스크',
    ],
  },
  {
    id: '83466797288',
    tag: [
      '패션마스크',
      '컬러마스크',
      '숨쉬기편한',
      '사용이편리한',
      '패션웰빙마스크',
      '30대여성',
      '여성마스크',
      '40대여성',
    ],
  },
  {
    id: '83356685508',
    tag: [
      '아쿠아마스크',
      '숨쉬기편한마스크',
      '숨쉬기편한',
      '워터파크방수',
      '운동용',
      '목욕탕',
      '사우나',
      '방수',
      '마스크단품',
      '수영장',
    ],
  },
  {
    id: '82951905863',
    tag: [
      '특대형',
      '초소형',
      'KF94황사마스크',
      '숨쉬기편한',
      '100매',
      '소형',
      '중형',
      '대형',
      '흰색',
      '블랙',
    ],
  },
];

export { dummyProducts, dummyTags };