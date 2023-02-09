import { Form, Input, Modal, Button, DatePicker, TimePicker } from "antd";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TodoUpdateModal = ({
  todo,
  setTodo,
  handleUpdateTodo,
  openModal,
  onOk,
  onCancel,
}) => {
    console.log(todo)
  return (
    <Modal
      title={`Update Todo: [ID: ${todo?.id}]`}
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
            value={todo?.todo}
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
            value={todo?.dueDate ? moment(todo?.dueDate, "DD-MM-YYYY") : moment("01-01-2021", "DD-MM-YYYY")}
            onChange={(date, dateString) => {
                console.log(date)
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
            value={todo?.dueTime ? moment(todo?.dueTime, "HH:mm:ss") : moment("00:00:00", "HH:mm:ss")}
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
          onClick={handleUpdateTodo}
        >
          Update
        </Button>
      </div>
    </Modal>
  );
};

TodoUpdateModal.propTypes = {
  todo: PropTypes.object.isRequired,
  setTodo: PropTypes.func.isRequired,
  handleUpdateTodo: PropTypes.func.isRequired,
  openModal: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

TodoUpdateModal.defaultProps = {
  todo: {},
  setTodo: () => {},
  handleUpdateTodo: () => {},
  openModal: false,
  onOk: () => {},
  onCancel: () => {},
};

export default TodoUpdateModal;
