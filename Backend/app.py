# # from flask import Flask
# # from flask_sqlalchemy import SQLAlchemy
# # from flask_bcrypt import Bcrypt
# # from flask_jwt_extended import JWTManager
# # from flask_cors import CORS
# # from config import Config
# # from models import db
# # from routes.auth import auth_bp
# # from routes.sentiment import sentiment_bp

# # app = Flask(__name__)
# # app.config.from_object(Config)  # Load configurations

# # # Initialize extensions
# # db.init_app(app)
# # bcrypt = Bcrypt(app)
# # jwt = JWTManager(app)
# # CORS(app)

# # # Register Routes
# # app.register_blueprint(auth_bp, url_prefix='/auth')
# # app.register_blueprint(sentiment_bp, url_prefix='/youtube')

# # # Create Tables
# # with app.app_context():
# #     db.create_all()

# # if __name__ == "__main__":
# #     app.run(debug=True)

# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
# import googleapiclient.discovery


# app = Flask(__name__)
# CORS(app)
# # YouTube API details
# api_service_name = "youtube"
# api_version = "v3"
# DEVELOPER_KEY = "AIzaSyBpF62-N1FEpGggjmotON6cm2VkxvKf3d0"

# youtube = googleapiclient.discovery.build(
#     api_service_name, api_version, developerKey=DEVELOPER_KEY
# )

# # Function to calculate sentiment scores
# def sentiment_scores(sentence):
#     sid_obj = SentimentIntensityAnalyzer()
#     return sid_obj.polarity_scores(sentence)

# # Flask route for sentiment analysis
# @app.route('/sentiment/<sentence>', methods=['GET'])
# def sentiment(sentence):
#     sentiment_dict = sentiment_scores(sentence)
#     return jsonify(sentiment_dict)

# # Function to fetch all YouTube comments
# def get_all_comments(video_id):
#     comments = []
#     next_page_token = None
    
#     while True:
#         response = youtube.commentThreads().list(
#             part="snippet",
#             videoId=video_id,
#             maxResults=100,
#             pageToken=next_page_token
#         ).execute()
        
#         for item in response.get('items', []):
#             comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
#             comments.append(comment)
        
#         next_page_token = response.get('nextPageToken')
#         if not next_page_token:
#             break
    
#     return comments

# # Route to fetch YouTube comments and analyze sentiment
# @app.route('/Home', methods=['POST'])
# def youtube_comments():
#     data = request.json
#     video_url = data.get('url', "")

#     if not video_url:
#         return jsonify({"error": "URL is required"}), 400

#     if "v=" in video_url:
#         video_id = video_url.split("v=")[-1]
#     else:
#         return jsonify({"error": "Invalid YouTube URL"}), 400

#     try:
#         comments = get_all_comments(video_id)
#         comments_with_sentiment = []
#         posCount, negCount, neuCount = 0, 0, 0

#         for comment in comments:
#             sentiment = sentiment_scores(comment)
#             compound_score = sentiment['compound']
#             comments_with_sentiment.append({
#                 "comment": comment,
#                 "sentiment": sentiment
#             })
            
#             if compound_score > 0.05:
#                 posCount += 1
#             elif compound_score < -0.05:
#                 negCount += 1
#             else:
#                 neuCount += 1
#         totalComments = len(comments_with_sentiment)
#         posCommentPercentage = (posCount/totalComments)*100
#         negCommentPercentage = (negCount/totalComments)*100
#         neuCommentPercentage = (neuCount/totalComments)*100
#         return jsonify({
#             "Total negative comments": negCount,
#             "Total positive comments": posCount,
#             "Total neutral comments": neuCount,
#             "Total comments analyzed": len(comments_with_sentiment),
#             "Positive comments percentage": posCommentPercentage,
#             "Negative comments percentage": negCommentPercentage,
#             "Neutral comments percentage": neuCommentPercentage,
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)
from flask import Flask, jsonify, request
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import googleapiclient.discovery

app = Flask(__name__)
CORS(app)

# YouTube API details
api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = "AIzaSyBpF62-N1FEpGggjmotON6cm2VkxvKf3d0"

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY
)

# Function to calculate sentiment scores
def sentiment_scores(sentence):
    sid_obj = SentimentIntensityAnalyzer()
    return sid_obj.polarity_scores(sentence)

# Function to fetch video title
def get_video_title(video_id):
    try:
        response = youtube.videos().list(
            part="snippet",
            id=video_id
        ).execute()
        
        if "items" in response and len(response["items"]) > 0:
            return response["items"][0]["snippet"]["title"]
        return "Unknown Title"
    except Exception as e:
        return f"Error fetching title: {str(e)}"

# Function to fetch YouTube comments
def get_all_comments(video_id):
    comments = []
    next_page_token = None
    
    while True:
        response = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=100,
            pageToken=next_page_token
        ).execute()
        
        for item in response.get('items', []):
            comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
            comments.append(comment)
        
        next_page_token = response.get('nextPageToken')
        if not next_page_token:
            break
    
    return comments

# Route to fetch YouTube comments and analyze sentiment
@app.route('/Home', methods=['POST'])
def youtube_comments():
    data = request.json
    video_url = data.get('url', "")

    if not video_url:
        return jsonify({"error": "URL is required"}), 400

    if "v=" in video_url:
        video_id = video_url.split("v=")[-1].split("&")[0]  # Extracting video ID correctly
    else:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    try:
        # Fetch video title
        video_title = get_video_title(video_id)

        comments = get_all_comments(video_id)
        comments_with_sentiment = []
        posCount, negCount, neuCount = 0, 0, 0

        for comment in comments:
            sentiment = sentiment_scores(comment)
            compound_score = sentiment['compound']
            comments_with_sentiment.append({
                "comment": comment,
                "sentiment": sentiment
            })
            
            if compound_score > 0.05:
                posCount += 1
            elif compound_score < -0.05:
                negCount += 1
            else:
                neuCount += 1

        totalComments = len(comments_with_sentiment)
        posCommentPercentage = (posCount / totalComments) * 100 if totalComments > 0 else 0
        negCommentPercentage = (negCount / totalComments) * 100 if totalComments > 0 else 0
        neuCommentPercentage = (neuCount / totalComments) * 100 if totalComments > 0 else 0

        return jsonify({
            "videoTitle": video_title,
            "Total negative comments": negCount,
            "Total positive comments": posCount,
            "Total neutral comments": neuCount,
            "Total comments analyzed": totalComments,
            "Positive comments percentage": posCommentPercentage,
            "Negative comments percentage": negCommentPercentage,
            "Neutral comments percentage": neuCommentPercentage,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
