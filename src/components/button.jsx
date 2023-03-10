import { motion } from 'framer-motion'

const Button = ({ children, ...props }) => {
  return (
    <motion.button {...props} className={'button ' + props.className} onClick={props.onClick}>
      {children}
    </motion.button>
  )
}

export default Button
