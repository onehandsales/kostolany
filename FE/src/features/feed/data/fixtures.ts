import type { FeedArticle, FeedSort } from '../types';

export const feedFixtures: Record<FeedSort, FeedArticle[]> = {
  latest: [
    {
      id: 'example-latest-rates',
      title: '금리가 오르면 예금과 대출에는 어떤 일이 생길까',
      summary: '같은 금리 소식도 저축하는 사람과 돈을 빌린 사람에게 다르게 다가올 수 있어요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.17', readingMinutes: 3, thumbnail: 'coins',
    },
    {
      id: 'example-latest-exchange',
      title: '환율 뉴스에서 우리 생활까지 이어지는 연결 고리',
      summary: '해외여행 경비부터 수입 물건의 가격까지, 환율을 읽는 출발점을 살펴봐요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.16', readingMinutes: 4, thumbnail: null,
    },
    {
      id: 'example-latest-housing',
      title: '주택 공급 소식을 읽을 때 함께 살펴볼 것들',
      summary: '지역과 공급 시점에 따라 같은 숫자의 의미도 달라질 수 있어요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.15', readingMinutes: 3, thumbnail: 'city',
    },
    {
      id: 'example-latest-prices',
      title: '물가 상승률이 낮아져도 장바구니가 가벼워지지 않는 이유',
      summary: '가격 수준과 가격이 오르는 속도는 서로 다른 개념이에요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.14', readingMinutes: 3, thumbnail: 'coins',
    },
  ],
  popular: [
    {
      id: 'example-popular-cash',
      title: '현금을 보유한다는 건 어떤 선택일까',
      summary: '기다림의 여유와 물가 변화라는 두 가지 관점을 함께 생각해 봐요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.12', readingMinutes: 4, thumbnail: 'coins',
    },
    {
      id: 'example-popular-market',
      title: '주식시장과 실물경제가 늘 같은 방향으로 움직이지 않는 이유',
      summary: '지금의 상황과 미래에 대한 기대를 나누어 읽어봐요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.10', readingMinutes: 5, thumbnail: 'city',
    },
    {
      id: 'example-popular-debt',
      title: '고정금리와 변동금리 뉴스를 이해하는 첫걸음',
      summary: '금리가 바뀌는 시점과 계약 조건의 차이를 살펴봐요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.09', readingMinutes: 3, thumbnail: null,
    },
  ],
  recommended: [
    {
      id: 'example-recommended-psychology',
      title: '시장의 숫자 뒤에 있는 사람들의 기대와 불안',
      summary: '가격을 설명할 때 투자 심리도 함께 살펴보는 이유를 알아봐요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.13', readingMinutes: 4, thumbnail: null,
    },
    {
      id: 'example-recommended-news',
      title: '경제 뉴스를 읽으며 사실과 해석을 구분하는 방법',
      summary: '발표된 숫자와 그 숫자에 대한 의견을 분리해 읽는 연습이에요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.11', readingMinutes: 3, thumbnail: 'city',
    },
    {
      id: 'example-recommended-time',
      title: '오늘의 뉴스와 긴 투자 시간을 함께 바라보기',
      summary: '뉴스의 시간 범위와 내 계획의 시간 범위가 같은지 살펴봐요.',
      sourceName: 'Kostolany · 예시', publishedLabel: '2026.11.08', readingMinutes: 4, thumbnail: 'coins',
    },
  ],
};
