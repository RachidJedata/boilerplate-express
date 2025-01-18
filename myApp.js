require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();
console.log("Hello World");

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
app.use('/public',express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    const absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});
app.get('/json',(req,res)=>{
    const message = process.env.MESSAGE_STYLE == "uppercase" ? "HELLO JSON":"Hello json";
    res.json({
        message
    });
})

app.get('/now',(req,res,next)=>{
    req.time = (new Date()).toString();
    next();
},(req,res)=>{
    res.json({
        time:req.time
    });
})

app.get('/:word/echo',(req,res)=>{
    const word = req.params.word;
    res.json({
        echo: word
    });
})

app.use(bodyParser.urlencoded({ extended: false }));
app.route('/name')
  .get((req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({
      name: `${firstName} ${lastName}`
    });
  })
  .post((req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({
      name: `${firstName} ${lastName}`
    });
  });


module.exports = app;
