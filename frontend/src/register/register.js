import React from 'react'
import { Button, Input, Form , Select, DatePicker} from 'antd'
import "./register.scss"
import { postRegister } from '../service/user.service'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const { Option } = Select;
    const dateFormat = 'DD/MM/YYYY';
    const history = useHistory()
    
    const handleRegister = async (e) => {
        e['birthdate'] = moment(e.birthdate).format(dateFormat)
        e['role'] = parseInt(e.role)
        try {
            const res = await postRegister(e)
            history.push('/login')
        } catch (error) {
            console.log('error')
        }
    }

    const handleRegisterFailed = (e) => {
        console.log(e)
    }

    return (
        <div className="register-container">
            <div className="bg-login">
                <div className="space-none"></div>
                 <div className="space-white flex-col p-y-24">
                     
                     <div className="text-big semi-bold m-b-16">
                         pugsod
                     </div>
                     <Form onFinish={handleRegister} onFinishFailed={handleRegisterFailed}>
                        <Form.Item label="Firstname" name="firstname" rules={[{ required: true, message: 'Please enter your firstname' }]}>
                            <Input placeholder="Enter your first name" className="input" />
                        </Form.Item>
                        <Form.Item label="Lastname" name="lastname" rules={[{ required: true, message: 'Please enter your lastname' }]}>
                            <Input placeholder="Enter your last name" className="input" />
                        </Form.Item>
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
                        <Form.Item 
                            label="Password" 
                            name="password" 
                            hasFeedback 
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Please enter your password' 
                                },
                                // {
                                //     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                //     message: 'Password must contain at least 8 characters which is one uppercase letter, one lowercase letter and one number' 
                                // },
                            ]}
                        >
                            <Input.Password placeholder="Enter your password" className="input" />
                        </Form.Item>
                        <Form.Item 
                            label="Re-type password" 
                            name="re-password" 
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Please enter your re-type password' 
                                },
                                // {
                                //     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                //     message: 'Password must contain at least 8 characters which is one uppercase letter, one lowercase letter and one number' 
                                // },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject('Two passwords do not match!');
                                    },
                                  }),
                            ]}
                        >
                            <Input.Password placeholder="Enter your re-type password" className="input" />
                        </Form.Item>
                        <Form.Item label="birthdate" name="birthdate"> 
                            <DatePicker format={dateFormat}/>
                        </Form.Item>
                        <Form.Item 
                            label="Phone number" 
                            name="phoneNo" 
                            rules={[
                                { required: true, message: 'Please enter your phone number' }, 
                                {   len: 10,
                                    message: "Phone number only 10 characters",
                                },
                                {
                                    pattern: /^[0-9\b]+$/,
                                    message: "Please enter as number",
                                }
                            ]}>
                            <Input placeholder="Enter your phone number" className="input-small" />
                        </Form.Item>
                        <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select your role' }]}>
                            <Select placeholder="none" >
                                <Option value="1">Customer</Option>
                                <Option value="2">Seller</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                             <Button htmlType="submit" className="button">
                            Sign up
                            </Button>
                        </Form.Item>
                     </Form>
                </div>
            </div>
        </div>
    )
}

export default Register