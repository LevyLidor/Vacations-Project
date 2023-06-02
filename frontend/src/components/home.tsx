import { Outlet } from 'react-router-dom'
import Header from './header/header'

const Home = () => {

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default Home