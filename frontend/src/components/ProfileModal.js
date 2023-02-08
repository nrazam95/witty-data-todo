import { Modal } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "antd";
import Avatar from "./Avatar";

const ProfileModal = ({
    openModal,
    onOk,
    onCancel,
    onSigninOut,
    ...props
}) => {
    const profile = {
        name: 'John Doe',
        src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        srcSet: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        color: 'primary',
        mail: 'jkanskjwnjksq',
        phone: '123456789',
    }
    return (
        <Modal open={openModal} onOk={onOk} onCancel={onCancel} footer={[]}>
            <Card
                {...props}
                className="text-align-last-center"
                cover={(<div>
                    <Avatar
                        src={profile.src}
                        color={profile.color}
                        size={300}
                        rounded="circle"
                        border={2}
                        blur={false}
                        borderColor="primary"
                        alt={profile.name}
                    />
                </div>)}
            >
                <Card.Meta
                    title={
                        <h2 className="user-profile__name">
                            {profile.name}
                        </h2>
                    }
                    style={{ textAlign: 'center', marginBottom: '1rem' }}
                />

                <div style={{
                            textAlignLast: "center",
                            marginBottom: "1rem",
                        }}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{
                                width: "-webkit-fill-available",
                            }} size="large">
                                <a href="/profile">Update Profile</a>
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
                              onClick={onSigninOut}
                            >
                              Sign Out
                            </Button>
                        </div>
            </Card>
        </Modal>
    )
}

ProfileModal.propTypes = {
    openModal: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    onSigninOut: PropTypes.func,
}

ProfileModal.defaultProps = {
    openModal: false,
    onOk: () => {},
    onCancel: () => {},
    onSigninOut: () => {},
}

export default ProfileModal;