var request = require('request');
var cheerio = require('cheerio');
var db = require('./models');

request('http://whitecapfrozenyogurt.com/flavors/', function(error, response, data) {
  var $ = cheerio.load(data);
  var flavors = $('#wavy > div:nth-child(2) > div:nth-child(2) > div:nth-child(4) > div li').map(function(index, element) {
    db.flavor.create({
      name: $(element).text(),
      nutritionUrl: $(element).children('a').attr('href'),
      flavorType: 'non-dairy-sorbet',
      status: 'in-rotation'
    })

    // return {
    //   name: $(element).text()
    // }
  }).get();
  console.log(flavors);
});
