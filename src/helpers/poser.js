class PoseNet {
  constructor(videoElement) {
    const ml5 = window["ml5"];
    this.poser = ml5.poseNet(videoElement, () => null);
  }

  setupListener(callback) {
    this.poser.on("pose", results => {
      const isPoseProper = this.calculatePoseCorrectness(results);
      console.log(isPoseProper);
      callback(isPoseProper);
    });
  }

  calculatePoseCorrectness(results) {
    for (let i = 0; i < results.length; i++) {
      let pose = results[i].pose;
      for (let j = 0; j < pose.keypoints.length; j++) {
        // let keypoint = pose.keypoints[j];
        let rightEye = pose.keypoints[2].position;
        let leftEye = pose.keypoints[1].position;
        // let rightShoulder = pose.keypoints[6].position;
        // let leftShoulder = pose.keypoints[5].position;

        //Start position.
        while (defaultRightEyePosition.length < 1) {
          defaultRightEyePosition.push(rightEye.y);
        }

        while (defaultLeftEyePosition.length < 1) {
          defaultLeftEyePosition.push(leftEye.y);
        }

        if (Math.abs(rightEye.y - defaultRightEyePosition[0]) > 15) {
          return true;
        }

        if (Math.abs(rightEye.y - defaultRightEyePosition[0]) < 15) {
          return false;
        }
      }
    }
  }
}

export default PoseNet;

let defaultRightEyePosition = [],
  defaultLeftEyePosition = [];
