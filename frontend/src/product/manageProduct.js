import { UploadOutlined } from '@ant-design/icons'
import {Form, Button, Input, Upload, InputNumber, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import React, { useEffect, useState } from 'react'

import {uploadProductPic} from '../service/firebase.service'
import vegThumb from '../img/veg-thumbnail.jpg'

import './manageProduct.scss'
import { useHistory } from 'react-router'
import Notification from '../components/notification'

const ManageProduct = () => {

    const history = useHistory()

    const [mode, setMode] = useState(0); // 0 Add , 1 Edit

    const [form] = Form.useForm();

    const [url, setUrl] = useState("");
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (mode==1)
            fetchdata()
    }, []);

    const fetchdata = () => {
        
    }

    const onReset = () => {
        form.resetFields();
    };

    const pageRefresh = () => {
        setRefresh(!refresh);
    };

    const changeType = (value) => {
        form.setFieldsValue({type: value})
    }

    const handleSubmit = (fieldsValue) => {
        fieldsValue["url"] = url
        const payload = fieldsValue
        console.log(payload)
        history.push('/shop')
        Notification({type: 'success', message: 'Add product successfully.', desc: 'wait for customer!'})
    }


    const propsUpload = {
        maxCount: 1,
        beforeUpload: () => false,
        onChange: async (info) => {
          const type = info.file.name.split(".")[1];
          if (type === "png" || type === "jpg") {
            console.log("image", info.file);
            uploadProductPic(info.file, setUrl)
            pageRefresh();
            console.log(url);
          } else {
            console.error("Type error!");
          }
        },
        showUploadList: false,
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
                    <img src={url === "" ? `${vegThumb}` : `${url}`} />
                        <div className="uploadButton">
                            <Upload {...propsUpload}>
                                <Button icon={<UploadOutlined />}>Upload photo</Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="manage-product-form">
                        <h1>{(mode===0) ? "Add product" : "Edit product"}</h1>
                        <div>
                            <Form form={form} name="basic" onFinish={handleSubmit}>
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
                                            <Select defaultValue="Select Type" onChange={changeType}>
                                                <Select.Option value="Vegetable">Vegetable</Select.Option>
                                                <Select.Option value="Fruit">Fruit</Select.Option>
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
                                        {(mode===0) ? "Add product" : "Edit product"}
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
        </div>
    )
}

export default ManageProduct