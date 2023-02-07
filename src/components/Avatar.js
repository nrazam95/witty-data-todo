import React, { Children, cloneElement, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar as AndtdAvatar } from 'antd';

export const AvatarGroup = ({ children, className, size}) => {
    return (
        <div className='avatar-group'>
            <div className='avatar-container'>
                {Children.map(children, (child, index) => 
                    index < 3 
                    ? cloneElement(child, {
                        borderColor: 'white',
                        border: 2,
                        color: child.props.color,
                        size,
                    })
                    : null,
                )}
            </div>
        </div>
    )
};

AvatarGroup.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    size: PropTypes.number,
}

AvatarGroup.defaultProps = {
    className: undefined,
    size: 32,
}

const Avatar = forwardRef(
    (
        {
            src,
            className,
            size,
            rounded,
			shadow,
			color,
			border,
			borderColor,
			userName,
            blur,
			...props
        },
        ref,
    ) => {
        const INNER = (
            <AndtdAvatar
                {...props}
                ref={ref}
                src={src}
                className={`avatar ${className}`}
                size={size}
                shape={rounded}
                style={{
                    filter: blur ? 'blur(5px)' : 'none',
                }}
            />
        )

        return INNER;
    }
)

Avatar.displayName = 'Avatar';
Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.number,
    rounded: PropTypes.oneOf([
        'circle',
        'pill',
        'square',
    ]),
    color: PropTypes.oneOf([
        null,
        'primary',
        'secondary',
        'success',
    ]),
    shadow: PropTypes.oneOf([null, 'none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner', 'outline']),
    border: PropTypes.oneOf([null, 0, 1, 2, 4, 8]),
    borderColor: PropTypes.oneOf([
        null,
        'primary',
        'secondary',
        'success',
    ]),
    userName: PropTypes.string,
    blur: PropTypes.bool,
}

Avatar.defaultProps = {
    className: undefined,
    size: 128,
    rounded: 'circle',
    color: null,
    shadow: null,
    border: null,
    borderColor: null,
    userName: undefined,
    blur: false,
}

export default Avatar;