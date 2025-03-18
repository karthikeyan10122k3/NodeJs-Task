import bcryptJs from 'bcryptjs'
import UserModel from '../models/User.model.js';

export const getAllUsers = async(req,res) =>{

    try{
        const users = await UserModel.find({})
        if(!users) return res.status(400).json({ error: "User Database Empty! "});

        res.status(200).json({ message: "User retrived Successfully!", users: users })
    } catch (error) {
        res.status(500).json({ error: "Could not get user", details: error.message });
    }
}

export const getUser = async(req,res) =>{
    const {id} = req.params
    if(!id) return res.status(400).json({ error: "Missing ID!" });

    try{
        const user = await UserModel.findById(id)
        if(!user) return res.status(400).json({ error: "User not found! "});

        res.status(200).json({ message: "User retrived Successfully!", user: user })
    } catch (error) {
        res.status(500).json({ error: "Could not get user", details: error.message });
    }
}

export const addUser = async (req, res) => {
    const { name, mobile, email, password, role } = req.body;

    if (!name || !mobile || !email || !password) {
        return res.status(400).json({ error: "Missing Required Fields!" });
    }

    try {
        const user = await UserModel.create({
            name,
            mobile,
            email,
            password: await bcryptJs.hash(password, 10),
            role
        });

        res.status(201).json({ message: "User Created Successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export const removeUser = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Missing ID!" });

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(400).json({ error: "User not found!" });
        }

        res.status(200).json({ message: "User Removed Successfully!", user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: "Could not remove user", details: error.message });
    }
};

export const modifyUser = async (req, res) => {

    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing ID!" });

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body);

        if (!updatedUser) return res.status(404).json({ error: "User not found!" });

        res.status(200).json({ message: "User modified successfully!", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Could not modify user", details: error.message });
    }
};
