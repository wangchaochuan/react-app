// src/mocks/handlers.js
import { rest } from 'msw';

const handlers = [
  rest.post('/login', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get('/user', (req, res, ctx) => {
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      })
    );
  }),
];

export default handlers;
