import { useState } from 'react';
import { Card, Button, Form, Input, Alert } from 'antd';
import {useAuth} from '../../contexts/AuthContext'
import LoginModel from '../../models/Login/loginModel';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const [isLoggedFailed, setIsLoggedFailed] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        let result:any = await login(values)
        if(result===true){
            navigate('/');
        }else{
            setIsLoggedFailed(true)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };
    
    return(
        <Card title={"Login"}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<LoginModel>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item<LoginModel>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                {isLoggedFailed ? <Alert message="Email or Password are incorrect" type="error" /> : null}
                <br/>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </Card>
    )
};




export default LoginPage;