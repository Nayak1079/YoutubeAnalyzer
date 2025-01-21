from flask import Flask, jsonify, request
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import googleapiclient.discovery

app = Flask(__name__)

# YouTube API details
api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = ""

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY
)

# Function to calculate sentiment scores
def sentiment_scores(sentence):
    # Create a SentimentIntensityAnalyzer object
    sid_obj = SentimentIntensityAnalyzer()
    return sid_obj.polarity_scores(sentence)

# Flask route for sentiment analysis
@app.route('/sentiment/<sentence>', methods=['GET'])
def sentiment(sentence):
    sentiment_dict = sentiment_scores(sentence)
    return jsonify(sentiment_dict)

# Route to fetch YouTube comments and analyze sentiment
@app.route('/comments', methods=['POST'])
def youtube_comments():
    print (request)
    data = request.json
    print("data is",data)
    video_url = data.get('url',"")


    # Extract video ID from the YouTube URL
    video_id = video_url.split("v=")[-1]
    
    try:
        # Fetch comments from YouTube
        response = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=100
        ).execute()

        # Collect comments and their sentiment
        comments_with_sentiment = []
        posScore = 0
        posCount = 0
        negScore = 0
        negCount = 0
        neuScore = 0
        neuCount = 0
        compScore = 0
        for item in response.get('items', []):
            comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
            sentiment = sentiment_scores(comment)
            compScore += sentiment['compound']
            if(compScore > 0.05):
                posScore += sentiment['pos']
                posCount += 1
            elif(compScore < -0.05):
                negScore += sentiment['neg']  
                negCount += 1
            else:
                neuScore += sentiment['neu']
                neuCount += 1
        print(posCount);    
        return jsonify({"comments": comments_with_sentiment})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
