const series = require("../models/series.json")

const hello = (request, response) => {
    response.status(200).send({
        "message": "Olá qual série do {reprograma}flix você quer assistir agora?"
    })
}

const getAllSeries = (request, response) => {
    response.status(200).send(series)
}

const getByIdSeries = (request, response) => {
    const requiredId = request.params.id
    const filteredIdSerie = series.find(serie => serie.id == requiredId)

    response.status(200).send(filteredIdSerie)
}

const getSerieByTitle = (request, response) => {
    const requiredTitle = request.query.title.toLowerCase()

    const titleFiltered = series.find(serie => serie.title.toLowerCase().includes(requiredTitle))

    if (requiredTitle === "" || titleFiltered === undefined) {
        response.status(404).send(
            {
                "message": "Ops! Insira um título válido! ) "
            }
        )
    } else {
        response.status(200).send(titleFiltered)
    }
}

const getGenreSerie = (request, response ) => {
    const requiredGenre = request.query.genre 
    let serieList = []


    series.forEach(serie => {
        let listGenre = serie.genre.split(",")


        for(genre of listGenre) {
            if(genre.includes(requiredGenre)) {

                serieList.push(serie)
            }
        }
    })

    response.status(200).send(serieList)

}

const createSerie = (request, response) => {
    let requiredTitle = request.body.title
    let requiredTotalSeasons = request.body.totalSeasons
    let requiredGenre = request.body.genre
    let requiredWriters = request.body.writers 
    let requiredPoster = request.body.poster 
    let requiredActors = request.body.actors 
    let requiredRatings = request.body.ratings

    const newSerie = {
        "id": Math.random().toString(32).substr(5,5),
        "title": requiredTitle,
        "totalSeasons": requiredTotalSeasons,
        "genre": requiredGenre,
        "writers": requiredWriters,
        "poster": requiredPoster,
        "actors": requiredActors,
        "ratings": requiredRatings
    }

    series.push(newSerie)
    response.status(200).send({"message": "Série criada!!", newSerie})
}

const deleteSerie = (request, response) => {
    const requiredId = request.params.id 
    const filteredIdSerie = series.find(serie.id == requiredId)
    let indice = series.indexOf(filteredIdSerie)
    series.splice(indice,1) 

    response.status(200).send({"message": "Série deletada!", series})

}

const replaceSerie = (request, response) => {
    let requiredId = request.params.id 
    let serieUpdated = request.body
    let filteredIdSerie = series.find(serie => serie.id == requiredId)


    let updateSerie = {
        "id": filteredIdSerie,
        "title": serieUpdated.title,
        "totalSeasons": serieUpdated.totalSeasons,
        "genre": serieUpdated.genre,
        "writers": serieUpdated.writers,
        "poster": serieUpdated.poster,
        "actors": serieUpdated.actors,
        "ratings": serieUpdated.ratings
    }

    let indice = series.indexOf(filteredIdSerie)
    series.splice(indice,1,updateSerie)

    response.status(200).send({"message": "Série atualizada com sucesso", updateSerie})
}

const updateSerieTitle = (request, response) => {
    let requiredId = request.params.id 
    let newSerieTitle = request.body.title

    let filteredIdSerie = series.find(serie => serie.id == requiredId)
    filteredIdSerie.title = newSerieTitle

    response.status(200).send({
        "message": "Título atualizado!", filteredIdSerie
    })
}

const updateAnythingSerie = (request, response) => {
    let requiredId = request.params.id 
    let filteredIdSerie = series.find(serie => serie.id == requiredId)
    let update = request.body
    let keyList = Object.keys(update)

    keyList.forEach((key) => {
        filteredIdSerie[key] = update[key]
    })

    response.status(200).send({
        "message": "Informação atualizada!", filteredIdSerie
    })
}



module.exports = {hello,
     getAllSeries, 
     getByIdSeries,
      getSerieByTitle,
       getGenreSerie,
        createSerie, 
        deleteSerie, 
        replaceSerie, 
        updateSerieTitle,
        updateAnythingSerie
    }