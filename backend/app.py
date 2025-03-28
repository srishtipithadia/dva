import os
from flask import Flask, jsonify, json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

data_file = os.path.join(app.static_folder, 'data', 'test_data.json')

def scale_values(feeds, keys):
    min_max = {key: (min(feed[key] for feed in feeds), max(feed[key] for feed in feeds)) for key in keys}
    
    for feed in feeds:
        for key in keys:
            min_val, max_val = min_max[key]
            if max_val != min_val:
                feed[key] = (feed[key] - min_val) / (max_val - min_val)
            else:
                feed[key] = 0

    return feeds

@app.route('/api/feed_data', methods=['GET'])
def get_feed_data():
    with open(data_file) as f:
        data = json.load(f)
        
    return jsonify(data)

@app.route('/api/normalized_data')
def get_normalized_data():
    with open(data_file) as f:
        data = json.load(f)
    
    keys_to_scale = ["likes", "posts", "toxicity_score", "positivity_score", "commercial_link_score", "poster_diversity_score"]
    normalized_data = scale_values(data, keys_to_scale)

    return jsonify(normalized_data)

if __name__ == '__main__':
    app.run(debug=True)