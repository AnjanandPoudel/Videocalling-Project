const express = require('express');
const cors = require('cors');
const app = express();

const whitelist=['https://localhost:3443','http://localhost:3000','http://anjan-HP-15-Notebook-PC:3001','http://localhost:3001','http://localhost:3002','http://192.168.1.99:3000'];
var corsOptionsDelegate = (req, callback) => {
    console.log('cors invoked')
    var corsOptions;
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
        console.log('cors success')
    }
    else {
        corsOptions = { origin: false };
        console.log('cors failed')

    }
    callback(null, corsOptions);

};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);