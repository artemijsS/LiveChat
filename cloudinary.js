const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "artemijss",
    api_key: "195831589762871",
    api_secret: "lSI-cfs0Z2XXps4BkZgZUlY3kn8",
});

module.exports = { cloudinary };