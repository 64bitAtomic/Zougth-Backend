const { express , cors, cookieParser, dns} = require("./utils/exportRequires");
const { connectDB } = require("./config/db");
const { PORT, FRONTEND } = require("./utils/envExports");
const authRouter = require("./routes/auth.routes");
const apiRouter = require("./routes/api.routes");
const animeRouter = require("./routes/anime.routes");
const movieRouter = require("./routes/movie.routes");
const seriesRouter = require("./routes/series.routes");
const linkRouter = require("./routes/link.routes");
const codeRouter = require("./routes/code.routes");
const dashboardRouter = require("./routes/dashboard.routes");
const app = express();

dns.setServers(['8.8.8.8', '8.8.4.4']);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: [ FRONTEND,'https://zought.netlify.app'], credentials: true }));
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/anime",animeRouter);
app.use('/movies', movieRouter);
app.use('/series', seriesRouter);
app.use('/links', linkRouter);
app.use('/codes', codeRouter);
app.use('/dashboard', dashboardRouter);

connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});