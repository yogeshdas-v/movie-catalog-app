function fetchMovies() {
    fetch("/api/read.php").then(res => res.json()).then(data => {
        const moviesList = data.movies
        const content_wrapper = document.querySelector('.content-wrapper')
        content_wrapper.innerHTML = ''
        moviesList.forEach(movie => {
            // console.log(movie)
            const movie_node = document.createElement('div')
            movie_node.className = 'movie-card'
            const star_classlist_value = (movie.isFavorite == 1)? 'fa-solid fa-star' : 'fa-regular fa-star'
            movie_node.innerHTML = `
                            <p class="movie-id">${movie.id}</p>
                            <img src="${movie.imagePathUrl}" alt="" class="movie-img">
                            <p class="movie-title">${movie.title}</p>
                            <input type="button" class="edit-movie-btn btn" value="Edit">
                            <i class="${star_classlist_value}"></i>
                        `
            content_wrapper.appendChild(movie_node)
        })
    }).then(() => {
        addClickEventToStars()
        addClickEventToEdits()
        
    })
    
}
function addClickEventToEdits() {
    const edits = document.querySelectorAll('.edit-movie-btn')
    edits.forEach((edit) => {
        edit.addEventListener('click', (event) => {
            const movie_card = event.target.parentElement;
            const id = movie_card.children[0].innerText;
            let title = ''
            let description = ''
            let cast = ''
            let imagePathUrl = ''
            fetch('/api/read.php', {
                method : 'post',
                body : JSON.stringify({
                    "id" : id
                })
            })
            .then(res => res.json())
            .then(data => {
                const movie = data.movies[0];
                title = movie.title
                description = movie.description
                cast = movie.cast
                imagePathUrl = movie.imagePathUrl
                const new_movie_form = document.querySelector('.new-movie-form')
                new_movie_form.parentElement.style.visibility = 'visible'
                const title_input = document.querySelector('.title')
                const description_input = document.querySelector('.description')
                const cast_input = document.querySelector('.cast')
                const imagePathUrl_input = document.querySelector('.imagePathUrl')
                const id_input = document.querySelector('.id')
                title_input.value = title
                title_input.disabled = true
                title_input.style.opacity = 0.5
                title_input.style.cursor = 'not-allowed'
                description_input.value = description
                cast_input.value = cast
                imagePathUrl_input.value = imagePathUrl
                id_input.value = id;
            })
            const new_movie_form = document.querySelector('.new-movie-form')
            new_movie_form.action = '/api/update.php'
            new_movie_form.method = 'post'
        })
    })
    
}

function addClickEventToStars() {
    const stars = document.querySelectorAll('.fa-star')
    stars.forEach((star) => {
        star.addEventListener('click', (event) => {
            const movie_card = event.target.parentElement;
            const id = movie_card.children[0].innerText;
            if(star.classList.contains('fa-regular')) {
                star.classList.value = 'fa-solid fa-star'
                fetch('/api/mark-favorite.php', {
                    method : 'post',
                    body : JSON.stringify({
                        "id" : id
                    })
                }).then(fetchMovies)

            }else {
                star.classList.value = 'fa-regular fa-star'
                fetch('/api/unmark-favorite.php', {
                    method : 'post',
                    body : JSON.stringify({
                        "id" : id
                    })
                }).then(fetchMovies)
            }
            
        })
    })
}
fetchMovies()
document.querySelector('.fa-xmark').addEventListener('click', (event) => {
    document.querySelector('.new-movie-form-wrapper').style.visibility = 'hidden'
})

document.querySelector('.add-movie-btn').onclick = function() {
    const new_movie_form_wrapper = document.querySelector('.new-movie-form-wrapper')
    const new_movie_form = document.querySelector('.new-movie-form')
    new_movie_form.reset()
    new_movie_form_wrapper.style.visibility = 'visible'
    const title_input = document.querySelector('.title')
    title_input.disabled = false
    title_input.style.opacity = 0.5
    title_input.style.cursor = 'unset'
    new_movie_form.action = '/api/create.php'
    new_movie_form.method = 'post'
    fetchMovies()
}

document.querySelector('.update-profile-btn').addEventListener('click', (event) => {
    event.target.parentElement.parentElement.style.visibility = 'hidden'
})

// window.open('https://google.com')

const movie_cards = document.querySelector('.movie-card')
console.log(movie_cards)