import { getUsersFavorites } from '../../redux/slices/favoritesSlice';
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
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJiZDEyZTkzNjQ2NTJlNGRlMDM3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTM1ODQ2MSwiZXhwIjoxNjg1NjE3NjYxfQ.2noGCa7irc_hHEm2uc7hUyWSradzble5AIhSw8J5_xE',
      })
    );

    // console.log(
    //   'first item in favorites title: ',
    //   store.getState().favoritesReducer.usersFavorites?.favoritesItems[0]
    //     .itemInFavorites.title
    // );

    expect(
      store.getState().favoritesReducer.usersFavorites?.favoritesItems[0]
        .itemInFavorites.title
    ).toBe('Whispering Mist Wool Hoodie');
  });
});