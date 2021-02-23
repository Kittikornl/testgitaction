import React, {useState, useEffect} from 'react'
import Viewshopbutton from '../components/viewshopbutton';
import Viewhistory from '../components/viewhistory';
import "./profile.scss"
import Scores from '../components/scores';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserEdit, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { getUserData } from '../service/user.service';

const renderRole = (role) => {
    return role === 1 ? "Customer" : "Product Seller"
}

const renderButtonContentText = (shop) => {
    return (
        <div className="button-content flex-row">
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
    console.log(role)
    if(role===2 && Object.keys(shop).length !== 0) {
        return (
            <div className="button-container flex-row">
                <Viewshopbutton enable={true}/>
                {renderButtonContentText(shop)}
            </div>      
        )
    } 
    else if (role===2) {
        return (
            <div className="button-container flex-row">
                <Viewshopbutton enable={false}/>
            </div>      
        )
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
    const [role, setRole] = useState(2);

    useEffect(() => {
        fetchData(9)
    }, []);

    const fetchData = async (user_id) => {
        const result = await getUserData(user_id)
        const userdata = result.data.Userdata 
        console.log(userdata)
        setData(userdata)
    }

    return (
        <div className="profile-page-container">
            <div>.</div>
            <div className="profile-container flex-row">
                <img className="profile-img"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    alt="profile-img"
                />
                <div className="profile-title flex-col">
                    <div className="full-name">
                        <div className="name">{`${data.firstname} ${data.lastname}`}</div>
                        <a className="edit-info" href="/editprofile"><FontAwesomeIcon icon={faUserEdit} />&nbsp;<div>Edit Profile</div></a>
                    </div>
                    <div className="role">{renderRole(data.role)}</div>
                    <div className="info-container flex-col">
                        <div className="info-data flex-row">
                            <div className="info-title">
                                <div className="birth">Birth Date :</div>
                                <div className="age">Age :</div>
                                <div className="email">Email :</div>
                                <div className="phone">Phone :</div>
                            </div>
                            <div className="info-data">
                                <div className="birth">{data.birthdate || "XX/XX/XXXX"}</div>
                                <div className="age">{data.age || "0"}</div>
                                <div className="email">{data.email || "xxxx@xxx.com"}</div>
                                <div className="phone">{data.phoneNo || "55"}</div>
                            </div>
                        </div>
                        {renderButtonContent(role, initData.shop)}
                    </div>
                    <div className="info-address flex-col">
                        <div className="address-title">Address</div>
                        <div className="address-data">{
                            `${data.houseNo} ${data.street} ${data.subDistrict} ${data.district} ${data.zipcode} ${data.city}`.trim() === "" ? "No address data" : ""
                            }
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default Profile