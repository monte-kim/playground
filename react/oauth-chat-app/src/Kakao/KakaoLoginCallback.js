import axios from 'axios';
import { useEffect, useState } from 'react';

const KakaoLoginCallback = () => {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    async function getAccessToken() {
      const params = new URL(window.location.href).searchParams;
      const code = params.get('code');

      const response = await axios.post('http://localhost:8080/auth/kakao', { code });

      setAccessToken(response.data.accessToken);
    }
    getAccessToken();
  }, []);

  const handleLogout = () => {
    // 카카오 로그아웃 엔드포인트
    const logoutURL = 'https://kapi.kakao.com/v1/user/logout';

    // 로그아웃 요청 보내기
    axios
      .post(logoutURL, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 카카오 로그인 후 받은 액세스 토큰을 사용해야 합니다
        },
      })
      .then((res) => {
        // 로그아웃 성공
        console.log('로그아웃 되었습니다.');

        // 로그아웃 후 리다이렉트할 페이지
        const homeURL = 'http://localhost:3000/';
        window.location.href = homeURL; // 리다이렉트
      })
      .catch((err) => {
        // 로그아웃 오류
        console.error('로그아웃 중 오류가 발생했습니다.');
      });
  };

  return (
    <>
      <h1>카카오 로그인 콜백</h1>
      <button onClick={handleLogout}>LOGOUT</button>
      <br />
      <a href='/'>홈으로</a>
    </>
  );
};

export default KakaoLoginCallback;
