import { Form, Input, Modal, Button, DatePicker } from "antd";
import React from "react";
import PropTypes from "prop-types";

const TodoCreateModal = ({
    openModal,
    onOk,
    onCancel,
}) => {
    return (
        <Modal title="Create Todo" open={openModal} onOk={onOk} onCancel={onCancel} footer={[]}>
            <Form layout="vertical">
                <Form.Item label="What To Do">
                    <Input />
                </Form.Item>
                <Form.Item label="Expected Due Date">
                    <DatePicker  style={{
                    minWidth: "-webkit-fill-available",
                }}/>
                </Form.Item>
            </Form>

            <div style={{
                textAlignLast: "center",
                marginBottom: "1rem",
            }}>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{
                    width: "-webkit-fill-available",
                }} size="large">
                    Create
                </Button>
            </div>
        </Modal>
    )
}

TodoCreateModal.propTypes = {
    openModal: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
}

TodoCreateModal.defaultProps = {
    openModal: false,
    onOk: () => {},
    onCancel: () => {},
}

export default TodoCreateModal;