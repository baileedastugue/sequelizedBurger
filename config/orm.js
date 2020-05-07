// require the connection to MySQL
var connection = require("./connection.js");

function questionMarks(number) {
    var qArray = [];
    for (var i = 0; i < number; i++) {
        qArray.push("?");
    }
    return qArray.toString();
};

// Helper function to convert object key/value pairs --> SQL syntax
// from key: value --> key = value
function objectToSQL(object) {
    var arr = [];
    // pushes in the key into the array (ln 15)
    for (var key in object) {
        var value = object[key];
        // checks to skip any hidden params
        if (Object.hasOwnProperty.call(object, key)) {
            console.log("line 20");
            console.log(value);
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}


// MySQL commands 
var orm = {
    // selectAll
    selectAll: function(table, cb) {
        var qString = "SELECT * FROM " + table + ";";
        connection.query(qString, function(err, result) {
            if (err) throw err;
            // this passes the result from the database to another function
            cb(result);
        })
    },
    // insertOne - insert into table (burger_name) values (?)
    insertOne: function(table, cols, vals, cb) {
        var qString = "INSERT INTO " + table + " (";
        qString += cols.toString() + ") VALUES (";
        qString += questionMarks(vals.length) + ")";
        connection.query(qString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        })
    },
    // updateOne - UPDATE burgers SET burger_name ?? = ? where id ?? = ? 
    updateOne: function(table, columnValues, condition, cb) {
        var qString = "UPDATE " + table + " SET ";
        qString += objectToSQL(columnValues) + " WHERE " + condition;

        console.log(qString);
        connection.query(qString, function(err, result) {
            if (err) throw err;
            cb(result);
        })
    },

    deleteOne: function(table, condition, cb) {
        var qString = "DELETE FROM " + table + " WHERE " + condition;
        connection.query(qString, function(err, result) {
            if (err) throw errl
            cb(result);
        })
    }

};
// export the orm object

module.exports = orm;