const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/thoughtId
router.get("/:thought").get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/thoughtsId/reactions/reactionId
router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);

module.exports = router;

