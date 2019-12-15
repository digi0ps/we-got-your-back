export var throttleFunction = function(func, delay) {
  if (timerId) {
    return;
  }

  let timerId = setTimeout(function() {
    func();
    timerId = undefined;
  }, delay);
};
