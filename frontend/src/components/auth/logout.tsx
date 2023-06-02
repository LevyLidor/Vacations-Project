import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/slice/userSlice'


const Logout = () => {

    const dispatch = useDispatch()
    const nav = useNavigate()

    useEffect(() => {
        dispatch(logout())
        nav('/login')
    }, [])
    return (
        <></>
    )
}

export default Logout