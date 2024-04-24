const mongoose = require('mongoose');
const db = require("../models");
const Order = db.order;
const today = new Date();
const startOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);
const endOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 1
);
exports.reportCountCarType = async (req, res) => {
  try {
    const { status, userId } = req.query;
    const _countcar = await Order.count({
      carType: { $regex: "ລົດໃຫຍ່" },
      status: status,
      userId: userId,
    }).exec();
    const _countbike = await Order.count({
      carType: { $regex: "ລົດຈັກ" },
      status: status,
      userId: userId,
    }).exec();
    res.status(200).json({
      totalCars: _countcar,
      totalBike: _countbike,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.ReportAmoutDay = async (req, res) => {
  try {
    const { userId } = req.query;
    const _reportDay = await Order.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startOfToday, $lt: endOfToday },
        },
      },
      {
        $group: {
          _id: null,
          AmountToday: {
            $sum: {
              $cond: [
                { $in: ["$status", ["ONLINE", "OFFLINE"]] },
                "$amount",
                0
              ]
            },
          },
        },
      },
    ]);
    const amountToday = _reportDay.length > 0 ? _reportDay[0].AmountToday : 0;
    res.status(200).json({ AmountToday: amountToday });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error: ${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
//Count car for today
exports.reportCountCarTypeToday = async (req, res) => {
  try {
    const { status, userId } = req.query;
    const _countcar = await Order.countDocuments({
      carType: { $regex: "ລົດໃຫຍ່" },
      status: status,
      userId: userId,
      createdAt: { $gte: startOfToday, $lte: endOfToday }
    }).exec();

    const _countbike = await Order.countDocuments({
      carType: { $regex: "ລົດຈັກ" },
      status: status,
      userId: userId,
      createdAt: { $gte: startOfToday, $lte: endOfToday }
    }).exec();

    res.status(200).json({
      totalCars: _countcar,
      totalBike: _countbike,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Internal Server Error: ${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.Cancelbill = async (req, res) => {
  try {
    const { status, userId } = req.query;
    const findby = {
      status: status,
      userId: userId,
      createdAt: {
        $gte: startOfToday,
        $lt: endOfToday,
      },
    };

    if (req.query.letter) {
      findby.letter = { $regex: req.query.letter };
    }

    if (req.query.sign) {
      findby.sign = parseInt(req.query.sign);
    }

    const _search = await Order.find(findby).exec();
    res.status(200).json(_search);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error: ${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
