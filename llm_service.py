from flask import Flask, render_template, request, jsonify #importing the module
import json
from flask_cors import CORS
from gen_profiles import Groomer, Victim, StateAndMentorModel

app=Flask(__name__, template_folder='./html', static_folder='./static') #instantiating flask object
CORS(app)  # This will enable CORS for all routes and methods

@app.route('/update_category', methods=['POST'])
def update_category():
    data = request.get_json()
    stmo.set_state(int(data['category']))
    print('updated category')
    res = {
            "success":True
        }
    
    return jsonify(res)


@app.route('/update_groomer', methods=['POST'])
def update_groomer():
    data = request.get_json()
    grmr.age = data['age']
    grmr.gender = data['gender']
    grmr.location = data['location']
    grmr.interest = data['interest']
    grmr.employment = data['employment']
    grmr.marital_status = data['maritalstatus']
    grmr.mental_state = data['mentalstate']
    grmr.grooming_experience = data['experience']
    print('updated the groomer')
    res = {
            "success":True
        }
    
    return jsonify(res)


@app.route('/update_victim', methods=['POST'])
def update_victim():
    data = request.get_json()
    vctm.age = data['age']
    vctm.gender = data['gender']
    vctm.location = data['location']
    vctm.interest = data['interest']
    vctm.mental_state = data['mentalstate']
    vctm.resilience_level = data['resilience']
    print('updated the victim')
    res = {
            "success":True
        }
    
    return jsonify(res)

@app.route('/groomer_profile', methods=['GET'])
def groomer_profile():
    res = {
        "age":grmr.age,
        "gender":grmr.gender,
        "location":grmr.location,
        "interest":grmr.interest,
        "employment":grmr.employment,
        "maritalstatus":grmr.marital_status,
        "mentalstate":grmr.mental_state,
        "experience":grmr.grooming_experience,
        "category":stmo.current_state,
        "catetext":stmo.all_states[stmo.current_state],
        "success":True
    }

    return jsonify(res)

@app.route('/victim_profile', methods=['GET'])
def victim_profile():
    res = {
        "age":vctm.age,
        "gender":vctm.gender,
        "location":vctm.location,
        "interest":vctm.interest,
        "mentalstate":vctm.mental_state,
        "resilience":vctm.resilience_level,
        "success":True
    }

    return jsonify(res)

@app.route('/reset', methods=['GET'])
def reset():
    stmo.reset()
    res = {
            "success":True
        }
    
    return jsonify(res)

@app.route('/victim_llm', methods=['POST'])
def victim_llm():
    print('GENERATING VICTIM')
    data = request.get_json()
    if len(data['conversation']) > 3:
        generated_response = vctm.chat(data['conversation'][-3:])
    else:
        generated_response = vctm.chat(data['conversation'])

    res = {
            "message":generated_response,
            "success":True
        }
    
    return jsonify(res)

@app.route('/groomer_llm', methods=['POST'])
def groomer_llm():
    print('GENERATING GROOMER')
    data = request.get_json()
    if len(data['conversation']) > 3:
        generated_response = grmr.chat(data['conversation'][-3:], stmo.get_current_goal())
    else:
        generated_response = grmr.chat(data['conversation'], stmo.get_current_goal())

    if len(data['conversation']) > 4:
        cn_state = stmo.determine_state_change(data['conversation'][-4:])
    else:
        cn_state = stmo.determine_state_change(data['conversation'])
    
    res = {
            "message":generated_response,
            "success":True
        }
    
    return jsonify(res)


@app.route('/') #defining a route in the application
def func(): #writing a function to be executed 
    return 'PythonGeeks'

if __name__=='__main__': #calling  main 
    app.debug=True #setting the debugging option for the application instance

    groomer_path = "./models/training/groomer_output/checkpoint-6"
    grmr = Groomer(groomer_path, 48, "male", "Blacksburg, Virginia", "cars", 
                "Nurse", "unmarried", "Loneliness", "Medium")
    # load the victim
    victim_path = "./models/training/victim_output/checkpoint-6"
    vctm = Victim(victim_path, 13, "female", "Roanoke, Virginia", "dresses",
                "Inferiority", "Low")

    stmo = StateAndMentorModel('mistralai/Mistral-7B-Instruct-v0.2')

    app.run(host="0.0.0.0", use_reloader=False, port="5557") #launching the flask's integrated development webserver

    