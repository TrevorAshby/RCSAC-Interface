from flask import Flask, render_template, request, jsonify #importing the module
import json
from flask_cors import CORS
from gen_profiles import Groomer, Victim, StateAndMentorModel

import requests

app=Flask(__name__, template_folder='./html', static_folder='./static') #instantiating flask object
CORS(app)  # This will enable CORS for all routes and methods

# groomer_path = "./models/training/groomer_output/checkpoint-6"
# grmr = Groomer(groomer_path, 48, "male", "Blacksburg, Virginia", "cars", 
#                "Nurse", "un-married", "Loneliness", "Medium")
# # load the victim
# victim_path = "./models/training/victim_output/checkpoint-6"
# vctm = Victim(victim_path, 13, "female", "Roanoke, Virginia", "dresses",
#               "Inferiority", "Low")

# stmo = StateAndMentorModel('mistralai/Mistral-7B-Instruct-v0.2')
class conv_hist():
    def __init__(self):
        self.conversation_history = []

conv_history = conv_hist()

mentor_buffer = []

base_path = './static/data/'

@app.route('/save', methods=['POST'])
def save():
    x = request.get_json()
    f = open(f'./chats/{x["name"]}.txt', 'w')
    for msg in conv_history.conversation_history:
        f.write(f'{msg}\n')

    res = {
            "success":True
        }
    
    return res

@app.route('/update_category', methods=['POST'])
def update_category():
    x = request.get_json()
    url = 'http://0.0.0.0:5557/update_category'
    myobj = {
        "category":x['category'],
    }

    x = requests.post(url, json = myobj)

    res = {
            "success":True
        }
    
    return res

@app.route('/update_groomer', methods=['POST'])
def update_groomer():
    x = request.get_json()
    url = 'http://0.0.0.0:5557/update_groomer'
    myobj = {
        "age":x['age'],
        "gender":x['gender'],
        "location":x['location'],
        "interest":x['interest'],
        "employment":x['employment'],
        "maritalstatus":x['maritalstatus'],
        "mentalstate":x['mentalstate'],
        "experience":x['experience'],
    }

    x = requests.post(url, json = myobj)

    res = {
            "success":True
        }
    
    return res

@app.route('/update_victim', methods=['POST'])
def update_victim():
    x = request.get_json()
    url = 'http://0.0.0.0:5557/update_victim'
    myobj = {
        "age":x['age'],
        "gender":x['gender'],
        "location":x['location'],
        "interest":x['interest'],
        "mentalstate":x['mentalstate'],
        "resilience":x['resilience'],
    }

    x = requests.post(url, json = myobj)

    res = {
            "success":True
        }
    
    return res

@app.route('/groomer_profile', methods=['GET'])
def groomer_profile():
    url = 'http://0.0.0.0:5557/groomer_profile'
    x = requests.get(url).json()

    res = {
        "age":x['age'],
        "gender":x['gender'],
        "location":x['location'],
        "interest":x['interest'],
        "employment":x['employment'],
        "maritalstatus":x['maritalstatus'],
        "mentalstate":x['mentalstate'],
        "experience":x['experience'],
        "category":x['category'],
        "catetext":x['catetext'],
        "success":True
    }

    return jsonify(res)

@app.route('/victim_profile', methods=['GET'])
def victim_profile():
    url = 'http://0.0.0.0:5557/victim_profile'
    x = requests.get(url).json()

    res = {
        "age":x['age'],
        "gender":x['gender'],
        "location":x['location'],
        "interest":x['interest'],
        "mentalstate":x['mentalstate'],
        "resilience":x['resilience'],
        "success":True
    }

    return jsonify(res)

@app.route('/refresh', methods=['GET', 'OPTIONS'])
def refresh():
    print('REFRESH')
    conv_history.conversation_history = []
    url = 'http://0.0.0.0:5557/reset'
    #myobj = {'conversation': conv_history.conversation_history}

    x = requests.get(url).json()

    res = {
            "success":True,
        }

    
    return jsonify(res)

@app.route('/victim', methods=['POST'])
def victim():
    print(conv_history.conversation_history)
    data = request.get_json()
    print(data)
    conv_history.conversation_history.append(f"victim:{data['message']}")
    mentor_buffer.append(f"victim:{data['message']}")
    
    res = {
            "success":True,
            "message":data['message']
        }
    
    return jsonify(res)

