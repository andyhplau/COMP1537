function get_data(data) {
    console.log(data)
    $("#temp").html(data.main.temp)
    $("#p2").html(data.weather[0].description)
    x = data.weather[0].icon
    console.log(x)
}

function get_weather() {
    city = $("#city_name").val()
    // ajax
    $.ajax(
        {
            "url": `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=feeb42996334c24c4c816fac553a0b14&unit=metric`,
            "type": "GET",
            "success": get_data
        }
    )
}

function setup() {
    $("#get_temp").click(get_weather)
}

$(document).ready(setup)