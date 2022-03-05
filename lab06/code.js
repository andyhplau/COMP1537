function addition() {
    first_operand = parseInt(jQuery("#first_operand").val())
    second_operand = parseInt(jQuery("#second_operand").val())
    jQuery("#result").html("Result: " + first_operand + " + " + second_operand + " = " + (first_operand + second_operand))
    old_result = jQuery("#history").html()
    new_result = "<br><span class='red'>" + first_operand + " + " + second_operand + " = " + (first_operand + second_operand) + "</span>"
    jQuery("#history").html(old_result + new_result)
}

function subtraction() {
    first_operand = parseInt(jQuery("#first_operand").val())
    second_operand = parseInt(jQuery("#second_operand").val())
    jQuery("#result").html("Result: " + first_operand + " - " + second_operand + " = " + (first_operand - second_operand))
    old_result = jQuery("#history").html()
    new_result = "<br><span class='green'>" + first_operand + " - " + second_operand + " = " + (first_operand - second_operand) + "</span>"
    jQuery("#history").html(old_result + new_result)
}

function multiplication() {
    first_operand = parseInt(jQuery("#first_operand").val())
    second_operand = parseInt(jQuery("#second_operand").val())
    jQuery("#result").html("Result: " + first_operand + " × " + second_operand + " = " + (first_operand * second_operand))
    old_result = jQuery("#history").html()
    new_result = "<br><span class='yellow'>" + first_operand + " × " + second_operand + " = " + (first_operand * second_operand) + "</span>"
    jQuery("#history").html(old_result + new_result)
}

function division() {
    first_operand = parseInt(jQuery("#first_operand").val())
    second_operand = parseInt(jQuery("#second_operand").val())
    jQuery("#result").html("Result: " + first_operand + " ÷ " + second_operand + " = " + (first_operand / second_operand))
    old_result = jQuery("#history").html()
    new_result = "<br><span class='blue'>" + first_operand + " ÷ " + second_operand + " = " + (first_operand / second_operand) + "</span>"
    jQuery("#history").html(old_result + new_result)
}

function increase_font() {
    font_size = parseInt($("#result").css("font-size"))
    console.log($("#result").css("font-size"))
    increase_size = font_size + 10
    $("#result").attr("style", "font-size:" + increase_size + "px")
    console.log($("#result").css("font-size"))
}

function decrease_font() {
    font_size = parseInt($("#result").css("font-size"))
    console.log($("#result").css("font-size"))
    decrease_size = font_size - 10
    $("#result").attr("style", "font-size:" + decrease_size + "px")
    console.log($("#result").css("font-size"))
}

function setup() {
    jQuery("#addition").click(addition)
    jQuery("#subtraction").click(subtraction)
    jQuery("#multiplication").click(multiplication)
    jQuery("#division").click(division)
    $("#increase").click(increase_font)
    $("#decrease").click(decrease_font)
}

jQuery(document).ready(setup)