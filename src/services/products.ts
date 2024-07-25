import api from "./api";
import { useQuery } from "@tanstack/react-query";


interface IParams {
    sort: string;
    search: string;
    limit: number;
    offset: number;
}

export const getProducts = ({ sort, search, limit, offset }: IParams) => {
    return useQuery(['products', sort, search, offset], () => api.get(`products?ordering=${sort}&search=${search}&limit=${limit}&offset=${offset}`), {
        select: (response) => response.data
    })
}

export const getProductById = (id: number) => {
    return  useQuery(['product', id], () => api.get(`products/${id}`), {
        select: (response) => response.data
    })
}