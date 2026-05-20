const { express } = require('../utils/exportRequires');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addLink, getAllLinks, getLinkById, updateLink, deleteLink, getLinkCategories } = require('../controllers/link.controller');

const linkRouter = express.Router();

linkRouter.use(authMiddleware);

linkRouter.post('/', addLink);
linkRouter.get('/', getAllLinks);
linkRouter.get('/categories', getLinkCategories);
linkRouter.get('/:id', getLinkById);
linkRouter.patch('/:id', updateLink);
linkRouter.delete('/:id', deleteLink);

module.exports = linkRouter;