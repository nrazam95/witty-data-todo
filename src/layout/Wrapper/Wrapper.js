import React from "react";
// import PropTypes from "prop-types";
import Content from "../Content/Content";
import { Layout } from "antd";
import HeaderRoutes from "../Header/HeaderRoutes";

// export const WrapperContainer = ({ children, className, ...props }) => {
//     return (
//         <div
//         className={`wrapper ${className}`}
//         {...props}
//         >
//         {children}
//         </div>
//     );
// }

// WrapperContainer.propTypes = {
//     children: PropTypes.node.isRequired,
//     className: PropTypes.string,
// };

// WrapperContainer.defaultProps = {
//     className: undefined,
// };

export const Wrapper = () => {
    return (
        <Layout>
            <HeaderRoutes />
            <Content/>
        </Layout>
    );
}