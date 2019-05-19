import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Button extends Component {
    render() {
        const { children, action } = this.props;
        return <>
            <button style={{
                flex: 1,
                border: '1px solid #eee',
                backgroundColor: '#222',
                color: 'white',
                padding: 10,
                margin: 20,
                fontSize: 24,
                boxShadow: '0px 0px 10px 2px white',
                borderRadius: 2
            }}
                onClick={action}
            >
                {children}
            </button>
        </>
    }
}
Button.protoTypes = {
    message: PropTypes.string

}
Button.defaultType = {
    message: 'Button Text'

}
export default Button;