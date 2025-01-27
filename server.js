import express from "express";
import expressLayouts from "express-ejs-layouts";
import { getMoviesFromAPI, getMovieFromId } from './static/js/movieRetriever.js';

const app = express();

const PORT = 5080;

app.use("/static", express.static("./static"));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.get("", (req, res) => {
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/cafe", (req, res) => {
    res.render("cafe");
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/movies", async (req, res) => {
    let loadedMovies = await getMoviesFromAPI();

    res.render("movies", {movies: loadedMovies.data});
})

app.get("/movie/:id", async (req, res) => {
    let loadedMovie = await getMovieFromId(req.params.id);

    console.log(loadedMovie);

    res.render("movie", {movie: loadedMovie.data});
})

app.listen(PORT, () => {
    console.log("Server is up at: http://localhost:5080");
});