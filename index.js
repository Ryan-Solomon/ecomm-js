const express = require('express')


const app = express();

app.get('/', (req, res) => {
    res.send(`
    <div>
        <form>
            <input type="email" placeholder="email" >
            <input type="password" placeholder="password" >
            <input type="name" placeholder="name" >
        </form>
    </div>
    
    `)
});


app.listen(3000, () => {
    console.log('Listening on 3k')
})


