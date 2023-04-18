const fileSystem = require('fs')
function getData(filename){
    const result = JSON.parse(fileSystem.readFileSync( filename ,'utf8'))
    return result
}
function createOrUpdateData(filename, data){
    fileSystem.writeFileSync(filename, JSON.stringify(data))
}
function findById(id, data) {
    const item = data.find((current)=> current.id === Number(id))
    return item
}
function findByEmail(email, data){
    const item = data.find((current)=> current.email === email)
    return item
}
module.exports = {
    getData,
    createOrUpdateData,
    findById,
    findByEmail
}