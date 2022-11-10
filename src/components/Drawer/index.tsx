import {
  ProductsContainer,
  ImageContainer,
  DrawerContainer,
  Footer,
  ButtonClose,
  BuyButton,
  ProductContainer,
} from '../../styles/components/drawer';

import { X } from 'phosphor-react'
import { formatter } from '../../utils/formatter';

import { useContext } from 'react';

import { PurchaseContext } from '../../context/context';
import Image from 'next/image';

interface DrawerProps {
  show: boolean,
  onHandleCloseDrawer: () => void,
}


export default function Drawer({show, onHandleCloseDrawer}: DrawerProps)  {

  const { cart, buyProduct, total  } = useContext(PurchaseContext);

  function HandleCloseDrawer(){
    onHandleCloseDrawer();
  };

  async function handleBuyProduct() {
    buyProduct();
  }

  return (
    <>
    <DrawerContainer variant={show ? 'show': 'hidden'} >
    <ButtonClose onClick={HandleCloseDrawer}>
        <X size={24} weight="bold" />
        </ButtonClose>
      <header>
        <h4>Sacola de Compras</h4>
       
      </header>
      <ProductsContainer>

      {cart.map((product) => (
        <Product  key={product.id} {...product}/>
      ))}
      </ProductsContainer>

      <Footer>
        <div>
          <span>Quantidade</span>
          <span>{cart.length} itens</span>
        </div>
        <div>
          <strong>Valor total</strong>
          <strong>
            {formatter.format(total)}
          </strong>
        </div>
      </Footer>
      <BuyButton onClick={handleBuyProduct}>
        Finalizar Compra
      </BuyButton>
    
    </DrawerContainer>
    </>
  );
};

interface ProductProps {
id: string;
name: string;
imageUrl: string;
price: string;
}

const Product = ({ id, name, imageUrl, price }: ProductProps) => {
const { removeFromCart } = useContext(PurchaseContext);

const handleRemoveFromCart = () => {
  removeFromCart(id);
};

return (
  <ProductContainer>
  <ImageContainer>
    <Image src={imageUrl} height={94.79} width={94.79} alt={name} />
  </ImageContainer>
  
  <div>
    <h5>{name}</h5>
    <strong>{price}</strong>
    <button 
    onClick={handleRemoveFromCart}
    >Remover</button>
  </div>
  </ProductContainer>
);
};

