import React from "react";
// import { Header } from "antd/es/layout/layout";
import { Routes, Route } from "react-router-dom";
import headers from "../../routes/headerRoutes";

const HeaderRoutes = () => {
    return (
        <Routes>
            {headers.map((page) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Route key={page.path} {...page} />
            ))}
        </Routes>
    );
}

export default HeaderRoutes;