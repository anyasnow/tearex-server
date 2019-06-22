const xss = require('xss')


const TeasService = {


    getAllTeas(db) { //how to get teas for user user_id?
        return db
            .from('teas')
            .select('*')
    },

    insertTea(db, newTea) {
        return db
            .insert(newTea)
            .into('teas')
            .returning('*')
            .then(rows => { return rows[0] })
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
            teaName: xss(tea.teaname),
            brand: xss(tea.brand),
            type: xss(tea.type),
            packaging: xss(tea.packaging),
            note: xss(tea.note),
        }
    },

}



module.exports = TeasService