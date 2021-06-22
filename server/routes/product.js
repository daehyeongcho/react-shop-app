const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/", (req, res) => {
  // 받아온 정보들을 DB에 넣어준다.
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장을 해주면 된다.
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/products", (req, res) => {
  // product collection에 들어있는 모든 상품 정보를 가져오기
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;
  const limit = req.body.limit ? parseInt(req.body.limit) : 20;
  const term = req.body.searchTerm;

  const findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // price 범위를 findArgs에 넣어줘야 함
        findArgs[key] = {
          // greater than or equal
          $gte: req.body.filters[key][0],
          // less than or equal
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log("findArgs", findArgs);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});

router.get("/products_by_id", (req, res) => {
  // query는 req.query에서 가져옴
  const type = req.query.type;

  if (type === "array") {
    // id=1234,2345,3456 이거를
    // productIds = ['1234', '2345', '3456'] 이렇게 바꿔줌
    const productIds = req.query.id.split(",");

    // productIds를 이용해서 DB에서 productIds와 같은 상품의 정보를 가져온다.
    Product.find({ _id: { $in: productIds } })
      .populate("writer")
      .exec((err, product) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(product);
      });
  } else {
    // 하나만 불러오는 경우는 DetailProductPage에서 요청하는 경우이므로
    // views를 하나 올려줘야 함
    Product.findOneAndUpdate(
      { _id: req.query.id },
      {
        $inc: {
          views: 1,
        },
      },
      { new: true }
    )
      .populate("writer")
      .exec((err, product) => {
        console.log(product);
        if (err) return res.status(400).send(err);
        return res.status(200).send(product);
      });
  }
});

module.exports = router;
