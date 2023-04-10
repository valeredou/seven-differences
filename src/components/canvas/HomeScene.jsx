import { Box, Text, Html } from '@react-three/drei'
import { useRouter } from 'next/router'

const HomeScene = (props) => {
  const router = useRouter()

  return (
    <>
      <Text position={[0, -1.5, 0]} color='black' anchorX='center' anchorY='middle'>
        7 differences
      </Text>

      <Box onClick={() => router.push('/play')}>
        <Html scale={1} rotation={[0, 0, 0]} position={[0, 0, 0.51]} transform occlude>
          <div className='text' style={{ color: 'red' }}>
            PLAY
          </div>
        </Html>
      </Box>
    </>
  )
}

export default HomeScene
