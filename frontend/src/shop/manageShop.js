import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { getUserInfo } from '../service/auth.service';
import { getShopData } from '../service/shop.service'

import './manageShop.scss'

const ManageShop = () => {
    const history = useHistory()

    useEffect(() => {
        
      }, []);

    const fetchdata = () => {
        getShopData()
    }

    const handleEditProduct = (product_id) => {
        history.push("product", {
            product_id : product_id,
            mode: 1
        })
    }
    const handleAddProduct = () => {
        console.log(555)
        history.push("product", {
            mode: 0
        })
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
                        <div className="product-item-wrapper">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pugsod-storage.appspot.com/o/images%2Fproduct%2Fb445ae87-0abf-4735-9064-7644b8f81d74?alt=media&token=b1859441-be3c-49a2-9699-e4510024e1aa" />
                            <h2>ข้าวโพดแสนอร่อย</h2>
                            <div className="product-content">
                                <div>20 Items avaliable</div>
                                <div>80 Bath</div>
                            </div>
                            <div className="button-wrapper flex-row">
                                <Button onClick={()=>handleEditProduct(2)}>Edit Product</Button>
                                <Button className="red-button">Delete</Button>
                            </div>
                        </div>
                        <div className="product-item-wrapper">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pugsod-storage.appspot.com/o/images%2Fproduct%2Fb445ae87-0abf-4735-9064-7644b8f81d74?alt=media&token=b1859441-be3c-49a2-9699-e4510024e1aa" />
                            <h2>ข้าวโพดแสนอร่อย</h2>
                            <div className="product-content">
                                <div>20 Items avaliable</div>
                                <div>80 Bath</div>
                            </div>
                            <div className="button-wrapper flex-row">
                                <Button>Edit Product</Button>
                                <Button className="red-button">Delete</Button>
                            </div>
                        </div>
                        <div className="product-item-wrapper">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pugsod-storage.appspot.com/o/images%2Fproduct%2Fb445ae87-0abf-4735-9064-7644b8f81d74?alt=media&token=b1859441-be3c-49a2-9699-e4510024e1aa" />
                            <h2>ข้าวโพดแสนอร่อย</h2>
                            <div className="product-content">
                                <div>20 Items avaliable</div>
                                <div>80 Bath</div>
                            </div>
                            <div className="button-wrapper flex-row">
                                <Button>Edit Product</Button>
                                <Button className="red-button">Delete</Button>
                            </div>
                        </div>
                        <div className="product-item-wrapper">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pugsod-storage.appspot.com/o/images%2Fproduct%2Fb445ae87-0abf-4735-9064-7644b8f81d74?alt=media&token=b1859441-be3c-49a2-9699-e4510024e1aa" />
                            <h2>ข้าวโพดแสนอร่อย</h2>
                            <div className="product-content">
                                <div>20 Items avaliable</div>
                                <div>80 Bath</div>
                            </div>
                            <div className="button-wrapper flex-row">
                                <Button>Edit Product</Button>
                                <Button className="red-button">Delete</Button>
                            </div>
                        </div>
                        <div className="product-item-wrapper">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pugsod-storage.appspot.com/o/images%2Fproduct%2Fb445ae87-0abf-4735-9064-7644b8f81d74?alt=media&token=b1859441-be3c-49a2-9699-e4510024e1aa" />
                            <h2>ข้าวโพดแสนอร่อย</h2>
                            <div className="product-content">
                                <div>20 Items avaliable</div>
                                <div>80 Bath</div>
                            </div>
                            <div className="button-wrapper flex-row">
                                <Button>Edit Product</Button>
                                <Button className="red-button">Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fruit-container">
                    <h2>Fruits</h2>
                    <div className="product-wrapper grid">
                        <div className="product-item-wrapper">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pugsod-storage.appspot.com/o/images%2Fproduct%2Fb445ae87-0abf-4735-9064-7644b8f81d74?alt=media&token=b1859441-be3c-49a2-9699-e4510024e1aa" />
                            <h2>ข้าวโพดแสนอร่อย</h2>
                            <div className="product-content">
                                <div>20 Items avaliable</div>
                                <div>80 Bath</div>
                            </div>
                            <div className="button-wrapper flex-row">
                                <Button>Edit Product</Button>
                                <Button className="red-button">Delete</Button>
                            </div>
                        </div>
                        <div className="product-item-wrapper">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pugsod-storage.appspot.com/o/images%2Fproduct%2Fb445ae87-0abf-4735-9064-7644b8f81d74?alt=media&token=b1859441-be3c-49a2-9699-e4510024e1aa" />
                            <h2>ข้าวโพดแสนอร่อย</h2>
                            <div className="product-content">
                                <div>20 Items avaliable</div>
                                <div>80 Bath</div>
                            </div>
                            <div className="button-wrapper flex-row">
                                <Button>Edit Product</Button>
                                <Button className="red-button">Delete</Button>
                            </div>
                        </div>
                        <div className="product-item-wrapper">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pugsod-storage.appspot.com/o/images%2Fproduct%2Fb445ae87-0abf-4735-9064-7644b8f81d74?alt=media&token=b1859441-be3c-49a2-9699-e4510024e1aa" />
                            <h2>ข้าวโพดแสนอร่อย</h2>
                            <div className="product-content">
                                <div>20 Items avaliable</div>
                                <div>80 Bath</div>
                            </div>
                            <div className="button-wrapper flex-row">
                                <Button>Edit Product</Button>
                                <Button className="red-button">Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageShop