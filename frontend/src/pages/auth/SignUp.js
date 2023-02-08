import React, { useState, useCallback, useContext, useEffect } from "react";
import Page from "../../layout/Page/Page";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import { Card, Button, Form, Input, Checkbox } from "antd";
import Logo from "../../components/Logo";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import * as authActions from "../../lib/actions/auth-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthContext from "../../contexts/authContexts";

const SignUp = () => {
  const { setToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const token = useSelector(state => state.auth.token);
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const onFinish = () => {
    dispatch(authActions.register(user.username, user.password, user.confirmPassword));
  };

  useEffect(() => {
    if (token) {
      setToken(token);

      navigate('../');
    }
  }, [token, setToken, navigate])
  
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
                      >
                        <Form.Item
                          name="username"
                          rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                          <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Username"
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item
                          name="password"
                          rules={[{ required: true, message: 'Please input your Password!' }, ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (!value || getFieldValue('password').length < 8) {
                                return Promise.reject('Password must be at least 8 characters!');
                              }

                              if (!value || getFieldValue('password').length > 40) {
                                return Promise.reject('Password must be at most 40 characters!');
                              }

                              if (!value || !/[a-z]/.test(getFieldValue('password'))) {
                                return Promise.reject('Password must contain at least one lowercase letter!');
                              }

                              if (!value || !/[A-Z]/.test(getFieldValue('password'))) {
                                return Promise.reject('Password must contain at least one uppercase letter!');
                              }

                              if (!value || !/[0-9]/.test(getFieldValue('password'))) {
                                return Promise.reject('Password must contain at least one number!');
                              }

                              // eslint-disable-next-line no-useless-escape
                              if (!value || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(getFieldValue('password'))) {
                                return Promise.reject('Password must contain at least one special character!');
                              }

                              return Promise.resolve();
                            }
                          })]}
                        >
                          <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                          />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
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
                            <Button 
                              type="primary" 
                              htmlType="submit" 
                              className="login-form-button" 
                              style={{
                                width: "-webkit-fill-available",
                              }} 
                              size="large"
                              onClick={onFinish}
                              >
                                Sign Up
                            </Button>
                        </div>
                        <div style={{
                            textAlignLast: "center",
                            marginBottom: "1rem",
                        }}>
                            <Button 
                            type="secondary"
                            htmlType="submit" 
                            size="large"
                            className="login-form-button"
                            style={{
                                width: "-webkit-fill-available",
                            }} 
                          >
                            <a href="/signin">Back to Sign In</a>
                          </Button>
                        </div>
                    </div>
                </div>
            </Page>
        </PageWrapper>
    )
}

export default SignUp;
