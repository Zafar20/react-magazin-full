import s from './Sort.module.scss'
import Select, { SingleValue } from 'react-select'
import { filterStore } from "../../store/filterStore"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

interface IOption  {
  value: string;
  label: string;
}

const options: IOption[] = [
  { value: '', label: 'Все товары' },
  { value: 'title', label: 'По названию' },
  { value: 'price', label: 'По цене' },
  { value: 'rating', label: 'По рейтингу' }
]

const Sort = () => {
  
  const { setSortValue, setCurrentPage } = filterStore((state) => state)
  const [selectedValue, setSelectedValue] = useState<SingleValue<IOption>>(null)
  const location = useLocation()
  
  
  const changeOption = (option: any) => {
    setSelectedValue(option)
    setSortValue(option.value)
    setCurrentPage(1)
  }
  
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '1px solid rgb(239, 239, 239)',
      borderRadius: '10px',
      background: 'rgb(252, 252, 253)',
      width: '190px',
      height: '40px',
      color: 'rgb(154, 160, 180)',
      fontSize: '14px',
    })
  }
  
  useEffect(() => {
    
    const params = new URLSearchParams(location.search)
    const value = params.get('sort') || ''
    const obj = options.find(option => option.value == value) || null
    setSelectedValue(obj)
   
    
  }, [location.search])
  
  
  
  
  return (
   <>
    <div className={s.sort}>
      <h2 className={s.sort__title}>Меню</h2>
      <Select
        value={selectedValue}
        options={options}
        onChange={changeOption}
        placeholder="Сортировать по:"
        styles={customStyles}
      />
    </div>
   </>
  )
}

export default Sort