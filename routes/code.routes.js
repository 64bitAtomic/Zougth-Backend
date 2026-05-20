const { express } = require('../utils/exportRequires');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addCode, getAllCodes, getCodeById, updateCode, deleteCode, getCodeCategories } = require('../controllers/code.controller');

const codeRouter = express.Router();

codeRouter.use(authMiddleware);

codeRouter.post('/', addCode);
codeRouter.get('/', getAllCodes);
codeRouter.get('/categories', getCodeCategories);
codeRouter.get('/:id', getCodeById);
codeRouter.patch('/:id', updateCode);
codeRouter.delete('/:id', deleteCode);

module.exports = codeRouter;