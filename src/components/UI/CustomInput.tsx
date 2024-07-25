import { FC } from "react"


interface ICustomInput {
  text: string;
  holder: string;
  type: string;
  errors: any;
  register: any;
}

const CustomInput:FC<ICustomInput> = ({ text, holder, type, register, errors }) => {
  return (
    <>
        <div className="form__content_item">
            <label>
                <span className="form__content_item_span">{text}</span>
                <input 
                    type={type} 
                    className="form__content_item_input" 
                    placeholder={holder}
                    {...register}
                />
            </label>
            <h3 className="form__content_item_error">
              {errors?.message}
            </h3>
        </div>
    </>
  )
}

export default CustomInput