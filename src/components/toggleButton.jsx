import { useState } from 'react'
import { motion } from 'framer-motion'

export const ToggleButton = ({ ...props }) => {
  const [isOn, setIsOn] = useState(props.toggleState ?? false)

  const toggleSwitch = () => setIsOn(!isOn)

  return (
    <div
      className='switch'
      data-isOn={isOn}
      onClick={() => {
        toggleSwitch()
        console.log('click dans le toggle')
        props.onClick()
      }}>
      <motion.div className='handle' layout transition={spring} />
    </div>
  )
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}
