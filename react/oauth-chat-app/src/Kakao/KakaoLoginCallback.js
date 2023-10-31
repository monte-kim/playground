import axios from 'axios';
import { useEffect, useState } from 'react';

const KakaoLoginCallback = () => {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    async function getAccessToken() {
      const params = new URL(window.location.href).searchParams;
      const code = params.get('code');

      const response = await axios.post('http://localhost:8080/users/kakao/login', { code });

      console.log(response.data);
      setAccessToken(response.data.accessToken);
    }
    getAccessToken();
  }, []);

  const handleLogout = async () => {
    console.log(accessToken);
    const response = await axios.get('http://localhost:8080/users/kakao/logout', {
      headers: {
        Authorization: accessToken, // 카카오 로그인 후 받은 액세스 토큰을 사용해야 합니다
      },
    });

    console.log(response.data);
  };

  return (
    <>
      <h1>카카오 로그인 콜백</h1>
      <button onClick={handleLogout}>LOGOUT</button>
      <br />
      <button
        onClick={async () => {
          console.log(accessToken);

          await axios.get('http://localhost:8080/users/verify', {
            headers: {
              Authorization: accessToken,
            },
          });
        }}
      >
        PROTECTED?
      </button>
      <br />
      <a href='/'>홈으로</a>
    </>
  );
};

export default KakaoLoginCallback;
