import api from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ILogin, IRegister } from "../types";
import Cookies from 'js-cookie'

export const getUserData = () => {
    const access_token = Cookies.get('access_token')
    return useQuery(['userdata'], () => api.get('auth/users/profile'), {
        enabled: !!access_token,
        select: (response) =>  response.data
    })
}


export const useRegisterMutation = () => {
    return useMutation((data:IRegister) => api.post('auth/register', data))
}

export const useLoginMutation = () => {
    return useMutation((data:ILogin) => api.post('auth/login', data), {
        onSuccess: ({data}) => {
           if(data && data.access) {
                Cookies.set('access_token', data.access, { expires: 7 })
                Cookies.set('refresh_token', data.refresh, { expires: 7 })
           }
        }
    })
}
