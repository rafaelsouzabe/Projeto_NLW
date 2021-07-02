const { open } = require("sqlite")
const Database = require("../db/config")

module.exports = {
    async create(req, res){

        try {
            
            const db = await Database()
            const pass = req.body.password
            let roomID = Math.floor(Math.random() * 10).toString()
            let isRoom = true

            while(isRoom){


                // GERA O NUMERO DA SALA
                
                for(var i = 0; i < 5; i++){
                    roomID += Math.floor(Math.random() * 10).toString()
                }
        
                // VERIFICA SE O NUMERO JA EXISTE
                const roomsExistIDS = await db.all(`SELECT id FROM rooms`)
                isRoom = roomsExistIDS.some(roomsExistIDS => roomsExistIDS == roomID)
    
                if(!isRoom){
                    // INSERI A SALA NO BANCO
                    await db.run(`INSERT INTO rooms (
                        id, 
                        pass
                    ) VALUES (
                        ${parseInt(roomID)},
                        ${pass}
            
                    )`);
                }
            }

            await db.close()
            
            res.redirect(`/room/${roomID}` )

        } catch (error) {
            console.log(error)
        }
    
    },
    async open(req, res){
        const db = await Database()
        const roomID = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomID} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomID} and read = 1`)

        let isNoQuestions 
        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                isNoQuestions = true
            }
        }
        res.render("room", {roomID: roomID, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    enter(req, res){
        const roomID = req.body.roomID

        res.redirect(`/room/${roomID}`)
    }
}