const feed = (root, args, context, info) => context.db.query.links({}, info);
const users = (root, args, context, info) => context.db.query.users({}, info);

module.exports = {
  feed,
  users
}
