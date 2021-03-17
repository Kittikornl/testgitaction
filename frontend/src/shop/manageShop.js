import { faEdit, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getUserInfo } from '../service/auth.service';
import { getShopData } from '../service/shop.service'
import { getUserData } from '../service/user.service'
import { deleteProduct } from '../service/product.service'

import './manageShop.scss'
import Modal from 'antd/lib/modal/Modal'
import Notification from '../components/notification'
import { Link } from 'react-router-dom'

const ProductCard = ({ data, refreshPage }) => {

    const history = useHistory()

    const [showModal, setShowModal] = useState(false);
    const [productID] = useState(data.ID);

    const handleEditProduct = (product_id) => {
        history.push("product", {
            product_id: product_id,
            mode: 1
        })
    }

    const handleDeleteProduct = async (product_id) => {
        console.log(product_id)
        deleteProduct(product_id)
        window.location.reload()
        setShowModal(false)
    }

    return (
        <div className="product-card">
            <Link to={`/product/${productID}`}><img src={data.PictureURL} /></Link>
            <h2>{`${data.ProductTitle}`}</h2>
            <div className="product-content">
                <div>{`ID : ${productID}`}</div>
                <div>{`${data.Amount} Items avaliable`}</div>
                <div>{`${data.Price} Bath`}</div>
            </div>
            <div className="button-wrapper flex-row">
                <Button onClick={() => handleEditProduct(productID)} >Edit Product</Button>
                <Button className="red-button" onClick={() => setShowModal(true)}>Delete</Button>
                <Modal
                    visible={showModal}
                    centered
                    footer={false}
                    onCancel={() => setShowModal(false)}
                >
                    <div className="delete-account-modal flex-col">
                        <div className="header flex-row">
                            <FontAwesomeIcon
                                className="alert-icon"
                                icon={faExclamationCircle}
                            />
                            <p>{`Are you sure to delete ID: ${productID} ${data.ProductTitle} ?`}</p>
                        </div>
                        <div className="button-group flex-row">
                            <Button
                                htmlType="submit"
                                className="button-yes"
                                onClick={() => handleDeleteProduct(productID)}
                            >
                                Yes
                                </Button>
                            <Button
                                htmlType="cancle"
                                className="button-no"
                                onClick={() => setShowModal(false)}
                            >
                                No
                                </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

const ManageShop = () => {
    const history = useHistory()

    const [vegData, setVegData] = useState([]);
    const [fruitData, setFruitData] = useState([]);

    const [userID] = useState(getUserInfo().userId);
    const [shop, setShop] = useState({});

    const [refresh, setRefresh] = useState(true);

    useEffect(async () => {
        fetchdata(userID)
    }, [refresh]);

    const fetchdata = async (user_id) => {
        let result = await getUserData(user_id)

        let result1 = await getShopData(result.data.shop_information.ID)
        setShop(result1.data.shop_information)

        setVegData(result1.data.all_product_type1)
        setFruitData(result1.data.all_product_type2)
    }

    const refreshPage = () => {
        setRefresh(!refresh)
    }

    const handleAddProduct = () => {
        history.push("product", {
            mode: 0
        })
    }

    const renderProduct = (e, idx) => {
        return (
            <div key={idx} className="product-item-wrapper">
                <ProductCard data={e} refreshPage={refreshPage} />
            </div>
        )
    }

    if (getUserInfo().role !== 2) {
        Notification({ type: 'error', message: 'Permission Denied.', desc: 'customer cannot reach manage shop page!' })
        history.push("/profile")
        return <div></div>
    }
    else if (shop.ID === 0) {
        Notification({ type: 'error', message: 'Shop not found!.', desc: 'create your shop first!' })
        history.push("/profile")
        return <div></div>
    }
    else return (
        <div className="manage-shop-page-container">
            <div className="cover-box flex-center">
                Manage Shop
            </div>
            <div className="manage-shop-container">
                <h1>
                    <a href={`/shop/${shop.ID}`} className="shop-name">
                        {shop.shopname}&nbsp;&nbsp;
                    </a>
                    <a href="/edit/shop">
                        <FontAwesomeIcon icon={faEdit} />
                    </a>
                </h1>
                <div className="add-product-button">
                    <Button onClick={() => handleAddProduct()}>Add Product</Button>
                </div>
                <div className="veg-container">
                    <h2>Vegetables</h2>
                    <div className="product-wrapper grid">
                        {console.log(vegData)}
                        {(vegData.length !== 0) ? vegData.map(renderProduct) : <div className="no-product">No any vegetable product</div>}
                    </div>
                </div>
                <div className="fruit-container">
                    <h2>Fruits</h2>
                    <div className="product-wrapper grid">
                        {(fruitData.length !== 0) ? fruitData.map(renderProduct) : <div className="no-product">No any fruit product</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageShop