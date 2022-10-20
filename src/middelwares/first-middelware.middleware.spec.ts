import { FirstMiddelwareMiddleware } from './first-middelware.middleware';

describe('FirstMiddelwareMiddleware', () => {
  it('should be defined', () => {
    expect(new FirstMiddelwareMiddleware()).toBeDefined();
  });
});
