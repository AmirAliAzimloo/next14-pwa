const express=require('express');
const router=express();
const { check} =require('express-validator');

const MiddleBannerCtrl=require('../controllers/MiddleBannerCtrl');


router.get("/middle-banners",MiddleBannerCtrl.getAllMidBan);

router.post("/new-middle-banner",[
    check("imageAlt","تعداد کارکتر آلت تصویر باید بیشتر از 8 کارکتر باشد...").isLength({min:8}),
    check("situation","فرمت بخش انتشار اشتباه است.").isBoolean(),
],MiddleBannerCtrl.newMidBan);

router.post("/update-middle-banner/:id",[
    check("imageAlt","تعداد کارکتر آلت تصویر باید بیشتر از 8 کارکتر باشد...").isLength({min:8}),
    check("situation","فرمت بخش انتشار اشتباه است.").isBoolean(),
],MiddleBannerCtrl.updateMidBan);
router.post("/delete-middle-banner/:id",MiddleBannerCtrl.deleteMidBan);
router.get("/get-mid-ban/:id",MiddleBannerCtrl.getOneMidBan);
router.get("/get-active-mid-bans",MiddleBannerCtrl.getActiveBanners);


module.exports=router;