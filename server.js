import app from './app.js';
import config from './app/config/index.js';
import mongodb from './app/utils/mongodb.util.js';
async function startServer() {
  try {
    await mongodb.connect(config.db.uri);
    console.log('Connected to the database!');

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Cannot connect to the database!', error);
    process.exit();
  }
}

startServer();
