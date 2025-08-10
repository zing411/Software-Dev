module.exports = function checkUser(req, res, next) {
  res.locals.user = req.session.userId || null;
  next();
};