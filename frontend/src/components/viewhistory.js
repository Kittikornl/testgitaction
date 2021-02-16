import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd'
import React from 'react'

const viewhistory = (props) => {
    return (
        <div className="view-shop-btn">
            {console.log(props.test)}
            <Button className="button" style={{marginTop:"10px", width:"auto"}}>     
                <FontAwesomeIcon icon={faHistory} />
                &nbsp;{"Shopping history >"}
            </Button>
        </div>
        
    );

}

export default viewhistory