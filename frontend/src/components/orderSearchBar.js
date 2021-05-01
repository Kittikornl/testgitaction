import { Button, Input, Select } from "antd";
import { useState } from "react";
import { getHistoryFilter } from "../service/cart.service";
import "./searchbar.scss";

const OrderSearchbar = ({setData}) => {
    const [status, setStatus] = useState("");
    const [orderID, setOrderID] = useState("");

    const onSearch = async () => {
        if (status === "")
            setData(0, null, orderID)
        else {
            const result = await getHistoryFilter(status)
            setData(1, result, orderID)
        }
    }

    return (
        <div className="bg-container">
            <div className="data-container flex-row">
                <div style={{alignSelf:"center"}}>Order Status</div>
                <Select placeholder="Select Type">
                    <Select value="" onMouseEnter={() => setStatus("")}>
                        All types
                    </Select>
                    <Select value="1" onMouseEnter={() => setStatus("1")}>
                        Wait for payment
                    </Select>
                    <Select value="2" onMouseEnter={() => setStatus("2")}>
                        Paid
                    </Select>
                    <Select value="3" onMouseEnter={() => setStatus("3")}>
                        Delivering
                    </Select>
                    <Select value="4" onMouseEnter={() => setStatus("4")}>
                        Received
                    </Select>
                    <Select value="5" onMouseEnter={() => setStatus("5")}>
                        Cancel
                    </Select>
                    <Select value="6" onMouseEnter={() => setStatus("6")}>
                        Sold out
                    </Select>
                </Select>
                <div style={{alignSelf:"center"}}>Order ID</div>
                <Input style={{width:"150px"}} onChange={(e) => setOrderID(e.target.value)}></Input>
                <Button onClick={onSearch}>Search</Button>
            </div>
        </div>
    );
};

export default OrderSearchbar;

