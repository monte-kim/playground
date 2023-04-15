import Sidebar from '../../components/nav/Sidebar';

const Profile = () => {
  return (
    <>
      <h1 className='display-1 bg-primary text-light p-5'>Profile</h1>
      <div className='container-fluid'>
        <Sidebar />
        <div className='container mt-2'>profile update form</div>
      </div>
    </>
  );
};

export default Profile;
