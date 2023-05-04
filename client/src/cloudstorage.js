// const { BlobServiceClient } = require("@azure/storage-blob");

// const connectionString = "DefaultEndpointsProtocol=https;AccountName=formalproject;AccountKey=BvzJCBkc/nnZmW91dTN/ovce4shiUhVW41jytxA0EuewgfRHxDvuF1h1kn0zKhCegH7oXgBJP826+ASt2vGaeg==;EndpointSuffix=core.windows.net";
// const containerName = "userfiles";

// const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
// const containerClient = blobServiceClient.getContainerClient(containerName);

// async function uploadFileToBlobStorage(filePath, fileName) {
//   const blobClient = containerClient.getBlockBlobClient(fileName);
//   const uploadOptions = {
//     bufferSize: 4 * 1024 * 1024,
//     maxBuffers: 20
//   };
//   await blobClient.uploadFile(filePath, uploadOptions);
//   const containerUrl = `https://formalproject.blob.core.windows.net/userfiles`;
//   const blobUrl = `${containerUrl}/${fileName}`;
//   console.log(`File "${fileName}" uploaded successfully. URL: ${blobUrl}`);
// }

// async function downloadFileFromBlobStorage(fileName, downloadPath) {
//   const blobClient = containerClient.getBlockBlobClient(fileName);
//   await blobClient.downloadToFile(downloadPath);
//   console.log(`File "${fileName}" downloaded successfully.`);
// }

// async function deleteFileFromBlobStorage(fileName) {
//   const blobClient = containerClient.getBlockBlobClient(fileName);
//   const response = await blobClient.deleteIfExists();
//   console.log(`File "${fileName}" deleted successfully: ${response.succeeded}.`);
// }


// module.exports = {
//   uploadFileToBlobStorage,
//   downloadFileFromBlobStorage,
//   deleteFileFromBlobStorage
// };

import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = "DefaultEndpointsProtocol=https;AccountName=formalproject;AccountKey=BvzJCBkc/nnZmW91dTN/ovce4shiUhVW41jytxA0EuewgfRHxDvuF1h1kn0zKhCegH7oXgBJP826+ASt2vGaeg==;EndpointSuffix=core.windows.net";
const containerName = "userfiles";

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

async function uploadFileToBlobStorage(file, fileName) {
  const blobClient = containerClient.getBlockBlobClient(fileName);
  const uploadOptions = {
    bufferSize: 4 * 1024 * 1024,
    maxBuffers: 20
  };
  await blobClient.uploadData(file, uploadOptions);
  const containerUrl = `https://formalproject.blob.core.windows.net/userfiles`;
  const blobUrl = `${containerUrl}/${fileName}`;
  console.log(`File "${fileName}" uploaded successfully. URL: ${blobUrl}`);
}

async function downloadFileFromBlobStorage(fileName, downloadPath) {
  const blobClient = containerClient.getBlockBlobClient(fileName);
  const response = await blobClient.downloadToFile(downloadPath);
  console.log(`File "${fileName}" downloaded successfully. Response status code: ${response._response.status}`);
}

async function deleteFileFromBlobStorage(fileName) {
  const blobClient = containerClient.getBlockBlobClient(fileName);
  const response = await blobClient.deleteIfExists();
  console.log(`File "${fileName}" deleted successfully: ${response.succeeded}.`);
}

export { uploadFileToBlobStorage, downloadFileFromBlobStorage, deleteFileFromBlobStorage };
