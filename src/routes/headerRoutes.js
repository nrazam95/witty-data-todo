import DefaultHeader from "../pages/layout/headers/DefaultHeader"

const headers = [
    {
        path: '/signin',
        element: null,
    },
    {
        path: '/signup',
        element: null,
    },
    {
        path: '/profile',
        element: <DefaultHeader />,
    },
    {
        path: '/todo',
        element: <DefaultHeader />,
    }
]

export default headers