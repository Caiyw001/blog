const express = require('express');
const path=require('path');
const app = express();
app.set('port', process.env.PORT || 3000);


app.get('/', (req, res) => {
    res.send('Hello World !');
})

app.get('/es501', (req, res) => {
    res.sendFile(__dirname+'/views/es501.html');
})


app.listen(app.get('port'), function (error, result) {
    if (error) { }
    console.info('Example app listening on port 3000');
})
