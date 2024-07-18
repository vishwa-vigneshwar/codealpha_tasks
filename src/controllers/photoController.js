const s3 = require('../config/aws');
const Photo = require('../models/Photo');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.uploadPhoto = (req, res) => {
  const file = req.file;
  const userId = req.user.id;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${userId}/${file.originalname}`,
    Body: file.buffer,
    ACL: 'public-read',
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }
    const newPhoto = new Photo({
      user: userId,
      url: data.Location,
      description: req.body.description,
    });
    await newPhoto.save();
    res.json(newPhoto);
  });
};

exports.getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({ user: req.user.id }).sort({ date: -1 });
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
