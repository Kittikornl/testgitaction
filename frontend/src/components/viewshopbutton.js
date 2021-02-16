import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React from 'react'
import icon from '../img/cart.png'

const viewshopbutton = (props) => {
    return (
        <div className="view-shop-btn">
            {(props.enable) && 
                <Button className="button" style={{width:"auto"}}>     
                    <FontAwesomeIcon icon={faShoppingCart} style={{marginRight:"10px", fontSize:"35px"}} />
                    {"View shop >"}
                </Button>
            }
            {(!props.enable) && 
                <Button className="button" style={{width: "auto", backgroundColor: "#979797" }} disabled>
                    <FontAwesomeIcon icon={faShoppingCart} style={{marginRight:"10px", fontSize:"35px"}} />
                    {"View shop >"}
                </Button>
            }
        </div>
        
    );

}

export default viewshopbutton