@app.route('/groomer', methods=['POST'])
def groomer():
    print(conv_history.conversation_history)
    data = request.get_json()
    conv_history.conversation_history.append(f"groomer:{data['message']}")
    mentor_buffer.append(f"groomer:{data['message']}")
    
    res = {
            "success":True,
            "message":data['message']
        }
    
    return jsonify(res)

@app.route('/victim_llm_regenerate', methods=['POST'])
def victim_llm_regenerate():
    conv_history.conversation_history = conv_history.conversation_history[:-1]
    return victim_llm()

@app.route('/victim_llm', methods=['POST'])
def victim_llm():
    #data = request.get_json()
    
    # take the input from the request and then pass it to the vctm
    # generated_response = vctm.chat(conv_history.conversation_history)
    url = 'http://0.0.0.0:5557/victim_llm'
    myobj = {'conversation': conv_history.conversation_history}

    x = requests.post(url, json = myobj)
    generated_response = x.json()['message']

    success = True
    res = {
            "message":generated_response,
            "success":success
        }
    
    conv_history.conversation_history.append(f"victim:{generated_response}")
    mentor_buffer.append(f"victim:{generated_response}")

    return jsonify(res)

@app.route('/groomer_llm_regenerate', methods=['POST'])
def groomer_llm_regenerate():
    conv_history.conversation_history = conv_history.conversation_history[:-1]
    print('the conversation history: ', conv_history.conversation_history)
    return groomer_llm()

@app.route('/groomer_llm', methods=['POST'])
def groomer_llm():
    #data = request.get_json()

    # take the input from the request and then pass it to the grmr
    # generated_response = grmr.chat(conv_history.conversation_history)
    url = 'http://0.0.0.0:5557/groomer_llm'
    myobj = {'conversation': conv_history.conversation_history}

    x = requests.post(url, json = myobj)
    generated_response = x.json()['message']

    success = True
    res = {
            "message":generated_response,
            "success":success
        }

    conv_history.conversation_history.append(f"groomer:{generated_response}")
    mentor_buffer.append(f"groomer:{generated_response}")

    return jsonify(res)

# @app.route('/save', methods = ['POST'])
# def save():
#     print("HERE")
#     print(request.data)
#     data = request.get_json()
#     with open(f'./static/data/annotators/{data["user"]["id"]}.json','w') as f:
#         f.write(json.dumps(data))
#         f.close()
#     return jsonify({"success":True})

# @app.route('/lock', methods = ['POST'])
# def lock():
#     data = request.get_json()
#     try:
#         with open(f'./static/data/annotators/{data["user"]}.json', 'r') as f:
#             the_json = json.loads(f.read())
#             return jsonify({'status':200, 'user':the_json['user'], 'responses':the_json['responses']})
#     except:
#         return jsonify({'status':404})
    
# #? FIX ME: CHANGE TO A POST REQUEST, PASS THE USERID
# @app.route('/get', methods = ['POST'])
# def get():
#     data = request.get_json()
#     print(data)
#     try:
#         file_to_annotate = assigned_files[data["user"]]
#         #instances = json.loads(open("./static/data/human_eval_test.json", 'r').read())
#         instances = json.loads(open(file_to_annotate, 'r').read())
#         return jsonify({'status':200, 'instances':instances})
#     except:
#         return jsonify({'status':404, 'message': data["user"]})

# @app.route('/annotate')
# def survey():
#     return render_template('index.html')

# @app.route('/chat', methods=['GET', 'POST'])
# def chat():
#     data = request.data
#     json_data = json.loads(data)
#     print("THIS IS THE INPUT: ", json_data)

#     # THIS IS WHERE I NEED TO PARSE THE INPUT AND RUN IT THROUGH THE MODELS AND RETURN
#     if json_data["input"]:
#         #res = qe.receive_input_API(json_data["message"])
#         print("The Res: ", res)
#         return jsonify(res)
#     else:
#         print("Sending Back to Front End. . .")
#         #successful_log = qe.log_round(json_data, True)

#         res = {
#             "log_success":successful_log
#         }
#         return jsonify(res)


@app.route('/') #defining a route in the application
def func(): #writing a function to be executed 
    return 'PythonGeeks'

if __name__=='__main__': #calling  main 
    app.debug=True #setting the debugging option for the application instance
    app.run(host="0.0.0.0", port="5556") #launching the flask's integrated development webserver