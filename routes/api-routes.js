module.exports = (app) => {
  // test route
  app.get('/api/getData', (req, res, next) => {
    res.json({
      message: 'Get request worked'
    });
  });
}