import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  INTERNAL_API_URL,
  REMOVE_FAVORITE,
  removeFavorite,
} from './jobs';

const mockStore = configureStore([thunk]);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('fetchJobs', () => {

  });

  test('addFavorite', () => {

  });

  test('removeFavorite', async () => {
    const apiId = 'some-job';
    fetchMock.delete(`${INTERNAL_API_URL}/${apiId}`, {
      headers: {
        'content-type': 'application/json',
        'Api-Id': apiId,
      },
    });
    const expectedAction = {
      type: REMOVE_FAVORITE,
      payload: {
        api_id: apiId,
      },
    };
    const store = mockStore({ jobs: [] });

    await store.dispatch(removeFavorite({ api_id: apiId }));
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
