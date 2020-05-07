var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    })
});

router.post("/api/burgers", function(req, res) {
    console.log(req.body);
    burger.insertOne([
        "burger_name"
    ], [req.body.burger_name], 
    function(result) {
        console.log(result);
        console.log({id: result.insertId});
        res.json({id: result.insertId});
    })
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    // console.log("condition", condition);
    burger.updateOne({
        devour: req.body.devour
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });

})

router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burger.deleteOne(condition, function(result) {
        if(result.affectedRows == 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    })
})


module.exports = router;