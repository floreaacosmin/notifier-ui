import { RestuiPage } from './app.po';

describe('restui App', () => {
  let page: RestuiPage;

  beforeEach(() => {
    page = new RestuiPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
