const controller = require("../controllers/moviesControllers"); 
const express = require("express");
const router = express.Router();

router.get("/", controller.home);
router.get("/todos", controller.getAll);
router.get("/titulo", controller.getByTitle)
router.get("/genero", controller.getByGenre)
router.get("/:id", controller.getById)

router.post("/cadastrar", controller.createMovie)

router.delete("/:id", controller.deleteMovie)

router.put("/:id", controller.replaceMovie)

router.patch("/:id", controller.updateTitle)
router.patch("/atualizar/:id", controller.updateAnything)

module.exports = router