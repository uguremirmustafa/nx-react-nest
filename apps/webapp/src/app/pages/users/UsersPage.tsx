import { useGetUsersQuery } from '../../store/features/auth';

const UsersPage = () => {
  const { data } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
export default UsersPage;
