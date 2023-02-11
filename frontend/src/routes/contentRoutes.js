import React, { lazy } from "react";
import SignUp from "../pages/auth/SignUp";
import Profile from "../pages/profile/Profile";
import Todos from "../pages/todo/Todo";

const Login = lazy(() => import('../pages/auth/Login'));

const auths = [
    {
        path: '/',
        element: <Todos />,
    },
    {
        path: '/signin',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
]

const profile = [
    {
        path: '/profile',
        element: <Profile />,
    },
]

const todos = [
    {
        path: '/todo',
        element: <Todos />,
    },
    {
        path: '/share/:todoId/:sharingId',
        element: <Todos />,
    },
    {
        path: '/share/:todoId/',
        element: <Todos />,
    }
]

const contents = [
    ...auths,
    ...profile,
    ...todos,
]

export default contents;