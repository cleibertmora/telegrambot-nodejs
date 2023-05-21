const db = require('../db/con')

async function getLastMessageID(){
    try {
        const result = await db.select("SELECT max(ID) as last_message_id FROM messages")
        return result[0].last_message_id
    } catch (error) {
        console.log(error)        
    }
}

async function getMessage(id){
    try {
        const result = await db.select(`SELECT * FROM messages WHERE ID = ${id}`)
        return result[0]
    } catch (error) {
        console.log(error)        
    }
}

module.exports = {
    getLastMessageID,
    getMessage
};