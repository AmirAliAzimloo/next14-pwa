const MiddleBanner = require('../models/MiddleBanner');
const { validationResult } = require('express-validator');

const getAllMidBan = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const GoalMidBans = await MiddleBanner.find().sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate).select({ image: 1, imageAlt: 1, situation: 1, date: 1 });
            const AllMidBansNum = await (await MiddleBanner.find()).length;
            res.status(200).json({ GoalMidBans, AllMidBansNum });
        } else {
            const AllMidBans = await MiddleBanner.find().sort({ _id: -1 });
            res.status(200).json(AllMidBans);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getAllMidBan = getAllMidBan;



const newMidBan = async (req, res) => {
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
                await MiddleBanner.create(req.body);
                res.status(200).json({ msg: "بنر میانی با موفقیت ذخیره شد" });
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
module.exports.newMidBan = newMidBan;




const updateMidBan = async (req, res) => {
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
                await MiddleBanner.findByIdAndUpdate(req.params.id, req.body, {
                    new: true
                });
                res.status(200).json({ msg: "بنر میانی با موفقیت به روز رسانی شد" });
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
module.exports.updateMidBan = updateMidBan;





const deleteMidBan = async (req, res) => {
    try {
        await MiddleBanner.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "بنر میانی با موفقیت حذف شد." });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.deleteMidBan = deleteMidBan;




const getOneMidBan = async (req, res) => {
    try {
        const goalMidBan = await MiddleBanner.findById(req.params.id);
        res.status(200).json(goalMidBan);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getOneMidBan = getOneMidBan;





const getActiveBanners = async (req, res) => {
    try {
        const activeBanners = await MiddleBanner.find({ situation: true }).select({ image: 1, imageAlt: 1, link: 1 });
        res.status(200).json(activeBanners);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getActiveBanners = getActiveBanners;


