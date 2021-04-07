import React, { useState, useEffect } from "react";
import "./profile.scss";
import Scores from "../components/scores";
import profileThumb from '../img/profile_thumb.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faShoppingCart, faUserEdit, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { getUserData } from '../service/user.service';
import { getUserInfo } from '../service/auth.service';
import { Image, Button } from "antd";
import { useHistory } from "react-router";

const renderRole = (role) => {
    return role === 1 ? "Customer" : "Product Seller"
}

const getAge = (date) => {
    const now = new Date()
    const [day, month, year] = date.split("/")
    let birth
    if (day && month && year) {
        birth = new Date(`${month}/${day}/${year}`)
    }
    else {
        const [day, month, year] = date.split("-")
        birth = new Date(`${month}/${day}/${year}`)
    }
    return parseInt((now - birth) / (1000 * 60 * 60 * 24) / 365, 10)
}

const Profile = () => {

    const history = useHistory()

    const [data, setData] = useState({});
    const [shop, setShop] = useState({});

    const [role] = useState(getUserInfo().role);
    const [userId] = useState(getUserInfo().userId);

    useEffect(() => {
        fetchData(userId)
    }, []);

    const fetchData = async (user_id) => {
        const result = await getUserData(user_id)
        let userdata = result.data.Userdata
        userdata["email"] = result.data.email
        const shopdata = result.data.shop_information
        console.log(userdata)
        userdata['age'] = getAge(userdata.birthdate)
        setData(userdata)
        setShop(shopdata)
    }

    const handleUserButton = () => {
        if (role === 2 && shop.ID !== 0)
            history.push(`shop/${shop.ID}`)
        else if (role === 2)
            history.push('create/shop')
        else
            history.push('history')
    }

    const renderButtonContentText = () => {
        if (shop.rating!== undefined)
        return (
            <div className="button-content flex-row">
                <div className="score-text">{shop.rating.toFixed(1)}</div>
                <Scores score={shop.rating} />
                <div className="vote-count-text">
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
            <div className="score-text">{shop.review_count}</div>
            </div>
        );
    };
    const renderUserButton = () => {
        return (
            <div className="button-container flex-row">
                <Button onClick={() => handleUserButton()} >
                    {(role === 1) ? <FontAwesomeIcon icon={faHistory} /> : <FontAwesomeIcon icon={faShoppingCart} />}
                    &nbsp;
                    {(role === 1) ? "Shopping history" : 
                       (shop.ID === 0) ? "Create Shop" : "View shop >"}
                </Button>
                {(role === 2 && shop.ID === 0) ? 
                    <div className="button-content green flex-center">Create your popular shop!</div> : 
                    (shop.ID !== 0 && renderButtonContentText())}
            </div>
        )
    }

    if (data !== undefined)
        return (
            <div className="profile-page-container">
                <div>.</div>
                <div className="profile-container flex-row">
                    <Image className="profile-img"
                        src={data.url_profile_pic}
                        fallback={profileThumb}
                        preview={false}
                    />
                    <div className="profile-title flex-col">
                        <div className="full-name">
                            <div className="name">{`${data.firstname} ${data.lastname}`}</div>
                            <a className="edit-info" href="/profile/edit"><FontAwesomeIcon icon={faUserEdit} />&nbsp;<div>Edit Profile</div></a>
                        </div>
                        <div className="role">{renderRole(role)}</div>
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
                            {renderUserButton()}
                        </div>
                        <div className="info-address flex-col">
                            <div className="address-title">Address</div>
                            <div className="address-data">{
                                `${data.houseNo} ${data.street} ${data.subDistrict} ${data.district} ${data.city} ${data.zipcode}`.trim() === "" ? "No address data" 
                                : `${data.houseNo} ${data.street} ${data.subDistrict} ${data.district} ${data.city} ${data.zipcode}`.replace("-","")
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Profile;
