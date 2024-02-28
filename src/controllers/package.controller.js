const db = require("../models");
const Package = db.package;
exports.packages = async (req, res) => {
  try {
    let _skip = parseInt(req.query.skip) || 0;
    let _limit = parseInt(req.query.skip) || 50;

    const findby = req.query;

    if (findby.name) {
      findby.name = { $regex: findby.name };
    }

    delete findby.skip;
    delete findby.limit;

    const _package = await Package.find({ ...findby })
      .skip(_skip)
      .limit(_limit);
    res.status(200).json(_package);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.package = async (req, res) => {
  try {
    const _package = await Package.findById({ _id: req.params.id });
    res.status(200).json(_package);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.packageCreate = async (req, res) => {
  try {
    const _packageCreate = await Package.create({
      ...req.body,
    });
    res.status(200).json(_packageCreate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.packageUpdate = async (req, res) => {
  try {
    await Package.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          createdOut: new Date(),
          // updatedBy: req.payload.id,
        },
      }
    );
    const _package = await Package.findOne({ _id: req.params.id });
    res.status(200).json(_package);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.packageDelete = async (req, res) => {
  try {
    await Package.remove({
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
