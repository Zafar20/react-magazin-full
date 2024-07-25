import s from './Sidebar.module.scss'
import { userPhoto, userIcon, menuIcon, cartIcon, logoutIcon } from "../../utils"
import { Link, useNavigate } from "react-router-dom"
import CustomBtn from "../UI/CustomBtn/CustomBtn"
import Skeleton from "./Skeleton"
import Modal from "../Modal/Modal"
import { useState } from "react"
import { userStore } from "../../store/userStore"


const links = [
    { url: '/', name: 'Меню', icon: menuIcon },
    { url: '/cart', name: 'Корзина', icon: cartIcon },
    { url: '/profile', name: 'Профиль', icon: userIcon },
]

const Sidebar = () => {

    const user = userStore(state => state.user)
    const url = "https://reactapi.pythonanywhere.com"
    const [isModalOpen, setIsModalOpen] = useState(false)
    const logoutUser = userStore((state) => state.logoutUser)
    const navigate = useNavigate()
    
    const openModal = () => {
        setIsModalOpen(true)
    }
    
    const closeModal = () => {
        setIsModalOpen(false)
    }
    
    const logout = () => {
        closeModal()
        logoutUser()
        navigate('/login')
    }
    
    
  return (
   <>
    <div className={s.sidebar}>
        {user ? (
            <>
            <div className={s.sidebar__info}>
            {user.avatar && <img src={`${url}${user.avatar}`} alt="" className={s.sidebar__info_img} />}
            {!user.avatar && <img src={userPhoto} alt="" className={s.sidebar__info_img} />}
            <h2 className={s.sidebar__info_title}>{user.username}</h2>
            <a href={`mailto:${user.email}`} className={s.sidebar__info_email}>{user.email}</a>
        </div>
            <ul className={s.sidebar__list}>
                {links.map((item, i) => (
                    <li key={i}>
                        <Link className={s.sidebar__list_link} to={item.url}>
                            <img src={item.icon} alt="" />
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <CustomBtn
                text="Выйти"
                width={117}
                icon={logoutIcon}
                mt="auto"
                openModal={openModal}
            />
            </>
        ) : <Skeleton/> }
    </div>
    {isModalOpen &&  <Modal no={closeModal} yes={logout} />}
   </>
  )
}

export default Sidebar