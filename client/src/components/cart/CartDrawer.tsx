import { useEffect } from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import { styled } from '@mui/system';

import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import useShoppingCart from '../../hooks/common/useShoppingCart';
import {
  countTotalPrice,
  getUsersShoppingCart,
} from '../../redux/slices/cartSlice';
import CartContent from './CartContent';
import CartHeading from './CartHeading';
import EmptyCartContent from './EmptyCartContent';

const CartWrapper = styled(Box)(({ theme }) => ({
  padding: '12px 32px 8px 32px',
  flex: '1 0 auto',
}));

interface CartDrawerProps {
  cartIsOpen: boolean;
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer = ({ cartIsOpen, setCartIsOpen }: CartDrawerProps) => {
  const accessToken = localStorage.getItem('access_token') || '';

  const dispatch = useAppDispatch();
  const { cartItems, totalPrice } = useShoppingCart({ accessToken });

  dispatch(countTotalPrice());

  // Computes the total quantity of items in the shopping cart
  const getCartTotalQuantity = () => {
    let cartTotalQuantity = 0;
    if (cartItems) {
      for (let i = 0; i < cartItems?.length; i++) {
        cartTotalQuantity += cartItems[i].quantity;
      }
    }
    return cartTotalQuantity;
  };

  return (
    <Drawer
      open={cartIsOpen}
      onClose={() => setCartIsOpen(false)}
      anchor='right'
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', sm: 600 },
          maxWidth: '100%',
          overflow: 'auto',
        },
      }}
    >
      <CartWrapper>
        <CartHeading
          cartItems={cartItems}
          cartTotalQuantity={getCartTotalQuantity()}
          setCartIsOpen={setCartIsOpen}
        />
        <Divider />
        {cartItems && cartItems?.length > 0 ? (
          <CartContent cartItems={cartItems} totalPrice={totalPrice} />
        ) : (
          <EmptyCartContent setCartIsOpen={setCartIsOpen} />
        )}
      </CartWrapper>
    </Drawer>
  );
};

export default CartDrawer;
