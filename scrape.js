var request = require('request');
var cheerio = require('cheerio');
var db = require('./models');

request('http://whitecapfrozenyogurt.com/', function(error, response, data) {
  var $ = cheerio.load(data);
  var currentFlavors = $('wpv-view-layout-44-TCPID6').map(function(index, element) {
    db.current_flavors.create({
      name: $(element).text(),
      
    })

    // return {
    //   name: $(element).text()
    // }
  }).get();
  console.log(flavors);
});
