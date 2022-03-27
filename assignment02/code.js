current_page = 1
num_of_pages = null
page_size = null
result_array = null

function display(page_id, page_size) {
    $("#result").empty()
    // $("#result").html(`<h1>Display(${page_id}, ${page_size})</h1>`)
    
    // get index numbers
    start_index = page_size * (page_id - 1)
    if (page_id == num_of_pages) {
        stop_index = result_array.results.length - 1
    } else {
        stop_index = page_size * (page_id - 1) + page_size - 1
    }

    // update ordered list index
    $("#result").attr("start", start_index + 1)

    // populating results
    for (i = start_index; i <= stop_index; i++) {
        title = result_array.results[i].original_title
        overview = result_array.results[i].overview
        poster = `<img id="poster" src="http://image.tmdb.org/t/p/w500${result_array.results[i].poster_path}">`
        backdrop = result_array.results[i].backdrop_path

        $("#result").append(`<li>
            Title:<br>
            ${title}<br><br>
            Overview:<br>
            ${overview}<br><br>
            ${poster}<button id=${backdrop} class="backdrop_button">Show backdrop</button><hr></li>`)
    }
}

function paginate_menu() {
    // getting number of pages from result_array and page_size
    num_of_pages = Math.ceil(result_array.results.length / page_size)
    // showing page buttons
    $("header").show()
    $("header").empty()
    $("header").append("<button id='first_page'>First</button>")
    $("header").append("<button class='result_page' id='previous_page'>Previous</button>")
    $("header").append("<span id='pages'></span>")
    $("header").append("<button id='next_page'>Next</button>")
    $("header").append("<button id='last_page'>Last</button>")
    for (i = 1; i <= num_of_pages; i++) {
        page = `<button class="pages" id="${i}">${i}</button>`
        $("#pages").append(page)
    }
    // calling page button functions when clicked
    $("#first_page").click(first_page)
    $("#previous_page").click(previous_page)
    $("#next_page").click(next_page)
    $("#last_page").click(last_page)
    // display first page
    display(current_page, page_size)
}

// get data
function get_data(data) {
    console.log(data)
    result_array = data
    paginate_menu()
}

function get_search_result() {
    // APIkey and getting title value from user input
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
    $("#backdrop_div").html(`<img src="http://image.tmdb.org/t/p/w500${backdrop_id}">`)
}

// update page_size and re-display the result from page 1 using the new value
function page_size_changed() {
    page_size = Number($(this).val())
    current_page = 1
    display(current_page,page_size)
    if(result_array != null){
        paginate_menu()
    }
}

// display the result when page button is clicked
function page_button() {
    page = $(this).attr("id")
    display(page, page_size)
    current_page = Number(page)
}

// display first page result
function first_page() {
    current_page = 1
    display(current_page, page_size)
}

// display previous page result
function previous_page() {
    if (current_page > 1) {
        current_page--
    }
    display(current_page, page_size)
}

// display next page result
function next_page() {
    if (current_page < num_of_pages){
        current_page++
    }
    display(current_page, page_size)
}

// display last page result
function last_page() {
    current_page = num_of_pages
    display(current_page, page_size)
}

function setup() {
    $("header").hide()
    $("#search").click(get_search_result)
    $("body").on("click", ".backdrop_button", display_backdrop)
    $("body").on("click", ".pages", page_button)
    page_size = Number($("option:selected").val())
    $("select").change(page_size_changed)
}

$(document).ready(setup)