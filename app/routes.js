const ObjectID = require('mongodb').ObjectID

module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/journal', isLoggedIn, function(req, res) {
      db.collection('reflectionQuestions').find().toArray((err, result) => {
      db.collection('entries').find().toArray((err, result2) => {
        if (err) return console.log(err)
        res.render('journal.ejs', {
          user : req.user,
          reflectionQuestions:result,
          entries: result2

        })
      })
      })
  });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/journal', (req, res) => {
      db.collection('entries').updateOne({entry: req.body.entry, prompt: req.body.prompt, date: req.body.date}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/journal')
      })
    })
    /*app.post('/reflectionQuestions', (req, res) => {
      db.collection('reflectionQuestions').save({question: req.body.question}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })*/

    app.put('/entries', (req, res) => {
      db.collection('entries')
      .findOneAndUpdate({entry: req.body.entry, prompt: req.body.prompt,date: req.body.date}, {
        $set: {
          entry: req.body.entry, 
          date: req.body.date,
          prompt: req.body.prompt,
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })
    
    app.delete('/trash', (req, res) => {
      db.collection('entries').findOneAndDelete({_id: ObjectID(req.body._id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Entry deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/journal', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/journal', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/journal');
        });
    });



// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
} 

}