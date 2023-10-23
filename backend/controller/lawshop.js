const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const lawShop = require("../model/lawshop");
const { isAuthenticated, isLawyer, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendlawShopToken = require("../utils/lawshopToken");

// create lawshop
router.post("/create-lawshop", catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;
    const lawyerEmail = await lawShop.findOne({ email });
    if (lawyerEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });


    const lawyer = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(lawyer);

    const activationUrl = `http://localhost:3000/lawyer/activation/${activationToken}`;

    try {
      await sendMail({
        email: lawyer.email,
        subject: "Activate your lawShop",
        message: `Hello ${lawyer.name}, please click on the link to activate your lawshop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${lawyer.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));

// create activation token
const createActivationToken = (lawyer) => {
  return jwt.sign(lawyer, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newLawyer = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newLawyer) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newLawyer;

      let lawyer = await lawShop.findOne({ email });

      if (lawyer) {
        return next(new ErrorHandler("User already exists", 400));
      }

      lawyer = await lawShop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendlawShopToken(lawyer, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login lawshop
router.post(
  "/login-lawshop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await lawShop.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendlawShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load lawshop
router.get(
  "/getLawyer",
  isLawyer,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const lawyer = await lawShop.findById(req.lawyer._id);

      if (!lawyer) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        lawyer,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from lawshop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("lawyer_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-lawshop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const lawshop = await lawShop.findById(req.params.id);
      res.status(201).json({
        success: true,
        lawshop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update lawshop profile picture
router.put(
  "/update-lawshop-avatar",
  isLawyer,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsLawyer = await lawShop.findById(req.lawyer._id);

        const imageId = existsLawyer.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });

        existsLawyer.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };

  
      await existsLawyer.save();

      res.status(200).json({
        success: true,
        lawyer:existsLawyer,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update lawyer info
router.put(
  "/update-lawyer-info",
  isLawyer,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const lawshop = await lawShop.findOne(req.lawyer._id);

      if (!lawshop) {
        return next(new ErrorHandler("User not found", 400));
      }

      lawshop.name = name;
      lawshop.description = description;
      lawshop.address = address;
      lawshop.phoneNumber = phoneNumber;
      lawshop.zipCode = zipCode;

      await lawshop.save();

      res.status(201).json({
        success: true,
        lawshop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all lawyers --- for admin
router.get(
  "/admin-all-lawyers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const lawyers = await lawShop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        lawyers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete lawyer ---admin
router.delete(
  "/delete-lawyer/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const lawyer = await lawShop.findById(req.params.id);

      if (!lawyer) {
        return next(
          new ErrorHandler("Lawyer is not available with this id", 400)
        );
      }

      await lawShop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Lawyer deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update lawyer withdraw methods --- lawyers
router.put(
  "/update-payment-methods",
  isLawyer,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const lawyer = await lawShop.findByIdAndUpdate(req.lawyer._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        lawyer,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete lawyer withdraw merthods --- only lawyer
router.delete(
  "/delete-withdraw-method/",
  isLawyer,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const lawyer = await lawShop.findById(req.lawyer._id);

      if (!lawyer) {
        return next(new ErrorHandler("lawyer not found with this id", 400));
      }

      lawyer.withdrawMethod = null;

      await lawyer.save();

      res.status(201).json({
        success: true,
        lawyer,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
