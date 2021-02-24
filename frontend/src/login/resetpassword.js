import React from 'react'
import { Button, Input, Form } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import "./resetpassword.scss"
import { postResetPassword } from '../service/user.service'

const ResetPassword = () => {
    const history = useHistory()

    const handleSentReset = async (e) => {
        try {
            console.log(e)
            const res = await postResetPassword(e)
            console.log(res);
            history.push('/login')
        } catch (error) {
            console.log('error')
        }
        console.log(e)
    }

    const handleSentResetFailed = (e) => {
        console.log(e)
    }

    return (
        <div className="resetpass-container">
            <div className="bg-login">
                <div className="space-none"></div>
                 <div className="space-white flex-col">
                     <div className="text-big semi-bold m-b-16">
                         pugsod
                     </div>
                     <div className="box-text m-b-16">
                     Reset password
                     </div>
                     <Form onFinish={handleSentReset} onFinishFailed={handleSentResetFailed}>
                        <Form.Item 
                            label="Email" 
                            name="email" 
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Please enter your email' 
                                },
                                {
                                    type: "email",
                                    message: "Invalid email format",
                                },
                            ]}
                        >
                            <Input placeholder="Enter your email" className="input" />
                        </Form.Item>
                        <Form.Item>
                             <Button htmlType="submit" className="button">
                            Comfirm
                            </Button>
                        </Form.Item>
                     </Form>
                </div>
            </div> 
        </div>
    )
}

export default ResetPassword