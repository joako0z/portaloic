var mysql= require('mysql');
var bcrypt = require('bcryptjs');

var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){

    passport.serializeUser(function(user, done){
    done(null, user);
    });

    passport.deserializeUser(function(obj,done){
    done(null,obj);
    });

    passport.use(new LocalStrategy({
    passReqToCallback: true

    }, function(req,email,password,done){
        var config = require('.././database/config');
        // nos conectamos a la base de datos
        var db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM users WHERE email = ?',email, function(err,rows,fields){
            if(err) throw err;
                db.end();
            if(rows.length > 0){
             
                var user = rows[0];
                if (bcrypt.compareSync(password,user.password)) {
                    console.log(user); 
                    return done (null,{
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email
                    });
                }
            }
            console.log("falle")
            return done(null,false, req.flash('authmessage','Email o Password incorrecto'));
        });
        //console.log(email); probar email
        //return;
    }
    ))

};