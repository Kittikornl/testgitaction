import React, { useState, useEffect} from 'react'
import Banner from '../components/static/banner'
import { Form, Input, Button, Modal } from 'antd'
import './editShop.scss'
import { getShopData, deleteShop, editShop } from '../service/shop.service'
import { useHistory, useParams } from "react-router";
import Notification from '../components/notification'


const EditShop = (props) => {
    const [form] = Form.useForm()
    const [data, setData] = useState()
    const [editData, setEditData] = useState()
    // const { id } = useParams();
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const history = useHistory()

    // console.log();
    const id = props.location.aboutProps.shopId
    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        const res = await getShopData(id)
        setData(res.data.shop_information)
        console.log(res.data.shop_information);
        setForm(res.data.shop_information)
    }

    const setForm = (data) => {
        form.setFieldsValue({
          shopname: data.shopname,
          description: data.description,
          phone_number: data.phone_number,
          facebook: data.facebook,
          ig: data.ig,
          line: data.line,
          twitter: data.twitter
        });
      };

    const handleEditShop = async (e) => {
        try {
            console.log("editData",editData);
            const res = await editShop(id, editData)
            console.log(res);
            Notification({type: 'success', message:'Edit shop successful', desc: "Shop is edited"})
            history.push('/profile')
        } catch(error) {
            Notification({type: 'error', message:'Edit shop error', desc: "Please edit your shop again"})
        }
    }

    const handleDeleteShop = async () => {
        try {
            const res = await deleteShop(id)
            console.log(res);
            Notification({type: 'success', message:'Delete shop successful', desc: "Shop is deleted"})
            history.push('/profile')
        } catch(error) {
            Notification({type: 'error', message:'Delete shop error', desc: "Please delete shop again"})
        }   
    }

    const openModalDelete = () => {
        setVisibleDelete(true)
    }

    const openModalEdit = (e) => {
        e['rating'] = data.rating
        console.log(e);
        setEditData(e)
        setVisibleEdit(true)
    }

    const handleCancelDelete = () => {
        setVisibleDelete(false)
    }

    const handleCancelEdit = () => {
        setVisibleEdit(false)
    }

    return (
        <>
        <Banner bgClass="two"/>
        <div className="edit-container">
            <div className="text-title">
                Edit Shop
            </div>
            <Form form={form} className="form-container" onFinish={openModalEdit}>
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
                <Form.Item className="btn-section m-t-20">
                    <Button htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div className="text-title">
                Shop management
            </div>
            <div className="text-center m-y-20">
                <Button className="red-btn" onClick={openModalDelete}>Delete shop</Button>
            </div>
            
        </div>
        <Modal 
                visible={visibleDelete}
                centered
                onCancel={handleCancelDelete}
                footer={false}>
                  <div className="text-center">
                      <div className="text-alert">
                            Confirm delete shop
                        </div>
                        <div className="flex-row flex-center m-t-20">
                            <Button className="red-btn m-r-10" onClick={handleDeleteShop}>Delete shop</Button>
                            <Button className="gray-btn" onClick={handleCancelDelete}>Cancel</Button>
                        </div>
                   </div>
        </Modal>
        <Modal 
                visible={visibleEdit}
                centered
                onCancel={handleCancelEdit}
                footer={false}>
                  <div className="text-center">
                      <div className="text-alert">
                            Confirm edit shop
                        </div>
                        <div className="flex-row flex-center m-t-20">
                            <Button className="green-btn m-r-10" onClick={handleEditShop}>Edit shop</Button>
                            <Button className="gray-btn" onClick={handleCancelEdit}>Cancel</Button>
                        </div>
                   </div>
        </Modal>
        </>
    )
}

export default EditShop