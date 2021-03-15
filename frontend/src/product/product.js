import React, { useEffect, useState } from 'react'

import './product.scss'
import profileThumb from '../img/profile_thumb.png'
import { Button, Input } from 'antd'
import Scores from '../components/scores'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = () => {

    const [amount, setAmount] = useState(1);

    useEffect(() => {
    }, []);

    const handleUpDownAmount = (value) => {
        if (amount+value >= 1 && amount+value < 100)
            setAmount(amount+value)
        
    }

    return (
        <div className="product-page-container">
            <div className="product-page-content grid">
                <div className="product-image-wrapper">
                    {/* <img src={"" === "" ? `${profileThumb}` : ``} /> */}
                    <img src="https://firebasestorage.googleapis.com/v0/b/pugsod-storage.appspot.com/o/images%2Fproduct%2F6a394b9a-d621-44d3-bd42-5e08b3e3bcf3?alt=media&token=14133c64-89b2-404f-9679-163a0e97411a" />
                </div>
                <div className="product-name-wrapper">
                    <h1>ช้าวโพดต้มแสนอร่อย 1 ฟัก ลองข้อความยาวๆครับ</h1>
                    <div className="content">
                        <div className="amount">26 Items available</div>
                        <div className="shop">ไร่เกษตรรวมใจ</div>
                        <div className="province">สระบุรี</div>
                        <div className="score flex-row">
                            <div>5.0</div>
                            <Scores score={5.0}/>
                            <div>36 reviews</div>
                        </div>
                    </div>
                </div>
                <div className="product-desc-wrapper">
                    <h1>รายละเอียดสินค้า</h1>
                    <div className="shop-desc">
                        ช้าวโพดต้มปลอดสารพิษ 100% 
                        ขนาดบรรจุ 1 ฟัก
                        สั่งมากกว่า 10 ฟักส่งฟรี
                        ส่งภายในจังหวัดสระบุรี
                    </div>
                </div>
                <div className="product-price-wrapper">
                    <h1>Price</h1>
                    <div className="content">
                        <div className="price">40 บาท</div>
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