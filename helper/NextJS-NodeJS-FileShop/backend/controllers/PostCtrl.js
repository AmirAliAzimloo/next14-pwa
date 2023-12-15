const Post = require('../models/Post');
const { validationResult } = require('express-validator');

const getAllPosts = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const GoalPosts = await Post.find().sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate).select({ title: 1, updatedAt: 1, image: 1, imageAlt: 1, published: 1, pageView: 1 });
            const AllPostsNum = await (await Post.find()).length;
            res.status(200).json({ GoalPosts, AllPostsNum });
        } else {
            const AllPosts = await Post.find().sort({ _id: -1 });
            res.status(200).json(AllPosts);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getAllPosts = getAllPosts;



// THIS RELATED POSTS IS FOR ADD OR UPDATE A BLOG
const getRelPosts = async (req, res) => {
    try {
        const AllPosts = await Post.find({ published: true }).select({ title: 1 });
        res.status(200).json(AllPosts);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getRelPosts = getRelPosts;



const newPost = async (req, res) => {
    try {
        // EXPRESS VALIDATOR 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ msg: errors.errors[0].msg });
        } else {
            if (req.body.image.endsWith(".png") ||
                req.body.image.endsWith(".jpg") ||
                req.body.image.endsWith(".jpeg") ||
                req.body.image.endsWith(".svg") ||
                req.body.image.endsWith(".webp")) {

                const data = req.body;
                data.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
                await Post.create(data);
                res.status(200).json({ msg: "مقاله با موفقیت ذخیره شد" });
            }
            else {
                res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.newPost = newPost;




const updatePost = async (req, res) => {
    try {
        // EXPRESS VALIDATOR 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ msg: errors.errors[0].msg });
        } else {
            if (req.body.image.endsWith(".png") ||
                req.body.image.endsWith(".jpg") ||
                req.body.image.endsWith(".jpeg") ||
                req.body.image.endsWith(".svg") ||
                req.body.image.endsWith(".webp")) {
                const data = req.body;
                data.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
                await Post.findByIdAndUpdate(req.params.id, data, {
                    new: true
                });
                res.status(200).json({ msg: "مقاله با موفقیت به روز رسانی شد" });
            }
            else {
                res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.updatePost = updatePost;





const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "مقاله با موفقیت حذف شد." });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.deletePost = deletePost;




const getOnePost = async (req, res) => {
    try {
        const goalPost = await Post.findOne({ slug: req.params.slug });

        // ADD 1 TO POST PAGE VIEW
        const newPost = {
            pageView: goalPost.pageView + 1
        }
        await Post.findByIdAndUpdate(goalPost._id, newPost, {
            new: true
        });
        res.status(200).json(goalPost);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getOnePost = getOnePost;





const getOnePostById = async (req, res) => {
    try {
        const goalPost = await Post.findById(req.params.id);
        res.status(200).json(goalPost);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getOnePostById = getOnePostById;





const getNewPosts = async (req, res) => {
    try {
        const newPosts = await Post.find({ published: true }).sort({ _id: -1 }).limit(4).select({ title: 1, updatedAt: 1, slug: 1, image: 1, imageAlt: 1, shortDesc: 1, type: 1, pageView: 1 });
        res.status(200).json(newPosts);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getNewPosts = getNewPosts;



const getBlogPagePosts = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const GoalPosts = await Post.find({ published: true }).sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate).select({ title: 1, updatedAt: 1, slug: 1, image: 1, imageAlt: 1, shortDesc: 1, type: 1, pageView: 1 });
            const AllPostsNum = await (await Post.find({ published: true })).length;
            res.status(200).json({ GoalPosts, AllPostsNum });
        } else {
            const AllPosts = await Post.find().sort({ _id: -1 });
            res.status(200).json(AllPosts);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getBlogPagePosts = getBlogPagePosts;



const getMostViewed = async (req, res) => {
    try {
        const GoalPosts = await Post.find({ published: true }).sort({ pageView: -1 }).limit(3).select({ title: 1, slug: 1 });
        res.status(200).json(GoalPosts);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getMostViewed = getMostViewed;



// THIS RELATED POSTS IS FOR SINGLE BLOG PAGE
const getRelatedPosts = async (req, res) => {
    try {
        const goalIds = req.body.goalIds;
        const GoalPosts = await Post.find({ _id: goalIds }).select({ title: 1, updatedAt: 1, slug: 1, image: 1, imageAlt: 1, shortDesc: 1, type: 1, pageView: 1 });
        res.status(200).json(GoalPosts);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getRelatedPosts = getRelatedPosts;

