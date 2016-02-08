import assert from 'power-assert';
import { PromisedState } from '../src/index';

describe('promised-state', function() {
  it('works', function() {
    const state = { name: 'aiueo' };
    const promised = new PromisedState(state);
    return promised
      .update((state) => {
        return { name: state.name + '!' };
      })
      .then((state) => {
        assert.deepEqual(state, { name: 'aiueo!' });
      });
  });

  it('works', function() {
    const state = { name: 'aiueo' };
    const promised = new PromisedState(state);
    return Promise.all([
      promised
        .update((state) => {
          return { name: state.name + '!' };
        })
        .then((state) => {
          assert.deepEqual(state, { name: 'aiueo!' });
        }),
      promised
        .update((state) => {
          return { name: state.name + '?' };
        })
        .then((state) => {
          assert.deepEqual(state, { name: 'aiueo!?' });
        })
    ]);
  });
});
