var fileUpload = require('express-fileupload');

module.exports = {

    upload: function(req,res,next){
        return res.render('oficios', {message:req.flash('info')});
    },

    guardarOficio: function(req,res,next){
        if(req.files){
            //console.log(req.files);
            var file=req.files.filename,
                filename=req.files.filename.name;
            file.mv("./uploads/"+filename,function(err){
                if(err){
                    console.log(err);
                    res.send("error");
                }
                else{
                    //res.send("completo");
                    req.flash('info', 'se ha subido exitosamente');
                    res.redirect('/oficios/upload');
                }
            })
        }
        
    }
}