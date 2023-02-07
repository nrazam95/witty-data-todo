import React from "react";
import PropTypes from "prop-types";

const Header = ({ children, ...props }) => {
    return(
        <>
            <header
                className='header header-right-open'
            >
                <div className='container-fluid'>
                    <div className='row d-flex align-items-center'>
                        {children}
                    </div>
                </div>
            </header>
        </>
    )
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Header;