import  { FC } from 'react'
import s from './CustomBtn.module.scss'

interface ICustomBtn {
  text: string;
  width: number;
  ml?: string;
  disabled?: boolean
  icon?: string;
  mt?: string;
  openModal?: () => void;
}

const CustomBtn:FC<ICustomBtn> = ({ text, openModal, mt, icon, ml, width, disabled}) => {
  return (
    <button
      onClick={openModal}
      disabled={disabled}
      className={s.btn}
      style={{maxWidth: width, marginTop: mt, marginLeft: ml, marginRight: ml}}
    >
      {icon && <img src={icon} alt="" /> }
      <span>{text}</span>
    </button>
  )
}

export default CustomBtn