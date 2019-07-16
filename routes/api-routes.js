

module.exports = (app) => {
  // test route
  app.get('/api/getData', (req, res, next) => {
    console.log('getData endpoint hit');
    res.json({
      message: 'Get request worked'
    });
  });
}