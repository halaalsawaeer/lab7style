
  
 

  'use strict';
var OpenHour = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', 'Daily Location Total'];
var Locations = [];
var sum1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var mainid = document.getElementById('main');     // get main tag by element id
var table = document.createElement('table');      //create table tag
mainid.appendChild(table);
var DataRow = document.createElement('tr');       //create Row tag
table.appendChild(DataRow);
var emptycol = document.createElement('th');     //create an empty col for empty cell in header and total in footer 
emptycol.textContent = ' ';                       
DataRow.appendChild(emptycol);
// var ted =document.createElement('td');                /// create  table data
function Cities(name, max, min, average_cookies_per_customer) {
  this.name = name;
  this.max = max;
  this.min = min;
  this.average_cookies_per_customer = average_cookies_per_customer;
  this.random_customers_per_hour1 = [];
  this.cookies_purchased_Hour = [];
  Locations.push(this);
}
Cities.prototype.getRandomCustomerPerHours = function () {
  for (var i = 0; i < OpenHour.length; i++) {
    this.random_customers_per_hour1[i] = generateRandomNumber(this.min, this.max);
  }
};
Cities.prototype.getcookies_purchased_Hour = function () {
  var iteration = 0;
  var sum = 0;
  for (var i = 0; i < OpenHour.length - 1; i++) {
    iteration = Math.floor(this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
    this.cookies_purchased_Hour[i] = iteration;
    sum += iteration;
    sum1[i] += iteration;
  }
  this.cookies_purchased_Hour.push(sum);
  sum1[sum1.length - 1] += sum;
};
var Seattle = new Cities('Seattle', 65, 23, 6.3, [], []);
var Tokyo = new Cities('Tokyo', 24, 3, 1.2, [], []);
var Dubai = new Cities('Dubai', 38, 11, 3.7, [], []);
var Paris = new Cities('Paris', 38, 20, 2.3, [], []);
var Lima = new Cities('Lima', 16, 2, 4.6, [], []);
for (var i = 0; i < Locations.length; i++) {
  Locations[i].getRandomCustomerPerHours();
  Locations[i].getcookies_purchased_Hour();
}
function addHeader() {
  for (var out = 0; out < OpenHour.length; out++) {
    var ListItemLocation = document.createElement('th');
    ListItemLocation.textContent = OpenHour[out];
    DataRow.appendChild(ListItemLocation);
  }
}
addHeader();
Cities.prototype.render = function () {
   DataRow = document.createElement('tr');
  table.appendChild(DataRow);
  var ListItemLocation = document.createElement('td');
  ListItemLocation.textContent = this.name;  // we faced an issue it gives us [object Object]  then we replace it here with thisname
  DataRow.appendChild(ListItemLocation);
  for (var j = 0; j < OpenHour.length - 1; j++) {
    ListItemLocation = document.createElement('td');
    ListItemLocation.textContent = this.cookies_purchased_Hour[j];
    DataRow.appendChild(ListItemLocation);
  }
  ListItemLocation = document.createElement('td');
  ListItemLocation.textContent = this.cookies_purchased_Hour[this.cookies_purchased_Hour.length - 1];
  DataRow.appendChild(ListItemLocation);
};
//we add for loop to iterate through the Locations array and call the render Function to render the Data was stored in the Locations Array
for (var  i =0; i <Locations.length ; i++){
  // tried to inoke the render function for each city to make sure of the results
// Seattle.render();
// Tokyo.render();
// Dubai.render();
// Paris.render();
// Lima.render();
console.log(Locations[i]);
Locations[i].render();
}
// Cities.prototype.render();
// addFooter();
function addFooter() {
  DataRow = document.createElement('tr');
  table.appendChild(DataRow);
  emptycol = document.createElement('td');
  emptycol.textContent = 'Total';
  DataRow.appendChild(emptycol);
  for (var tot = 0; tot < sum1.length; tot++) {
    var TotalRow = document.createElement('td');
    TotalRow.textContent = sum1[tot];
    DataRow.appendChild(TotalRow);
  }
}
addFooter();
function generateRandomNumber(min, max) {
  var random = Math.random();
  random = (random * (max - min + 1)) + min;
  random = Math.floor(random);
  return random;
}





