const seriesController = require("../controllers/seriesControllers")

const express = require("express")
const router = express.Router()

router.get("/series", seriesController.hello)
router.get("/todos", seriesController.getAllSeries)
router.get("/titulo", seriesController.getSerieByTitle)
router.get("/genero", seriesController.getGenreSerie)
router.get("/:id", seriesController.getByIdSeries)

router.post("/cadastrar", seriesController.createSerie)

router.delete("/:id", seriesController.deleteSerie)

router.put("/:id", seriesController.replaceSerie)

router.patch("/:id", seriesController.updateSerieTitle)
router.patch("/alterar/:id", seriesController.updateAnythingSerie)



module.exports = router