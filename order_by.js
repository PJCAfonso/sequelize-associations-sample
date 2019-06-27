const Sequelize = require('sequelize');

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';

const sequelize = new Sequelize(path);

let Note = sequelize.define('notes', {
    description: Sequelize.STRING
});

async function getRows() {

    let notes = await Note.findAll({
        order: [['description', 'DESC']],
        attributes: ['id', 'description'], raw: true
    })

    console.log(notes);

    sequelize.close();
}

getRows();