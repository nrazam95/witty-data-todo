const getUserName = (req, res) => {
    res.json({ 
        text: 'Hello World',
     });
}

export const authRoutes = {
    routes: () => ([
        {
            method: 'get',
            path: '/username',
            handler: getUserName,
        },
    ]),
}