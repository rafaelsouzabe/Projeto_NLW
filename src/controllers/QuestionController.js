module.exports = {
    index(req, res){
        const roomID = req.params.room
        const questionID = req.params.question
        const action = req.params.action
        const  password = req.body.password


        console.log(`room = ${roomID}, questionID = ${questionID}
        action = ${action}, password = ${password}`)

    }
}