import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../../../context/auth';

const PrivateRoute = () => {
  const [auth, setAuth] = useAuth();

  const [okay, setOkay] = useState(false);

  useEffect(() => {
    if (auth?.token) getCurrentUser();
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get('/current-user', {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOkay(true);
    } catch (err) {
      console.log(err);
      setOkay(false);
    }
  };

  return okay ? <Outlet /> : '';
};

export default PrivateRoute;
