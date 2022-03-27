import { useState } from 'react'
import { useQuery } from 'react-query';
//Components
import Drawer from '@material-ui/core/Drawer'
import Cart from './Cart/Cart'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Item from './Item/Item'
//Styles 
import { Wrapper, StyledButton } from './App.styles'
//Types from API
export type CartItemType = {
  id: number;
  category: string;
  describtion: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json(); //dbl await to convert it to Json

const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]); //empty array set as cartitem TYPE

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => 
  items.reduce((ack: number, item) => ack + item.amount, 0); //add amount to total amount
  //accumulator gives initial value of 0 and add amount of each item

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
       // 1. Is the item already added in the cart?
       // It is tocheck if the item i clicked exist in the cart by comparing these two id's, look throught the stuffs and it returns true or false when find something
       const isItemInCart = prev.find(item => item.id === clickedItem.id);

       if (isItemInCart) {
         return prev.map(item => (
           item.id === clickedItem.id
           ? { ...item, amount: item.amount + 1}
           : item
         ));
       }
       // First time the item is added
       return [...prev, { ...clickedItem, amount: 1}];
    });
  };
  
// * HANDLE REMOVE FROM cART FUNCTION
// set the cart item, previous state called reduce, 
// ack that starts with an empty array and specified as CartItemType array,
// check if the item.id is equal to the id is sending as argument, 
// when id is equal to 1 the ack is returning
// and skip this item and deleted from array otherwise it returns a new array where i spred out ack
// then i have a new object when the items are spreated out and remove 1 from amount
// otherwise i return the item at it is
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => 
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount -1}];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
      );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>


  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
          cartItems={cartItems} 
          addToCart={handleAddToCart} 
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
          {data?.map(item => (
            <Grid item 
            key={item.id} 
            xs={12} 
            sm={3}>
              <Item item={item} 
              handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
      </Grid>
    </Wrapper>
    
  );
}

export default App;
