import Cookies from 'js-cookie'
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const PublicRoute = () => {
  
    let access_token = Cookies.get('access_token')
    const navigate = useNavigate()
    
    useEffect(() => {
        if(access_token) {
            navigate('/')
        }
    }, [access_token])
    
    return <Outlet/>
}

export default PublicRoute