import { PortfolioData } from "./types";

export const INITIAL_DATA: PortfolioData = {
  name: "임해림",
  hero: {
    title: "고객의 선택을 설계하고\n데이터로 매출을 증명하는 MD",
    subtitle: "WOMEN’S FASHION MD PORTFOLIO",
    englishTitle: "Customer-driven Merchandising & Sales Strategy",
    stats: [
      { label: "전환율", value: "+32%" },
      { label: "매출 달성", value: "1.8억" },
      { label: "베스트 상품", value: "5개" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
  },
  about: {
    definition: "상품을 등록하는 사람이 아니라,\n고객이 구매할 이유를 설계하는 MD입니다.",
    story: "고객의 시선에서 상품을 해석하고, 데이터를 기반으로 구매 흐름을 개선하며 결국 매출로 연결시키는 역할을 합니다.",
    strengths: [
      { id: "1", title: "데이터 기반 사고", description: "감이 아닌 수치로 판단합니다. CTR, CVR, 이탈률을 기반으로 문제를 정의하고 개선합니다." },
      { id: "2", title: "매출 중심 기획", description: "‘예쁜 상품’보다 ‘팔리는 상품’을 만듭니다. 구매 전환을 최우선으로 기획합니다." },
      { id: "3", title: "고객 이해", description: "고객의 고민과 망설임을 분석하여 구매 결정을 돕는 구조를 설계합니다." },
      { id: "4", title: "디자인 감각", description: "단순한 비주얼이 아닌 구매를 유도하는 정보 구조를 디자인합니다." },
      { id: "5", title: "실행력", description: "기획 → 상세페이지 → 업로드 → 프로모션까지 전 과정을 직접 실행할 수 있습니다." }
    ]
  },
  process: {
    quote: "“모든 기획은 데이터에서 시작해, 매출로 끝납니다.”",
    steps: [
      { id: "1", title: "DATA", content: "유입, 클릭률, 전환율, 이탈률 데이터를 분석합니다." },
      { id: "2", title: "PROBLEM", content: "고객이 구매하지 않는 이유를 정의합니다." },
      { id: "3", title: "INSIGHT", content: "데이터를 기반으로 고객의 구매 망설임을 도출합니다." },
      { id: "4", title: "ACTION", content: "상세페이지, 옵션 구성, 기획전을 개선합니다." },
      { id: "5", title: "RESULT", content: "전환율 상승 및 매출 개선으로 연결합니다." }
    ]
  },
  projects: [
    {
      id: "1",
      title: "여름 원피스 카테고리 매출 개선 프로젝트",
      problem: "조회수 대비 구매 전환율이 낮은 상태",
      analysis: "모바일 상세페이지 이탈률이 높고 착용 이미지 구간에서 체류시간이 짧음",
      insight: "고객은 상품이 마음에 들어도 “나에게 어울릴지” 확신이 부족한 상태",
      execution: "- 체형별 착용컷 추가\n- 코디 제안 콘텐츠 강화\n- 리뷰 영역 상단 배치",
      result: "전환율 35% 상승 / 카테고리 매출 2배 증가",
      quote: "“구매를 망설이던 지점을 제거하는 것이 핵심이었습니다.”",
      imageUrls: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"]
    },
    {
      id: "2",
      title: "신상품 런칭 및 베스트 상품화 프로젝트",
      problem: "신상품 노출 대비 판매 저조",
      analysis: "초기 구매 장벽이 높음",
      insight: "첫 구매를 만드는 구조가 반복 구매를 만든다고 판단했습니다.",
      execution: "- 기획전 구성\n- 리뷰 유도 프로모션 진행\n- SNS 콘텐츠 연계",
      result: "베스트 상품 진입 / 단기간 매출 상승",
      quote: "“첫 구매를 만드는 구조가 반복 구매를 만든다고 판단했습니다.”",
      imageUrls: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"]
    }
  ],
  design: {
    title: "DESIGN",
    description: "단순히 보기 좋은 디자인이 아니라,\n구매를 유도하는 구조를 설계합니다.",
    quote: "“디자인은 감각이 아니라, 전환을 위한 도구입니다.”",
    items: [
      {
        id: "1",
        title: "상세페이지 정보 구조 개선",
        description: "고객의 시선 흐름에 따른 정보 재배치",
        beforeUrl: "https://picsum.photos/seed/old-design/800/600",
        afterUrl: "https://picsum.photos/seed/new-design/800/600"
      },
      {
        id: "2",
        title: "배너 클릭 유도 디자인",
        description: "CTR 개선을 위한 비주얼 및 카피 최적화",
        beforeUrl: "https://picsum.photos/seed/old-banner/800/600",
        afterUrl: "https://picsum.photos/seed/new-banner/800/600"
      }
    ]
  },
  insights: {
    quote: "“데이터는 고객의 생각을 가장 솔직하게 보여주는 지표라고 생각합니다.”",
    metrics: ["CTR (클릭률)", "CVR (전환율)", "객단가", "이탈률"],
    items: [
      { title: "리뷰의 가치", content: "리뷰의 양보다 ‘내용’이 전환율에 더 큰 영향을 줌" },
      { title: "콘텐츠의 힘", content: "모델 이미지보다 착용 영상이 구매율 상승에 효과적" },
      { title: "첫 인상의 중요성", content: "첫 화면에서의 정보 전달이 이탈률을 결정" }
    ]
  },
  conclusion: {
    title: "CONCLUSION",
    content: "상품을 판매하는 것이 아니라,\n고객이 구매할 수밖에 없는 흐름을 설계합니다.\n\n데이터를 기반으로 문제를 정의하고,\n실행을 통해 결과를 만들어내는 MD로\n기여하겠습니다."
  },
  contact: {
    email: "healim020624@naver.com",
    phone: "010-5528-8765"
  }
};
