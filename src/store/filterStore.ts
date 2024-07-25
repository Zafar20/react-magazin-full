import { create } from "zustand";
import { devtools } from 'zustand/middleware'


interface IFilterStore {
    sortValue: string;
    searchValue: string
    setSearchValue: (val: string) => void; 
    setSortValue: (val: string) => void; 
    currentPage: number,
    limit: number,
    offset: number,
    setCurrentPage: (val: number) => void, 
    setOffset: (val: number) => void, 
}

export const filterStore = create<IFilterStore>()(devtools(
    (set,get) => ({
        sortValue: '',
        searchValue: '',
        currentPage: 1,
        limit: 9,
        offset: 0,
        setCurrentPage: (val) => set({ currentPage: val }), 
        setOffset: (val) => set({ offset: val }), 
        setSearchValue: (val) => set({ searchValue: val}), 
        setSortValue: (val) => set({ sortValue: val }),
    })
))