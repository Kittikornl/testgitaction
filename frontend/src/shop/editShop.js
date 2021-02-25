import React, { useState, useEffect} from 'react'
import Banner from '../components/static/banner'
import { Form, Input, Button } from 'antd'
import './editShop.scss'

const EditShop = () => {
    const [form] = Form.useForm()
    return (
        <>
        <Banner />
        <div className="edit-container">
            <div className="text-title">
                Edit Shop
            </div>
            <Form form={form} className="form-container">
                <Form.Item label="Shop name" name="shopName">
                    <Input/>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Phone" name="phoneNo">
                    <Input />
                </Form.Item>
                <Form.Item label="Facebook" name="facebook">
                    <Input />
                </Form.Item>
                <Form.Item label="Line" name="line">
                    <Input />
                </Form.Item>
                <Form.Item label="Twitter" name="twitter">
                    <Input />
                </Form.Item>
                <Form.Item className="btn-section m-t-20">
                    <Button htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </>
    )
}

export default EditShop