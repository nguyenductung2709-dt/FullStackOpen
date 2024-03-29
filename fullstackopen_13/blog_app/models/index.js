const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./readinglist');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'reading_list_full' });

module.exports = {
  Blog,
  User,
  Session,
  ReadingList
};
