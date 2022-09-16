<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trending Movies</title>
    <link rel="stylesheet" href="/css/styles.css">
    <link rel="icon" type="image/x-icon" href="/images/favicon.svg"> 
    <script src="https://kit.fontawesome.com/897a9325bf.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <h1 class="logo">Trending Movies</h1>
        <div class="header-right">
            <input type="text" class="search-input" placeholder="search your movie">
            <input type="button" class="add-movie-btn btn" value="Add New">
        </div>
    </header>
    <div class="content-wrapper">
    </div>
    <div class="new-movie-form-wrapper">
        <div class="new-movie-form" target = "_blank">
            <p>New Movie</p>
            <hr class="horizontal-rule"/>
            <label for="title">Name</label>
            <input class="title form-input" type="text" name="title" placeholder="Enter a movie name" required>
            <label for="description">Description</label>
            <textarea class="description form-input" name="description" id="" cols="30" rows="5" required></textarea>
            <label for="imagePathUrl">Image Path URL</label>
            <input class="imagePathUrl form-input" type="text" name="imagePathUrl" placeholder="" required>
            <label for="cast">Cast</label>
            <input class="cast form-input" type="text" name="cast" placeholder="" required>
            <hr>
            <button class="update-profile-btn">Update Profile</button>
            <i class="fa-solid fa-xmark" onclick="hideMovieForm()"></i>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>