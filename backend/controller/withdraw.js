const lawShop = require("../model/lawshop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isLawyer, isAuthenticated, isAdmin } = require("../middleware/auth");
const Withdraw = require("../model/withdraw");
const sendMail = require("../utils/sendMail");
const router = express.Router();

// create withdraw request --- only for lawyer
router.post(
  "/create-withdraw-request",
  isLawyer,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        lawyer: req.lawyer,
        amount,
      };

      try {
        await sendMail({
          email: req.lawyer.email,
          subject: "Withdraw Request",
          message: `Hello ${req.lawyer.name}, Your withdraw request of ${amount}$ is processing. It will take 3days to 7days to processing! `,
        });
        res.status(201).json({
          success: true,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      const withdraw = await Withdraw.create(data);

      const lawshop = await lawShop.findById(req.lawyer._id);

      lawshop.availableBalance = lawshop.availableBalance - amount;

      await lawshop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all withdraws --- admnin

router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update withdraw request ---- admin
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { lawyerId } = req.body;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const lawyer = await lawShop.findById(lawyerId);

      const transection = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      lawyer.transections = [...lawyer.transections, transection];

      await lawyer.save();

      try {
        await sendMail({
          email: lawyer.email,
          subject: "Payment confirmation",
          message: `Hello ${lawyer.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days.`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
