import React, { useEffect, useState } from 'react'

import './product.scss'
import vegThumb from '../img/veg-thumbnail.jpg'
import { Button, Input } from 'antd'
import Scores from '../components/scores'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router'

import { getProduct } from '../service/product.service'
import { getShopData } from '../service/shop.service'

const Product = () => {

    const initData = {
        "ShopID": 0,
        "PictureURL": "",
        "ProductTitle": "ข้าวโพดแสนอร่อย",
        "Price": 10,
        "Amount": 2,
        "ProductType": 1,
        "ProductDetail": "อร่อยจริงๆนะ",
        "Rating": 0
    }

    const initShopData = { 

    }


    let { id } = useParams();

    const [amount, setAmount] = useState(1);
    const [data, setData] = useState(initData);
    const [shop, setShop] = useState(initShopData);

    useEffect(() => {
        fetchdata(id)
    }, []);

    const fetchdata = async (id) => {
        const result = await getProduct(id)
        const productData = result.data
        console.log(productData)
        setData(productData)

        const shopResult = await getShopData(productData.ShopID)
        const shopData = shopResult.data
        console.log(shopData)
        setShop(shopData)
    }

    const handleUpDownAmount = (value) => {
        if (amount+value >= 1 && amount+value < 100)
            setAmount(amount+value)
        
    }

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
                        <div className="shop">ไร่เกษตรรวมใจ</div>
                        <div className="province">สระบุรี</div>
                        <div className="score flex-row">
                            <div>{data.Rating}</div>
                            <Scores score={data.Rating}/>
                            <div>0 reviews</div>
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
                    <h1>Price</h1>
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
                            <Button className="button-right" onClick={(e)=>handleUpDownAmount(1)}>+</Button>
                        </div>
                        <div className="add-cart">
                            <Button className="fs-20">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                &nbsp;&nbsp;Add to card
                            </Button>
                        </div>
                    </div>     
                </div>
                <div className="shop-contact-wrapper">
                    <h1>Shop contact</h1>
                    <div className="content">
                        <div>Tel. 061-4807734</div>
                        <div>Address: ไร่เกษตรรวมใจ </div>
                        <div>บรรทัดที่ 2</div>
                    </div>
                    <div className="visit-shop-button">
                        <Button className="fs-20">
                            <FontAwesomeIcon icon={faHome} />   
                            &nbsp;&nbsp;Visit Shop
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product-page-footer">
                .
            </div>
        </div>
    )
}

export default Product