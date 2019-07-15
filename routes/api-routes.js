module.exports = (app) => {
  // test route
  app.get('/api/getData', (req, res, next) => {
    res.json({
      message: 'Get request worked'
    });
  });

  app.post('/api/create_user', (req, res, next) => {
    console.log(req.body);
  })

  app.get('api/current_user', (req, res, next) => {
    console.log(req.headers);
  })
}