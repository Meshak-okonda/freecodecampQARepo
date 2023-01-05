const runner = require("./test-runner");

try {
  console.log("Running Tests...");
  runner.run();
} catch (e) {
  error = e;
  console.log("Tests are not valid:");
  console.log(error);
}

function testFilter(tests, type, n) {
  let out;
  switch (type) {
    case "unit":
      out = tests.filter((t) => t.context.match("Unit Tests"));
      break;
    case "functional":
      out = tests.filter((t) => t.context.match("Functional Tests"));
      break;
    default:
      out = tests;
  }
  if (n !== undefined) {
    return out[n] || out;
  }
  return out;
}
