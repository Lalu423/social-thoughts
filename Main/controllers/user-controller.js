const { User, Thought } = require("../models");

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get a user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');

            if (!user) {
                return res.status(404).json({ message: "No user found"});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create new user
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch(err) {
            res.stauts(500).json(err);
        }
    },
    //update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: "No user found" });
            }
            res.json({ message: "User updated" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete user and their thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: "User cannot be found"});
            }

            const thought = await Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId}},
                {new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: "User deleted"});
            }

            res.json({ message: "user deleted!" });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //add friend to user
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body}},
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: "No user found"});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //remove friend from user
    async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
