import express from "express";
import bodyParser from "body-parser";
import { addPeer  } from "./";

/**
 * Serve a http server for peer request
 */
export const serveHttp = (port) => {
    return new Promise((resolve, reject) => {
        const app = express();

        // Use middleware
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));

        // Setup routes
        app.post("/api/v1/peer/add", addPeerHandler.bind(this));
        app.post("/api/v1/block/add", blockDiscoveredHandler.bind(this));

        app.listen(port, () => {
            logger.info("HTTP server listening on *:" + port);
            resolve();
        });
    });
}

/**
 * A peer to peer
 * @param {*} req 
 * @param {*} res 
 */
const addPeerHandler = async (req, res) => {
    addPeer(req.body.host, parseInt(req.body.port));
};

/**
 * A peer has discovered a block
 * @param {*} req 
 * @param {*} res 
 */
const blockDiscoveredHandler = async (req, res) => {

}