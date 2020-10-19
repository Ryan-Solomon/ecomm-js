const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repos/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['kdjhbgklebg'],
  })
);

app.get('/signup', (req, res) => {
  res.send(`
    <div>
    Your ID is: ${req.session.userId}
        <form method="POST" >
            <input name="email" type="email" placeholder="email" >
            <input name="password" type="password" placeholder="password" >
            <input name="passwordConfirmation" type="password" placeholder="password confirmation" >
            <button>Sign Up</button>
        </form>
    </div>
    
    `);
});

app.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('User already exists');
  }
  if (password !== passwordConfirmation) {
    return res.send('Passwords must match');
  }

  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  res.send('Acount created homie');
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send("You're logged out");
});

app.get('/signin', (req, res) => {
  res.send(`
    <div>
        <form method="POST" >
            <input name="email" type="email" placeholder="email" >
            <input name="password" type="password" placeholder="password" >
            <button>Sign In</button>
        </form>
    </div>
    `);
});

app.post('/signin', async (req, res) => {});

app.listen(3000, () => {
  console.log('Listening on 3k');
});
