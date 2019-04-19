var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
  // start();
});

function start() {
  inquirer
    .prompt([
      {
        name: "itemSelect",
        type: "input",
        message: "What is the ID of the item you would like to buy?"
      },
      {
        name: "howMany",
        type: "input",
        message: "How many of that item would you like to buy?"
      }
    ])
    .then(function(answer) {
      console.log(answer);
      checkStock(answer.itemSelect, answer.howMany);
    });
}

function checkStock(chosenItemId, desiredQuantity) {
  connection.query("SELECT * FROM products", function(
    err,
    res
  ) {
    if (err) throw err;
    // log all the results of the SELECT statement

    var id = (res[chosenItemId - 1].id);
    var inStock = (res[chosenItemId - 1].stock_quantity);
    var updatedStock = (inStock - desiredQuantity);
    var cost = res[chosenItemId - 1].price * desiredQuantity;

    
    if(inStock >= desiredQuantity) {
        console.log("You're in luck! We have your entire order currently instock!");
        connection.query(
            "UPDATE products SET stock_quantity=" + updatedStock + " WHERE id=" + id,
            console.log("Your order has been placed!\ntotal cost of order = $" + cost),
            readProducts()
        )
        
        // fillOrder(id, instock);
    } else {
        console.log("unfortunately we don't have enough of the item you chose instock to complete you order.");
        connection.end();
    }
    // console.log(res[chosenItemId - 1].id);
    // console.log(res[chosenItemId - 1].stock_quantity);
  });
}


function readProducts() {
  console.log("selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // log all the results of the SELECT statement
    console.log(res);
    // connection.end();
    start();
  });
}
