const withAuthAPI = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({message:'Route requires an authenticated login.'});
  } else {
    next();
  }
}

const withAuthView = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('./login');
  } else {
    next();
  }
}

module.exports = {
  withAuthAPI,
  withAuthView
};