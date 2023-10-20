//Set up a server
let express = require('express');

//app object
let app = express();


app.use('/',  express.static('public'));


// app.get('/', (request, response) => {
//     response.send("Hello");
// });

app.get('/about', (request, response) => {
    response.send("This is the about page");
});

app.get('/astro', (request, response) => {
    // response.send("This is the astro page");
    response.json(astronauts);
});

//Listen
let port = 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});

