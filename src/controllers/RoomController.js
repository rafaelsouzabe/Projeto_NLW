const Database = require("../db/config")

module.exports = {
    async create(req, res){

        try {
            
            const db = await Database()
            const pass = req.body.password
            
            let roomID = Math.floor(Math.random() * 10).toString()
    
    
            for(var i = 0; i < 5; i++){
                roomID += Math.floor(Math.random() * 10).toString()
            }
    
    
            await db.run(`INSERT INTO rooms (
                id, 
                pass
            ) VALUES (
                ${parseInt(roomID)},
                ${pass}
    
            )`);
    
            await db.close()
            
            res.redirect(`/room/${roomID}` )



        } catch (error) {
            console.log(error)
        }

    }
}