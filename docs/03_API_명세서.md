# API 명세서

## 1. 개요

### Base URL
```
http://localhost:3000
```

### 인증 방식
- **타입**: Bearer Token (JWT)
- **헤더**: `Authorization: Bearer {token}`
- **토큰 저장**: localStorage (`accessToken`)

### 공통 헤더
```http
Content-Type: application/json
Authorization: Bearer {token}  # 인증이 필요한 경우
```

### 공통 응답 형식
```typescript
{
  data?: any;
  message?: string;
  error?: string;
}
```

---

## 2. 인증 API

### 2.1 일반 로그인

#### POST /api/auth/login

**설명**: 사용자 아이디와 비밀번호로 로그인합니다.

**요청 본문**:
```json
{
  "user_id": "string",
  "user_pw": "string",
  "rememberMe": boolean
}
```

**응답 (200 OK)**:
```json
{
  "data": {
    "accessToken": "string",
    "user_nm": "string",
    "user_id": "string",
    "user_no": "string",
    "user_mail": "string",
    "avatarUrl": "string (optional)"
  }
}
```

**에러 응답**:
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `500 Internal Server Error`: 서버 오류

**사용 예시**:
```typescript
const response = await axiosInstance.post('/api/auth/login', {
  user_id: 'testuser',
  user_pw: 'password123',
  rememberMe: true
});
```

---

### 2.2 카카오 로그인 콜백

#### POST /api/auth/kakao/callback

**설명**: 카카오 소셜 로그인 후 백엔드에서 사용자 정보를 처리합니다.

**요청 본문**:
```json
{
  "kakaoId": "string",
  "nickname": "string",
  "profileImage": "string (optional)",
  "email": "string (optional)",
  "accessToken": "string"
}
```

**응답 (200 OK)**:
```json
{
  "data": {
    "accessToken": "string"
  }
}
```

**또는**:
```json
{
  "accessToken": "string"
}
```

**또는**:
```json
{
  "token": "string"
}
```

**에러 응답**:
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패 (무시 가능)
- `500 Internal Server Error`: 서버 오류

**참고**: 
- 401 에러가 발생해도 클라이언트에서는 로그인 성공으로 처리됩니다.
- HTML 응답이 오는 경우 리다이렉트가 발생했을 수 있습니다.

**사용 예시**:
```typescript
const response = await axiosInstance.post('/api/auth/kakao/callback', {
  kakaoId: kakaoUserInfo.id,
  nickname: kakaoUserInfo.properties.nickname,
  profileImage: kakaoUserInfo.properties.profile_image_url,
  email: kakaoUserInfo.kakao_account?.email,
  accessToken: 'kakao_access_token'
});
```

---

### 2.3 토큰 갱신

#### POST /api/auth/refresh

**설명**: 액세스 토큰을 갱신하고 사용자 정보를 확인합니다.

**요청 헤더**:
```http
Authorization: Bearer {current_token}
```

**응답 (200 OK)**:
```json
{
  "user": {
    "user_nm": "string",
    "user_id": "string",
    "user_no": "string",
    "user_mail": "string",
    "avatarUrl": "string (optional)"
  }
}
```

**또는**:
```json
{
  "data": {
    "user": {
      "user_nm": "string",
      "user_id": "string",
      "user_no": "string",
      "user_mail": "string",
      "avatarUrl": "string (optional)"
    }
  }
}
```

**에러 응답**:
- `401 Unauthorized`: 토큰이 만료되었거나 유효하지 않음 (무시 가능)
- `500 Internal Server Error`: 서버 오류

**참고**:
- 401 에러 발생 시 자동으로 로그아웃 처리됩니다.
- 5분마다 자동으로 health check를 수행합니다.

**사용 예시**:
```typescript
const response = await axiosInstance.post('/api/auth/refresh');
```

---

### 2.4 토큰 로그인 체크

#### GET /api/auth/token-login-check

**설명**: 현재 토큰의 유효성을 확인합니다.

**요청 헤더**:
```http
Authorization: Bearer {token}
```

**응답 (200 OK)**:
```json
{
  "valid": boolean,
  "user": {
    "user_nm": "string",
    "user_id": "string"
  }
}
```

**에러 응답**:
- `401 Unauthorized`: 토큰이 유효하지 않음

**사용 예시**:
```typescript
const response = await axiosInstance.get('/api/auth/token-login-check');
```

---

### 2.5 로그아웃

#### POST /api/auth/logout

**설명**: 사용자를 로그아웃합니다.

