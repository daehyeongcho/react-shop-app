const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema(
  {
    users: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    products: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
