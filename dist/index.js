"use strict";

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _wallet = require("./wallet");

var _block = require("./block");

var _tx = require("./tx");

var _database = require("./database");

var _p2p = require("./p2p");

var _commandLineArgs = require("command-line-args");

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize the logger
(async () => {
    const options = (0, _commandLineArgs2.default)([{ name: 'port', alias: 'p', type: Number }]);

    global.logger = _winston2.default.createLogger({
        level: "debug",
        format: _winston2.default.format.combine(_winston2.default.format.colorize({ all: true }), _winston2.default.format.simple()),
        transports: [new _winston2.default.transports.Console()]
    });

    // Open the database
    await (0, _database.connectToDatabase)();

    // Load the blockchain
    await (0, _block.loadBlockchain)();

    // Serve http peer api server
    await (0, _p2p.loadPeers)();
    await (0, _p2p.serveHttp)(options.port);

    let wallet = (0, _wallet.importWallet)("./wallets/849e2a00042ca342260e5d2529db43ab.wallet");

    // Start mining
    (0, _block.runMiningProcess)(wallet);
})();