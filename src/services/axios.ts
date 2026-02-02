import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 모든 요청에 자동으로 토큰 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 토큰 만료 시 자동 처리
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // 카카오 로그인 API는 401 에러를 무시 (토큰이 없어도 정상)
      if (error.config?.url?.includes('/api/auth/kakao/callback')) {
        console.warn('카카오 로그인 API에서 401 에러 발생, 무시합니다.');
        return Promise.reject(error);
      }
      
      // refreshToken API는 401 에러를 무시 (refresh 토큰이 없어도 정상)
      if (error.config?.url?.includes('/api/auth/refresh')) {
        console.warn('refreshToken API에서 401 에러 발생, 무시합니다.');
        return Promise.reject(error);
      }
      
      // 다른 API에서 401 에러 시에만 로그아웃 처리
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// axios라는 이름으로 export
export default axiosInstance;
