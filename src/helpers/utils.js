export function throttle(func, interval) {
  let timer = null;
  let lastArgs;

  return function(...args) {
    // Always apply the latest arguments when the func is called
    lastArgs = args;

    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      timer = null;
      func(...lastArgs);
    }, interval);
  };
}

export const GOOD_POSE_THRESHOLD = 5;
export function isUserCrouched(tenSecArray) {
  if (tenSecArray.length === 10) {
    let tpsum = 0;

    tenSecArray.forEach(pose => {
      if (pose) {
        tpsum++;
      }
    });

    if (tpsum < GOOD_POSE_THRESHOLD) {
      return "crouched";
    } else {
      return "not_crouched";
    }
  }

  return "not_enough_data";
}

export function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

export function drawSegment(ctx, [ay, ax], [by, bx], color, scale) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.stroke();
}
