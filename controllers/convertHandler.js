module.exports = function (req, res, next) {
  res.json(convert(req.query.input));
  next();
};

function convert(data) {
  const number = parseFloat(data) || 0;
  if (data.indexOf("gal") > -1)
    return {
      initNum: number,
      initUnit: "gal",
      returnNum: number * 1.6,
      returnUnit: "L",
      string: `${number} gal converts to ${(number * 3, 785)} L`,
    };

  if (data.indexOf("L") > -1)
    return {
      initNum: number,
      initUnit: "L",
      returnNum: number * 1.6,
      returnUnit: "gal",
      string: `${number} L converts to ${(number / 3, 785)} gal`,
    };
  if (data.indexOf("mi") > -1)
    return {
      initNum: number,
      initUnit: "mi",
      returnNum: number * 1.6,
      returnUnit: "km",
      string: `${number} miles converts to ${number * 1.6} kilometers`,
    };
  if (data.indexOf("km") > -1)
    return {
      initNum: number,
      initUnit: "km",
      returnNum: number * 1.6,
      returnUnit: "mi",
      string: `${number} kilometers converts to ${number / 1.6} miles`,
    };
  if (data.indexOf("lbs") > -1)
    return {
      initNum: number,
      initUnit: "lbs",
      returnNum: number / 2.205,
      returnUnit: "kg",
      string: `${number} lbs converts to ${number / 2.205} kilogrammes`,
    };

  if (data.indexOf("kg") > -1)
    return {
      initNum: number,
      initUnit: "kg",
      returnNum: number / 2.205,
      returnUnit: "lbs",
      string: `${number} kilogrammes converts to ${number * 2.205} lbs`,
    };
}
