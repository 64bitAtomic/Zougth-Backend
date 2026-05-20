const { express } = require("../utils/exportRequires");
const { protected } = require("../controllers/api.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const apiRouter = express.Router();

apiRouter.get('/protected', authMiddleware, protected);

module.exports = apiRouter;