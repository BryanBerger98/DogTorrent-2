const FilesService = require('../services/files.service');
const filesService = new FilesService();
const WebTorrent = require('webtorrent');
const client = new WebTorrent();
const path = require('path');

const io = require('../services/sockets.service').getIo();

const torrentsService = require('../services/torrents.service');

function emitTorrents(torrents) {
    io.emit('torrents', {torrents});
}

setInterval(() => {
    const torrents = torrentsService.getTorrents();
    emitTorrents(torrents);
}, 10000);

module.exports = {
    uploadTorrentFiles: async (req, res) => {
        try {
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i];
                await torrentsService.addTorrent(file.path);
            }
            const torrents = torrentsService.getTorrents();
            res.status(200).json(torrents);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
    getTorrentsPage: (req, res) => {
        const torrents = torrentsService.getTorrents();
        console.log('Display torrents >>>', torrents.length);
        res.render('home', {torrents, title: 'Home page'});
    },
    getTorrents: (req, res) => {
        const torrents = torrentsService.getTorrents();
        res.status(200).json(torrents);
    }
}

client.on('torrent', (info) => {
    console.log(info.name, info.progress);
    // io.emit('torrent', info);
});

client.on('error', (err) => {
    console.error(err);
    // io.emit('error', error);
});