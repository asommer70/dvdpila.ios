jest.unmock('../components/settings'); // unmock to use the actual implementation of sum

describe('saveSettings', () => {
  it('saves the URL to storage', () => {
    expect(Settings).to(3);
  });
});
