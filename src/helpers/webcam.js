export const getWebcamStream = () =>
  new Promise((resolve, reject) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            height: 600,
            width: 470,
          },
        })
        .then(stream => resolve(stream))
        .catch(reject);
    } else {
      reject(new Error("No Webcam found."));
    }
  });
