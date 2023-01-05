const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=xy_z")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.deepEqual(JSON.parse(res.text), {
            name: "Cristoforo",
            surname: "Colombo",
            dates: "1451 - 1506",
          });
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          assert.deepEqual(JSON.parse(res.text), {
            name: "Giovanni",
            surname: "da Verrazzano",
            dates: "1485 - 1528",
          });
          done();
        });
    });
  });
});

const Browser = require("zombie");

Browser.localhost("http://localhost", 3000);

const browser = new Browser();

suite("Functional Tests with Zombie.js", function () {
  this.timeout(5000);

  suite("Headless browser", function () {
    test('should have a working "site" property', function (done) {
      browser.visit("http://localhost:3000", function () {
        assert.isNotNull(browser.site);
        done();
      });
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill("#i1", "Colombo");
      browser.pressButton("submit", function () {
        assert.equal(browser.text("span#name"), "Cristoforo");
        assert.equal(browser.text("span#surname"), "Colombo");
        assert.equal(browser.text("span#dates"), "1451 - 1506");
        done();
      });
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill("#i1", "Vespucci");
      browser.pressButton("submit", function () {
        assert.equal(browser.text("span#name"), "Amerigo");
        assert.equal(browser.text("span#surname"), "Vespucci");
        assert.equal(browser.text("span#dates"), "1454 - 1512");
        done();
      });
    });
  });
});
