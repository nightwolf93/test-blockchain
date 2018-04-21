"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serveHttp = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Serve a http server for peer request
 */
const serveHttp = exports.serveHttp = port => {
    return new Promise((resolve, reject) => {
        const app = (0, _express2.default)();

        // Use middleware
        app.use(_bodyParser2.default.json());
        app.use(_bodyParser2.default.urlencoded({ extended: false }));

        // Setup routes
        app.post("/api/v1/peer/add", addPeerHandler.bind(undefined));
        app.post("/api/v1/block/add", blockDiscoveredHandler.bind(undefined));

        app.listen(port, () => {
            logger.info("HTTP server listening on *:" + port);
            resolve();
        });
    });
};

/**
 * A peer to peer
 * @param {*} req 
 * @param {*} res 
 */
const addPeerHandler = async (req, res) => {
    (0, _.addPeer)(req.body.host, parseInt(req.body.port));
};

/**
 * A peer has discovered a block
 * @param {*} req 
 * @param {*} res 
 */
const blockDiscoveredHandler = async (req, res) => {};