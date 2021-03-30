import React, { useState } from 'react' 
import './shipment.scss'
import Navbar from '../components/navbar'
import Banner from "../components/static/banner";
import { postShipment } from '../service/order.service'
import { Input, Button, Steps } from "antd";
import truck from '../img/delivery-truck.png'
import notFound from '../img/not-found.png'

const { Step } = Steps;

const Shipment = () => {
    const [trackId, setTrackId] = useState("")
    const [valid, setValid] = useState(false)
    const [input, setInput] = useState(false)
    const [status, setStatus] = useState(0)

    const getShipmentStatus = async () => {
        const data = {
            "track_input": trackId
        }
        const res = await postShipment(data)
        setInput(true)
        console.log(res.data.shop_id);
        res.data.user_id === 0 ? setValid(false):setValid(true)
        console.log('trackId',trackId);
        console.log('valid', valid);
        console.log('status', res.data.status);
        setStatus(res.data.status)
    }
    
    return (
        <div>
            <Navbar/>
            <Banner title="Track your orders" bgClass="three" />
            <div className="shipment-container">
                <div>
                    <h2 className="m-t-30">
                        Please rate your experience with seller
                    </h2>
                    <div className="flex-row box-input">
                        <Input value={trackId} onChange={(e) => setTrackId(e.target.value)}/>
                        <Button onClick={getShipmentStatus}>Enter</Button>
                    </div>
                </div>
                {/* status 2, 3, 4 */}
                {input & valid ? 
                    <Steps progressDot current={status-2}>
                        <Step title="Receive order" description="Your order is prepared" />
                        {/* <Step title="In Progress" description="Delivery in progress"/> */}
                        <Step title="Shipped" description="Your order is shipped" />
                        <Step title="Success" description="Your order derivered" />
                    </Steps>
                 : 
                 input ?
                <div className="text-center box-result">
                    <img src={notFound} />
                    <div>
                        Not found tracking number: {trackId}
                    </div>
                </div>:
                <div className="text-center box-result">
                    <div>Please enter tracking number ...</div>
                    <img src={truck} className="truck"/>
                </div>}
            </div>
        </div>
    )
}

export default Shipment