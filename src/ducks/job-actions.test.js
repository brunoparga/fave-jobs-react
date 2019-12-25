import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  ADD_FAVORITE,
  addFavorite,
  EXTERNAL_API_URL,
  FETCH_JOBS,
  fetchJobs,
  INTERNAL_API_URL,
  REMOVE_FAVORITE,
  removeFavorite,
} from './jobs';

const mockStore = configureStore([thunk]);

describe('async actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ jobs: [] });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test('fetchJobs when there is no query to external API', async () => {
    const jobs = [
      { api_id: 'CFO', company: 'Google' },
      { api_id: 'COO', company: 'Amazon' },
    ];
    const response = {
      headers: { 'content-type': 'application/json' },
      body: jobs,
    };
    fetchMock.getOnce(`${INTERNAL_API_URL}`, response);
    const payload = [
      { api_id: 'CFO', company: 'Google', favorite: true },
      { api_id: 'COO', company: 'Amazon', favorite: true },
    ];
    const expectedAction = { type: FETCH_JOBS, payload };

    await store.dispatch(fetchJobs(''));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  test('fetchJobs when the external API is queried', async () => {
    const inJobs = [
      { api_id: 'CFO', company: 'Google' },
      { api_id: 'COO', company: 'Amazon' },
    ];
    const inResponse = {
      headers: { 'content-type': 'application/json' },
      body: inJobs,
    };
    fetchMock.getOnce(`${INTERNAL_API_URL}`, inResponse);

    const outJobs = [
      { id: 'CTO', company: 'Facebook' },
      { id: 'COO', company: 'Amazon' },
    ];
    const outResponse = {
      headers: { 'content-type': 'application/json' },
      body: { jobs: outJobs },
    };
    fetchMock.getOnce(new RegExp(`${EXTERNAL_API_URL}`), outResponse);

    const payload = [
      { api_id: 'CFO', company: 'Google', favorite: true },
      { api_id: 'COO', company: 'Amazon', favorite: true },
      {
        api_id: 'CTO', company: 'Facebook', favorite: false, id: 'CTO',
      },
    ];
    const expectedAction = { type: FETCH_JOBS, payload };

    await store.dispatch(fetchJobs('query'));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  test('addFavorite', async () => {
    const job = { api_id: 'qa_engineer', salary: '4000 - 5000' };
    fetchMock.postOnce(`${INTERNAL_API_URL}`, {
      headers: { 'content-type': 'application/json' },
      body: job,
    });
    const expectedAction = { type: ADD_FAVORITE, payload: job };

    await store.dispatch(addFavorite(job));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  test('removeFavorite', async () => {
    const apiId = 'widget_inspector';
    fetchMock.deleteOnce(`${INTERNAL_API_URL}/${apiId}`, {
      headers: { 'Api-Id': apiId, 'content-type': 'application/json' },
    });
    const expectedAction = {
      type: REMOVE_FAVORITE,
      payload: { api_id: apiId },
    };

    await store.dispatch(removeFavorite({ api_id: apiId }));
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
