import { Avatar as AntAvatar, List, Space } from "antd";
import React from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { PropTypes } from "prop-types";
import Avatar from "./Avatar";

export const PublicTodosList = ({ list, pageSize, total, onChangePage, ...props }) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          onChangePage(page);
        },
        pageSize: pageSize,
        pageSizeOptions: [5, 10, 20, 50],
        total: total,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,

      }}
      dataSource={list}
      footer={
        <div>
          <b>List of public todo.</b> Enjoy!
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.todo}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <Avatar
              imageUrl={item.user.imageUrl}
              srcS
              color="primary"
              size={300}
              rounded="circle"
              border={2}
              blur={false}
              borderColor="primary"
              alt={item.user.name}
            />
          }
        >
          <List.Item.Meta
            avatar={<AntAvatar src={item.user.imageUrl} />}
            title={<a href={item.linkToShare}>{item.name}</a>}
            description={item.createdAt}
          />
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
                {item.todo}
              </p>
              <br />
              <p>Due Date: {item.dueAt}</p>
            </div>
            <p>Created At: {item.createdAt}</p>
          </div>
        </List.Item>
      )}
    />
  );
};

PublicTodosList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      todo: PropTypes.string.isRequired,
      dueAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

PublicTodosList.defaultProps = {
  list: [],
  pageSize: 5,
  total: 0,
  onChangePage: () => {},
};
