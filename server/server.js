const app = require('./app.js');

const port = 3004;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
