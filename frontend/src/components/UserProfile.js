import React from "react";
import PropTypes from "prop-types";
import { Card, Form, Input, Button, Upload  } from "antd";
import Avatar from "./Avatar";
import { LockOutlined } from '@ant-design/icons';

export const UserProfile = ({ 
    name,
	src,
	color,
	mail,
	phone,
	...props
}) => {

    return (
        <>
            <Card
                {...props}
                className="text-align-last-center"
                cover={
                    <Upload
                        accept={'.jpg, .jpeg, .png'}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        className="user-profile__avatar-uploader"
                        showUploadList={false}
                    >
                        <div>
                            <Avatar
                                src={src}
                                color={color}
                                size={300}
                                rounded="circle"
                                border={2}
                                blur={true}
                                borderColor="primary"
                                alt={name}
                            />
                            <div className="position-absolute-profile-text-1">Profile Picture</div>
                            <div className="position-absolute-profile-text-2">Click To Change</div>
                        </div>
                    </Upload>
                }
            >
                <Card.Meta
                    title={
                        <h2 className="user-profile__name">
                            {name}
                        </h2>
                    }
                    style={{ textAlign: 'center', marginBottom: '1rem', 
                    marginTop: '6rem' }}
                />
                <Form
                    name="normal_change_password"
                    className="change_password-form"
                    initialValues={{ remember: true }}
                >
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
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            </Form.Item>
                </Form>
                    <div style={{
                            textAlignLast: "center",
                            marginBottom: "1rem",
                        }}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{
                            width: "-webkit-fill-available",
                        }} size="large">
                            <a href="/profile">Change Password</a>
                        </Button>
                    </div>
            </Card>
        </>
    );
};

UserProfile.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
        'primary',
        'secondary',
        'success',
    ]),
    mail: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
};

UserProfile.defaultProps = {
    className: undefined,
    color: undefined,
    mail: undefined,
    phone: undefined,
};

export default UserProfile;