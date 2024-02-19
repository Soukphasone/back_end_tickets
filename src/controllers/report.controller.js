const { filter } = require("bluebird");
const db = require("../models");
const _ = require("lodash");
const Order = db.order;
exports.reportAllStatus = async (req, res) => {
  try {
    const _orders = await Order.find(req.query).exec();
    // console.log("object", _orders)
    let dataGroup = _.groupBy(_orders, "status");
    let groupedData = [];
    for (const [key, value] of Object.entries(dataGroup)) {
      console.log("value", value);
      let { totalBikes, totalCars, totalCycle } = 0;
      let status = "";
      value.map((item) => {
        status = item.status;
        if (item.carType === "ລົດໃຫຍ່") {
          totalCars++;
        }
        if (item.carType === "ລົດຖີບ") {
          totalCycle++;
        }
        if (item.carType === "ລົດຈັກ") {
          totalBikes++;
        }
      });
      let orderGroup = {
        status,
        totalBikes,
        totalCars,
        totalCycle,
      };

      groupedData.push(orderGroup);
    }

    return res.status(200).json({
      data: groupedData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.reportByStatus = async (req, res) => {
  try {
    const _orders = await Order.find({ status: req.query.status }).exec();
    console.log("req", req.query.status);
    // console.log("object", _orders)
    let groupedData = {};
    if (_orders.length > 0) {
      let totalBikes = 0;
      let totalCars = 0;
      let totalCycle = 0;
      for (let i = 0; i < _orders.length; i++) {
        if (_orders[i].carType === "ລົດໃຫຍ່") {
          totalCars++;
        }
        if (_orders[i].carType === "ລົດຖີບ") {
          totalCycle++;
        }
        if (_orders[i].carType === "ລົດຈັກ") {
          totalBikes++;
        }
      }
      groupedData = {
        totalBikes,
        totalCars,
        totalCycle,
      };

      // groupedData = {}
    }

    return res.status(200).json({
      data: groupedData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
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
    const _countcycle = await Order.count({
      carType: { $regex: "ລົດຖີບ" },
      status: status,
      userId: userId,
    }).exec();
    res.status(200).json({
      totalCars: _countcar,
      totalBike: _countbike,
      totalCycle: _countcycle,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
exports.reportAmountMoney = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$money",
          totalAmount: { $sum: "$amount" },
        },
      },
    ];

    const result = await Order.aggregate(pipeline);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal Server Error:${err}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
