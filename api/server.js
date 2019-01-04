import dotenv from 'dotenv';
import app from './app';

dotenv.config();
if (!module.parent) {
  app.listen(process.env.PORT, () => console.log(`Application now listening on port ${process.env.PORT}`));
}
module.exports = { app };
