import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Searchbar from '../components/searchbar'
import { getHistory } from '../service/cart.service'

import './history.scss'

const HistoryItem = ({orderData, shopData}) => {
    const history = useHistory()
    const [shop] = useState(shopData.find(item => item.ID === orderData.shop_id));

    const handleClick = () => {
        history.push("history/description", {
            orderData : orderData,
            shopData : shop
        })
    }

    const renderStatus = (status) => {
        switch(status) {
            case 0 : return "Wait for checkout"
            case 1 : return "Wait for payment"
            case 2 : return "paid"
            case 3 : return "delivering"
            case 4 : return "received"
            case 5 : return "cancel"
        }
    }

    return (
        <div className="history-item flex-row">
            <div className="history-content-wrapper flex-row" >
                <img src={orderData.picture_url} />
                <div className="history-content flex-col">
                    <div className="order-id">Order Id : {orderData.ID}</div>
                    <div className="seller">Shop : {shop.shopname}</div>
                    <div className="discount">Price : {orderData.price} TH</div>
                    <div className="discount">Amount : {orderData.amount}</div>
                    <div className="total">Total : {orderData.total_price} TH</div>
                </div>
            </div>
            <div className="button-wrapper flex-col">
                <div className="status">{renderStatus(orderData.status)}</div>
                <Button onClick={() => handleClick()}>{"Click >"}</Button>
            </div>
            <div className="button-wrapper-mobile flex-col" >
                <div className="status">{renderStatus(orderData.status)}</div>
                <Button onClick={() => handleClick()}>{">"}</Button>
            </div>
        </div>
    )
}

const History = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchdata()
    }, [])

    const fetchdata = async () => {
        const result = await getHistory()
        console.log(result.data)
        setData(result.data)
    }

    const renderHistoryItem = (item, idx) => {
        return <HistoryItem key={idx} orderData={item} shopData={data.shop_info}/>
    }

    if(!data.order_info)
    return <div></div>
    return (
        <div className="history-page-container flex-col">
            <Searchbar />
            <div className="history-container">
                <h1>My history</h1>
                <div className="history-item-container flex-col">
                    {data.order_info.map(renderHistoryItem)}
                </div>
            </div>
        </div>
    )
}

export default History
