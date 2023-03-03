"use strict";

const express = require("express");
const router = express.Router();
const Croqueta = require("../models/Croqueta");

//INDEX
router.get("/", async (req, res) => {
  try {
    const arrayCroquetaDB = await Croqueta.find();
    console.log(arrayCroquetaDB);
    res.render("index", {
      arrayCroquetas: arrayCroquetaDB,
      tituloWeb: "La Croquetería",
    });
  } catch {
    console.log(error);
  }
});

//CREATE:
router.get("/create", (req, res) => {
  res.render("create");
});


router.post("/insert", async (req, res) => {
  const body = req.body;
  try {
    const croquetaDB = new Croqueta(body);
    await croquetaDB.save();
    res.redirect("/");
  } catch (error) {
    console.log("error", error);
  }
});

//DELETE: 
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const croquetaDB = await Croqueta.findByIdAndDelete({ _id: id });
    if (!croquetaDB) {
      res.json({
        estado: false,
        mensaje:
          "No se puede eliminar la croqueta. El mundo sin croquetas no tiene sentido",
      });
    } else {
      res.json({
        estado: true,
        mensaje: "Croqueta eliminada",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//EDIT: 
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const croquetaDB = await Croqueta.findOne({ _id: id });
    console.log(croquetaDB);
    res.render("edit", {
      croqueta: croquetaDB,
      error: false,
    });
  } catch (error) {
    console.log("Se ha producido un error", error);
    res.render("detalle", {
      error: true,
      mensaje: "Croqueta no encontrada",
    });
  }
});

 
router.put("/:id", async (req, res) => {
  const id = req.params.id; //coge el id por parámetro
  const body = req.body; //recoge los campos del formulario
  console.log(id);
  console.log("body", body);
  try {
    const croquetaDB = await Croqueta.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });

    console.log(croquetaDB);
    res.json({
      estado: true,
      mensaje: "Croqueta editado",
    });
  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      mensaje: "Problema al editar la croqueta",
    });
  }
});

module.exports = router;
