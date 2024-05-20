import express from 'express';
// import pino from 'pino-pretty';
import cors from 'cors';
import { env } from './utils/env.js';

export const setupServer = () => {
  const PORT = env('PORT', '3000');
  const app = express();
  //   app.use(
  //     pino({
  //       transport: {
  //         target: 'pino-pretty',
  //       },
  //     }),
  //   );
  app.use(cors());

  app.use((_, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, (error) => {
    if (error) {
      console.log('Server crushed. error: ', error);
      process.exit(1);
    }
    console.log('Server is running on port', PORT);
  });
};