**요청 헤더**:
```http
Authorization: Bearer {token}
```

**응답 (200 OK)**:
```json
{
  "message": "로그아웃 성공"
}
```

**에러 응답**:
- `500 Internal Server Error`: 서버 오류

**참고**: 서버 요청이 실패해도 클라이언트에서는 로그아웃 처리됩니다.

**사용 예시**:
```typescript
await axiosInstance.post('/api/auth/logout');
```

---

## 3. 사용자 정보 타입

### UserResponseCheckToken
```typescript
interface UserResponseCheckToken {
  user_nm: string;        // 사용자 이름
  user_id: string;        // 사용자 ID
  user_no: string;        // 사용자 번호
  user_mail: string;      // 사용자 이메일
  avatarUrl?: string;     // 프로필 이미지 URL (optional)
  userNm?: string;        // 사용자 이름 (대체 필드)
}
```

### User (클라이언트 타입)
```typescript
interface User {
  name: string;           // 사용자 이름
  email: string;          // 사용자 이메일
  avatarUrl?: string;     // 프로필 이미지 URL (optional)
}
```

---

## 4. Axios 설정

### Axios Instance 설정
```typescript
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 요청 인터셉터
- 모든 요청에 자동으로 `Authorization` 헤더 추가
- localStorage에서 `accessToken`을 읽어서 Bearer Token으로 설정

### 응답 인터셉터
- 401 에러 발생 시:
  - 카카오 로그인 API와 refresh API는 무시
  - 다른 API는 자동으로 로그아웃 처리 및 `/login`으로 리다이렉트

---

## 5. 에러 처리

### 에러 응답 형식
```typescript
{
  response: {
    status: number,
    data: {
      message?: string,
      error?: string
    }
  }
}
```

### 에러 코드
- `400`: Bad Request - 잘못된 요청
- `401`: Unauthorized - 인증 실패
- `403`: Forbidden - 권한 없음
- `404`: Not Found - 리소스를 찾을 수 없음
- `500`: Internal Server Error - 서버 오류

### 에러 처리 예시
```typescript
try {
  const response = await axiosInstance.post('/api/auth/login', data);
  // 성공 처리
} catch (error: any) {
  if (error.response?.status === 401) {
    // 인증 실패 처리
  } else if (error.response?.data?.message) {
    // 서버 에러 메시지 표시
    console.error(error.response.data.message);
  } else {
    // 기타 에러 처리
    console.error('알 수 없는 오류가 발생했습니다.');
  }
}
```

---

## 6. 카카오 SDK API

### 카카오 로그인
```typescript
window.Kakao.Auth.login({
  success: (authObj) => {
    // 로그인 성공
  },
  fail: (err) => {
    // 로그인 실패
  }
});
```

### 카카오 사용자 정보 가져오기
```typescript
window.Kakao.API.request({
  url: '/v2/user/me',
  success: (userInfo) => {
    // 사용자 정보 획득
  },
  fail: (err) => {
    // 실패
  }
});
```

### 카카오 로그아웃
```typescript
window.Kakao.Auth.logout();
```

---

## 7. API 사용 가이드

### 1. 인증이 필요한 API 호출
```typescript
// 토큰이 자동으로 헤더에 추가됩니다
const response = await axiosInstance.get('/api/protected-endpoint');
```

### 2. 인증이 필요 없는 API 호출
```typescript
// 토큰이 없어도 호출 가능
const response = await axiosInstance.get('/api/public-endpoint');
```

### 3. 커스텀 헤더 추가
```typescript
const response = await axiosInstance.get('/api/endpoint', {
  headers: {
    'Custom-Header': 'value'
  }
});
```

---

## 8. 개발 환경 설정

### 환경 변수 (향후 추가 가능)
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_KAKAO_JS_KEY=your_kakao_js_key
```

### 프로덕션 환경
- Base URL을 환경 변수로 관리
- API 엔드포인트를 설정 파일로 분리

---

## 9. API 버전 관리

### 현재 버전
- **API 버전**: v1 (명시적 버전 없음)
- **호환성**: 하위 호환성 유지

### 향후 계획
- API 버전을 URL에 포함: `/api/v1/auth/login`
- 버전별 호환성 관리

---

## 10. 테스트

### API 테스트 도구
- Postman
- Insomnia
- curl

### 테스트 예시 (curl)
```bash
# 로그인
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"user_id":"test","user_pw":"password","rememberMe":true}'

# 토큰 갱신
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Authorization: Bearer {token}"

# 로그아웃
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer {token}"
```

