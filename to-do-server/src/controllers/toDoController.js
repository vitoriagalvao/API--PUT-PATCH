
const tarefasJson = require("../models/tarefas.json");
// const fs = require("fs");

const home = (request, response)=> {
    response.status(200).send({
        "message": "Bem vinde as suas tarefas",
    })
}

const getAll = (request, response) => {
    response.status(200).send(tarefasJson);
};

const getById = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    response.status(200).send(tarefaFiltrada)
}

const createTask = (request, response) => {
    const descricaoRequirida = request.body.descricao
    const nomeColaboradorRequirido = request.body.nomeColaborador

    const novaTarefa = {
        id: Math.random().toString(32).substr(2, 9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricaoRequirida,
        nomeColaborador: nomeColaboradorRequirido
    }

    tarefasJson.push(novaTarefa)
    response.status(200).send({"message": "Tarefa criada!!", novaTarefa})

}


const deleteTask = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)


    response.status(200).json({
        "mensagem": "Tarefa deletada", tarefa,
        
    })

}

const replaceTask = (request, response) => {
    let requiredId = request.params.id 
    let taskUpdated = request.body
    let filteredId = task.find(task => task.id == requiredId)

    let updateTask = {
        "id": filteredId,
        "dataInclusao": taskUpdated.dataInclusao,
        "concluido": taskUpdated.concluido,
        "descricao": taskUpdated.descricao,
        "nomeColaborador": taskUpdated.nomeColaborador
    }

    const indice = task.indexOf(filteredId)
    task.splice(indice,1,updateTask)

    response.status(200).send({"message": "Tarefa atualizada com sucesso!", updateTask})
}

const updateAnything = (request, response) => {
    let requestedId = request.params.id 
    let filteredId = task.find(task => task.id == requestedId)
    let update = request.body
    let keyList = Object.keys(update)

    keyList.forEach((key) => {
        filteredId[key] = update[key]
    })

    response.status(200).send({"message": "Informação atualizada com sucesso!", filteredId})
}



module.exports = {
    home,
    getAll,
    getById,
    createTask,
    deleteTask,
    replaceTask,
    updateAnything
}