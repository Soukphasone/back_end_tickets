const db = require("../models");
const Order = db.order;

exports.orders = async (req, res) => {
  try {
    // let _skip = parseInt(req.query.skip) || 0;
    // let _limit = parseInt(req.query.limit) || 100;
    const findby = req.query;
    if (findby.sign) {
      findby.sign = { $regex: findby.sign };
    } else {
      delete findby.sign
    }
    if (findby.note) {
      findby.note = { $regex: findby.note };
    } else {
      delete findby.note
    }
    if (findby.dateFrom && findby.dateTo) {
      findby.createdAt = {
        $gte: new Date(findby.dateFrom + "T00:00:00.000Z"),
        $lt: new Date(findby.dateTo + "T23:59:59.000Z"),
      }
    } else {
      delete findby.dateFrom
      delete findby.dateTo
    }
    delete findby.dateFrom
    delete findby.dateTo

    delete findby.skip;
    delete findby.limit;
    const _search = await Order.find({ ...findby })
      // .skip(_skip)
      // .limit(_limit)
      .exec();
    res.status(200).json(_search);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.order = async (req, res) => {
  try {
    const _order = await Order.findById({
      _id: req.params.id,
    }).exec();
    res.status(200).json(_order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.orderCreate = async (req, res) => {
  try {
    const _orderCreate = await Order.create({
      ...req.body,
    });
    res.status(200).json(_orderCreate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.orderUpdate = async (req, res) => {
  try {
    const _orderUpdate = await Order.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          createdOut: new Date(),
          // updatedBy: req.payload.id,
        },
      }
    );
    const _order = await Order.findOne({ _id: req.params.id });
    res.status(200).json(_order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.orderDelete = async (req, res) => {
  try {
    const _orderDelete = await Order.remove({
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
