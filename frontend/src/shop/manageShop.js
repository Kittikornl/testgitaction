import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getUserInfo } from '../service/auth.service';
import { getShopData } from '../service/shop.service'
import { getUserData } from '../service/user.service'

import './manageShop.scss'

const ManageShop = () => {
    const history = useHistory()

    const [vegData, setVegData] = useState([]);
    const [fruitData, setFruitData] = useState([]);

    const [userID] = useState(getUserInfo().userId);

    useEffect(() => {
        fetchdata()
      }, []);

    const fetchdata = async () => {
        let result = await getUserData(userID)
        const shop_id = result.data.shop_information.ID
        
        let result1 = await getShopData(shop_id)
        const shopData = result1.data

        setVegData(shopData.all_product_type1)
        setFruitData(shopData.all_product_type2)
    }

    const handleEditProduct = (product_id) => {
        history.push("product", {
            product_id : product_id,
            mode: 1
        })
    }

    const handleAddProduct = () => {
        history.push("product", {
            mode: 0
        })
    }

    const renderProduct = (e, idx) => {
        console.log(e)
        return (
            <div id={idx} className="product-item-wrapper">
                <img src={e.PictureURL} />
                <h2>{e.ProductTitle}</h2>
                <div className="product-content">
                    <div>{`${e.Amount} Items avaliable`}</div>
                    <div>{`${e.Price} Bath`}</div>
                </div>
                <div className="button-wrapper flex-row">
                    <Button onClick={() => handleEditProduct(2)} >Edit Product</Button>
                    <Button className="red-button">Delete</Button>
                </div>
            </div>
        )
    }


    if (getUserInfo().role !== 2)
        history.goBack()
    else return (
        <div className="manage-shop-page-container">
            <div className="cover-box flex-center">
                Manage Shop
            </div>
            <div className="manage-shop-container">
                <h1>
                    ไร่เกษตรรวมใจ&nbsp;&nbsp;
                    <a href="/edit/shop">
                        <FontAwesomeIcon icon={faEdit} />
                    </a> 
                </h1>
                <div>
                    <Button onClick={()=>handleAddProduct(2)}>Add Product</Button>
                </div>
                <div className="veg-container">
                    <h2>Vegetables</h2>
                    <div className="product-wrapper grid">
                        {(vegData.length !== 0) ? vegData.map(renderProduct) : "No any vegetable product"}
                    </div>
                </div>
                <div className="fruit-container">
                    <h2>Fruits</h2>
                    <div className="product-wrapper grid">
                        {(fruitData.length !== 0) ? fruitData.map(renderProduct) : "No any fruit product"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageShop