(function() {
    'use strict';

    require('dotenv').config();

    var express = require('express');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var compression = require('compression');

    var path = require('path');
    var http = require('http');

    var assetRouter = require('./routers/asset.js');
    var siteRouter = require('./routers/site.js');

    var ALTR = express();

    ALTR
        .use(compression())
        .use(morgan('dev'))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: true,
        }))
        .use('/', assetRouter)
        .use('/', siteRouter);

    var port = process.env.PORT || 1142;

    ALTR.set('port', port);
    var server = http.createServer(ALTR);
    server.listen(port);

}());
