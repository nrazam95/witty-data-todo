import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const PageWrapper = forwardRef(({ isProtected, title, description, className, children }, ref) => {
    // useEffect(() => {
    //     if (isProtected && user === '') {
    //         navigate(`../${demoPagesMenu.login.path}`);
    //     }
    //     return () => {};
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    
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