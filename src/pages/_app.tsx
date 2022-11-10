import type { AppProps } from 'next/app'
import { globalStyles } from "../styles/global"
import logoImg from "../assets/logo.svg"
import { Button, Container, Header } from "../styles/pages/app"
import Image from 'next/image'
import Drawer from '../components/Drawer'
import { Handbag } from 'phosphor-react'
import { useState } from 'react'
import Link from "next/link"
import { PurchaseProvider } from '../context/context'





globalStyles()


export default function App({ Component, pageProps }: AppProps) {
  const [showDrawer, setShowDrawer] = useState(false);

  function handleCloseDrawer()  {
    setShowDrawer(false);
  };

  function handleOpenDrawer() {
    setShowDrawer(true);
  };

 

  return (
    <PurchaseProvider>
    <Container>
      <Header>
      <Link href={`/`}>
        <Image src={logoImg} alt="teste" />
        </Link>
        
        <Button onClick={handleOpenDrawer}>
          <div>
          <Handbag size={24} weight="bold" />
          </div>
        
        </Button>
       
        <Drawer show={showDrawer} onHandleCloseDrawer={handleCloseDrawer}/>
       
      </Header>

      <Component {...pageProps} />
    </Container>
    </PurchaseProvider>
  )
}
