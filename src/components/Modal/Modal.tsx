import { FC } from "react";
import s from './Modal.module.scss'

interface IProps {
    no: () => void;
    yes: () => void;
}

const Modal:FC<IProps> = ({no, yes}) => {
  return (
    <>
        <div className={s.modal}>
            <div className={s.modal__box}>
                <h2 className={s.modal__box_title}>Вы хотите выйти с аккаунта?</h2>
                <div className={s.modal__box_btns}>
                    <button onClick={yes} className={s.modal__box_btn}>Да</button>
                    <button onClick={no} className={s.modal__box_btn}>Нет</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal