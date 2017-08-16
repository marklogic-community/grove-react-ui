import { search } from './search';

describe('search', () => {

  it('works', () => {
    const query = {
      qtext: 'qtext'
    };
    expect(search(query)).not.toBeUndefined();
  });

});
