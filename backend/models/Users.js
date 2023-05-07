const mongoose = require("mongoose")
const validator=require('validator')
const bcrypt=require("bcrypt");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "username is required field"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "password is required field"]
    }
})

UserSchema.statics.login=async function(username,password, res){
    const user=await this.findOne({username});
    if(user){
        const iscompare=await bcrypt.compare(password,user.password);
        if(iscompare){
            // res.status(200).json(user);
            return user;
        }else{
            // const salt = await bcrypt.genSalt();
            // const hashPassword = await bcrypt.hash("password", salt)
            // console.log(hashPassword)
            // res.status(400).send("Invalid Password");
            return "Invalid Password";
        }
    }else{
        // res.status(400).send("Invalid User");
        return "Invalid User";
        // console.log("invalid user");
    }
}

module.exports = mongoose.model("user", UserSchema)