import Head from 'next/head'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import PrivacyPolicy from '@/componentsContainers/PrivacyPolicy'



export default function Home() {
  const router = useRouter()
  const tagId = router.query.tagId;
  return (
    <>
      <Head>
        <title>Blog Bartosz</title>
        <meta name="description" content="Simple blog app with sb and nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Header></Header>
     
      <main className='flex bg-gray-100 '>
        {/* Left Sidebar */}
        {/* Feed Create Post and Posts */}
        <PrivacyPolicy/>
        {/* Right Sidebar */}
       
      </main>
    </>
  )
}