import { useState } from 'react';
import { Card, Button, Form, Input, Alert, Spin } from 'antd';
import {useAuth} from '../../contexts/AuthContext'
import LoginModel from '../../models/Login/loginModel';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const [isLoggedFailed, setIsLoggedFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        setIsLoading(true)
        let result:any = await login(values)
        if(result===true){
            navigate('/');
        }else{
            setIsLoggedFailed(true)
            setIsLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };
    
    return(
        <Card title={"Login"}>
            <Alert
            message="Development API Server"
            description="The api server goes idle after a period of inactivity. If login fails, you may need to wait a minute for the server to start up."
            type="warning"
            style={{marginBottom: 15}}
            />
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
                {isLoading ? <Spin style={{marginLeft: 10}}/> : <></>}
                </Form.Item>
            </Form>
        </Card>
    )
};




export default LoginPage;