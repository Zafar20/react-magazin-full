import { IProduct } from "../../types";
import s from './Products.module.scss'
import { starIcon, addCartIcon } from "../../utils";
import { Link } from "react-router-dom";


const ProductsItem = (item:IProduct) => {
   
  
  return (
    <>
      <Link to={`/product/${item.id}`} className={s.products__item}>
          <img src={item.image} alt="" className={s.products__item_img} />
          <h2 className={s.products__item_price}>{item.price}$</h2>
          <button className={s.products__item_add}>
            <img src={addCartIcon} alt="" />
          </button>
          <div className={s.products__item_info}>
            <h2 className={s.products__item_rating}>
              {item.rating}
              <img src={starIcon} alt="" />
            </h2>
            <h2 className={s.products__item_title}>{item.title}</h2>
            <p className={s.products__item_description}>{item.description}</p>
          </div>
      </Link>
    </>
  )
}

export default ProductsItem