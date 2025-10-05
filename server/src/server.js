
const app = require('./app');
const { serverPort } = require('./secret');
const connectDatabase = require('./config/db');


app.listen(serverPort, async () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
  await connectDatabase();
});

