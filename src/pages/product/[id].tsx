import { GetStaticPaths, GetStaticProps } from "next"

import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe"; 
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { formatter } from "../../utils/formatter";
import Head from "next/head";

import {  useContext } from 'react';

import { PurchaseContext } from '../../context/context';

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

export default function Product({ product }: ProductProps) {

  const { addToCart } = useContext(PurchaseContext);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  // async function handleBuyButton() {
  //   try {
  //     setIsCreatingCheckoutSession(true);

  //     const response = await axios.post('/api/checkout', {
  //       priceId: product.defaultPriceId,
  //     })

  //     const { checkoutUrl } = response.data;

  //     window.location.href = checkoutUrl;
  //   } catch (err) {
  //     setIsCreatingCheckoutSession(false);

  //     alert('Falha ao redirecionar ao checkout!')
  //   }
  // }
  
  return (
    <>
     <Head>
        <title>{product.name}</title>
      </Head>
   
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleAddToCart}>
          Colocar na sacola
        </button>
      </ProductDetails>
    </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'prod_Ml5BG9CQxxAKMM' }
      }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: formatter.format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}