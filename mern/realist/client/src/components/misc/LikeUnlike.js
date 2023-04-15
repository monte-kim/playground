import { useAuth } from '../../context/auth';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

const LikeUnlike = ({ ad }) => {
  const [auth, setAuth] = useAuth();

  const handleLike = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {auth.user?.wishlist?.includes(ad?._id) ? (
        <span>
          <FcLike onClick={handleUnlike} className='h2 mt-2' />
        </span>
      ) : (
        <span>
          <FcLikePlaceholder onClick={handleLike} className='h2 mt-2 pointer' />
        </span>
      )}
    </>
  );
};

export default LikeUnlike;
