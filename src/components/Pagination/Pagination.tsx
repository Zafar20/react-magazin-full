import ReactPaginate from "react-paginate"
import s from './Pagination.module.scss'


interface IProps {
  limit: number;
  currentPage: number;
  totalCount:  number;
  changePage: (num: number) => void; 
}

const Pagination = ({ limit, currentPage, totalCount, changePage}: IProps) => {
  
  const  pageCount = Math.ceil(totalCount / limit)
  
  
  return (
    <ReactPaginate
        className={s.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => changePage(event.selected + 1)}
        forcePage={currentPage - 1}
        pageCount={pageCount}
        previousLabel="<"
        marginPagesDisplayed={2}
    />
  )
}

export default Pagination