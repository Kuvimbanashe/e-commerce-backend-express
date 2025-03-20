const User = require('../model/user.model');


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createUser = async (req, res) => {

    const { name, email, phone , password,role, address} = req.body;

    const missingFields = [];
    if (!name) missingFields.push('Name');
    if (!email) missingFields.push('Email');
    if (!phone) missingFields.push('Phone');
    if (!password) missingFields.push('Password');
    if (!role) missingFields.push('Role');
    if (!address) missingFields.push('Address');

    if (missingFields.length > 0) {
        return res.status(400).json({ message: `${missingFields.join(', ')} is missing` });
    }
    
    try {

        const user = new User({ name, email, phone , password,role, address});
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {

    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Id is missing' });
    }
    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'Id is missing' });
    }

    const { name, email, phone , password,role, address} = req.body;
    
    const missingFields = [];
    if (!name) missingFields.push('Name');
    if (!email) missingFields.push('Email');
    if (!phone) missingFields.push('Phone');
    if (!password) missingFields.push('Password');
    if (!role) missingFields.push('Role');
    if (!address) missingFields.push('Address');

    if (missingFields.length > 0) {
        return res.status(400).json({ message: `${missingFields.join(', ')} is missing` });
    }

    try {
        const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }

}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Id is missing' });
    }
    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };