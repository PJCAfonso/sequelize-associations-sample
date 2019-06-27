const Sequelize = require('sequelize');

const path = 'mysql://myuser:mypass@localhost:3306/dbtest';
const sequelize = new Sequelize(path, {
    logging: false
});

let Note = sequelize.define('notes', {
    description: Sequelize.STRING
});

let notes = [
    { description: 'Tai chi in the morning' },
    { description: 'Visited friend' },
    { description: 'Went to cinema' },
    { description: 'Listened to music' },
    { description: 'Watched TV all day' },
    { description: 'Walked for a hour' },
];

sequelize.sync({ force: true }).then(() => {
    Note.bulkCreate(notes, { validate: true }).then(() => {
        console.log('notes created');
    }).catch((err) => {
        console.log('failed to create notes');
        console.log(err);
    }).finally(() => {
        sequelize.close();
    });
});