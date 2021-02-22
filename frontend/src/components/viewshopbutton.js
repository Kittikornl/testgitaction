import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React from 'react'

const viewshopbutton = (props) => {
    return (
        <div className="view-shop-btn">
            {(props.enable) && 
                <Button style={{width:"auto"}}>     
                    <FontAwesomeIcon icon={faShoppingCart} />
                    &nbsp;{"View shop >"}
                </Button>
            }
            {(!props.enable) && 
                <Button style={{width: "auto", backgroundColor: "#979797" }} disabled>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    &nbsp;{"View shop >"}
                </Button>
            }
        </div>
        
    );

}

export default viewshopbutton