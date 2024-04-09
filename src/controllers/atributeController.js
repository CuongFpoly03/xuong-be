const AttributeModel = require("../models/atributeModel");
const ValueAttributeModel = require("../models/atributeModel");

//Atributemodel

const createAttribute = async (req, res) => {
  try {
    const { name } = req.body;
    const attribute = new AttributeModel({
      name,
    });
    const newAttribute = await attribute.save();
    res.status(201).json(newAttribute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllAttributes = async (req, res) => {
  try {
    const attributes = await AttributeModel.find().populate("values");
    res.json(attributes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAttributeById = async (req, res) => {
  try {
    const attribute = await AttributeModel.findById(req.params.id).populate(
      "values"
    );
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    res.json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAttribute = async (req, res) => {
  try {
    const { name } = req.body;
    const attribute = await AttributeModel.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    attribute.name = name;
    const updatedAttribute = await attribute.save();
    res.json(updatedAttribute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAttribute = async (req, res) => {
  try {
    const attribute = await AttributeModel.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    await attribute.remove();
    res.json({ message: "Attribute deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// valueAttributeModel

const createValueAttribute = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const attribute = await AttributeModel.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    const valueAttribute = new valu({
      name,
      price,
      quantity,
    });
    const newValueAttribute = await valueAttribute.save();
    attribute.values.push(newValueAttribute);
    await attribute.save();
    res.status(201).json(newValueAttribute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllValueAttributes = async (req, res) => {
  try {
    const values = await ValueAttributeModel.find();
    res.json(values);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getValueAttributeById = async (req, res) => {
  try {
    const value = await ValueAttributeModel.findById(req.params.id);
    if (!value) {
      return res.status(404).json({ message: "ValueAttribute not found" });
    }
    res.json(value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateValueAttribute = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const value = await ValueAttributeModel.findById(req.params.id);
    if (!value) {
      return res.status(404).json({ message: "ValueAttribute not found" });
    }
    value.name = name;
    value.price = price;
    value.quantity = quantity;
    const updatedValue = await value.save();
    res.json(updatedValue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteValueAttribute = async (req, res) => {
  try {
    const value = await ValueAttributeModel.findById(req.params.id);
    if (!value) {
      return res.status(404).json({ message: "ValueAttribute not found" });
    }
    await value.remove();
    res.json({ message: "ValueAttribute deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  //atribute
  createAttribute: createAttribute,
  getAllAttributes: getAllAttributes,
  getAttributeById: getAttributeById,
  updateAttribute: updateAttribute,
  deleteAttribute: deleteAttribute,
  // valueattribute
  getAllValueAttributes: getAllValueAttributes,
  createValueAttribute: createValueAttribute,
  getValueAttributeById: getValueAttributeById,
  updateValueAttribute: updateValueAttribute,
  deleteValueAttribute: deleteValueAttribute,
};
