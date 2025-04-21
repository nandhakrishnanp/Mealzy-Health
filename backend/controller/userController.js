const User = require("../model/userSchmea");
const bcrypt = require("bcrypt");




const getUserById = async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "User found",
            user
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const loginUser = async (req,res)=>{
    try {
        
        const {name, password} = req.body;
        if(!name || !password){
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const user = await User.findOne({name});
        if(!user){
            return res.json({
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({
                message: "Invalid credentials"
            })
        }
        res.status(200).json({
            message: "Login successful",
            user
        })


    } catch (error) {
        console.log(error);
        res.json({
            message: error.message
        })
    }
}


const registerUser = async (req,res)=>{
    try {
        const {name, phone, password} = req.body;
        if(!name || !phone || !password){
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const userExists = await User.findOne({phone});
        if(userExists){
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            phone,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: "Internal server error"
        })
    }
}   



module.exports = {
    loginUser,
    registerUser,
    getUserById
}
