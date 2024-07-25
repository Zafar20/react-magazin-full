import { FC, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CustomBtn from "../components/UI/CustomBtn/CustomBtn"
import CustomInput from "../components/UI/CustomInput"
import FormLayout from "../layouts/FormLayout"
import { SubmitHandler, useForm } from "react-hook-form"
import { IRegister } from "../types"
import { useRegisterMutation } from "../services/auth"
import { errorMessage } from "../utils/errorMessage"

const Register:FC = () => {
  
  const registerMutation = useRegisterMutation()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  const { 
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      isValid
    }
  } = useForm<IRegister>({
    mode: 'onBlur'
  })
  
  const password = watch('password')
  
  const submit:SubmitHandler<IRegister> = async(data) => {
    try {
      await registerMutation.mutateAsync(data)
      reset()
      console.log('Успешно');
      setError('')
      navigate('/login')
    } catch (error) {
      setError(errorMessage(error))
      console.log(error);
    }
  }

  return (
    <>
       <FormLayout>
        <div className="form">
          <h2 className="form__title">Регистрация</h2>
          <form onSubmit={handleSubmit(submit)} className="form__content">
              <CustomInput 
                text="Ваше имя" 
                holder="Имя" 
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
                text="Ваш почта" 
                holder="Почта" 
                type="email"
                errors={errors.email}
                register={register('email', {
                  required: "Поле обязательно к заполнению",
                })}
              />
              <CustomInput 
                text="Ваш пароль" 
                holder="Ваш пароль" 
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
              <CustomInput
               text="Повторите пароль" 
               holder="Повторите пароль" 
               type="password"
               errors={errors.password2}
                register={register('password2', {
                  required: "Поле обязательно к заполнению",
                  validate: (value) => value === password || 'Пароли не совпадают', 
                  minLength: {
                    value: 8,
                    message: 'Минимум 8 символа'
                  }
                })}
              /> 
              <CustomBtn disabled={!isValid} text="Зарегистрироваться" ml="auto" width={248}/>
          </form>
          <div className="form__info">
            {error && <p className="form__info_error" >{error}</p> }
            <p className="form__info_text">Есть акканут?</p>
            <Link className="form__info_link" to="/login">Войти</Link>
          </div>
        </div>
        </FormLayout>
    </>
  )
}

export default Register


