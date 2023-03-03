"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const croquetaSchema = new Schema({
  id: String,
  name: String,
  description: String,
  //para la categoría uso un enum:
  category: {
    type: String,
    enum: ["Clásica", "Vanguardia"],
  },
  ingredients: String,
  gluten: Boolean,
  dairy: Boolean,
  shellFruits: Boolean,
  eggs: Boolean,
  shellFish: Boolean,
});

const Croqueta = mongoose.model("Croqueta", croquetaSchema, "croqueta");

module.exports = Croqueta;
