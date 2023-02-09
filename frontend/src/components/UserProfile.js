import React from "react";
import PropTypes from "prop-types";
import { Card, Form, Input, Button, Upload } from "antd";
import Avatar from "./Avatar";
import { LockOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { matchingPasswords, passwordVerifier } from "../hooks/passwordVerifier";

export const UserProfile = ({
  name,
  imageUrl,
  username,
  color,
  mail,
  phone,
  handleUpload,
  beforeUpload,
  loading,
  changePassword,
  setChangePassword,
  handlePasswordChange,
  ...props
}) => {
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="user-profile">
      <Card
        {...props}
        bordered={false}
        className="user-profile-theme shadow-3d-dark text-align-last-center"
        cover={
          <Upload
            name="avatar"
            size={200}
            accept={".jpg, .png"}
            action={handleUpload}
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <Avatar
                imageUrl={imageUrl}
                color={color}
                size={300}
                rounded="circle"
                border={2}
                blur={true}
                borderColor="primary"
                alt={name}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        }
      >
        <Card.Meta
          title={<h2 className="user-profile__name">{name}</h2>}
          style={{ textAlign: "center" }}
        />
      </Card>

      <Form
        name="normal_change_password"
        className="change_password-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            passwordVerifier,
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setChangePassword({
                ...changePassword,
                password: e.target.value,
              });
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            matchingPasswords,
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setChangePassword({
                ...changePassword,
                confirmPassword: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}></Form.Item>
      </Form>
      <div
        style={{
          textAlignLast: "center",
          marginBottom: "1rem",
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{
            width: "-webkit-fill-available",
          }}
          size="large"
          onClick={handlePasswordChange}
        >
          Change Password
        </Button>
      </div>
      <div
        style={{
          textAlignLast: "center",
          marginBottom: "1rem",
        }}
      >
        <Button
          type="secondary"
          htmlType="submit"
          className="login-form-button"
          style={{
            width: "-webkit-fill-available",
          }}
          size="large"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "success"]),
  mail: PropTypes.string,
  phone: PropTypes.string,
  handleUpload: PropTypes.func.isRequired,
  beforeUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  changePassword: PropTypes.object.isRequired,
    setChangePassword: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
};

UserProfile.defaultProps = {
  imageUrl: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  className: undefined,
  color: undefined,
  mail: undefined,
  phone: undefined,
};

export default UserProfile;
