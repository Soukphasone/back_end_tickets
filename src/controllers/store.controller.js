const { default: mongoose } = require("mongoose");
const db = require("../models");
const Store = db.store;

exports.stores = async (req, res) => {
  try {
    // let _skip = parseInt(req.query.skip) || 0;
    // let _limit = parseInt(req.query.limit) || 100;
    const findby = req.query;
    if (findby.name) {
      findby.name = { $regex: findby.name};
    } else {
      delete findby.name
    }
    if (findby.status) {
      findby.status = { $regex: findby.status};
    } else {
      delete findby.status
    }
    if (findby.packageId) {
      findby.packageId = new mongoose.Types.ObjectId(findby.packageId) ;
    } else {
      delete findby.packageId
    }
    if (findby.dateFrom && findby.dateTo) {
      findby.expire = {
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

    // console.log(findby)
    const _search = await Store.find({ ...findby })
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
// By id
exports.store = async (req, res) => {
  try {
    const _store = await Store.findById({
      _id: req.params.id,
    }).exec();
    res.status(200).json(_store);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.storeCreate = async (req, res) => {
  try {
    const _storeCreate = await Store.create({
      ...req.body,
    });
    res.status(200).json(_storeCreate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.storeUpdate = async (req, res) => {
  try {
    const _storeUpdate = await Store.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          createdOut: new Date(),
          // updatedBy: req.payload.id,
        },
      }
    );
    const _order = await Store.findOne({ _id: req.params.id });
    res.status(200).json(_order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.storeDelete = async (req, res) => {
  try {
    const _storeDelete = await Store.remove({
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
