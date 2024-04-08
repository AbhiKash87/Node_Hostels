const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');

passport.use(new LocalStrategy(async (USERNAME,PASSWORD,done)=>{
    try{

        console.log(`Received credential: ${USERNAME} `);
        const user = await person.findOne({username:USERNAME});

        if(!user){
          
          return done(null,false,{message: ' Incorrect Username'});
        }
        
        const isPasswordMatch = await  user.comparePassword(PASSWORD);
        
        if(isPasswordMatch){
            console.log("Authentication successfull");
          return done(null,user);
        }else{
          return done(null,false,{message: 'Incorrect Password'});
          
        }

    }catch(err){

      return done(err)
    }
}));

module.exports = passport;