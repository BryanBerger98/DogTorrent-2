const express = require('express');
const router = express.Router();
const FilesService = require('../services/files.service');
const filesService = new FilesService();
const torrentsController = require('../controllers/torrents.controller');

router.post('/upload', filesService.upload.array('files', 20), torrentsController.uploadTorrentFiles);

module.exports = router;