const express = require("express"); 
const app = express(); 
const cors = require("cors")


const movies = require("./routes/moviesRoutes")
const series = require("./routes/seriesRoutes")

app.use(cors())
app.use(express.json())


app.use("/filmes", movies)
app.use("/series", series)
module.exports = app