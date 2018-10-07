const path      = require('path'),
      express   = require('express');

const app       = express();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/', (request, response) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});