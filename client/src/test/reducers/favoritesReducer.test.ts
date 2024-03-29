import {
  getAllFavorites,
  getUsersFavorites,
  modifyFavorites,
} from '../../modules/favorites/redux/favoritesSlice';
import createTestStore from '../utils/testStore';

let store = createTestStore();

beforeEach(() => {
  store = createTestStore();
});

describe('test favorites reducer', () => {
  test('should get users favorites', async () => {
    await store.dispatch(
      getUsersFavorites({
        userId: '63dbbd12e9364652e4de037f',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTU1MjQ4OSwiZXhwIjoxNjg1ODExNjg5fQ.huSkE5YKfmQlUvGkZVWZ5y-gjONNjaPyK0-HAwuzsR0',
      })
    );

    // console.log(
    //   'first item in favorites title: ',
    //   store.getState().favoritesReducer.usersFavorites?.favoritesItems[0]
    //     .itemInFavorites.title
    // );

    expect(
      store.getState().favoritesReducer.usersFavorites?.data.favoritesItems[0]
        .itemInFavorites.title
    ).toBe('Whispering Mist Wool Hoodie');
  });

  // test('should modify users favorites', async () => {
  //   await store.dispatch(
  //     modifyFavorites({
  //       title: 'Classic Black T-Shirt',
  //       token:
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTU1MjQ4OSwiZXhwIjoxNjg1ODExNjg5fQ.huSkE5YKfmQlUvGkZVWZ5y-gjONNjaPyK0-HAwuzsR0',
  //     })
  //   );

  //   // console.log(
  //   //   'first item in favorites title: ',
  //   //   store.getState().favoritesReducer.usersFavorites?.data.favoritesItems[0]
  //   //     .itemInFavorites.title
  //   // );

  //   expect(
  //     store.getState().favoritesReducer.usersFavorites?.data.favoritesItems[1]
  //       .itemInFavorites.title
  //   ).toBe('Classic Black T-Shirt');
  // });

  test('should get all favorites', async () => {
    await store.dispatch(
      getAllFavorites({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTYxNTQ5OSwiZXhwIjoxNjg1ODc0Njk5fQ.CjVvXxM9FlyD-yxLO-31bwASFUKIYUIwpa_uYGxoS9A',
      })
    );

    expect(
      store.getState().favoritesReducer.allFavorites?.data.length
    ).toBeGreaterThan(0);
  });
});
