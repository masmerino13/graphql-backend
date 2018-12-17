const feed = (root, args, context, info) => context.db.query.links({}, info);
const users = (root, args, context, info) => context.db.query.users({}, info);
const me = (parent, args, ctx, info) => {
  // check if there is a current user ID
  if (!ctx.request.userId) {
    return null;
  }
  return ctx.db.query.user(
    {
      where: { id: ctx.request.userId },
    },
    info
  );
}

module.exports = {
  feed,
  users,
  me
}
