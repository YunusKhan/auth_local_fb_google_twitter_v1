
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname +'/views/index.html'));
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/email_login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.html');
		//, { message: req.flash('loginMessage') });
		//res.sendFile(path.join(__dirname +'/views/login.html'));
	});


    // =====================================
    // GOOGLE ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    // 
	app.get('/google_login', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/google_login/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

    // =====================================
    // FACEBOOK ROUTES ======================
    // =====================================
    // route for twitter authentication and login
	app.get('/facebook_login', passport.authenticate('facebook' , { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/facebook_login/callback',
		passport.authenticate('facebook', {		
			successRedirect : '/profile',
			failureRedirect : '/'
		}));
	
    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
 	app.get('/twitter_login', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/twitter_login/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.html', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.html', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	// app.get('/profile', isLoggedIn, function(req, res) {
	// 	res.render('facebook_login_success_page.html', {
	// 		user : req.user // get the user out of session and pass to template
	// 	});
	// });

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/home', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index.html', { message: req.flash('signupMessage') });
	});

	app.get('/help', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index.html', { message: req.flash('signupMessage') });
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
