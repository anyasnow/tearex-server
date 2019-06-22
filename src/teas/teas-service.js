const xss = require('xss')


const TeasService = {


    getAllTeas(db) { //how to get teas for user user_id?
        return db
            .from('teas')
            .select('*')
    },



    getTeaById(db, id) {
        return TeasService.getAllTeas(db)
            .where('id', id)
            .first()
    },


    serializeTea(tea) {
        return {
            id: tea.id,
            user_name: tea.user_name || {}, //code won't break if no user - empty object still truthy
            teaName: xss(tea.teaName),
            brand: xss(tea.brand),
            type: xss(tea.type),
            packaging: xss(tea.packaging),
            note: xss(tea.note),
        }
    },

    //POST

    //PACH

    deleteTea(db, id) {
        return db('teas')
            .where('id', id)
            .delete()

    }

}







module.exports = TeasService