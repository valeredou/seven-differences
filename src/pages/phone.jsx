import Instructions from '@/components/dom/instructions'
import dynamic from 'next/dynamic'

const Phone = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = () => {
  return (
    <>
      <Phone r3f route='/' />
      <Instructions />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Phone',
    },
  }
}
