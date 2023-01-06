module.exports = function (req, res, next) {
  res.json(convert(req.query.input));
  next();
};

function convert(data) {
  var matches = data.match(/[+-]?\d+(\.\d+)?/g);
  let number = null;
  if (matches) number = parseFloat(matches[0]);

  const request = data.replace(matches[0], "").toLowerCase();

  if (unitParse(request) == 0 && !number) return "invalid number and unit";

  if (!number) return "invalid number";
  if (unitParse(request) == 0) return "invalid unit";

  if (unitParse(request) == 1)
    return {
      initNum: number,
      initUnit: "gal",
      returnNum: number * 3.78541,
      returnUnit: "L",
      string: `${number} gal to ${number * 3.78541} L`,
    };

  if (unitParse(request) == 2)
    return {
      initNum: number,
      initUnit: "L",
      returnNum: number / 3.78541,
      returnUnit: "gal",
      string: `${number} L to ${number / 3.78541} gal`,
    };
  if (unitParse(request) == 3)
    return {
      initNum: number,
      initUnit: "mi",
      returnNum: number * 1.6,
      returnUnit: "km",
      string: `${number} mi to ${number * 1.6} km`,
    };
  if (unitParse(request) == 4)
    return {
      initNum: number,
      initUnit: "km",
      returnNum: number / 1.6,
      returnUnit: "mi",
      string: `${number} km to ${number / 1.6} mi`,
    };
  if (unitParse(request) == 5)
    return {
      initNum: number,
      initUnit: "lbs",
      returnNum: number / 2.205,
      returnUnit: "kg",
      string: `${number} lbs to ${number / 2.205} kg`,
    };

  if (unitParse(request) == 6)
    return {
      initNum: number,
      initUnit: "kg",
      returnNum: number * 2.205,
      returnUnit: "lbs",
      string: `${number} kg to ${number * 2.205} lbs`,
    };
}

const unitParse = (request) => {
  console.log(request);
  if (request == "kg") return 6;

  if (request == "lbs") return 5;

  if (request == "km") return 4;

  if (request == "mi") return 3;

  if (request == "l") return 2;

  if (request == "gal") return 1;

  return 0;
};
