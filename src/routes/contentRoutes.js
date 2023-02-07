import React, { lazy } from "react";
import SignUp from "../pages/auth/SignUp";
import Profile from "../pages/profile/Profile";
import Todos from "../pages/todo/Todo";

const Login = lazy(() => import('../pages/auth/Login'));

const auths = [
    {
        path: '/signin',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/todo',
        element: <Todos />,
    }
]


const contents = [
    ...auths,
]

export default contents;