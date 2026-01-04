const User = require("../models/user.model");

exports.getById = async (id) => {
    return User.findOne({ id });
};

exports.getOrCreate = async (from) => {
    return User.findOneAndUpdate(
        { id: from.id },
        { id: from.id, username: from.username, firstName: from.first_name, lastName: from.last_name, active: true },
        { upsert: true, new: true }
    );
};

exports.deactivateUser = async (id) => {
    return User.findOneAndUpdate({ id }, { active: false }, { new: true });
};

exports.getAllIds = async () => {
    const users = await User.find({ active: true }).select("id -_id");
    return users.map(user => user.id);
};

exports.getStatistics = async () => {
    const results = await Promise.all([User.countDocuments({ active: true }), User.countDocuments({ active: false })]);
    return {
        active: results[0],
        nonActive: results[1],
        total: results[0] + results[1],
    };
};