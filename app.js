var express = require('express');
var mysql = require('mysql')
var app = express();
var bodyParser = require("body-Parser");

app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',     // your root username
    password : '#aashi12#',
    database : 'join_us'   // the name of your db
  }); 

app.get("/", function(req, res) { 
    //  find count of users in the database
    // respond with that count
    var q = " SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(error, results){
    if (error) throw error;
    var count = results[0].count;
    // res.send("we have "+ count + " users in our DB");
    res.render("home", {data:count});
  });
});

app.post("/register", function(req,res){
  var email = req.body.email;
  var name = req.body.name
  var person = {
      email: req.body.email,
      name: req.body.name
  };
     connection.query('insert into users SET ?', person, function(err, result){
        if (err) throw err;
        res.redirect("/");
    });
});

app.listen(3000, function(){
  console.log("server running on 3000!");
});


// app.get("/joke", function(req, res) { 
//     var joke = "<strong> what do you call a dog that does magic tricks?</strong> <em> A labracadabrador</em>.";
//     res.send(joke);
// });

// app.get("/random_num", function(req,res){
//   var num = Math.floor (Math.random() * 10) + 1;
//     res.send("Your lucky number is " + num);
// });

