import { CtskProjectPage } from './app.po';

describe('ctsk-project App', function() {
  let page: CtskProjectPage;

  beforeEach(() => {
    page = new CtskProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
