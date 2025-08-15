# 카카오 로그인 컴포넌트

이 컴포넌트는 카카오 JavaScript SDK를 사용하여 카카오 로그인 기능을 제공합니다.

## 설치 및 설정

### 1. 카카오 개발자 계정 설정

1. [카카오 개발자 콘솔](https://developers.kakao.com/)에 접속
2. 애플리케이션 생성
3. JavaScript 키 발급
4. 플랫폼 설정에서 도메인 등록

### 2. 컴포넌트 설정

`KakaoLogin.tsx` 파일에서 카카오 JavaScript 키를 설정하세요:

```typescript
// KakaoLogin.tsx 파일의 25번째 줄 근처
window.Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY');
```

## 사용법

### 기본 사용법

```tsx
import { KakaoLogin } from '../components';

const MyComponent = () => {
  const handleKakaoSuccess = (userInfo) => {
    console.log('카카오 로그인 성공:', userInfo);
    // 로그인 성공 후 처리
  };

  const handleKakaoError = (error) => {
    console.error('카카오 로그인 실패:', error);
    // 에러 처리
  };

  return (
    <KakaoLogin
      onSuccess={handleKakaoSuccess}
      onError={handleKakaoError}
    />
  );
};
```

### 커스텀 스타일링

```tsx
<KakaoLogin
  onSuccess={handleKakaoSuccess}
  onError={handleKakaoError}
  className="custom-button-class"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSuccess` | `(userInfo: any) => void` | No | 로그인 성공 시 호출되는 콜백 |
| `onError` | `(error: any) => void` | No | 로그인 실패 시 호출되는 콜백 |
| `className` | `string` | No | 추가 CSS 클래스 |

## 반환 데이터

### 성공 시 (onSuccess 콜백)

```typescript
{
  userInfo: {
    id: number,
    connected_at: string,
    properties: {
      nickname: string,
      profile_image?: string,
      thumbnail_image?: string
    },
    kakao_account: {
      email?: string,
      email_needs_agreement?: boolean,
      is_email_valid?: boolean,
      is_email_verified?: boolean,
      profile: {
        nickname: string,
        thumbnail_image_url?: string,
        profile_image_url?: string
      }
    }
  },
  accessToken: string,
  provider: 'kakao'
}
```

### 에러 시 (onError 콜백)

```typescript
{
  message: string,
  // 기타 에러 정보
}
```

## 데모 페이지

`KakaoLoginDemo` 컴포넌트를 사용하여 카카오 로그인을 테스트할 수 있습니다:

```tsx
import { KakaoLoginDemo } from '../components';

// App.tsx 또는 원하는 페이지에서
<KakaoLoginDemo />
```

## 백엔드 연동

카카오 로그인 후 백엔드로 토큰을 전송하여 서버 측 인증을 처리해야 합니다:

```typescript
const handleKakaoSuccess = async (userInfo) => {
  try {
    const response = await fetch('/api/auth/kakao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: userInfo.accessToken,
        userInfo: userInfo.userInfo,
      }),
    });
    
    const data = await response.json();
    // 로그인 성공 처리
  } catch (error) {
    // 에러 처리
  }
};
```

## 주의사항

1. **도메인 설정**: 카카오 개발자 콘솔에서 사용할 도메인을 등록해야 합니다.
2. **HTTPS**: 프로덕션 환경에서는 HTTPS가 필요합니다.
3. **토큰 관리**: 액세스 토큰은 안전하게 관리해야 합니다.
4. **사용자 동의**: 필요한 스코프에 대한 사용자 동의를 받아야 합니다.

## 스타일링

컴포넌트는 Tailwind CSS로 스타일링되어 있으며, 기본적으로 카카오 브랜드 색상(노란색)을 사용합니다. `className` prop을 통해 추가 스타일을 적용할 수 있습니다.
