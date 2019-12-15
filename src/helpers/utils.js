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
