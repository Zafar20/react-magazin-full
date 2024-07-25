import { FC, ReactNode } from "react"
import logoIcon from '../assets/images/logo.svg'


interface IFormLayout {
    children: ReactNode
}

const FormLayout:FC<IFormLayout> = ({ children }) => {
  return (
    <>
        <div className="formLayout">
            <div className="formLayout__left">
                <img src={logoIcon} alt="" className="formLayout__left_img" />
            </div>
            <div className="formLayout__right">
                {children}
            </div>
        </div>
    </>
  )
}

export default FormLayout