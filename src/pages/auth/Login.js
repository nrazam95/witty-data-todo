import React from "react";
import Page from "../../layout/Page/Page";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { Card, Button, Form, Input, Checkbox } from "antd";
import Logo from "../../components/Logo";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  
    return (
        <PageWrapper
            isProtected={false}
            title="Login"
            className="bg-dark"
        >
            <Page className='p-0'>
                <div className="row h-100 align-items-center justify-content-center">
                    <div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
                      <Card className='shadow-3d-dark' data-tour='login-page'>
                        <Logo 
                          width={400}
                          height={300}
                        />
                      </Card>
                      <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                      >
                        <Form.Item
                          name="username"
                          rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                          name="password"
                          rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                          <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                          />
                        </Form.Item>
                        <Form.Item>
                          <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                          </Form.Item>
                        </Form.Item>
                      </Form>
                      <div style={{
                            textAlignLast: "center",
                            marginBottom: "1rem",
                        }}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{
                                width: "-webkit-fill-available",
                            }} size="large">
                                Sign In
                            </Button>
                        </div>
                        <div style={{
                            textAlignLast: "center",
                            marginBottom: "1rem",
                        }}>
                            <Button 
                              type="secondary"
                              size="large"
                              className="login-form-button"
                              style={{
                                width: "-webkit-fill-available",
                              }} 
                            >
                              <a href="/signup">Sign Up</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </Page>
        </PageWrapper>
    )
}

export default Login;
