const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                id: req.params.thoughtId,
            }).select('-__v');

            if (!thought) {
                return res.status(404).json({ message: "No thoughts have been made"});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create a thought
    async createThought(rew,res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
            
            if (!user) {
                return res.status(404).json({ message: "Thought created without user ID"});
            }
            res.json("Thought created!");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelte({
                _id: req.params.thoughtId
            });

            if (!user) {
                return res.status(404).json({ message: "Thoughts deleted without user"});
            }
            res.json({ message: "Thought deleted!"});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update thought
    async updateThought (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: "Thought does not match ID" });
            }
            res.json({ message: "Thought updated" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //add reactions
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: "No matching ID"});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //remove reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                { runValidators: true, new: true }
            );

            res.json({ message: "Reaction deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};