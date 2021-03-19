import { Button } from 'antd'
import React, { useState } from 'react'
import Searchbar from '../components/searchbar'

import './history.scss'

const HistoryItem = () => {
    return (
        <div className="history-item flex-row">
            <div className="history-content-wrapper flex-row" >
                <img src="https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg" />
                <div className="history-content flex-col">
                    <div className="order-id">Order Id : 1</div>
                    <div className="seller">Seller : Tinnapop Pratheep</div>
                    <div className="discount">Discount : 10 TH</div>
                    <div className="total">Total : 300 TH</div>
                </div>
            </div>
            <div className="button-wrapper">
                <Button>{"Click >"}</Button>
            </div>
        </div>
    )
}

const History = () => {

    const [data, setData] = useState([1,2,3]);

    const renderHistoryItem = (item, idx) => {
        return <HistoryItem key={idx} />
    }

    return (
        <div className="history-page-container flex-col">
            <Searchbar />
            <div className="history-container">
                <h1>My history</h1>
                <div className="history-item-container flex-col">
                    {data.map(renderHistoryItem)}
                </div>
            </div>
        </div>
    )
}

export default History
