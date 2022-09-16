const title_input = document.querySelector(".title");
const description_input = document.querySelector(".description");
const cast_input = document.querySelector(".cast");
const imagePathUrl_input = document.querySelector(".imagePathUrl");
const new_movie_form_wrapper = document.querySelector(".new-movie-form-wrapper");
const update_profile_btn = document.querySelector(".update-profile-btn");

function fetchMovies(url = "/api/read.php") {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			const movies = data.movies;
			const content_wrapper = document.querySelector(".content-wrapper");
			content_wrapper.innerHTML = "";
			movies.forEach((movie) => {
				// console.log(movie)
				const movie_node = document.createElement("div");
				movie_node.className = "movie-card";
				// movie_node.addEventListener('click', function(event) {
				// 	url = '/api/details.php?m=' + movie.id;
				// 	window.open(url)
				// })
				const star_classlist_value =
					movie.isFavorite == 1
						? "fa-solid fa-star"
						: "fa-regular fa-star";

				movie_node.innerHTML += `<img src="${movie.imagePathUrl}" alt="" class="movie-img">
                                <p class="movie-title">${movie.title}</p>
                                <input type="button" class="edit-movie-btn btn" value="Edit">
                                <i class="${star_classlist_value}" onclick="toggleFavorite(this, ${movie.id}, ${movie.isFavorite})"></i>`;

				const movie_edit_btn = movie_node.children[2];
				movie_edit_btn.addEventListener("click", function (event1) {

					prefillUpdateForm(movie);
					update_profile_btn.addEventListener("click", (event2) => {
						updateMovie(event1.target.parentElement.children[0], movie);
						
					});
					
					
				});
				content_wrapper.appendChild(movie_node);
			});
		});
}

function updateMovie(movie_card_img, movie) {
	movie.title = title_input.value;
	movie.description = description_input.value;
	movie.cast = cast_input.value;
	movie.imagePathUrl = imagePathUrl_input.value;

	fetch("/api/update.php", {
		method: "put",
		body: JSON.stringify({
			id: movie.id,
			title: movie.title,
			description: movie.description,
			cast: movie.cast,
			imagePathUrl: movie.imagePathUrl,
		}),
	}).then(() => {
		movie_card_img.src = movie.imagePathUrl;
		hideMovieForm();
		
	});
}
function prefillUpdateForm(movie) {
	// console.log(movie);
	showMovieForm();
	title_input.value = movie.title;
	title_input.disabled = true;
	title_input.style.opacity = 0.5;
	title_input.style.cursor = "not-allowed";
	description_input.value = movie.description;
	cast_input.value = movie.cast;
	imagePathUrl_input.value = movie.imagePathUrl;
	//   new_movie_form.action = "/api/update.php";
	//   new_movie_form.method = "post";
}

function resetFormInputs() {
	const form_inputs = document.querySelectorAll(".form-input");
	form_inputs.forEach((input) => {
		input.value = "";
	});
}

function toggleFavorite(star, id, isFavorite) {
	fetch("/api/modify-favorite.php", {
		method: "put",
		body: JSON.stringify({
			id: id,
			isFavorite: isFavorite ? 0 : 1,
		}),
	})
	.then((res) => res.json())
	.then((data) => {
		fetchMovies();
	});
}

fetchMovies();

function hideMovieForm() {
	new_movie_form_wrapper.style.visibility = "hidden";
}
function showMovieForm() {
	new_movie_form_wrapper.style.visibility = "visible";
}

document.querySelector(".add-movie-btn").addEventListener("click", function () {
	title_input.disabled = false;
	title_input.style.opacity = 0.5;
	title_input.style.cursor = "unset";
	resetFormInputs();
	showMovieForm();

	update_profile_btn.addEventListener("click", (event) => {
		fetch("/api/create.php", {
			method: "post",
			body: JSON.stringify({
				title: title_input.value,
				description: description_input.value,
				cast: cast_input.value,
				imagePathUrl: imagePathUrl_input.value,
			}),
		})
		.then(res => res.json())
		.then((data) => {
			hideMovieForm();
			fetchMovies();
		})
		
	});
			
});

document.querySelector(".search-input").addEventListener("keyup", function () {
	fetchMovies("/api/search.php?m=" + this.value);
});
