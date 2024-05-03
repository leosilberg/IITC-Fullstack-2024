console.clear();
console.time("time");
localStorage.setItem("key", "hello");
console.log(localStorage.getItem("key"));
console.timeEnd("time");

