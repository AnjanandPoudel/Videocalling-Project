const mongoose=require('mongoose');

let passLM=require('passport-local-mongoose')

let User=new mongoose.Schema({
    firstName:{
        type:String,
        default:"firstname"
    },
    lastName:{
        type:String,
        default:"lastname"
    },
    admin:{
        type:Boolean,
        default:false
    },
    facebookId:String,
    email:{
        type:String,
        default:"annkjn@gmail.com"
    },
    address:{
        type:String,
        default:"lekhnath -31 "
    },
    contactNo:{
        type:String,
        default:"980590099"
    },
    workAt:{
        type:String,
        default:"Student"
    },
    Education:{
        type:String,
        default:"Bachelor 1st year"
    },
    EducationPlace:{
        type:String,
        default:"lamachaur WRC"
    },
    academicDetail:{
        type:String,
        default:" Slc from gogan, +2 from gogan, bach from wrc",
    },
    description:{
        type:String,
        default:" I will provide books for a very good prices. Contact me for books of Asmita publication."

    },
    image:{
        type:String,
        default:'assets/way.jpg'
    }
})

//automatically add username and passwd
//(password hashing , username unique all conditions are checked automatically)
User.plugin(passLM);


let model=mongoose.model('User',User)
module.exports=model