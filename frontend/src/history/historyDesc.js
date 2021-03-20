import React, { useEffect, useState } from 'react'

import './historyDesc.scss'

const ProductItem = () => {
    return (
        <div className="product-item flex-row">
            <img src="https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg" />
            <div className="product-content flex-col">
                <div>Mango</div>
                <div>Amount : 3 kg</div>
                <div>Price : 100 TH</div>
            </div>
        </div>
    )
}

const HistoryDesc = (props) => {

    const [data, setData] = useState([1,2,3]);
    const [ID, setID] = useState(-1);

    const renderProductItem = (item, idx) => {
        return <ProductItem key={idx} />
    }

    useEffect(() => {
        const receiveProps = props.location.state

        setID(receiveProps.ID)
        fetchdata(receiveProps.ID)
    }, []);

    const fetchdata = async (id) => {
        // const result = await getHistory(id)
        // setData(result.data)
    }


    return (
        <div className="history-desc-container flex-col">
            <h1>Order id : {ID}</h1>
            <div className="order-content flex-col">
                <div className="content-warpper flex-row">
                    <div className="title flex-col">
                        <div>Seller : </div>
                        <div>Tel : </div>
                    </div>
                    <div className="content  flex-col">
                        <div>Tnnapop Pratheep</div>
                        <div>0614807734</div>
                    </div>
                </div>
                <div className="content-warpper flex-row">
                    <div className="title flex-col">
                        <div>Name : </div>
                        <div>Address : </div>
                        <div>Tel : </div>
                    </div>
                    <div className="content flex-col">
                        <div>Tnnapop Pratheep</div>
                        <div>Chulalongkorn University</div>
                        <div>0614807734</div>
                    </div>
                </div>
                <div className="content-warpper flex-row">
                    <div className="title flex-col">
                        <div>Tracking number : </div>
                        <div>Shipping : </div>
                    </div>
                    <div className="content flex-col">
                        <div>123456789</div>
                        <div>Kerry</div>
                    </div>
                </div>
                <div className="content-warpper flex-col">
                    <div className="title-product">Product</div>
                    {data.map(renderProductItem)}
                </div>
                <div className="content-warpper flex-row">
                    <div className="title flex-col">
                        <div>Subtotal : </div>
                        <div>Discount : </div>
                        <div>Total : </div>
                    </div>
                    <div className="content flex-col">
                        <div>400 TH</div>
                        <div>40 TH</div>
                        <div>360 TH</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryDesc