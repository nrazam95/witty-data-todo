import React, { forwardRef, useContext, useEffect, useLayoutEffect } from "react";
import AuthContext from "../../contexts/authContexts";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PageWrapper = forwardRef(({ isProtected, title, description, className, children }, ref) => {
    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (isProtected && !token) {
            navigate('/signin');
        }
        return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div 
            ref={ref} 
            className={`page-wrapper ${className}`}
        >
            {children}
        </div>
    );
});

PageWrapper.displayName = "PageWrapper";
PageWrapper.propTypes = {
    isProtected: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
PageWrapper.defaultProps = {
    isProtected: true,
    title: undefined,
    description: undefined,
    className: undefined,
};

export default PageWrapper;