const xss = require('xss')


const TeasService = {


    getAllTeas(db) {
        return db
            .from('teas')
            .select('*')
    },

    getAllTeasbyUser(db, user_id) {
        return db
            .from('teas')
            .select('*')
            .where('user_id', user_id)
    },

    insertTea(db, newTea) {
        return db
            .insert(newTea)
            .into('teas')
            .where('user_id', newTea.user_id)
            .returning('*')
            .then(rows => { return rows[0] })
    },

    // getTeaByUser(db, user_id) {
    //     return db
    //         .from('teas')
    //         .select('*')
    //         .where('user_id', user_id)
    //         .first()
    // },

    getTeaById(db, { user_id, tea_id }) {
        return db
            .from('teas')
            .where('user_id', user_id)
            .where('id', tea_id);
    },

    deleteTea(db, { user_id, tea_id }) {
        return db
            .from('teas')
            .where('user_id', user_id)
            .where('id', tea_id)
            .delete()
    },


    updateTea(db, { user_id, tea_id }, fields) {
        return db('teas')
            .where('user_id', user_id)
            .where('id', tea_id)
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