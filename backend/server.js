// Module Imports:
import mongoose from 'mongoose';
import app from './app.js';

//////////////////////////////////////////////////////
// App start:
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port - ${PORT}\nhttp://localhost:${PORT}`);
});

//////////////////////////////////////////////////////
// Database connect:
(async function () {
  const url = process.env.DB_LINK.replace('<PASS>', process.env.DB_PASS).replace(
    '<USER>',
    process.env.DB_USER
  );
  await mongoose.connect(url);
})()
  .then(() => console.log('DB connection was successful!'))
  .catch((err) => {
    console.log({ status: 'error', message: err.errmsg });
    server.close(() => process.exit(1));
  });
