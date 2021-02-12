import { Button } from 'antd'
import React from 'react'
import icon from '../img/cart.png'

const viewshopbutton = (props) => {
    return (
        <div className="view-shop-btn">
            {(props.enable) && 
                <Button className="button" style={{width:"auto"}}>     
                    <img 
                        width="40px"
                        height="40px"
                        src={icon}
                        style={{marginRight:"15px", }}
                    />
                    {"View shop >"}
                </Button>
            }
            {(!props.enable) && 
                <Button className="button" style={{width: "auto", backgroundColor: "#979797" }} disabled>
                    <img
                        width="40px"
                        height="40px"
                        src={icon}
                        style={{ marginRight: "15px", }}
                    />
                    {"View shop >"}
                </Button>
            }
        </div>
        
    );

}

export default viewshopbutton