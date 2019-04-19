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
  start();
});

function start() {
  inquirer
    .prompt([
      {
        name: "menuOptions",
        type: "list",
        message: "Please select one of the following options.",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.menuOptions) {
        case "View Products for Sale":
          viewInventory();
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addToInventory();
          break;
        case "Add New Product":
          addNewProduct();
          break;
        case Default:
          console.log("Not one of the options.");
          break;
      }
    });
}

function viewInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    start();
  });
}
function viewLowInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 5) {
        console.log(
          res[i].product_name +
            " inventory is running low. Current amount " +
            res[i].stock_quantity
        );
      }
    }
    start();
  });
}
function addToInventory() {
  inquirer
    .prompt([
      {
        name: "confirm",
        type: "confirm",
        message:
          "Would you like to add more stock to any of the current inventory?"
      }
    ])
    .then(function(answer) {
      if (answer.confirm) {
        addMore();
      } else {
        console.log("You responded no.");
      }
    });
}

function addMore() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var product_name_arr = [];
    for (var i = 0; i < res.length; i++) {
      product_name_arr.push(res[i].product_name);
    }
    inquirer
      .prompt([
        {
          name: "addOption",
          type: "list",
          message: "Select which product you would like to add stock",
          choices: product_name_arr
        },
        {
          name: "howMuchToAdd",
          type: "input",
          message: "How much would you to add?"
        }
      ])
      .then(function(answers) {
        for (var j = 0; j < res.length; j++) {
          if (answers.addOption === res[j].product_name) {
            var updatedStock =
              parseInt(res[j].stock_quantity) + parseInt(answers.howMuchToAdd);
            var itemName = answers.addOption;
            var id = res[j].id;
            console.log(
              "updated stock: " + updatedStock + " \nitem: " + itemName
            );
            connection.query(
              "UPDATE products SET stock_quantity=" +
                updatedStock +
                " WHERE id=" +
                id,
              start()
            );
          }
        }
      });
  });
}

function addNewProduct() {
  inquirer
    .prompt([
      {
        name: "confirm",
        type: "confirm",
        message: "Would you like to add a new prodcut to the store?"
      }
    ])
    .then(function(answer) {
      if (answer.confirm) {
        addNew();
      } else {
        console.log("You responded no.");
      }
    });
}

function addNew() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name of the product?"
        },
        {
          name: "department",
          type: "input",
          message: "What department will the product be in?"
        },
        {
          name: "price",
          type: "input",
          message: "How much with the product cost?"
        },
        {
          name: "stock",
          type: "input",
          message: "How much stock are you adding?"
        }
      ])
      .then(function(answers) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answers.name,
            department_name: answers.department,
            price: answers.price,
            stock_quantity: answers.stock
          },
          function(err, res) {
            if (err) throw err;
            start();
          }
        );
      });
  });
}
