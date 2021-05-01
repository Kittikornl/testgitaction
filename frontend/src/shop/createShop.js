import React, { useState, useEffect} from 'react'
import Banner from '../components/static/banner'
import { Form, Input, Button } from 'antd'
import './createShop.scss'
import { postShop } from '../service/shop.service'
import Notification from '../components/notification'
import { useHistory } from 'react-router'
import { getUserInfo } from '../service/auth.service'

const CreateShop = () => {
    // const [form] = Form.useForm()
    const history = useHistory()
    // /user/id : userinformation ->shopid = 0 check user already has shop

    const handleCreateShop = async(e) => {
        if (getUserInfo()['role'] === 1) {
            Notification({type: 'error', message:"Customer can't create shop", desc: "Please register new account to create a shop"})
        }
        else {
            e['rating'] = 0
            console.log(e);
            try {
                const res = await postShop(e)
                Notification({type: 'success', message:'Create shop successful', desc: "Let's sell!"})
                history.push('/profile')
            } catch (error) {
                Notification({type: 'error', message:'Create shop error', desc: "Please inform your shop information again"})
            }
        }
        
    }
    const handleCreateFail = () => {
        console.log("error");
    }

    const handleClear = () => {
        
    }

    
    return (
        <>
        <Banner bgClass="two"/>
        <div className="create-shop-container">
            <div className="text-title">
                Create Shop
            </div>
            <Form className="form-container" onFinish={handleCreateShop} onFinishFailed={handleCreateFail}>
                <Form.Item label="Shop name" name="shopname">
                    <Input placeholder="Enter shop name"/>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input placeholder="Enter description"/>
                </Form.Item>
                <Form.Item label="Phone" name="phone_number">
                    <Input placeholder="Enter phone number"/>
                </Form.Item>
                <Form.Item label="Facebook" name="facebook">
                    <Input placeholder="Enter facebook account"/>
                </Form.Item>
                <Form.Item label="Instagram" name="ig">
                    <Input placeholder="Enter instagram account"/>
                </Form.Item>
                <Form.Item label="Line" name="line">
                    <Input placeholder="Enter line account"/>
                </Form.Item>
                <Form.Item label="Twitter" name="twitter">
                    <Input placeholder="Enter twitter account"/>
                </Form.Item>
                <div className="flex-row m-t-20 btn-btw">
                    <Form.Item className="m-r-20">
                        <Button htmlType="submit">
                            Create shop
                        </Button>
                    </Form.Item>
                        {/* <Button onClick={handleClear}>
                            Clear
                        </Button> */}
                </div>
                
            </Form>
        </div>
        </>
    )
}

export default CreateShop