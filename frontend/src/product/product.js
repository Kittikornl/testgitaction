import React, { useEffect, useState } from 'react'

import './product.scss'
import vegThumb from '../img/veg-thumbnail.jpg'
import { Button, Input } from 'antd'
import Scores from '../components/scores'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMapMarkerAlt, faPhone, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router'

import { getProduct, getReviewProduct } from '../service/product.service'
import { getShopData } from '../service/shop.service'
import { getUserData } from '../service/user.service'
import { Link } from 'react-router-dom'
import { addCart, getCart, updateCart } from '../service/cart.service'
import Notification from '../components/notification'

const Product = () => {
    let { id } = useParams();

    const [amount, setAmount] = useState(1);
    const [data, setData] = useState({});
    const [shop, setShop] = useState({});
    const [owner, setOwner] = useState({});
    const [cart, setCart] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        fetchdata(id)
        getCartData()
    }, []);

    const fetchdata = async (id) => {
        const result = await getProduct(id)
        const productData = result.data
        console.log(productData)
        setData(productData)

        const shopResult = await getShopData(productData.ShopID)
        const shopData = shopResult.data.shop_information
        console.log(shopData)
        setShop(shopData)

        const ownerResult = await getUserData(shopData.user_id)
        const ownerData = ownerResult.data.Userdata
        console.log(ownerData)
        setOwner(ownerData)

        const commentResult = await getReviewProduct(id)
        const commentData = commentResult.data
        console.log(commentData)
        setComment(commentData)
    }

    const handleUpDownAmount = (value) => {
        if (amount+value >= 1 && amount+value < 100)
            setAmount(amount+value)
    }

    const getCartData = async () => {
        try {
          const res = await getCart()
          console.log('res',res.data.cart_items);
          setCart(res.data.cart_items)
        } catch (error) {
          throw error
        }
    }

    const handleAddCart = async () => {
        const req = {
            'shop_id': data.ShopID,
            'product_title': data.ProductTitle,
            'amount': amount,
            'price': data.Price,
            'picture_url': data.PictureURL,
            'product_detail': data.ProductDetail, 
            'product_id': data.ID
        }
        try {
            await addCart(req)
            Notification({type: 'success', message: 'Add to cart success', desc: "Let's checkout"})
            setAmount(1)
            getCartData()
        } catch (error) {
            Notification({type: 'error', message: 'Add to cart fail', desc: 'Please add to cart again'})
        }
    }

    const handleAddToShop = () => {
        const c = cart.filter(item => {
            console.log(item);
            return item['shop_id'] === data['ShopID'] && 
            item['product_title'] === data['ProductTitle'] && 
            item['product_detail'] === data['ProductDetail']
        })
        console.log(c);
        console.log(data)
        c.length == 0 ? handleAddCart() : handleUpdateCart(c[0]) 
    }

    const handleUpdateCart = async (c) => {
        c['change_amount'] = amount
        try {
            const res = await updateCart(c)
            console.log(res);
            Notification({type: 'success', message: 'Update to cart success', desc: "Let's checkout"})
            setAmount(1)
            getCartData()
        } catch (error) {
            console.log(error);
            Notification({type: 'error', message: 'Update to cart fail', desc: 'Please add to cart again'})
        }
    }

    const renderReview = (item, idx) => {
        console.log(item)
        return <div className="comment-container flex-col">
            <div className="comment-title flex-row">
                <h3>{`${item.firstname} ${item.lastname}`}</h3>
                <Scores score={item.rating} />
            </div>
            <div className="comment">{item.comment}</div>
        </div>
    }


    if (data.length !== 0 && shop.length !== 0)
    return (
        <div className="product-page-container">
            <div className="product-page-content grid">
                <div className="product-image-wrapper">
                    <img src={data.PictureURL === "" ? `${vegThumb}` : data.PictureURL} />
                </div>
                <div className="product-name-wrapper">
                    <h1>{data.ProductTitle}</h1>
                    <div className="content">
                        <div className="amount">{`${data.Amount} Items available`}</div>
                        <div className="shop">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            &nbsp;{shop.shopname}
                        </div>
                        <div className="province">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            &nbsp;{owner.city}
                        </div>
                        <div className="score flex-row">
                            <div>{data.Rating}</div>
                            <Scores score={data.Rating}/>
                            <div>{data.review_count} reviews</div>
                        </div>
                    </div>
                </div>
                <div className="product-desc-wrapper">
                    <h1>รายละเอียดสินค้า</h1>
                    <div className="shop-desc">
                        {data.ProductDetail}
                    </div>
                </div>
                <div className="product-price-wrapper">
                    <h1>ราคาสินค้า</h1>
                    <div className="content">
                        <div className="price">{`${data.Price} บาท`}</div>
                        <div className="amount-button">
                            <Button className="button-left" onClick={(e)=>handleUpDownAmount(-1)}>-</Button>
                            <Input 
                                value={amount} 
                                onChange={(e)=> {
                                    const value = (isNaN(parseInt(e.target.value))) ? 1 : parseInt(e.target.value)
                                    setAmount(value)
                                }} 
                                maxLength={2}>
                            </Input>
                            <Button className="button-right" onClick={()=>handleUpDownAmount(1)}>+</Button>
                        </div>
                        <div className="add-cart">
                            <Button className="fs-20" onClick={handleAddToShop}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                &nbsp;&nbsp;Add to my cart
                            </Button>
                        </div>
                    </div>     
                </div>
                <div className="shop-contact-wrapper">
                    <h1>ติดต่อร้านค้าได้ที่</h1>
                    <div className="content">
                        <div>
                            <FontAwesomeIcon icon={faPhone} />
                            &nbsp;{shop.phone_number}
                        </div>
                        <div className="flex-row">
                            <div>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                &nbsp;&nbsp;
                            </div>
                            <div>
                                <div>{`${owner.houseNo} ${owner.street} ${owner.subDistrict}`.replace("-", "")}</div>
                                <div>{`${owner.district} ${owner.city} ${owner.zipcode}`.replace("-", "")}</div>
                            </div>
                        </div>
                    </div>
                    <div className="visit-shop-button">
                        <Link to={`/shop/${data.ShopID}`}>
                            <Button className="fs-20">
                                <FontAwesomeIcon icon={faHome} />   
                                &nbsp;&nbsp;Visit Shop
                            </Button>
                        </Link>
                    </div>
                </div>
                <div>
                    <h1>Comment</h1>
                    <div>{comment.map(renderReview)}</div>
                </div>       
            </div>
            <div className="product-page-footer">
                .
            </div>
        </div>
    )
}

export default Product