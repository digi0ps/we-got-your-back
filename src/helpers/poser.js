class PoseNet {
  constructor(videoElement, canvasElement) {
    const ml5 = window["ml5"];
    this.poser = ml5.poseNet(videoElement, () => null);
    this.defaults = null;
    this.points = {
      eyes: {},
      shoulders: {},
    };

    this.width = videoElement.width;
    this.height = videoElement.height;
    canvasElement.width = videoElement.width;
    canvasElement.height = videoElement.height;
    this.ctx = canvasElement && canvasElement.getContext("2d");
  }

  setupListener(callback) {
    this.poser.on("pose", results => {
      const isPoseProper = this.calculatePoseCorrectness(results);
      console.log(isPoseProper);
      callback(isPoseProper);

      if (this.ctx && this.defaults) {
        this.drawCanvas(isPoseProper);
      }
    });
  }

  calculatePoseCorrectness(results) {
    for (let i = 0; i < results.length; i++) {
      let pose = results[i].pose;
      for (let j = 0; j < pose.keypoints.length; j++) {
        // let keypoint = pose.keypoints[j];
        let rightEye = pose.keypoints[2].position;
        let leftEye = pose.keypoints[1].position;
        this.points.eyes.left = leftEye;
        this.points.eyes.right = rightEye;
        this.points.shoulders.left = pose.keypoints[6].position;
        this.points.shoulders.right = pose.keypoints[5].position;

        if (!this.defaults) {
          this.defaults = {
            leftEye,
            rightEye,
          };
        }

        if (Math.abs(rightEye.y - this.defaults.leftEye.y) < 30) {
          return true;
        }

        if (Math.abs(rightEye.y - this.defaults.rightEye.y) > 30) {
          return false;
        }
      }
    }
  }

  drawCanvas(isPoseProper) {
    const {
      ctx,
      points: { shoulders, eyes },
    } = this;

    ctx.clearRect(0, 0, this.width, this.height);

    let color = isPoseProper ? "green" : "red";
    const size = 5;

    drawPoint(ctx, shoulders.left.y, shoulders.left.x, size, color);
    drawPoint(ctx, shoulders.right.y, shoulders.right.x, size, color);
    drawPoint(ctx, eyes.left.y, eyes.left.x, size, color);
    drawPoint(ctx, eyes.right.y, eyes.right.x, size, color);

    drawSegment(
      ctx,
      [shoulders.left.y, shoulders.left.x],
      [shoulders.right.y, shoulders.right.x],
      color,
      1,
    );
  }
}

export default PoseNet;

function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawSegment(ctx, [ay, ax], [by, bx], color, scale) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.stroke();
}
