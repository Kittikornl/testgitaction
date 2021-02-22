import React from 'react' 
import './navbar.scss'
import { Menu, Button } from 'antd'
import { Link } from 'react-router-dom'
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons'
// import AuthService from '../service/auth.service'

const Navbar = () => {

    const logout = () => {
        console.log('logout')
        // AuthService.logout()
    }
    // const changeMode = value => {
    //     setMode(value ? 'vertical' : 'inline');
    // };

     return (
         <div className="navbar-container">
             <div className="moblie height">
                 <Button>
                    <MenuOutlined />  
                 </Button>            
                <Link to="/home" className="moblie-logo">pugsod</Link>
                <Link to='/cart' className="cart-moblie">
                    <ShoppingCartOutlined />
                </Link>
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
                    <Menu.Item key="7" >
                        <Link to="/login" onClick={logout}>Logout</Link>
                    </Menu.Item>
                 </Menu>
             </div>
             
         </div>
     )
}

export default Navbar