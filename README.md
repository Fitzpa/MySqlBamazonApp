# MySqlBamazonApp


This is my CRUD app in the shape of a very basic version of an amazon store. 
Running *bamazonCustomer.js* through the node terminal you can add a new product to the database with parameters of *product name*, *department name*, *price*, and *quantity*.
You can aslo update, read, or delete any or all of these items from the database as well.
This is intended to be the customers point of view.
I use *mySql* for the database, and the *inquirer* module to deal with input from the user.

Running *bamazonManager.js* through the node terminal the user is prompted with a menu of options:
* View Products for Sale (this displays all of the current inventory along with information on each)
* View Low Inventory (this displays all inventory that has a quantity lower than 5)
* Add to Inventory (this allows the user to select of the the already existing product and add a quantity to it)
* Add New Product (this allows the user to add a new product along with all of its parameters to the database)
This is intended to be a managers point of view.


##To Get Started
#download or clone the git repo and the run the command npm install in the terminal to install all the node modules and dependencies.
#run MAMP to get a mySQL server running and then connect it to mySQL Workbench.
#Then create your own bamazon database in mySQL workbench and copy and paste the code I have below.

'''
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(65,2) NULL,
  stock_quantity INTEGER(255) NULL,
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Advanced SP", "Video Games", 50.00, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "Computers", 1799.99, 20000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("V-Moda M-100", "Headphones", 249.26, 12000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Saucony Freedom ISO 2", "Running Shoes", 180.00, 600);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GMMK Compact", "Keyboards", 70.00, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NAD D 3020", "Audio Amplifiers", 399.00, 1500);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AMD Ryzen 2700", "Computer Parts", 224.99, 50000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fractal Design Define R6", "Computer Cases", 149.99, 1200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LG 34UC80-B UltraWide", "Computer Monitors", 549.00, 2400);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation 4 Pro", "Video Games", 359.00, 20000);
'''

#Next make sure the *port* in the *bamazonCustomer.js* and *bamazonManager.js* files is the same as the port you connected with MAMP.
if you can make this any cleaner or add any future features go ahead!

Link to video of me demoing the app: https://drive.google.com/file/d/14BF3-iTdoTCSYhn-hNuNb3KXrtzeFomc/view?usp=sharing

Louie Fitzpatrick *Fitzpa* is the original contributer and maintains this project.
