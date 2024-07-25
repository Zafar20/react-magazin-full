import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { IUser } from "../types";
import Cookies from 'js-cookie'

interface IUserStore {
    user: null | IUser;
    setUser: (data: IUser) => void;
    logoutUser: () => void;
}

export const userStore = create<IUserStore>()(devtools(
    (set,get) => ({
        user: null,
        setUser: (data) => set({ user: data }),
        logoutUser: () => {
            set({user: null})
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
        }
    })
))