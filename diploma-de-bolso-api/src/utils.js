const mongoose = require("mongoose");

function isValidId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    return res.json({
      message: "Id inválido",
    });
  }

  next();
}

module.exports = {
  isValidId,
};
