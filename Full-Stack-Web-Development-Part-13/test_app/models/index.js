const Note = require('./note')
const User = require('./user')

const Team = require('./team')
const Membership = require('./membership')
const UserNotes = require('./user_notes')


Note.belongsTo(User) // a note can only belongs to one user
User.hasMany(Note)  // an user can have many notes


User.belongsToMany(Team, { through: Membership }) // user can belongs to many teams via membership
Team.belongsToMany(User, { through: Membership }) // one team can have many users via membership

User.belongsToMany(Note, { through: UserNotes, as: 'marked_notes' }) // user can  associate with many notes through UserNotes (which is marked)
Note.belongsToMany(User, { through: UserNotes, as: 'users_marked' }) 

module.exports = {

  Note, User, Team, Membership
}