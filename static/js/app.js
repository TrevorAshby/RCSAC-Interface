
var current_user_turn = "victim";

// Get the input field
var input1 = document.getElementById("victim_text");

function save_chat(){
    fetch('http://128.173.236.231:5556/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify({"name": document.getElementById("filename").value})
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function groomer_llm_regenerate() {
    disable_victim() // uncomment for every other performance
    disable_groomer()
    
    document.getElementsByClassName('message_row')[document.getElementsByClassName('message_row').length-3].innerHTML = '<p id="groomer_msg">' + 'Regenerating . . .' + '</p>';

    // send the server request
    fetch('http://128.173.236.231:5556/groomer_llm_regenerate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        // body: JSON.stringify({ "message": document.getElementById("victim_text").textContent})
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
                response_text = response.message;

                // with the response add new text
                document.getElementsByClassName('message_row')[document.getElementsByClassName('message_row').length-3].innerHTML = '<p id="groomer_msg">' + response_text + '</p>';
                // document.getElementsByClassName('message_row')[document.getElementsByClassName('message_row').length-3].innerHTML += document.getElementById('responses').innerHTML += '<div class="interactions int_groomer"><i class="fa action">&#xf088;</i><i class="fa action">&#xf087;</i><i class="fa action" onclick="groomer_llm_regenerate()">&#10227;</i></div>';
                // document.getElementById('responses').innerHTML += '<div class="message_row"><p id="groomer_msg">' + response_text + '</p>';
                // document.getElementById('responses').innerHTML += '<div class="interactions int_groomer"><i class="fa action">&#xf088;</i><i class="fa action">&#xf087;</i><i class="fa action" onclick="groomer_llm_regenerate()">&#10227;</i></div>'
                // document.getElementById('responses').innerHTML += '</div>';
                document.getElementById("groomer_text").textContent = '';
                
                enable_groomer()
                enable_victim()
                var chatHistory = document.getElementById("conv_hist");
                chatHistory.scrollTop = chatHistory.scrollHeight;

                // removeRegen();
                updateGroomerProfile();
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function victim_llm_regenerate() {
    disable_victim() // uncomment for every other performance
    disable_groomer()
    
    document.getElementsByClassName('message_row')[document.getElementsByClassName('message_row').length-3].innerHTML = '<p id="victim_msg">' + 'Regenerating . . .' + '</p>';
    // send the server request
    fetch('http://128.173.236.231:5556/victim_llm_regenerate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        // body: JSON.stringify({ "message": document.getElementById("victim_text").textContent})
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
                response_text = response.message;

                // with the response add new text
                document.getElementsByClassName('message_row')[document.getElementsByClassName('message_row').length-3].innerHTML = '<p id="victim_msg">' + response_text + '</p>';
                // document.getElementsByClassName('message_row')[document.getElementsByClassName('message_row').length-3].innerHTML += document.getElementById('responses').innerHTML += '<div class="interactions int_victim"><i class="fa action">&#xf088;</i><i class="fa action">&#xf087;</i><i class="fa action" onclick="victim_llm_regenerate()">&#10227;</i></div>';
                // document.getElementById('responses').innerHTML += '<div class="message_row"><p id="victim_msg">' + response_text + '</p>';
                // document.getElementById('responses').innerHTML += '<div class="interactions int_victim"><i class="fa action">&#xf088;</i><i class="fa action">&#xf087;</i><i class="fa action" onclick="victim_llm_regenerate()">&#10227;</i></div>'
                // document.getElementById('responses').innerHTML += '</div>';
                document.getElementById("victim_text").textContent = '';
                
                enable_groomer()
                enable_victim()
                var chatHistory = document.getElementById("conv_hist");
                chatHistory.scrollTop = chatHistory.scrollHeight;

                // removeRegen();
                getProfileGroomer();
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function profileUpdatedGroomer() {
    document.getElementById("groomer_profile_submit").disabled = false;
}

function profileUpdatedVictim() {
    document.getElementById("victim_profile_submit").disabled = false;
}

function updateCategory() {
    fetch('http://128.173.236.231:5556/update_category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify({
            "category": document.getElementById("cybergrooming_category").value,
        })
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                getProfileGroomer();
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function updateGroomerProfile() {
    document.getElementById("groomer_profile_submit").disabled = true;
    fetch('http://128.173.236.231:5556/update_groomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify({
            "age": document.getElementById("select_age_groomer").value,
            "gender": document.getElementById("select_gender_groomer").value,
            "location": document.getElementById("select_location_groomer").value,
            "interest": document.getElementById("select_interest_groomer").value,
            "employment": document.getElementById("select_employment_groomer").value,
            "maritalstatus": document.getElementById("select_marital_status_groomer").value,
            "mentalstate": document.getElementById("select_mental_state_groomer").value,
            "experience": document.getElementById("select_grooming_experience_groomer").value,
        })
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function updateVictimProfile() {
    document.getElementById("victim_profile_submit").disabled = true;
    fetch('http://128.173.236.231:5556/update_victim', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify({
            "age": document.getElementById("select_age_victim").value,
            "gender": document.getElementById("select_gender_victim").value,
            "location": document.getElementById("select_location_victim").value,
            "interest": document.getElementById("select_interest_victim").value,
            "mentalstate": document.getElementById("select_mental_state_victim").value,
            "resilience": document.getElementById("select_resilience_level_victim").value,
        })
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function getProfileGroomer() {
    // Do something
    console.log("in get groomer profile");
    fetch('http://128.173.236.231:5556/groomer_profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        // body: JSON.stringify({ "message": document.getElementById("victim_text").textContent})
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
                // set age dropdown
                document.getElementById("select_age_groomer").value = response.age.toString();
                // set gender dropdown
                document.getElementById("select_gender_groomer").value = response.gender;
                // set location text
                document.getElementById("select_location_groomer").value = response.location;
                // set interest text
                document.getElementById("select_interest_groomer").value = response.interest;
                // set employment text
                document.getElementById("select_employment_groomer").value = response.employment;
                // set marital status dropdown
                document.getElementById("select_marital_status_groomer").value = response.maritalstatus
                // set mental state text
                document.getElementById("select_mental_state_groomer").value = response.mentalstate;
                // grooming experience dropdown
                document.getElementById("select_grooming_experience_groomer").value = response.experience;

                document.getElementById("cgc_lbl").textContent = response.category;
                document.getElementById("cgc_text").textContent = response.catetext;
                document.getElementById("cybergrooming_category").value = Number(response.category[1])-1;
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function getProfileVictim() {
    // Do something
    fetch('http://128.173.236.231:5556/victim_profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        // body: JSON.stringify({ "message": document.getElementById("victim_text").textContent})
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
                // set age dropdown
                document.getElementById("select_age_victim").value = response.age.toString();
                // set gender dropdown
                document.getElementById("select_gender_victim").value = response.gender;
                // set location text
                document.getElementById("select_location_victim").value = response.location;
                // set interest text
                document.getElementById("select_interest_victim").value = response.interest;
                // set mental state text
                document.getElementById("select_mental_state_victim").value = response.mentalstate;
                // grooming experience dropdown
                document.getElementById("select_resilience_level_victim").value = response.resilience;
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

window.onbeforeunload = function(){
    // Do something
    fetch('http://128.173.236.231:5556/refresh', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        // body: JSON.stringify({ "message": document.getElementById("victim_text").textContent})
    }).then(function (response) {
        if (response.ok) {
            console.log("BEFORE THE OK");
            response.json()
            .then(function (response) {
                // getInstance();
                console.log("HERE HERE HERE")
                console.log(response);
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    
 }

getProfileGroomer();
getProfileVictim();

// Execute a function when the user presses a key on the keyboard
input1.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    submit_victim();
  }
});

// Get the input field
var input = document.getElementById("groomer_text");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    submit_groomer();
  }
});

function removeRegen() {
    inters = document.getElementsByClassName('interactions');
    console.log('message rows');
    for (let i = 0; i < inters.length-1; i++) {
        console.log(inters[i]);
        console.log(inters[i].getElementsByClassName("action")[2]);
        inters[i].getElementsByClassName("action")[2].style.visibility = 'hidden';
        // console.log()
    }
}

function checkInputVictim() {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        submit_victim();
    }
    
    if (document.getElementById("victim_text").textContent != '') {
        document.getElementById("victim_submit").disabled = false;
    }
    else {
        document.getElementById("victim_submit").disabled = true;
    }
}

function checkInputGroomer() {

    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        submit_groomer();
    }

    if (document.getElementById("groomer_text").textContent != '') {
        document.getElementById("groomer_submit").disabled = false;
    }
    else {
        document.getElementById("groomer_submit").disabled = true;
    }
}

function llm_victim() {
    disable_victim() // uncomment for every other performance
    disable_groomer()
    

    // send the server request
    var response_text = "Victim response generated from LLM."
    fetch('http://128.173.236.231:5556/victim_llm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        // body: JSON.stringify({ "message": document.getElementById("victim_text").textContent})
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
                response_text = response.message;

                // with the response add new text
                document.getElementById('responses').innerHTML += '<div class="message_row"><p id="victim_msg">' + response_text + '</p>';
                document.getElementById('responses').innerHTML += '<div class="interactions int_victim"><i class="fa action">&#xf088;</i><i class="fa action">&#xf087;</i><i class="fa action" onclick="victim_llm_regenerate()">&#10227;</i></div>'
                document.getElementById('responses').innerHTML += '</div>';
                document.getElementById("victim_text").textContent = '';
                
                enable_groomer()
                enable_victim()
                var chatHistory = document.getElementById("conv_hist");
                chatHistory.scrollTop = chatHistory.scrollHeight;

                removeRegen();
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function llm_groomer() {
    disable_groomer() // uncomment for every other performance
    disable_victim()
    

    // send the server request
    var response_text = "Groomer response generated from LLM."
    fetch('http://128.173.236.231:5556/groomer_llm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        // body: JSON.stringify({ "message": document.getElementById("victim_text").textContent})
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
                response_text = response.message;

                // with the response add new text
                document.getElementById('responses').innerHTML += '<div class="message_row"><p id="groomer_msg">' + response_text + '</p>';
                document.getElementById('responses').innerHTML += '<div class="interactions int_groomer"><i class="fa action">&#xf088;</i><i class="fa action">&#xf087;</i><i class="fa action" onclick="groomer_llm_regenerate()">&#10227;</i></div>'
                document.getElementById('responses').innerHTML += '</div>';
                document.getElementById("groomer_text").textContent = '';
                
                enable_victim()
                enable_groomer()
                var chatHistory = document.getElementById("conv_hist");
                chatHistory.scrollTop = chatHistory.scrollHeight;

                removeRegen();
                getProfileGroomer();
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });

}

function submit_victim() {
    // disable_victim() // uncomment for every other performance
    enable_groomer()

    // send the server request
    // var response_text = "Victim response from user input. Input was: " + document.getElementById("victim_text").textContent;
    
    fetch('http://128.173.236.231:5556/victim', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify({ "message": document.getElementById("victim_text").textContent})
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
                response_text = response.message;
                // with the response add new text
                document.getElementById('responses').innerHTML += '<div class="message_row"><p id="victim_msg">' + response_text + '</p>';
                // document.getElementById('responses').innerHTML += '<div class="interactions int_victim"><i class="fa action">&#xf088;</i><i class="fa action">&#xf087;</i><i class="fa action">&#10227;</i></div>'
                document.getElementById('responses').innerHTML += '</div>';
                document.getElementById("victim_text").textContent = '';
                var chatHistory = document.getElementById("conv_hist");
                chatHistory.scrollTop = chatHistory.scrollHeight;

                // setInteractions('human_victim');
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });

    
}

function submit_groomer() {
    // disable_groomer() // uncomment for every other performance
    enable_victim()

    // send the server request
    // var response_text = "Groomer response from user input. Input was: " + document.getElementById("groomer_text").textContent;
    
    fetch('http://128.173.236.231:5556/groomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify({ "message": document.getElementById("groomer_text").textContent})
    }).then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (response) {
                // getInstance();
                console.log(response);
                response_text = response.message;
                // with the response add new text
                document.getElementById('responses').innerHTML += '<div class="message_row"><p id="groomer_msg">' + response_text + '</p>';
                // document.getElementById('responses').innerHTML += '<div class="interactions int_groomer"><i class="fa action">&#xf088;</i><i class="fa action">&#xf087;</i><i class="fa action">&#10227;</i></div>'
                document.getElementById('responses').innerHTML += '</div>';
                document.getElementById("groomer_text").textContent = '';
                var chatHistory = document.getElementById("conv_hist");
                chatHistory.scrollTop = chatHistory.scrollHeight;

                // setInteractions('human_groomer');
            });
        }
        else {
            throw Error('something went wrong');
        }
    })
    .catch(function (error) {
        console.log(error);
    });

    
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
    var chatHistory = document.getElementById("conv_hist");
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function enable_victim() {
    // enable the llm button
    document.getElementById("victim_llm").disabled = false;
    // enable the text box
    document.getElementById("victim_text").className = "text-box";
    // enable the submit button
    // document.getElementById("victim_submit").disabled = false;
    // enable the future placeholder
    document.getElementById("victim_next").hidden = false;
    var chatHistory = document.getElementById("conv_hist");
    chatHistory.scrollTop = chatHistory.scrollHeight;
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
    var chatHistory = document.getElementById("conv_hist");
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function enable_groomer() {
    // enable the llm button
    document.getElementById("groomer_llm").disabled = false;
    // enable the text box
    document.getElementById("groomer_text").className = "text-box";
    // enable the submit button
    // document.getElementById("groomer_submit").disabled = false;
    // enable the future placeholder
    document.getElementById("groomer_next").hidden = false;
    var chatHistory = document.getElementById("conv_hist");
    chatHistory.scrollTop = chatHistory.scrollHeight;
}