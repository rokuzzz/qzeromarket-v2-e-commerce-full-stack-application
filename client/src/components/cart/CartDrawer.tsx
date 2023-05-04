import { useEffect } from 'react';
import { Box, Divider, Drawer, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import {
  countTotalPrice,
  getUsersShoppingCart,
} from '../../redux/slices/cartSlice';
import CartContent from './CartContent';

const CartWrapper = styled(Box)(({ theme }) => ({
  padding: '12px 32px 8px 32px',
}));

interface CartDrawerProps {
  cartIsOpen: boolean;
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer = ({ cartIsOpen, setCartIsOpen }: CartDrawerProps) => {
  const { currentUser } = useAppSelector((state) => state.userReducer);

  const { usersShoppingCart } = useAppSelector((state) => state.cartReducer);
  const { id, products, totalPrice } = usersShoppingCart ?? {};

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(countTotalPrice());
  // }, [products]);

  useEffect(() => {
    dispatch(
      getUsersShoppingCart({
        userId: currentUser.data!._id,
        token: localStorage.getItem('access_token'),
      })
    );
  }, []);

  return (
    <Drawer
      open={cartIsOpen}
      onClose={() => setCartIsOpen(false)}
      anchor='right'
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 600 },
          maxWidth: '100%',
          overflow: 'auto',
        },
      }}
    >
      <CartWrapper>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {typeof products == undefined ? (
            <ShoppingBagOutlinedIcon sx={{ width: '32px', height: '32px' }} />
          ) : (
            <ShoppingBagIcon sx={{ width: '32px', height: '32px' }} />
          )}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => setCartIsOpen(false)}
            color='inherit'
            aria-aria-label='close'
          >
            <CloseIcon sx={{ width: '32px', height: '32px' }} />
          </IconButton>
        </Box>
        <Divider />
        <CartContent products={products} totalPrice={totalPrice} />
      </CartWrapper>
    </Drawer>
  );
};

export default CartDrawer;