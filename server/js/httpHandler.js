const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  console.log(queue);
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  var randomCommand = ['up','down','left','right'];
  var random = Math.floor(Math.random() * Math.floor(randomCommand.length))
  randomCommand = messageQueue.dequeue();

  if (req.method === 'GET'){
    // output random command
    res.writeHead(200, headers);
    res.end((randomCommand));

  } else if (req.method === 'OPTIONS'){
    res.writeHead(200, headers);
    res.end();
  }

  res.writeHead(200, headers); // takes status code (200)
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
