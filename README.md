# 🎬 Collectors App - Modern Version

영화/미디어 콜렉터를 위한 현대적인 이커머스 애플리케이션입니다.

## 🚀 주요 개선사항

### 기술 스택 업그레이드
- **React 19** - 최신 React 버전 사용
- **TypeScript** - 타입 안전성 확보
- **Vite** - 빠른 개발 환경
- **Redux Toolkit** - 현대적인 상태 관리
- **SCSS Modules** - 컴포넌트별 스타일 분리

### 성능 최적화
- **React.memo** - 불필요한 리렌더링 방지
- **Lazy Loading** - 코드 스플리팅으로 초기 로딩 속도 개선
- **커스텀 훅** - 로직 재사용성 향상
- **에러 바운더리** - 안정적인 에러 처리

### 사용자 경험 개선
- **로딩 스피너** - 시각적 피드백 제공
- **에러 메시지** - 명확한 에러 안내
- **한국어 지원** - 사용자 친화적 인터페이스
- **반응형 디자인** - 모든 디바이스 지원

## 🛠️ 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트 검사
npm run lint
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── ErrorBoundary.tsx    # 에러 처리
│   ├── LoadingSpinner.tsx   # 로딩 컴포넌트
│   └── ...
├── hooks/              # 커스텀 훅
│   └── useCart.ts      # 장바구니 로직
├── pages/              # 페이지 컴포넌트
├── redux/              # 상태 관리
├── types/              # TypeScript 타입 정의
└── firebase/           # Firebase 설정
```

## 🔧 주요 기능

### 인증 시스템
- Firebase Auth 통합
- Google 로그인 지원
- 사용자 프로필 관리

### 상품 관리
- 5개 카테고리 (영화, 애니메이션, TV 시리즈, 희귀 콜렉션, 스포츠/예술)
- 상품 검색 및 필터링
- 상품 상세 정보

### 장바구니 시스템
- 상품 추가/제거
- 수량 조절
- 총액 계산
- 로컬 스토리지 영속화

### 결제 시스템
- Stripe Checkout 통합
- 안전한 결제 처리

## 🎨 UI/UX 특징

- **모던한 디자인** - 깔끔하고 직관적인 인터페이스
- **반응형 레이아웃** - 모바일, 태블릿, 데스크톱 지원
- **접근성** - ARIA 라벨 및 키보드 네비게이션 지원
- **애니메이션** - 부드러운 전환 효과

## 🔒 보안

- **타입 안전성** - TypeScript로 런타임 에러 방지
- **입력 검증** - 사용자 입력 데이터 검증
- **에러 처리** - 포괄적인 에러 처리 및 복구

## 📈 성능

- **코드 스플리팅** - 필요한 코드만 로드
- **메모이제이션** - 불필요한 리렌더링 방지
- **이미지 최적화** - 썸네일 및 원본 이미지 분리
- **번들 최적화** - Vite의 빠른 빌드 시스템

## 🧪 테스트

```bash
# 테스트 실행
npm test

# 테스트 커버리지
npm run test:coverage
```

## 📝 개발 가이드

### 컴포넌트 작성
```typescript
import React from 'react';
import type { ComponentProps } from '../types/common';

const MyComponent: React.FC<ComponentProps> = React.memo(({ prop }) => {
  return <div>{prop}</div>;
});

MyComponent.displayName = 'MyComponent';

export default MyComponent;
```

### 커스텀 훅 사용
```typescript
import { useCart } from '../hooks/useCart';

const MyComponent = () => {
  const { addToCart, cartCount } = useCart();
  // ...
};
```

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🙏 감사의 말

- React 팀 - 훌륭한 프레임워크 제공
- Vite 팀 - 빠른 빌드 도구
- Redux Toolkit 팀 - 현대적인 상태 관리
- Firebase 팀 - 백엔드 서비스
