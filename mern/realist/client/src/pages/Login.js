import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/auth.js';

const Login = () => {
  const [auth, setAuth] = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log({ email, password });
      setLoading(true);
      const { data } = await axios.post(`/login`, { email, password });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth(data);
        localStorage.setItem('auth', JSON.stringify(data));
        toast.success('Login successful.');
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong. Try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className='display-1 bg-primary text-light p-5'>Login</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 offset-lg-4'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Enter your email'
                className='form-control mb-4 mt-4'
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Enter your password'
                className='form-control mb-4'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                disabled={loading}
                className='btn btn-primary col-12 mb-4'
              >
                {loading ? 'Waiting...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
