import reducer, { FETCH_JOBS, ADD_FAVORITE, REMOVE_FAVORITE } from './jobs';

describe('Jobs reducer', () => {
  it('should return the initial state when given no action', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle FETCH_JOBS', () => {
    // These objects do not correspond to actual jobs, but this does not really
    // matter here: the system under test is the reducer, and all it has to do
    // in this case is return the payload.
    const job1 = { api_id: 'react_app_tester', favorite: true };
    const job2 = { api_id: 'query_issue_solver', favorite: true };
    const action = { type: FETCH_JOBS, payload: [job1, job2] };
    expect(reducer([], action)).toEqual([job1, job2]);
  });

  it('should handle ADD_FAVORITE', () => {
    const state = [{ api_id: 'toilet_scrubber', favorite: false },
      { api_id: 'react_app_tester', favorite: false }];
    const newFavorite = { api_id: 'toilet_scrubber', pay: '0 - 100' };
    const expectedNewState = [{ api_id: 'toilet_scrubber', favorite: true },
      { api_id: 'react_app_tester', favorite: false }];
    const action = { type: ADD_FAVORITE, payload: newFavorite };
    expect(reducer(state, action)).toEqual(expectedNewState);
  });

  it('should handle REMOVE_FAVORITE', () => {
    const state = [{ api_id: 'ant_tamer', favorite: true },
      { api_id: 'react_app_tester', favorite: true }];
    const newFavorite = { api_id: 'ant_tamer', employer: 'Cirque de la Lune' };
    const expectedNewState = [{ api_id: 'ant_tamer', favorite: false },
      { api_id: 'react_app_tester', favorite: true }];
    const action = { type: REMOVE_FAVORITE, payload: newFavorite };
    expect(reducer(state, action)).toEqual(expectedNewState);
  });

  it('should preserve the state when given any other action', () => {
    const state = [{ api_id: 'ceo', company: 'FAANG', favorite: true },
      { api_id: 'react_app_tester', favorite: false }];
    const action = { type: 'ANY_OTHER', payload: 42 };
    expect(reducer(state, action)).toEqual(state);
  });
});
