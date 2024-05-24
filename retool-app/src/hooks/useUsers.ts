// src/hooks/useUsers.ts
import { useQuery } from 'react-query';
import { fetchUsers } from '../features/users/usersAPI';

const PAGE_PER_ITEMS = 5;

export const useUsers = (currentPage: number) => {
  return useQuery(['users', currentPage], () => fetchUsers(currentPage, PAGE_PER_ITEMS), {
    keepPreviousData: true,
  });
};
