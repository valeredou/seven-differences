const Button = ({ children, ...props },) => {
  return ( 
    <button className={"button " + props.className}>
      {children}
    </button>
   );
}
 
export default Button;
