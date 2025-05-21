import {create} from 'zustand';

interface UserStore {
  userId: string;
  isLoggedin: boolean;
  login: (id: string) => void;
}

export const useUserStore = create<UserStore>(set => ({
  userId: '',
  isLoggedin: false,
  login: (id: string) => set({userId: id, isLoggedin: true}),
}));
