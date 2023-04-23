const downloadFile = require('./cloudstorage.js');

const localFilePath = '../../client/Files/access.txt';

downloadFile.downloadFileFromBlobStorage("text", localFilePath);
