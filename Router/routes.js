"use strict";

const express = require("express");
const router = express.Router();
const Croqueta = require("../models/Croqueta");

router.get("/", async (req, res) => {
  try {
    const arrayCroquetaDB = await Croqueta.find();
    res.render("index", { arrayCroquetas: arrayCroquetaDB });
  } catch {
    console.log(error);
  }
});

router.get("/create", (req, res) => {
  res.render("create");
});

//insert
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

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const croquetaDB = await Croqueta.findOne({ _id: id });
    res.render("edit", {
      croqueta: croquetaDB,
      error: false,
    });
  } catch (error) {
    console.log("Se ha producido un error", error);
    res.render("edit", {
      error: true,
      mensaje: "Croqueta no encontrada",
    });
  }
});

router.put("/edit/:id", async (req, res) => {
  const id = req.params.id; 
  const body = req.body; 

  try {
      const croquetaDB = await Croqueta.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });

    res.json({
      estado: true,
      mensaje: "Croqueta editada",
    });
  } catch (error) {
    res.json({
      estado: false,
      mensaje: "Problema al editar la Croqueta",
    });
  }
});

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
  
  module.exports = router;