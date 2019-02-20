const app = require('./app');
const port = process.env.PORT || 8080;
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(port, () => console.log(`App listening on port ​${port}​!`));
