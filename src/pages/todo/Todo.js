import React, { useState } from "react";
import { Button, Table } from "antd";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import Page from "../../layout/Page/Page";
import { Space, Tag, Input, Row, Col } from "antd";
import Logo from "../../components/Logo";
import ProfileModal from "../../components/ProfileModal";
import TodoCreateModal from "../../components/TodoCreateModal";

const Todos = () => {
    const [visibleProfile, setVisibleProfile] = useState(false);
    const [visibleTodo, setVisibleTodo] = useState(false);

    const showModalProfile = () => {
        setVisibleProfile(true);
    };

    const showModalTodo = () => {
        setVisibleTodo(true);
    };
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

    return (
        <PageWrapper
            title="Todos"
            className="bg-dark"
        >
            <Page>
                <div className="row h-100 align-items-center justify-content-center">
                    <div className='col-xl-12 col-lg-12 col-md-12 shadow-3d-container'>
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Space direction="vertical">
                                    <Logo 
                                        width={100}
                                        height={100}
                                    />
                                </Space>
                            </Col>
                            <Col span={12} className="text-align-last-end" style={{ WebkitWritingMode: "vertical-rl" }}>
                                <Space direction="vertical">
                                    <Button onClick={showModalProfile} type="success">Menu</Button>
                                    <ProfileModal
                                        openModal={visibleProfile}
                                        onOk={() => setVisibleProfile(false)}
                                        onCancel={() => setVisibleProfile(false)}
                                    />
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space direction="vertical">
                                    <Input placeholder="Basic usage" />
                                </Space>
                            </Col>
                            <Col span={12} className="text-align-last-end">
                                <Space direction="vertical">
                                    <Button onClick={showModalTodo} type="primary">New Todo</Button>
                                    <TodoCreateModal
                                        openModal={visibleTodo}
                                        onOk={() => setVisibleTodo(false)}
                                        onCancel={() => setVisibleTodo(false)}
                                    />
                                </Space>
                            </Col>
                        </Row>
                        <Table columns={columns} dataSource={data} scroll={
                            {
                                x: 1500,
                            }
                        } />
                    </div>
                </div>
            </Page>
        </PageWrapper>
    );
}

export default Todos;