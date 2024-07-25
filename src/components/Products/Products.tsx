import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../../services/products"
import { filterStore } from "../../store/filterStore";
import { IProduct } from "../../types";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import Sort from "../Sort/Sort";
import s from './Products.module.scss'
import ProductsItem from "./ProductsItem";
import Skeleton from "./Skeleton";

const Products = () => {
    
  const { 
    sortValue, 
    searchValue, 
    setSortValue, 
    setSearchValue,
    currentPage,
    limit,
    offset,
    setCurrentPage,
    setOffset
  } = filterStore((state) => state)
  
  const navigate = useNavigate()
  const location = useLocation()
  
    const { data } = getProducts({sort: sortValue, search: searchValue, limit: limit,offset: offset})
  
    
    const products = data && data.results.map((item: IProduct) => <ProductsItem key={item.id} {...item}/>)
    const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i}/>)
    const emptyData = data && !data.results.length ? `Товары по вашему запросу ${searchValue} не найдены`  : ''
    
    
    useEffect(() => {
      
      const params = new URLSearchParams(location.search)
      
      setSortValue(params.get('sort') || '')
      setSearchValue(params.get('search') || '')
      setCurrentPage(Number(params.get('page')) || 1) 
      
      
    }, [location.search])
    
    
    useEffect(() => {
      
      setOffset(currentPage * limit - limit)
      
      const params = new URLSearchParams()
      
      sortValue && params.set('sort', sortValue)
      searchValue && params.set('search', searchValue)
      currentPage != 1 && params.set('page', currentPage.toString()) 
      
      navigate(`?${decodeURIComponent(params.toString())}`)
    }, [sortValue, searchValue, currentPage])
    
    const changePage = (num: number) => {
      setCurrentPage(num) 
      setOffset(num * limit - limit) 
    }
    
    
  return (
    <>
      <div className={s.products}>
        <div className={s.products__filter}>
          <Sort/>
          <Search/>
        </div>
        <div className={s.products__list}>
            {data ? products : skeletons}
        </div>
        {data && data.count > 9 &&
         <Pagination
          limit={limit}
          currentPage={currentPage}
          totalCount={data.count}
          changePage={changePage}
         />
         }
        <h2 className={s.products__message}>{emptyData}</h2>
      </div>
    </>
  )
}

export default Products