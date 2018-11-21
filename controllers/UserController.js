var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports ={

    getSignUp : function(req,res,next){
        return res.render('signup');
    },

    postSignUp : function(req,res,next){
    
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.password, salt);
        var user = {
            email : req.body.email,
            nombre : req.body.nombre,
            password : password
        };
        var config =require('.././database/config');
        var db = mysql.createConnection(config);
        
        // conectamos la DB
        
        db.connect();
        
        // insertamos los valores enviados desde el formulario
        db.query('INSERT INTO users SET ?', user, function(err, rows, fields){
            if(err) throw err;
            db.end();
        });
        req.flash('info', 'Se ha registrado correctamente ya puede iniciar session');
        return res.render('signin', {message:req.flash('info')});
    },

    getSignIn : function(req,res,next){
		return res.render('signin', {message:req.flash('info'), authmessage: req.flash('authmessage')});
    },
    
    logout : function(req,res,next){
		//esta es una llamada a la funcion logout de passport
		req.logout();
		res.redirect('/auth/signin');
    },

    getUserPanel : function(req,res,next){
        res.render('panel',{
                                 isAuthenticated : req.isAuthenticated(),
                                 user : req.user
          });
  }

};