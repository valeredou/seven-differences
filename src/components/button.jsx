const Button = ({ children, ...props }) => {
  return (
    <button className={'button ' + props.className} onClick={props.onClick}>
      {children}
    </button>
  )
}

export default Button
