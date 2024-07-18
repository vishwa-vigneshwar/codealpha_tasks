const express = require('express');
const multer = require('multer');
const { uploadPhoto, getPhotos } = require('../controllers/photoController');
const auth = require('../middleware/auth');
const router = express.Router();
const upload = multer();
router.post('/upload', auth, upload.single('photo'), uploadPhoto);
router.get('/', auth, getPhotos);
module.exports = router;
