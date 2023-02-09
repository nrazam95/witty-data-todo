import { Modal } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "antd";
import Avatar from "./Avatar";

const ProfileModal = ({
    profile,
    openModal,
    onOk,
    onCancel,
    onSigninOut,
    ...props
}) => {
    return (
        <Modal open={openModal} onOk={onOk} onCancel={onCancel} footer={[]}>
            <Card
                {...props}
                bordered={false}
                className="text-align-last-center remove-box-shadow"
                cover={(<div>
                    <Avatar
                        imageUrl={profile?.imageUrl}
                        color="primary"
                        size={300}
                        rounded="circle"
                        border={2}
                        blur={false}
                        borderColor="primary"
                        alt={profile?.name}
                    />
                </div>)}
            >
                <Card.Meta
                    title={
                        <h2 className="user-profile__name">
                            {profile?.name}
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
    profile: PropTypes.object,
    openModal: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    onSigninOut: PropTypes.func,
}

ProfileModal.defaultProps = {
    profile: {},
    openModal: false,
    onOk: () => {},
    onCancel: () => {},
    onSigninOut: () => {},
}

export default ProfileModal;