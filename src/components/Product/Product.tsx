import s from './Product.module.scss'
import { useParams, Link } from "react-router-dom"
import { getProductById } from "../../services/products"
import CustomBtn from "../UI/CustomBtn/CustomBtn"
import { cartIcon, starIcon } from "../../utils"
import Skeleton from "./Skeleton"

export const Product = () => {
    
  const params = useParams()
  const { data } = getProductById(Number(params.id))
  
  const compound = data && data.description.split(', ') 
  
  
  return (
    <>
      <div className={s.product}>
        {data ? (
            <>
            <div className={s.product__top}>
              <div className={s.product__top_info}>
                <Link to="/" className={s.product__top_link}>Назад</Link>
                <h2 className={s.product__top_title}>{data.title}</h2>
              </div>
              <CustomBtn
                text="В корзину"
                width={150}
                icon={cartIcon}
              />
            </div>
            <div className={s.product__item}>
              <div className={s.product__item_left}>
                <img src={data.image} alt="" className={s.product__item_left_img} />
              </div>
              <div className={s.product__item_right}>
                <div className={s.product__item_right_box}>
                  <h2 className={s.product__item_right_title}>Цена</h2>
                  <span className={s.product__item_right_price}>{data.price}$</span>
                </div>
                <div className={s.product__item_right_box}>
                  <h2 className={s.product__item_right_title}>Рейтинг</h2>
                  <span className={s.product__item_right_rating}>
                    {data.rating}
                    <img src={starIcon} alt="" />
                  </span>
                </div>
                <div className={s.product__item_right_compound}>
                  <h2 className={s.product__item_right_title}>Состав:</h2>
                  <ul className={s.product__item_right_list}>
                    {compound.map((el: string, i: number) => (
                      <li key={i}>
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            </>
        ) : <Skeleton/>}
       
      </div>
    </>
  )
}
