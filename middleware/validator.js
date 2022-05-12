const { check, body, validationResult } = require("express-validator");

const validator = (validations) => async (req, res, next) => {
  for (let validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json(errors.array()[0].msg);
};

module.exports = {
  login: validator([
    check("email").exists().withMessage("Missing email"),
    check("password").exists().withMessage("Missing password"),
  ]),

  register: validator([
    check("email").isEmail().withMessage("Invalid e-mail format"),
    check("name")
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),
    check("password").isLength(6).withMessage("Password must be 6 chars!"),
    check("address").exists().withMessage("Missing address"),
    check("address.street").exists().withMessage("Missing street"),
    check("address.city").exists().withMessage("Missing city"),
    check("address.zip").exists().withMessage("Missing zip"),
  ]),

  createTask: validator([
    body("title").isLength().withMessage("min 3 characters!"),
    body("desc").exists().withMessage("description missing"),
    body("clientEmail").isEmail().withMessage("client email missing"),
  ]),

  updateTask: validator([
    body("title").isLength().withMessage("Title required"),
    body("desc").exists().optional().withMessage("description missing"),
    body("image").exists().optional().withMessage("Image missing"),
  ]),

  updateProfile: validator([
    check("email").optional().isEmail().withMessage("Invalid e-mail format"),
  ]),
};
