const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const valueAtributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("valueAtribute", valueAtributeSchema);

const attributeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  values: [{ type: ObjectId, ref: "valueAtribute" }],
});

module.exports = mongoose.model("atribute", attributeSchema);
