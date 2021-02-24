import React from 'react'
import { Button, Input, Form } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import './login.scss'
import {login} from '../service/auth.service'

const Login = () => {
    const history = useHistory()

    const handleLogin = async (e) => {
        try {
            const res = await  login(e.email, e.password)
            history.push('/profile')
        } catch (error) {
            console.log(error)
        }
        console.log(e)
    }

    const handleLoginFailed = (e) => {
        console.log(e)
    }

    return (
        <div className="login-container">
            <div className="bg-login">
                <div className="space-none">

                </div>
                 <div className="space-white flex-col">
                     <div className="text-big semi-bold m-b-16">
                         pugsod
                     </div>
                     <Form onFinish={handleLogin} onFinishFailed={handleLoginFailed}>
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
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                            <Input.Password placeholder="Enter your password" className="input" />
                        </Form.Item>
                        <div className="m-b-10">
                            Don't have an account? <Link to="/register">Sign Up</Link> 
                        </div>
                        <Form.Item>
                             <Button htmlType="submit" className="button">
                            Sign in
                            </Button>
                        </Form.Item>
                       
                     </Form>
                     <Link to="/password/reset" >Forgot your password?</Link>
                </div>
            </div> 
        </div>
    )
}

export default Login