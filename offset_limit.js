const Sequelize = require('sequelize');

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';

const sequelize = new Sequelize(path, {
    logging: false
});

let Note = sequelize.define('notes', {
    description: Sequelize.STRING
});

async function getRows() {

    let notes = await Note.findAll({ offset: 2, limit: 3, 
        attributes: ['id', 'description'], raw: true
    });
    
    console.log(notes);

    sequelize.close();
}

getRows();