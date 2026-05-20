const { express } = require('../utils/exportRequires');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addMovie, getAllMovies, getMovieById, updateMovie, updateMovieStatus, deleteMovie } = require('../controllers/movie.controller');

const movieRouter = express.Router();

movieRouter.use(authMiddleware);

movieRouter.post('/', addMovie);
movieRouter.get('/', getAllMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.patch('/:id', updateMovie);
movieRouter.patch('/:id/status', updateMovieStatus);
movieRouter.delete('/:id', deleteMovie);

module.exports = movieRouter;