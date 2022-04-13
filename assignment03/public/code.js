receivedUnicorn = [];


function process_res(data) {
    receivedUnicorn = data;
    data = JSON.stringify(data, null, 4);
    console.log("received = " + receivedUnicorn)
    console.log(data);
    $("#result").html("<pre>" + data + "<pre>");
    $("#filters").show();
}


function findUnicornByName() {
    console.log("findUnicornByName() got called");
    console.log($("#unicornName").val());

    $.ajax({
        url: "https://whispering-tundra-49179.herokuapp.com/findUnicornByName",
        type: "POST",
        data: {
            "unicornName": $("#unicornName").val()
        },
        success: process_res
    })
}


function findUnicornByWeight() {
    console.log("findUnicornByWeight() got called");
    console.log($("#lowerWeight").val());
    console.log($("#higherWeight").val());

    $.ajax({
        url: "https://whispering-tundra-49179.herokuapp.com/findUnicornByWeight",
        type: "POST",
        data: {
            "lowerWeight": $("#lowerWeight").val(),
            "higherWeight": $("#higherWeight").val()
        },
        success: process_res
    })
}


function findUnicornByFood() {
    appleIsChecked = "unchecked"
    carrotIsChecked = "unchecked"

    if ($("#carrot").is(":checked"))
        carrotIsChecked = "checked"

    if ($("#apple").is(":checked"))
        appleIsChecked = "checked"

    $.ajax({
        url: "https://whispering-tundra-49179.herokuapp.com/findUnicornByFood",
        type: "POST",
        data: {
            "appleIsChecked": appleIsChecked,
            "carrotIsChecked": carrotIsChecked
        },
        success: process_res
    })
}


function filterUnicorn() {
    nameIsChecked = "unchecked"
    weightIsChecked = "unchecked"

    if ($("#unicornNameFilter").is(":checked"))
        nameIsChecked = "checked"

    if ($("#unicornWeightFilter").is(":checked"))
        weightIsChecked = "checked"

    filteredResult = receivedUnicorn.map((thisUnicorn) => {
        result = []
        if (nameIsChecked == "checked")
            result.push(thisUnicorn["name"])

        if (weightIsChecked == "checked")
            result.push(thisUnicorn["weight"])

        return result
    })
    $("#result").html("<pre>" + filteredResult + "</pre>")
}


function setup() {
    $("#filters").hide();
    $("#findUnicornByName").click(findUnicornByName);
    $("#findUnicornByFood").click(findUnicornByFood);
    $("#findUnicornByWeight").click(findUnicornByWeight);
    $("#filter").click(filterUnicorn);
}


$(document).ready(setup)