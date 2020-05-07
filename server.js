var express = require("express");

var PORT = process.env.PORT || 8090;
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");
app.use(routes);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
})

var orm = require("./config/orm.js");
