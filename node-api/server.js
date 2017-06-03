"use strict";
require('dotenv').config();
var restify = require("restify");
const util = require("util");
var versioning = require("restify-url-semver");
var hostname = require('os').hostname();

var server = restify.createServer({
  name: 'chirkut',
  version: ['1.0.0']
});
server.pre(versioning());

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.get('/hello', function (req, res, next) {
  res.send(hostname);
  return next();
});

server.listen(process.env.SERVER_PORT, function () {
  console.log('%s service listening at %s port', server.name, process.env.SERVER_PORT);
});

module.exports = server;
