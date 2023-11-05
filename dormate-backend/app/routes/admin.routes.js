const { verifyAdminSignUp } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/admin/signup",
    [
        verifyAdminSignUp.checkDuplicateUsernameOrEmail,
        verifyAdminSignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/admin/signin", controller.signin);

  app.post("/api/admin/signout", controller.signout);
};
