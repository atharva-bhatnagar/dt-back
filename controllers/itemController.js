const Item = require("../models/MenuItem");
const asyncHandler = require("express-async-handler");

const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find().select().lean();
  if (!items?.length) {
    return res.status(400).json({ message: "No items found" });
  }
  res.json(items);
});

const createNewItem = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, price } = req.body;

  const duplicate = await Item.findOne({ name }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "duplicate item" });
  }

  const itemObject = { name, price };

  const item = await Item.create(itemObject);

  if (item) {
    res.status(201).json({ message: `new item ${name} created` });
  } else {
    res.status(400).json({ message: `Invalid item data received` });
  }
});

module.exports = {
  getAllItems,
  createNewItem,
};
