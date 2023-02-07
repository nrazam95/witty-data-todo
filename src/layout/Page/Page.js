import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Page = forwardRef(
    ({ children, className, container, ...props }, ref) => {
        return (
            <div
                className={`page ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Page.displayName = 'Page';
Page.propTypes = {
    children: PropTypes.node.isRequired,
    container: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([null, 'sm', 'md', 'lg', 'xl', 'xxl']),
    ]),
    className: PropTypes.string,
};
Page.defaultProps = {
    container: 'xxl',
    className: undefined,
};

export default Page;