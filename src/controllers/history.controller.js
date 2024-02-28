const { json } = require("body-parser");
const db = require("../models");
const History = db.history;
const Package = db.package;
const Store = db.store;
exports.historys = async (req, res) => {
  try {
    let _skip = parseInt(req.query.skip) || 0;
    let _limit = parseInt(req.query.skip) || 50;

    const findby = req.query;

    delete findby.skip;
    delete findby.limit;

    const _history = await History.find({ ...findby })
      .skip(_skip)
      .limit(_limit);
    res.status(200).json(_history);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.history = async (req, res) => {
  try {
    const _history = await History.findById({ _id: req.params.id });
    res.status(200).json(_history);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.historyCreate = async (req, res) => {
  try {
    if (!req.body.storeId && !req.body.packageId) {
      return res.status(400).json({ message: `STORE_AND_PACKAGE_IS_EMPTY` });
    }

    const _packages = await Package.findOne({ _id: req.body.packageId });
    if (!_packages) {
      return res.status(400).json({ message: `INVALID_PACKAGES_ID` });
    }
    const _stores = await Store.findOne({ _id: req.body.storeId });
    if (!_stores) {
      return res.status(400).json({ message: `INVALID_STORES_ID` });
    }
    // Check if store is already active with a package
    if (_stores.status === "Active") {
      // Adjust expiration date based on existing package's duration
      const currentDate = new Date();
      const expireDate = new Date(_stores.expire);
      if (expireDate > currentDate) {
        // If the current package has not yet expired, extend expiration date
        expireDate.setDate(expireDate.getDate() + _packages.duration_day);
      } else {
        // If the current package has expired, set new start and expiration dates
        const startDate = new Date();
        expireDate.setDate(startDate.getDate() + _packages.duration_day);
        _stores.start = startDate;
      }
      _stores.expire = expireDate;
    } else {
      // If the store is not currently active, set start and expiration dates
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + _packages.duration_day);
      _stores.start = startDate;
      _stores.expire = endDate;
      // _stores.status = "Active";
    }

    // Update store's package information
    _stores.packageName = _packages.name;
    _stores.active = new Date();
    _stores.packageId = _packages._id;

    // Save the updated store information
    await _stores.save();

    // Create history record for the purchase
    await History.create({
      ...req.body,
      packageName: _packages.name, // Corrected here
      duration_day: _packages.duration_day,
    });

    res.status(200).json(_stores);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.historyUpdate = async (req, res) => {
  try {
    const _historyUpdate = await History.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          updatedAt: new Date(),
          // updatedBy: req.payload.id,
        },
      }
    );
    const _history = await History.findOne({ _id: req.params.id });
    res.status(200).json(_history);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.historyDelete = async (req, res) => {
  try {
    const _historyDelete = await History.remove({ _id: req.params.id });
    return res.status(200).json({ message: "Success!" });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
