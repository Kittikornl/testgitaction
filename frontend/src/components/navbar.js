import React, { useState } from 'react' 
import './navbar.scss'
import { Menu, Button, Modal } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import './logout.scss'
import { logout } from '../service/auth.service'
// import Logout from './logout'

const Navbar = () => {
    const [logoutVisible, setLogoutVisible] = useState(false)
    const [displayMenuMobile, setDisplayMenuMobile] = useState("none")
    const history = useHistory()

    const showLogoutModal = () => {
        setLogoutVisible(true)
    }
    const comfirmLogout = () => {
        console.log('logout')
        setLogoutVisible(false)
        logout()
        history.push('/login')
    }

    const cancelLogout = () => {
        setLogoutVisible(false)
    }

    const handleOpenMenuMobile = () => {
        displayMenuMobile === 'none' ? setDisplayMenuMobile("") : setDisplayMenuMobile("none")
    }

     return (
         <div className="navbar-container">
             <div className="moblie height">
                 <Button onClick={handleOpenMenuMobile}>
                    <MenuOutlined />  
                 </Button>            
                <Link to="/home" className="moblie-logo">pugsod</Link>
                <Link to='/cart' className="cart-moblie">
                    <ShoppingCartOutlined />
                </Link>
             </div>
             <div style={{display: `${displayMenuMobile}`}} className="menu-mobile">
                <Menu mode="inline">
                    <Menu.Item key="1" >
                        <Link to="/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" >
                        <Link to="/history">History</Link>
                    </Menu.Item>
                    <Menu.Item key="3" >
                        <Link to="/aboutus">About us</Link>
                    </Menu.Item>
                    <Menu.Item key="4" className="desktop-logo">
                        <Link to="/home" >pugsod</Link>
                    </Menu.Item>
                    <Menu.Item key="5" >
                        <Link to="/cart">Cart</Link>
                    </Menu.Item>
                    <Menu.Item key="6" >
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="7" className="logout-tab">
                        <div onClick={showLogoutModal}>Logout</div>
                    </Menu.Item>
                 </Menu>
             </div>
             <div className="desktop height">
                <Menu mode="horizontal">
                        <Menu.Item key="1" >
                        <Link to="/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" >
                        <Link to="/historty">History</Link>
                    </Menu.Item>
                    <Menu.Item key="3" >
                        <Link to="/aboutus">About us</Link>
                    </Menu.Item>
                    <Menu.Item key="4" className="desktop-logo">
                        <Link to="/home" >pugsod</Link>
                    </Menu.Item>
                    <Menu.Item key="5" >
                        <Link to="/cart">Cart</Link>
                    </Menu.Item>
                    <Menu.Item key="6" >
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="7" className='logout-tab'>
                        <div onClick={showLogoutModal}>Logout</div>
                    </Menu.Item>
                 </Menu>
             </div>
             <Modal centered visible={logoutVisible} onOk={comfirmLogout} onCancel={cancelLogout} footer={false} className="logout-modal">
                <div className="m-b-16">
                    Do you want to logout ?
                </div>
                <div className="flex-row flex-center m-t-30">
                    <Button onClick={comfirmLogout} className="submit-btn m-r-10">
                    Logout
                    </Button>
                    <Button onClick={cancelLogout} className="cancel-btn">
                    Cancel
                    </Button>
                </div>
                
            </Modal>
             
         </div>
     )
}

export default Navbar