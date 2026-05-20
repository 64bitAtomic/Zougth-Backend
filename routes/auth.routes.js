const { signup, login, refresh } = require("../controllers/auth.controller");
const { express } = require("../utils/exportRequires");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);

module.exports = authRouter;