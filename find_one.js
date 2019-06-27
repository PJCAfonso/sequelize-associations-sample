const Sequelize = require('sequelize');

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';

const sequelize = new Sequelize(path, {
    logging: false
});

let Note = sequelize.define('notes', {
    description: Sequelize.STRING
});

Note.findOne({ where: { id: 1 } }).then(note => {
    console.log(note.get({ plain: true }));
}).finally(() => {
    sequelize.close();
});