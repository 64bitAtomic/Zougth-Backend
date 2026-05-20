const { express } = require('../utils/exportRequires');
const { authMiddleware } = require('../middleware/authMiddleware');
const { getDashboard } = require('../controllers/dashboard.controller');

const dashboardRouter = express.Router();

dashboardRouter.use(authMiddleware);
dashboardRouter.get('/', getDashboard);

module.exports = dashboardRouter;