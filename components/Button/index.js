import React from 'react'
import PropTypes from 'prop-types'
import ButtonStyles from './button.style'

export function Button({
    type,
    id,
    htmlType,
    onClick,
    children,
    disabled,
    style,
    className,
}) {
    return (
        <ButtonStyles>
            <button
                id={id}
                disabled={disabled}
                onClick={onClick}
                className={`${className} ${type}`}
                type={htmlType}
                style={style}
            >
                {children}
            </button>
        </ButtonStyles>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf([
        'primary',
        'secondary',
        'white',
        'no-border',
        'red',
        'green',
    ]),
    htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
    style: PropTypes.shape({}),
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

Button.defaultProps = {
    id: null,
    onClick: () => {},
    type: 'primary',
    htmlType: 'button',
    style: {},
    disabled: false,
    className: '',
}
