const db = require("../models");
const Price = db.price;
exports.prices = async (req, res) => {
  try {
    let _skip = parseInt(req.query.skip) || 0;
    let _limit = parseInt(req.query.limit) || 100;
    const findby = req.query;
    delete findby.skip;
    delete findby.limit;
    const _prices = await Price.find({ ...findby })
      .skip(_skip)
      .limit(_limit)
      .exec();
    res.status(200).json(_prices);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.price = async (req, res) => {
  try {
    const _price = await Price.findById({
      _id: req.params.id,
    }).exec();
    res.status(200).json(_price);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.priceCreate = async (req, res) => {
  try {
    const _prices = await Price.create({
      ...req.body,
    });
    res.status(200).json(_prices);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.priceUpdate = async (req, res) => {
  try {
    await Price.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          createdOut: new Date(),
        },
      }
    );
    const _price = await Price.findOne({ _id: req.params.id });
    res.status(200).json(_price);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.pricerDelete = async (req, res) => {
  try {
    await Price.remove({
      _id: req.params.id,
    });
    return res.status(200).json({ message: "Success!" });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
