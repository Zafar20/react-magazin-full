import { FC, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CustomBtn from "../components/UI/CustomBtn/CustomBtn"
import CustomInput from "../components/UI/CustomInput"
import FormLayout from "../layouts/FormLayout"
import { SubmitHandler, useForm } from "react-hook-form"
import { ILogin } from "../types"
import { useLoginMutation } from "../services/auth"
import { errorMessage } from "../utils/errorMessage"

const Login:FC = () => {
  
  const loginMutation = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  
  const { 
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isValid
    }
  } = useForm<ILogin>({
    mode: 'onBlur'
  })
  
  const submit:SubmitHandler<ILogin> = async(data) => {
    try {
      await loginMutation.mutateAsync(data)
      navigate('/')
    } catch (error) {
      setError(errorMessage(error,'login'))
      console.log(error);
    }
  }
  
  
  return (
    <>
      <FormLayout>
        <div className="form">
          <h2 className="form__title">Вход</h2>
          <form onSubmit={handleSubmit(submit)}  className="form__content">
              <CustomInput 
                text="Ваш логин" 
                holder="Логин" 
                type="text"
                errors={errors.username}
                register={register('username', {
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 3,
                    message: 'Минимум 3 символа'
                  }
                })}
              />
              <CustomInput
               text="Ваш пароль" 
               holder="Пароль" 
               type="password"
               errors={errors.password}
               register={register('password', {
                 required: "Поле обязательно к заполнению",
                 minLength: {
                   value: 8,
                   message: 'Минимум 8 символа'
                 }
               })}
              />
              <CustomBtn disabled={!isValid} text="Вход" ml="auto" width={248}/>
          </form>
          <div className="form__info">
            {error && <p className="form__info_error" >{error}</p> }
            <p className="form__info_text">Нет акканута?</p>
            <Link className="form__info_link" to="/register">Зарегистрироваться</Link>
          </div>
        </div>
      </FormLayout>
    </>
  )
}

export default Login