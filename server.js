const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 4999;

let app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();

  let log = `${now}: ${req.method} - ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\r\n', err => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });

  next();
});
/* app.use((req, res, next) => {
  res.render('maintenance.hbs');
}); */
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1 style="color: red">Hello There!</h1>');
  res.render('home.hbs', {
    title: 'Website Alpha',
    message: 'Welcome to My Awesome Website',
  });
});

app.get('/ffv', (req, res) => {
  res.render('ffv.hbs', {
    title: 'Final Fantasy V',
    message: 'Best Game of All Time',
  });
});

app.get('/error', (req, res) => {
  res.send({
    errorMessage: 'Something went wrong, please understand.'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    title: 'Projects:',
    message: 'Welecome to My Portfolio'
  });
});

app.listen(port, () => {
  console.log(`Server is now live at port: ${port}.`);
});
