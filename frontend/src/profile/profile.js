import React, {useState, useEffect} from 'react'
import Viewshopbutton from '../components/viewshopbutton';
import Viewhistory from '../components/viewhistory';
import "./profile.scss"
import Scores from '../components/scores';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserFriends} from '@fortawesome/free-solid-svg-icons'

const renderButtonContentText = (shop) => {
    return (
        <div className="button-content">
            <div className="score-text">{shop.score.toFixed(1)}</div>
            <Scores score={shop.score}/>
            <div className="vote-count-text">
                <FontAwesomeIcon icon={faUserFriends} />
            </div>
            <div className="score-text">{shop.vote.length}</div>
        </div>
    )
}

const renderButtonContent = (role, shop) => {
    console.log(typeof(shop))
    if(role==="Product Seller" && Object.keys(shop).length !== 0) {
        return (
            <div className="button-container">
                <Viewshopbutton enable={true}/>
                {renderButtonContentText(shop)}
            </div>      
        )
    } 
    else if (role==="Product Seller") {
        return <Viewshopbutton enable={false}/>
    }
    else 
        return <Viewhistory/>
}

const Profile = () => {

    const initData = {
        "firstname": "Tinnapop",
        "lastname" : "Pratheep",
        "role": "Product Seller",
        "birthdate": "22/02/2000",
        "age": "20",
        "email": "guutar@pugsod.com",
        "phoneNo": "0xx-xxx-xxxx",
        "address": "254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
        "shop": {
            "score": 5.0,
            "vote": []
        },
    }

    const [data, setData] = useState(initData);

    useEffect(() => {
        setData(initData)
    }, []);

    return (
        <div className="profile-page-container">
            <div>sss</div>
            <div className="profile-container flex-row">
                <img className="profile-img"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    alt="profile-img"
                />
                <div className="profile-title">
                    <div className="full-name">{`${data.firstname} ${data.lastname}`}</div>
                    <div className="role">{data.role}</div>
                    <div className="info-container flex-row">
                        <div className="info-title">
                            <div className="birth">Birth Date :</div>
                            <div className="age">Age :</div>
                            <div className="email">Email :</div>
                            <div className="phone">Phone :</div>
                        </div>
                        <div className="info-data">
                            <div className="birth">{data.birthdate}</div>
                            <div className="age">{data.age}</div>
                            <div className="email">{data.email}</div>
                            <div className="phone">{data.phoneNo}</div>
                        </div>
                        {renderButtonContent(data.role, data.shop)}
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default Profile