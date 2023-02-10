import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Pagination,
  Table,
  Popconfirm,
  Card,
  message,
  Switch,
} from "antd";
import PageWrapper from "../../layout/PageWrapper/PageWrapper";
import Page from "../../layout/Page/Page";
import { Space, Input, Row, Col } from "antd";
import Logo from "../../components/Logo";
import ProfileModal from "../../components/ProfileModal";
import TodoCreateModal from "../../components/TodoCreateModal";
import TodoUpdateModal from "../../components/TodoUpdateModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as authActions from "../../lib/actions/auth-actions";
import AuthContext from "../../contexts/authContexts";
import * as todoActions from "../../lib/actions/todo-actions";
import * as moment from "moment";
import { useParams } from "react-router-dom";
import SharedTodoModal from "../../components/SharedTodoModal";
import { useNavigate } from "react-router-dom";
import { PublicTodosList } from "../../components/PublicTodosList";

const Todos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    todo: "",
    dueDate: "",
    dueTime: "",
  });
  const [search, setSearch] = useState("");
  const [showPublic, setShowPublic] = useState(false);
  const [openModalSharedTodo, setOpenModalSharedTodo] = useState(false);
  const [visibleProfile, setVisibleProfile] = useState(false);
  const [visibleTodo, setVisibleTodo] = useState(false);
  const [visibleUpdateTodo, setVisibleUpdateTodo] = useState(false);
  const { todoId, sharingId } = useParams();
  const { myProfile } = useSelector((state) => state.myProfile);
  const { token } = useSelector((state) => state.auth);
  const { setToken } = useContext(AuthContext);
  const { todos, pagination, todoShared, publicTodos, publicPagination } = useSelector((state) => state.todo);

  const onSigninOut = () => {
    dispatch(authActions.logout());
    setVisibleProfile(false);

    if (token) {
      setToken("");
      window.location.reload();
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(
      todoActions.getTodosByFilter({
        page: 1,
        limit: 10,
        todo: e.target.value,
      })
    );
  };

  const showModalProfile = () => {
    setVisibleProfile(true);
  };

  const showModalTodo = () => {
    setVisibleTodo(true);
  };

  const handleOnChangePage = (page, pageSize) => {
    dispatch(
      todoActions.getTodosByFilter({ page, limit: pageSize, todo: search })
    );
  };

  const onDeleteTodo = (id) => {
    dispatch(todoActions.deleteTodo(id));
    dispatch(
      todoActions.getTodosByFilter({
        page: pagination?.page,
        limit: pagination?.limit,
      })
    );
  };

  const handleCreateTodo = () => {
    setVisibleTodo(false);

    if (!todo.todo || !todo.dueDate || !todo.dueTime) {
      return;
    }

    const payload = {
      todo: todo.todo,
      dueAt: moment(
        moment(todo.dueDate, "DD-MM-YYYY").format("YYYY-MM-DD") +
          " " +
          todo.dueTime
      ).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    };

    dispatch(todoActions.createTodo(payload));
    dispatch(
      todoActions.getTodosByFilter({
        page: pagination?.page,
        limit: pagination?.limit,
      })
    );

    setTodo({
      todo: "",
      dueDate: "",
      dueTime: "",
    });
  };

  const handleUpdateTodo = () => {
    setVisibleUpdateTodo(false);

    if (!todo.todo || !todo.dueDate || !todo.dueTime) {
      return;
    }

    const payload = {
      todo: todo.todo,
      dueAt: moment(
        moment(todo.dueDate, "DD-MM-YYYY").format("YYYY-MM-DD") +
          " " +
          todo.dueTime
      ).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    };

    dispatch(todoActions.updateTodo(todo.id, payload));

    setTodo({
      todo: "",
      dueDate: "",
      dueTime: "",
    });
  };

  const handleOnCancel = () => {
    setVisibleTodo(false);
    setVisibleUpdateTodo(false);
    setTodo({
      todo: "",
      dueDate: "",
      dueTime: "",
    });
  };

  const handleUpdateData = (record) => {
    setTodo({
      id: record.id,
      todo: record.todo,
      dueDate: record.dueAt.split(" ")[0],
      dueTime: record.dueAt.split(" ")[1],
    });
    setVisibleUpdateTodo(true);
  };

  const handleCopyLink = (record) => {
    navigator.clipboard.writeText(record?.linkToShare);
    message.success("Link copied to clipboard");
  };

  const handleOnCancelSharedTodo = () => {
    setOpenModalSharedTodo(false);
    dispatch(todoActions.deleteSharedTodoAfterView());

    navigate("../");
  };

  const handleUpdatePublic = (record, value) => {
    dispatch(
      todoActions.updatePublicity(record, {
        public: value,
      })
    );

    dispatch(
      todoActions.getTodosByFilter({
        page: pagination?.page,
        limit: pagination?.limit,
      })
    );
  };

  const handleClickView = (record) => {
    dispatch(
      todoActions.getSharedTodo({
        todoId: record.id,
      })
    );

    setOpenModalSharedTodo(true);
  };

  const handleOnChangePagePublic = (page) => {
    dispatch(
      todoActions.getPublicTodos({
        page,
        limit: publicPagination?.limit,
      })
    );
  };

  useEffect(() => {
    dispatch(
      todoActions.getTodosByFilter({
        page: 1,
        limit: 10,
      })
    );

    dispatch(
      todoActions.getPublicTodos({
        page: 1,
        limit: 10,
      })
    );

    if (todoId || sharingId) {
      dispatch(
        todoActions.getSharedTodo({
          todoId,
          sharingId,
        })
      );

      setOpenModalSharedTodo(true);
    }
  }, [dispatch, todoId, sharingId]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Todo",
      dataIndex: "todo",
      key: "todo",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Due Date",
      dataIndex: "dueAt",
      key: "dueAt",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Public",
      dataIndex: "public",
      key: "public",
      render: (_, record) => (
        <Switch
          checkedChildren={
            <div>
              <div>Public</div>
            </div>
          }
          unCheckedChildren={
            <div>
              <div>Private</div>
            </div>
          }
          defaultChecked={record?.isPublic}
          onChange={(checked) => handleUpdatePublic(record.id, checked)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title={
              <div>
                <Card>
                  <Card.Meta
                    title="Share Link"
                    description={
                      <div
                        style={{
                          backgroundColor: "rgb(212 228 252)",
                          padding: "10px",
                          borderRadius: "5px",
                          boxShadow: "0 0 5px 0 rgb(0 0 0 / 20%)",
                        }}
                      >
                        <p>{record?.linkToShare}</p>
                      </div>
                    }
                  />
                </Card>
              </div>
            }
            onConfirm={() => handleCopyLink(record)}
          >
            <Button type="submit">Share</Button>
          </Popconfirm>
          <Button onClick={() => handleClickView(record)}>View</Button>
          <Popconfirm
            title="Sure to update?"
            onConfirm={() => handleUpdateData(record)}
          >
            <Button type="primary">Update</Button>
          </Popconfirm>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDeleteTodo(record.id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageWrapper title="Todos" className="bg-dark">
      <Page>
        <div className="row align-items-center justify-content-center" style={{ height: 'unset'}}>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Space direction="vertical">
                  <Logo width={100} height={100} />
                </Space>
              </Col>
              <br />
              <Col
                span={12}
                className="text-align-last-end"
                style={{ WebkitWritingMode: "vertical-rl" }}
              >
                <Space direction="vertical">
                  <Button onClick={showModalProfile} type="success">
                    Menu
                  </Button>
                  <ProfileModal
                    profile={myProfile}
                    openModal={visibleProfile}
                    onOk={() => setVisibleProfile(false)}
                    onCancel={() => setVisibleProfile(false)}
                    onSigninOut={onSigninOut}
                  />
                </Space>
              </Col>
              <br />
              <Col span={12}>
                <Space direction="vertical">
                  <Input
                    placeholder="Basic usage"
                    size="large"
                    onChange={handleSearch}
                  />
                </Space>
              </Col>
              <br />
              <Col span={12} className="text-align-last-end">
                <Space direction="vertical">
                  <Button onClick={showModalTodo} type="primary">
                    New Todo
                  </Button>
                  <TodoCreateModal
                    todo={todo}
                    setTodo={setTodo}
                    openModal={visibleTodo}
                    handleCreateTodo={handleCreateTodo}
                    onOk={() => setVisibleTodo(false)}
                    onCancel={() => setVisibleTodo(false)}
                  />
                </Space>
              </Col>
            </Row>
            <br />
            <Table
              responsive
              columns={columns}
              dataSource={todos}
              scroll={{
                x: 1500,
              }}
              pagination={false}
            />
            <br />
            <Pagination
              total={pagination?.total}
              showTotal={(total) => `Total ${total} items`}
              pageSizeOptions={[5, 10, 20, 50]}
              defaultPageSize={pagination?.limit}
              defaultCurrent={pagination?.page}
              style={{ textAlign: "center" }}
              onChange={handleOnChangePage}
            />
          </div>
        </div>
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-xl-12 col-lg-12 col-md-12 shadow-3d-container">
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Space direction="vertical">
                  <Button 
                    onClick={() => setShowPublic(true)} 
                    type="primary" 
                    hidden={showPublic}
                  >
                    Show Public
                  </Button>
                  <Button 
                    onClick={() => setShowPublic(false)} 
                    type="primary" 
                    hidden={!showPublic}
                  >
                    Close Public
                  </Button>
                </Space>
              </Col>
              <br />
            </Row>
            {
                showPublic && (
                  <PublicTodosList 
                    list={publicTodos}
                    pageSize={pagination?.limit}
                    onChangePage={handleOnChangePagePublic}
                  />
                )
            }
            <br />
          </div>
        </div>
        <TodoUpdateModal
          openModal={visibleUpdateTodo}
          handleUpdateTodo={handleUpdateTodo}
          onCancel={handleOnCancel}
          todo={todo}
          setTodo={setTodo}
        />
        <SharedTodoModal
          openModal={todoShared && todoShared?.id && openModalSharedTodo ? true : false}
          todo={todoShared}
          onCancel={handleOnCancelSharedTodo}
        />
      </Page>
    </PageWrapper>
  );
};

export default Todos;
