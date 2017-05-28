import { NamedZonePage } from './app.po';

describe('named-zone App', () => {
  let page: NamedZonePage;

  beforeEach(() => {
    page = new NamedZonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
