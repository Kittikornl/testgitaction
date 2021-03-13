import { UploadOutlined } from '@ant-design/icons'
import {Form, Button, Input, Upload, InputNumber, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import React from 'react'

import './manageProduct.scss'

const ManageProduct = () => {

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
      };

    return (
        <div className="manage-product-page-container">
            <div>.</div>
            <div className="manage-product-container flex-col">
                <div className="shop-header flex-row">
                    <a className="go-back">{"< ย้อนกลับ"}</a>
                    <h1 className="shop-title flex-col">ไร่เกษตรรวมใจ</h1>
                </div>
                <div className="manage-product flex-row">
                    <div className="product-img flex-col">
                        <img className="product-img"
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            alt="product-img"
                        />
                        <div className="uploadButton">
                            <Upload>
                                <Button icon={<UploadOutlined />}>Upload photo</Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="manage-product-form">
                        <h1>Add product</h1>
                        <Form form={form} name="basic">
                            <Form.Item
                                label="Product name"
                                name="productname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please insert your product name!",
                                    },
                                ]}
                            >
                                <Input className="inputEdit" allowClear />
                            </Form.Item>
                            <div className="form-group flex-row">
                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Product price must be number!",
                                        },
                                    ]}
                                >
                                    <Input className="inputEdit" defaultValue={0} suffix="฿" />
                                </Form.Item>
                                <Form.Item
                                    label="Amount"
                                    name="amount"
                                    rules={[
                                        {
                                            required: true,
                                            type: "number",
                                            message: "Product amount must be number!",
                                        },
                                    ]}
                                >
                                    <InputNumber className="inputEdit" min={1} max={99} defaultValue={1} />
                                </Form.Item>
                                <Form.Item
                                    label="Type"
                                    name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please insert your product type!",
                                        },
                                    ]}
                                >
                                    <div className="SelectEdit">
                                        <Select defaultValue="Vegetable">
                                            <Option value="Vegetable">Vegetable</Option>
                                            <Option value="Fruit">Fruit</Option>
                                        </Select>
                                    </div>
                                </Form.Item>
                            </div>
                            <Form.Item
                                label="Detail"
                                name="detail"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please insert your product type!",
                                    },
                                ]}
                            >
                                <Input className="inputEdit" allowClear />
                            </Form.Item>
                            <div className="button-wrapper flex-row">
                                <Button htmlType="submit" className="button button-green">
                                    Add product
                                </Button>
                                <Button htmlType="button" className="button button-yellow" onClick={onReset}>
                                    Clear
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageProduct