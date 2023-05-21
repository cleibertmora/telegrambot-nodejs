const db = require('../db/con')

async function getConfig() {
    try {
        const results = await db.select("SELECT * FROM config")
        return results[0]
    } catch (error) {
        console.log(error)
    }
}

async function updateConfig(column, value) {
    let data = [
        value
    ];

    try {
        const results = await db.update(`UPDATE config SET ${column}=? WHERE ID=1`, data)
        return results
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    get: getConfig,
    update: updateConfig
}