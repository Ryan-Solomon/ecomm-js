const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repos/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <div>
        <form method="POST" >
            <input name="email" type="email" placeholder="email" >
            <input name="password" type="password" placeholder="password" >
            <input name="passwordConfirmation" type="password" placeholder="password confirmation" >
            <button>Sign Up</button>
        </form>
    </div>
    
    `);
});

app.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('User already exists');
  }
  if (password !== passwordConfirmation) {
    return res.send('Passwords must match');
  }

  res.send('Acount created homie');
});

app.listen(3000, () => {
  console.log('Listening on 3k');
});
