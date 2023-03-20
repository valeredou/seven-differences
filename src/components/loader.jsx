import { Html, useProgress } from '@react-three/drei'

export const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return (
    <Html wrapperClass='loader' center>
      {Math.round(progress)} % loaded
    </Html>
  )
}
