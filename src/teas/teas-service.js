const xss = require('xss')


const TeasService = {


    getAllTeas(db) { //how to get teas for user user_id?
        return db
            .from('teas')
            .select('*')
    },

    getAllTeasbyUser(db, user_id) { //how to get teas for user user_id?
        return db
            .from('teas')
            .select('*')
            .where('user_id', user_id)
    },

    insertTea(db, newTea) {
        return db
            .insert(newTea)
            .into('teas')
            .returning('*')
            .then(rows => { return rows[0] })
    },

    getTeaByUser(db, user_id) {
        return db
            .from('teas')
            .select('*')
            .where('user_id', user_id)
            .first()
    },

    getTeaById(db, id) {
        return TeasService.getAllTeas(db)
            .where('id', id)
            .first()
    },

    deleteTea(db, id) {
        return db('teas')
            .where('id', id)  //  can also user .where({ id })
            .delete()
    },


    updateTea(db, id, fields) {
        return db('teas')
            .where({ id })
            .update(fields)
    },


    serializeTea(tea) {
        return {
            id: tea.id,
            user_name: tea.user_name || {}, //code won't break if no user - empty object still truthy
            teaname: xss(tea.teaname) || {},
            brand: xss(tea.brand) || {},
            type: xss(tea.type) || {},
            packaging: xss(tea.packaging) || {},
            note: xss(tea.note) || {},
        }
    },
}



module.exports = TeasService