import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { useAuth } from '../../context/auth';

export const AccountActivate = () => {
  // context
  const [auth, setAuth] = useAuth();

  // hooks
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const requestActivation = async () => {
      try {
        const { data } = await axios.post('/register', { token });
        if (data?.error) {
          toast.error(data.error);
        } else {
          // save in local storage
          // 이렇게 하면 새로고침하더라도 로그인 상태가 유지된다.
          localStorage.setItem('auth', JSON.stringify(data));

          // save in context
          setAuth(data);
          toast.success('Successfully logged in. Welcome to Realist app.');
          navigate('/');
        }
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong. Try again.');
      }
    };
    if (token) requestActivation();
  }, [token, setAuth, navigate]);

  // const requestActivation = async () => {
  //   try {
  //     const { data } = await axios.post('/register', { token });
  //     if (data?.error) {
  //       toast.error(data.error);
  //     } else {
  //       setAuth(data);
  //       toast.success('Successfully logged in. Welcome to Realist app.');
  //       navigate('/');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error('Something went wrong. Try again.');
  //   }
  // };

  return (
    <div
      className='display-1 d-flex justify-content-center align-items-center vh-100'
      style={{ marginTop: '-10%' }}
    >
      Please wait...
    </div>
  );
};
