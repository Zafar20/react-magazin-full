import s from './Search.module.scss'
import { closeSearch } from "../../utils"
import { FormEvent, useEffect, useState } from "react"
import { filterStore } from "../../store/filterStore"
import { useLocation } from "react-router-dom"

const Search = () => {
  
  const [text, setText] = useState('')
  const { setSearchValue, setCurrentPage } = filterStore((state) => state)
  const location = useLocation()
  
  
  
  const submit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchValue(text)
    setCurrentPage(1)
  }
  
  const reset = () => {
    setSearchValue('')
    setText('')
  }
  
  useEffect(() => {
    
    const params = new URLSearchParams(location.search)
    
    const searchValue = params.get('search') || ''
    setText(searchValue)
  }, [location.search])
  
  
  
  return (
    <form onSubmit={submit}  className={s.search}>
      <div className={s.search__box}>
        <input 
          type="text"
          className={s.search__box_input}
          placeholder="Введите блюдо или состав"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        {text && <img onClick={reset} src={closeSearch} alt="" className={s.search__box_icon} />}
      </div>
      <button className={s.search__box_btn}>Найти</button>
    </form>
  )
}

export default Search