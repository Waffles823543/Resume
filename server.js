express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile("/index.html");
});

app.listen(process.env.PORT || port, () => console.log(`app listening on port ${port}!`))