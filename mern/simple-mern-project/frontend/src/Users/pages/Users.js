import UsersList from '../components/UserList/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      image: 'https://www.jungle.co.kr/image/c09b682044b485b28ca0141d',
      name: 'Monte',
      places: '3',
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
