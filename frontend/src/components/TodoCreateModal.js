import { Form, Input, Modal, Button, DatePicker, TimePicker } from "antd";
import React from "react";
import PropTypes from "prop-types";

const TodoCreateModal = ({
  todo,
  setTodo,
  handleCreateTodo,
  openModal,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Create Todo"
      open={openModal}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Form layout="vertical">
        <Form.Item label="What To Do">
          <Input
            id="todoTitle"
            size="large"
            placeholder="What To Do"
            onChange={(e) => {
              setTodo({
                ...todo,
                todo: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Expected Due Date">
          <DatePicker
            id="todoDueDate"
            style={{
              minWidth: "-webkit-fill-available",
            }}
            size="large"
            format={"DD-MM-YYYY"}
            onChange={(date, dateString) => {
              setTodo({
                ...todo,
                dueDate: dateString,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Expected Due Time">
          <TimePicker
            id="todoDueTime"
            style={{
              minWidth: "-webkit-fill-available",
            }}
            size="large"
            onChange={(time, timeString) => {
              setTodo({
                ...todo,
                dueTime: timeString,
              });
            }}
          />
        </Form.Item>
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
          onClick={handleCreateTodo}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};

TodoCreateModal.propTypes = {
  todo: PropTypes.object.isRequired,
  setTodo: PropTypes.func.isRequired,
  handleCreateTodo: PropTypes.func.isRequired,
  openModal: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

TodoCreateModal.defaultProps = {
  todo: {},
  setTodo: () => {},
  handleCreateTodo: () => {},
  openModal: false,
  onOk: () => {},
  onCancel: () => {},
};

export default TodoCreateModal;
