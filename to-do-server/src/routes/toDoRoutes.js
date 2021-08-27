const express = require("express")
const router = express.Router()
const controller = require("../controllers/toDoController")

router.get("/tarefa", controller.home)
router.get("/", controller.getAll)
router.get("/:id", controller.getById)

router.post("/cadastrar", controller.createTask)

router.delete("/:id", controller.deleteTask)

router.delete("/:id", controller.replaceTask)

router.delete("/:id", controller.updateAnything)

module.exports = router