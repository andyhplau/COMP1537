function get_data(data) {
    console.log(data)
    for (let i = 0; i < data.results.length; i++) {
        title = data.results[i].original_title
        overview = data.results[i].overview
        poster = `<img id="poster" src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}">`
        backdrop = data.results[i].backdrop_path

        $("#result").append(`<li>
        Title:<br>
        ${title}<br><br>
        Overview:<br>
        ${overview}<br><br>
        ${poster}<button id=${backdrop} class="backdrop_button">Show backdrop</button><hr></li>`)
    }
}

function get_search_result() {
    api_key = "cc583f28fa2cf8af29cf2040518e7186"
    title = $("#movie_title").val()

    // ajax
    $.ajax({
        "url": `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${title}`,
        "type": "get",
        "success": get_data
    })
}

function display_backdrop() {
    backdrop_id = $(this).attr("id")
    $("#backdrop_div").html(`<img src="http://image.tmdb.org/t/p/w500/${backdrop_id}">`)
}

function setup() {
    $("#search").click(get_search_result)
    $("body").on("click", ".backdrop_button", display_backdrop)
}

$(document).ready(setup)
