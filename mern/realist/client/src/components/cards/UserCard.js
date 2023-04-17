import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import './AdCard.css';
import AdFeatures from './AdFeatures';
import Logo from '../../logo.svg';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const UserCard = ({ user }) => {
  const formatNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className='col-lg-4 p-4 gx-4 gy-4'>
      <Link to={`/user/${user.username}`}>
        <Badge.Ribbon text={`x listings`}>
          <div className='card hoverable shadow'>
            <img
              src={user?.photo?.Location ?? Logo}
              alt={user.username}
              style={{ height: '250px', objectFit: 'cover' }}
            />

            <div className='card-body'>
              <h3>{user?.name ?? user?.username}</h3>
              <p className='card-text'>
                Joined {dayjs(user.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
};

export default UserCard;
