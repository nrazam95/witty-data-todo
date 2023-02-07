import React from 'react';
import PropTypes from 'prop-types';
import LogoTodo from '../assets/logos/todo-logo.png';

const Logo = ({ width, height }) => {
    return (
        <img
            src={LogoTodo}
            alt='Logo'
            width={width}
            height={height}
            className='img-fluid'
        />
    );
}
Logo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};
Logo.defaultProps = {
    width: 2155,
    height: 854,
};

export default Logo;