import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd'
import React from 'react'
import icon from '../img/history.png'

const viewhistory = (props) => {
    return (
        <div className="view-shop-btn">
            {console.log(props.test)}
            <Button className="button" style={{marginTop:"10px", width:"auto"}}>     
                <img 
                    width="40px"
                    height="40px"
                    src={icon}
                    style={{marginRight:"15px", }}
                />
                {"Shopping history >"}
            </Button>
        </div>
        
    );

}

export default viewhistory