const { express } = require('../utils/exportRequires');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addSeries, getAllSeries, getSeriesById, updateSeries, updateSeriesStatus, deleteSeries } = require('../controllers/series.controller');

const seriesRouter = express.Router();

seriesRouter.use(authMiddleware);

seriesRouter.post('/', addSeries);
seriesRouter.get('/', getAllSeries);
seriesRouter.get('/:id', getSeriesById);
seriesRouter.patch('/:id', updateSeries);
seriesRouter.patch('/:id/status', updateSeriesStatus);
seriesRouter.delete('/:id', deleteSeries);

module.exports = seriesRouter;