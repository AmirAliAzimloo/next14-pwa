const Slider = require('../models/Slider');
const { validationResult } = require('express-validator');

const getAllSliders = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const GoalSliders = await Slider.find().sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate).select({ image: 1, imageAlt: 1, situation: 1, date: 1, sorter: 1 });
            const AllSlidersNum = await (await Slider.find()).length;
            res.status(200).json({ GoalSliders, AllSlidersNum });
        } else {
            const AllSliders = await Slider.find().sort({ _id: -1 });
            res.status(200).json(AllSliders);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getAllSliders = getAllSliders;



const newSlider = async (req, res) => {
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
                await Slider.create(req.body);
                res.status(200).json({ msg: "اسلایدر با موفقیت ذخیره شد" });
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
module.exports.newSlider = newSlider;




const updateSlider = async (req, res) => {
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
                await Slider.findByIdAndUpdate(req.params.id, req.body, {
                    new: true
                });
                res.status(200).json({ msg: "اسلایدر با موفقیت به روز رسانی شد" });
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
module.exports.updateSlider = updateSlider;





const deleteSlider = async (req, res) => {
    try {
        await Slider.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "اسلایدر با موفقیت حذف شد." });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.deleteSlider = deleteSlider;




const getOneSlider = async (req, res) => {
    try {
        const goalSlider = await Slider.findById(req.params.id);
        res.status(200).json(goalSlider);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getOneSlider = getOneSlider;





const getActiveSliders = async (req, res) => {
    try {
        const activeSliders = await Slider.find({ situation: true }).sort({sorter:1}).select({ image: 1, imageAlt: 1, link: 1 });
        res.status(200).json(activeSliders);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getActiveSliders = getActiveSliders;


