import React from 'react'

const Button = ({textOnly, children, ...props}) => {

    let cssClasses = textOnly ? 'text-button': 'button'
  return (
    <button className={cssClasses} {...props}>{children}</button>
  )
}

export default Button
