import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../../store/features/user';

const ProfilePage = () => {
  const user = useUser();
  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Typography>Welcome back {user?.name}</Typography>
    </>
  );
};
export default ProfilePage;
