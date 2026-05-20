const { authMiddleware } = require("../middleware/authMiddleware");
const { express } = require("../utils/exportRequires");
const { addAnime, getAllAnime, getAnimeById, updateAnime, updateAnimeStatus, deleteAnime } = require("../controllers/anime.controller");
const animeRouter = express.Router();

// all routes are protected
animeRouter.use(authMiddleware);

animeRouter.post('/', addAnime);
animeRouter.get('/', getAllAnime);
animeRouter.get('/:id', getAnimeById);
animeRouter.patch('/:id', updateAnime);
animeRouter.patch('/:id/status', updateAnimeStatus);
animeRouter.delete('/:id', deleteAnime);

module.exports = animeRouter;
