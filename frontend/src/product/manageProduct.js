import { UploadOutlined } from '@ant-design/icons'
import {Form, Button, Input, Upload, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'

import {uploadProductPic} from '../service/firebase.service'
import vegThumb from '../img/veg-thumbnail.jpg'

import './manageProduct.scss'
import { useHistory } from 'react-router'
import Notification from '../components/notification'
import { getProduct, postAddProduct, putEditProduct } from '../service/product.service'
import { getShopByUserID } from '../service/user.service'
import { getUserInfo } from '../service/auth.service'

const ManageProduct = (props) => {

    const history = useHistory()

    const [form] = Form.useForm();

    const [mode, setMode] = useState(0); // 0 add 1 edit
    const [data, setData] = useState({});
    const [shop, setShop] = useState({});
    const [url, setUrl] = useState("");

    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const prop = props.location.state
            const result = await getShopByUserID(getUserInfo().userId)
            setShop(result)

            if (prop === undefined)
                history.goBack()
            setMode(prop.mode)
            
            if (prop.mode === 1) {
                const product_id = prop.product_id
                fetchdata(product_id)
            }
        }
        fetch()

    }, []);

    const fetchdata = async (id) => {
        const result = await getProduct(id)
        const productData = result.data
        console.log(productData)
        setData(productData)
        setUrl(productData.PictureURL)
        setFormValue(productData)
    }

    const setFormValue = (productData) => {
        form.setFieldsValue({
            productname : productData.ProductTitle,
            price : productData.Price,
            amount : productData.Amount,
            type : productData.ProductType,
            detail : productData.ProductDetail
        })
    }

    const onCancel = () => {
        history.goBack()
    };

    const pageRefresh = () => {
        setRefresh(!refresh);
    };

    const changeType = (value) => {
        form.setFieldsValue({type: value})
    }

    const handleSubmit = async (fieldsValue) => {
        let payload = {}

        payload["PictureURL"] = url
        payload["ProductTitle"] = fieldsValue["productname"]
        payload["Price"] = parseInt(fieldsValue["price"])
        payload["Amount"] = fieldsValue["amount"]
        payload["ProductType"] = fieldsValue["type"]
        payload["ProductDetail"] = fieldsValue["detail"]
        payload["ProductDetail"] = fieldsValue["detail"]
        payload["ShopID"] = shop.ID

        console.log(shop)

        console.log(payload)

        if (mode === 0) {
            await postAddProduct(payload)
            Notification({type: 'success', message: 'Add product successfully.', desc: 'wait for customer!'})
            history.push('shop')
        }
        else if (mode === 1) {
            await putEditProduct(payload, data.ID)
            Notification({type: 'success', message: 'Edit product successfully.', desc: 'check your product information!'})
            history.push('shop')
        }
        else {
            Notification({type: 'error', message: 'Mode error.', desc: 'something went wrong!'})
        }
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
                    <a className="go-back" href="shop">{"< ย้อนกลับ"}</a>
                    <h1 className="shop-title flex-col">{shop.shopname}</h1>
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
                                        <Input className="inputEdit" suffix="฿" />
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
                                        <InputNumber className="inputEdit" min={1} max={99}/>
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
                                            <Select defaultValue="Select Type" value={data.ProductType} onChange={changeType}>
                                                <Select.Option value={1}>Vegetable</Select.Option>
                                                <Select.Option value={2}>Fruit</Select.Option>
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
                                    <Button htmlType="button" className="button button-yellow" onClick={onCancel}>
                                        Cancel
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