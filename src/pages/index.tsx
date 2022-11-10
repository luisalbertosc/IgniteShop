
import { GetStaticProps } from "next"
import { stripe } from "../lib/stripe"
import Link from "next/link"

import {  useContext } from 'react';
import { PurchaseContext } from '../context/context';

import Head from 'next/head'

import Image from "next/image"
import { ButtonAddCart, HomeContainer, Product } from "../styles/pages/home"
import { useKeenSlider } from 'keen-slider/react'


import 'keen-slider/keen-slider.min.css'

import Stripe from "stripe"
import { formatter } from "../utils/formatter"
import { Handbag } from "phosphor-react"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Home({ products }: HomeProps, { product }: ProductProps) {

  const { addToCart } = useContext(PurchaseContext);

    const handleAddToCart = () => {
      addToCart({ ...product, quantity: 1 });
    };
  
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });
  return (
  
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
              <Product className="keen-slider__slide"  key={product.id}>
                <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                </Link>
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                 
                 <ButtonAddCart onClick={handleAddToCart}>
                    <Handbag size={32} weight="bold" />
                 </ButtonAddCart>
                
                </footer>
              </Product>
          )
        })}
      </HomeContainer>
    </>
 
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formatter.format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
  
}