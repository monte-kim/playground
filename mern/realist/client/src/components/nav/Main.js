import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/auth';

const Main = () => {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ user: null, token: '', refreshToken: '' });
    localStorage.removeItem('auth');
    navigate('/login');
  };

  // 로그인 및 회원가입 / 로그아웃 UI 조건무 렌더링
  const loggedIn =
    auth.user !== null && auth.token !== '' && auth.refreshToken !== '';

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate('/ad/create');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className='nav d-flex justify-content-between lead'>
      <NavLink className='nav-link' aria-current='page' to='/'>
        Home
      </NavLink>

      <a className='nav-link pointer' onClick={handlePostAdClick}>
        Post Ad
      </a>

      {/* 로그인 전이라면 로그인 및 회원가입 띄우기 */}
      {loggedIn ? (
        ''
      ) : (
        <>
          <NavLink className='nav-link' to='/login'>
            Login
          </NavLink>
          <NavLink className='nav-link' to='/register'>
            Register
          </NavLink>
        </>
      )}

      {/* 로그인 상태라면 회원정보 드롭바 띄우기 */}
      {loggedIn ? (
        <>
          <div className='dropdown'>
            <li>
              <a
                className='nav-link dropdown-toggle pointer'
                data-bs-toggle='dropdown'
              >
                {auth.user.name ? auth.user.name : auth.user.username}
              </a>
              <ul className='dropdown-menu'>
                <li>
                  <NavLink className='nav-link' to='/dashboard'>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <a onClick={logout} className='nav-link'>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        </>
      ) : (
        ''
      )}
    </nav>
  );
};

export default Main;
