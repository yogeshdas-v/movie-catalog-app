const API_KEY = "api_key=300fcf9975bf479ae6aa2b4bb7ee045a&language=en-US"
const BASE_URL = "https://api.themoviedb.org/3";
const DISCOVER_MOVIES_PATH = "/discover/movie?sort_by=popularity.desc&"
const API_URL = BASE_URL + DISCOVER_MOVIES_PATH + API_KEY

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data)
        data.results.forEach(movie => {
            const MOVIE_CREDITS_URL = BASE_URL + "/movie/" + movie.id + "/credits?" + API_KEY;
            fetch(MOVIE_CREDITS_URL).then(response => response.json()).then(credits_data => {
                const castNames = []
                for(var i = 0; i < Math.min(3, credits_data.cast.length); i++) {
                    castNames.push(credits_data.cast[i].name)
                }
                movie.cast = String(castNames)
            })
        })

        // console.log(data)
        setTimeout(function(){
            var xhr = new XMLHttpRequest()
            xhr.open('POST', '/api/populate-movies.php')
            xhr.onload = function () {
                console.log(this.response)
            }
            xhr.send(JSON.stringify(data))
        }, 1000);
        
        
    })
}

getMovies(API_URL)