const path = require('path');
const WebTorrent = require("webtorrent");

const torrentClient = new WebTorrent();

class TorrentsService {

    constructor() {}

    addTorrent(filePath) {
        return new Promise((resolve, reject) => {
            torrentClient.add(filePath, {path: path.join(__dirname, '../downloads')}, torrent => {
                resolve(torrent);
            });
        });
    }

    getTorrents() {
        return torrentClient.torrents.map(el => ({
            createdOn: el.created,
            done: el.done,
            downloaded: el.downloaded,
            downloadSpeed: el.downloadSpeed,
            uploadSpeed: el.uploadSpeed,
            uploaded: el.uploaded,
            paused: el.paused,
            name: el.name,
            peers: el.numPeers,
            ratio: el.ratio,
            progress: el.progress,
            ready: el.ready,
            infoHash: el.infoHash,
            magnetURI: el.magnetURI,
            pieceLength: el.pieceLength + el.lastPieceLength,
            length: el.length,
            timeRemaining: el.timeRemaining
        }));
    }

    getTorrentsStats() {
        return {
            downloadSpeed: torrentClient.downloadSpeed,
            progress: torrentClient.progress,
            ratio: torrentClient.ratio,
            torrentsCount: torrentClient.torrents.length,
            uploadSpeed: torrentClient.uploadSpeed
        }
    }

    _parseTorrent(torrent) {

    }

}

module.exports = new TorrentsService();
