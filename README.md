# 하나루프 과제 - 프론트엔드

- 과제용 데이터를 활용하여 PCF 전과정 데이터를 시각화하는 인터랙티브한 대시보드를 구현합니다.

## 실행 방법

```
yarn install
yarn dev
```

or

```
yarn install
yarn build
yarn start
```

## 기술 스택

`Next.js 16 (app router)` `Typescript` `Tailwindcss` `Shadcn/ui` `Zustand` `recharts`

## 구현 기능

- [x] 대시보드 데이터 연동
  - [x] 탄소 배출량 데이터를 차트로 렌더링
    - [x] 필터링(년도별, 회사별) 적용
  - [x] 리포트 리스트 최근 날짜, 최대 5개까지 렌더링
- [x] 리포트 추가/수정/조회 기능

## 설계 의도

- 데이터 가공
  - 2개의 회사가 있다고 가정하고, 과제 데이터를 적절히 나눠 목데이터에 분배하여 사용하였습니다.
  - 대시보드에서 사용되는 탄소 배출 데이터는 년도/월별과 Scope별 값이 포함된 복잡한 데이터로 가공되어야 했기에 커스텀훅으로 분리하였습니다.
  - 연산 비용이 크기 때문에 useMemo를 활용하여 성능 최적화를 고려하였습니다.
- 차트 구성
  - 탄소 배출 추이와 현황을 빠르게 파악할 수 있도록, 누적 탄소 배출량과 월별 탄소 배출량을 나누어 차트로 확인할 수 있게 하였습니다.
  - 년도와 회사에 따라 차트 데이터가 필터링 되도록 구성하였습니다.
    - 년도는 목데이터 기준 최신 년도로, 회사는 전체 회사 기준으로 초기화가 적용됩니다.
  - GHG 프로토콜을 적용하여 각 Scope별 데이터를 볼 수 있도록 커스텀하였습니다.
- UI/UX
  - 데이터의 상태(loading, error, empty)에 따른 UI를 제공합니다.
  - 대시보드의 최신 리포트는 최신순으로 최대 5개까지만 노출합니다.
- 상태 관리
  - zustand 적용
    - 회사 데이터 : id를 기반으로 회사 이름을 매칭하여 렌더링 하는 영역에 불필요한 fetch를 하지 않기 위해 전역 상태로 관리하였습니다.
    - 리포트 데이터
      - 여러 페이지에서 사용되고 있었기 때문에 전역 상태로 관리하였습니다.
      - 구현을 위해 fake backend에서 받은 초기 리포트 데이터로 값을 초기화 하고, 조회/추가/수정 기능에 따른 데이터를 변경하였습니다.
      - Next.js App Router 환경에서 SSR 페이지 이동시 상태 유지 문제를 해결하기 위해 Zustand Context 패턴을 적용하였습니다.

## 성능 최적화

- 목데이터를 가공 하기 위한 `useProcessEmissionData` 커스텀 훅은 많은 연산이 필요하기 때문에 useMemo를 적용하여 불필요한 재계산을 방지하였습니다.
- 의존성 배열에 포함되는 값(emissions)이 매 렌더링마다 새로운 배열로 생성되는 문제를 방지하기 위해 `filterCompany`나 `companies`가 바뀔 때만 재계산되도록, useMemo를 적용하였습니다.

## 데이터 흐름

- `layout.tsx` : fetchPosts(posts 데이터 초기값 fetch)
  - `PostsProvider` : Zustand Context로 posts값 초기화 (페이지 이동 시 상태 유지 목적)
    - `/app/page.tsx` : fetchCompanies(companies 데이터 fetch) -> DashboardArea props로 전달
    - `/app/post/create/page.tsx` : post 생성시 postsStore의 createPost로 추가 -> 대시보드 페이지의 리스트 영역 동기화
    - `/app/post/[id]/edit/page.tsx` : post 수정시 postsStore의 updatePost로 업데이트 -> 대시보드 페이지의 리스트 영역 동기화

## 트레이드 오프

- 시간 부족으로,
  - 리포트 리스트 페이지에 페이지네이션을 적용하지 못하였습니다.
  - 탄소 데이터 CURD를 구현하지 못하였습니다.

## 디렉토리 구조

```
📦src
 ┣ 📂app         # 라우팅
 ┣ 📂components  # UI 컴포넌트
 ┣ 📂constants   # 배출계수 상수
 ┣ 📂data        # 목데이터
 ┣ 📂hooks       # 목데이터 가공 커스텀훅
 ┣ 📂lib         # Fake Backend
 ┣ 📂store       # zustand store(companies, posts)
 ┗ 📂types       # 타입(데이터 모델, 가공 데이터 모델)
```

## AI 사용 내역

- 제미나이
  - 탄소 도메인에 대한 이해
  - 과제 내용 연관되어 있는 영어 문서 번역
- 클로드
  - 목데이터 가공 로직 코드 리뷰
  - Zustand Context 패턴 적용 방법
  - NextJS 환경에서 페이지 이동시 zustand의 상태 유지 불가능에 관한 이슈 해결

## 스크린샷
<img width="1920" height="1097" alt="image" src="https://github.com/user-attachments/assets/68c97b4b-e50b-4e17-b023-12b2960cdd4a" />

## 동영상
https://github.com/user-attachments/assets/406542a5-e747-4b01-b469-bb84b745d510

