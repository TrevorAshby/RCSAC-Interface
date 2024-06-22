
var current_user_turn = "victim";

function llm_victim() {
    disable_victim()
    enable_groomer()

    // send the server request
    var response_text = "Victim response generated from LLM."
    // with the response add new text
    document.getElementById('responses').innerHTML += '<div class="message_row"><p id="victim_msg">' + response_text + '</p></div>';
    document.getElementById("victim_text").textContent = '';
}

function llm_groomer() {
    disable_groomer()
    enable_victim()

    // send the server request
    var response_text = "Groomer response generated from LLM."
    // with the response add new text
    document.getElementById('responses').innerHTML += '<div class="message_row"><p id="groomer_msg">' + response_text + '</p></div>';
    document.getElementById("groomer_text").textContent = '';
}

function submit_victim() {
    disable_victim()
    enable_groomer()

    // send the server request
    var response_text = "Victim response from user input. Input was: " + document.getElementById("victim_text").textContent;
    // with the response add new text
    document.getElementById('responses').innerHTML += '<div class="message_row"><p id="victim_msg">' + response_text + '</p></div>';
    document.getElementById("victim_text").textContent = '';
}

function submit_groomer() {
    disable_groomer()
    enable_victim()

    // send the server request
    var response_text = "Groomer response from user input. Input was: " + document.getElementById("groomer_text").textContent;
    // with the response add new text
    document.getElementById('responses').innerHTML += '<div class="message_row"><p id="groomer_msg">' + response_text + '</p></div>';
    document.getElementById("groomer_text").textContent = '';
}

function disable_victim() {
    // disable the llm button
    document.getElementById("victim_llm").disabled = true;
    // disable the text box
    document.getElementById("victim_text").className = "text-box disabled";
    // disable the submit button
    document.getElementById("victim_submit").disabled = true;
    // disable the future placeholder
    document.getElementById("victim_next").hidden = true;
}

function enable_victim() {
    // enable the llm button
    document.getElementById("victim_llm").disabled = false;
    // enable the text box
    document.getElementById("victim_text").className = "text-box";
    // enable the submit button
    document.getElementById("victim_submit").disabled = false;
    // enable the future placeholder
    document.getElementById("victim_next").hidden = false;
}

function disable_groomer() {
    // disable the llm button
    document.getElementById("groomer_llm").disabled = true;
    // disable the text box
    document.getElementById("groomer_text").className = "text-box disabled";
    // disable the submit button
    document.getElementById("groomer_submit").disabled = true;
    // disable the future placeholder
    document.getElementById("groomer_next").hidden = true;
}

function enable_groomer() {
    // enable the llm button
    document.getElementById("groomer_llm").disabled = false;
    // enable the text box
    document.getElementById("groomer_text").className = "text-box";
    // enable the submit button
    document.getElementById("groomer_submit").disabled = false;
    // enable the future placeholder
    document.getElementById("groomer_next").hidden = false;
}