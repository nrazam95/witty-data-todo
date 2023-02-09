import { Modal, Card } from "antd";
import React from "react";
import PropTypes from "prop-types";
import Avatar from "./Avatar";

const SharedTodoModal = ({ todo, openModal, onCancel, ...props }) => {
  return (
    <Modal
      title={`Shared Todo: [ID: ${todo?.id}]`}
      open={openModal}
      onCancel={onCancel}
      footer={[]}
    >
      <Card
        {...props}
        bordered={false}
        className="text-align-last-center remove-box-shadow"
        cover={
          <div>
            <Avatar
              imageUrl={todo?.user?.imageUrl}
              color="primary"
              size={100}
              rounded="circle"
              border={2}
              blur={false}
              borderColor="primary"
              alt={todo?.user?.name}
            />
          </div>
        }
      >
        <Card.Meta
          title={<h2 className="user-profile__name">{todo?.user?.name}</h2>}
          description={
            <div>
              <div
                style={{
                  backgroundColor: "rgb(212 228 252)",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 0 5px 0 rgb(0 0 0 / 20%)",
                }}
              >
                <p
                  style={{
                    fontSize: "25px",
                  }}
                >
                  {todo?.todo}
                </p>
                <br />
                <p>Due Date: {todo?.dueAt}</p>
              </div>
              <p>Created At: {todo?.createdAt}</p>
            </div>
          }
          style={{ textAlign: "center", marginBottom: "1rem" }}
        />
      </Card>
    </Modal>
  );
};

SharedTodoModal.propTypes = {
  todo: PropTypes.object.isRequired,
  openModal: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
};

SharedTodoModal.defaultProps = {
  todo: {},
  openModal: false,
  onCancel: () => {},
};

export default SharedTodoModal;
