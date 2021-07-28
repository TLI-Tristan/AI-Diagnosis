/*

const http = require('http');
var express = require('express')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

const express = require('express');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

app.get("/test", (req, res, next) => {
    res.json(["a","b","c","d","e"]);
});