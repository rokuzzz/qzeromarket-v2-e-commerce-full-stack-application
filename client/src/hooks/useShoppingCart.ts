import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { getUsersShoppingCart } from '../redux/slices/cartSlice';

interface useShoppingCartProps {
  accessToken: string
}

const useShoppingCart = ({accessToken}: useShoppingCartProps ) => {
  const dispatch = useAppDispatch();

  const { usersShoppingCart } = useAppSelector((state) => state.cartReducer);
  const { products } = usersShoppingCart || { products: undefined };

  const { loggedInUser } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(
      getUsersShoppingCart({
        userId: loggedInUser.data!._id,
        token: accessToken,
      })
    );
  }, [dispatch, loggedInUser, accessToken]);

  return {
    cartItems: products
  };
};

export default useShoppingCart;