const movies = require("../models/filmes.json") 

const home = (request, response) => {
    response.status(200).send(
        {
            "message": "Olá pessoa, seja bem vinda ao {reprograma}flix <3 <3 <3"
        }
    )
};

const getAll = (request, response) => {
    response.status(200).send(movies);
};

const getById = (request, response) => {
    const requestedId = request.params.id;
    const filteredId = movies.find(movie => movie.id == requestedId);

     response.status(200).send(filteredId);
}

const getByTitle = (request, response) => {
    const requestedTitle = request.query.title.toLowerCase()
    const filteredTitle = movies.find(movie => movie.title.toLowerCase().includes(requestedTitle))

   
    if (requestedTitle === "" || filteredTitle === undefined) {
        response.status(404).send({
            "message": "Por favor, insira um título válido."
        })
    } else {
        response.status(200).send(filteredTitle)
    }
};


const getByGenre = (request, response) => {
    const requestedGenre = request.query.genre;
   
    let movieList = [];


    movies.forEach(movie => {
     
        let genreList = movie.genre.split(",")

        for (genre of genreList) {
            if (genre.includes(requestedGenre)) {
                console.log(movie)
                movieList.push(movie)
            }
        }

    })

   
    response.status(200).send(movieList)
}

const createMovie = (request, response) => {
    let requestedTitle = request.body.title
    let requestedYear = request.body.year
    let requestedRated = request.body.rated
    let requestedReleased = request.body.released
    let requestedRuntime = request.body.runtime
    let requestedGenre = request.body.genre
    let requestedDirector = request.body.director
    let requestedWriter = request.body.writer
    let requestedActors = request.body.actors
    let requestedPlot = request.body.plot
    let requestedLanguage = request.body.language
    let requestedCountry = request.body.country
    let requestedAwards = request.body.awards

    const newMovie = {
        "id": Math.random().toString(32).substr(10,5),
        "title": requestedTitle,
        "year": requestedYear,
        "rated": requestedRated,
        "released": requestedReleased,
        "runtime": requestedRuntime,
        "genre": requestedGenre,
        "director": requestedDirector,
        "writer": requestedWriter,
        "actors": requestedActors,
        "plot": requestedPlot,
        "language": requestedLanguage,
        "country": requestedCountry,
        "awards": requestedAwards
} 

movies.push(newMovie)
response.status(200).send({"message": "Filme criado com sucesso!", newMovie})

}

const deleteMovie = (request, response) => {
    const requestedId = request.params.id
    const filteredId = movies.find(movie.id == requestedId)

    const indice = movies.indexOf(filteredId)
    movies.splice(indice,1)

    response.status(200).send({
        "message": "Filme deletado!", movies
    })
}

const replaceMovie = (request, response) => {
    let requestedId = request.params.id
    let movieUpdated = request.body

    let filteredId = movies.find(movie => movie.id == requestedId)

    let updateMovie = {
        "id": filteredId,
        "title": movieUpdated.title,
        "year": movieUpdated.year,
        "rated": movieUpdated.rated,
        "released": movieUpdated.released,
        "runtime": movieUpdated.runtime,
        "genre": movieUpdated.genre,
        "director": movieUpdated.director,
        "writer": movieUpdated.writer,
        "actors": movieUpdated.actors,
        "plot": movieUpdated.plot,
        "language": movieUpdated.language,
        "country": movieUpdated.country,
        "awards": movieUpdated.awards
    }

    const indice = movies.indexOf(filteredId)
        movies.splice(indice,1, updateMovie)

        response.status(200).send({
            "message": "Filme atualizado", updateMovie
        })

}

const updateTitle = (request, response) => {
    let requestedId = request.params.id
    let newTitle = request.body.title

    let filteredId = movies.find(movie => movie.id == requestedId)
    filteredId.title = newTitle

    response.status(200).send({
        "message": "Título atualizado com sucesso!!", filteredId
    })

}

const updateAnything = (request,response) => {
    let requestedId = request.params.id
    let filteredId = movies.find(movie => movies.id == requestedId)

    let update = request.body
    let keyList = Object.keys(update)  // substituicao da chave enviada p a chave atual

    keyList.forEach((key) => {
        filteredId[key] = update[key]
    })

    response.status(200).send({
        "message": "Informação atualizada!!", filteredId
    })
}





module.exports = {
    home,
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createMovie,
    deleteMovie,
    replaceMovie,
    updateTitle,
    updateAnything
}