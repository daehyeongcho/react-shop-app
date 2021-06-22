const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");

const async = require("async");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/addToCart", auth, (req, res) => {
  // 먼저 User Collection에 해당 유저의 정보를 가져오기
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어있는지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item._id === req.body.productId) {
        duplicate = true;
      }
    });

    // 상품이 이미 있을 때
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart._id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }, // 업데이트 된 doc를 가져오기 위해
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).send(userInfo.cart);
        }
      );
    } else {
      // 상품이 있지 않을 때
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              _id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).send(userInfo.cart);
        }
      );
    }
  });
});

router.get("/removeFromCart", auth, (req, res) => {
  // 먼저 cart 안에 내가 지우려고 한 상품을 지워주기
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: {
          _id: req.query.id,
        },
      },
    },
    { new: true },
    (err, userInfo) => {
      const cart = userInfo.cart;
      const productIds = cart.map((item) => item._id);

      // product collection에서 현재 남아있는 상품들의 정보를 가져오기
      Product.find({ _id: { $in: productIds } })
        .populate("writer")
        .exec((err, productInfo) => {
          return res.status(200).json({
            productInfo,
            cart,
          });
        });
    }
  );
});

router.post("/successBuy", auth, (req, res) => {
  // 1. User Collection 안에 history 필드 안에 간단한 결제 정보 넣어주기
  const history = [];
  const transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      _id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  // 2. Payment Collection 안에 자세한 결제 정보들 넣어주기
  transactionData.users = req.user;
  transactionData.data = req.body.paymentData;
  transactionData.products = history;

  // history 정보 저장
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });

      // payment에 transacionData 저장
      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        // 3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기

        // 상품 당 몇 개의 quantity를 샀는지
        console.log(doc);
        const products = doc.products.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
        }));

        // async.eachSeries는 특정 데이터를 처리하기 위한 기능이
        // '비동기 함수'이고 '순서대로 처리'하고 싶을 때 사용한다.
        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              {
                _id: item._id,
              },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: userInfo.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

module.exports = router;
