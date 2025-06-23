from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import bcrypt
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import googleapiclient.discovery
import Levenshtein
import time
from collections import Counter

app = Flask(__name__)

# ✅ Correct CORS settings for localhost:3000 and credentials
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# PostgreSQL database connection
conn = psycopg2.connect(
    host="localhost",
    port=5433,
    database="project",
    user="postgres",
    password="22054215"
)
cursor = conn.cursor()

# ---------------------- YOUTUBE API SETUP -----------------------
api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = "AIzaSyBpF62-N1FEpGggjmotON6cm2VkxvKf3d0"

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY
)

# ---------------------- SIGNUP API -----------------------
@app.route("/Signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and Password are required"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode()

    try:
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 200
    except psycopg2.Error as e:
        if "unique" in str(e).lower():
            return jsonify({"error": "Email already exists"}), 400
        return jsonify({"error": "Database error"}), 500

# ---------------------- LOGIN API -----------------------
@app.route("/Login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    cursor.execute("SELECT password FROM users WHERE email = %s", (email,))
    result = cursor.fetchone()

    if result and bcrypt.checkpw(password.encode('utf-8'), result[0].encode()):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

# ---------------------- YOUTUBE COMMENT ANALYSIS (Unchanged) -----------------------
@app.route('/Home', methods=['POST'])
def youtube_comments():
    data = request.json
    video_url = data.get('url', "")
    if not video_url:
        return jsonify({"error": "URL is required"}), 400

    if "v=" in video_url:
        video_id = video_url.split("v=")[-1].split("&")[0]
    else:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    try:
        video_title = get_video_title(video_id)
        comments, user_comment_count, duplicate_users, spam_count = get_all_comments(video_id)

        comments_with_sentiment = []
        posCount, negCount, neuCount = 0, 0, 0

        for item in comments:
            comment = item["comment"]
            sentiment = sentiment_scores(comment)
            compound_score = sentiment['compound']
            if compound_score > 0.8 or compound_score < -0.8:
                spam_count += 1

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
        spam_percentage = (spam_count / totalComments) * 100 if totalComments > 0 else 0

        response_data = {
            "videoTitle": video_title,
            "Total negative comments": negCount,
            "Total positive comments": posCount,
            "Total neutral comments": neuCount,
            "Total comments analyzed": totalComments,
            "Positive comments percentage": (posCount / totalComments) * 100 if totalComments > 0 else 0,
            "Negative comments percentage": (negCount / totalComments) * 100 if totalComments > 0 else 0,
            "Neutral comments percentage": (neuCount / totalComments) * 100 if totalComments > 0 else 0,
            "Spam percentage": spam_percentage
        }

        return jsonify(response_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------------- SPAM DETECTION HELPERS -----------------------
spam_keywords = {
    "subscribe", "click here", "buy now", "free", "win", "prize", "giveaway", "visit",
    "discount", "deal", "limited offer", "cash", "bitcoin", "investment", "http", "https",
    "www", ".com", "check out", "onlyfans", "telegram", "promo", "sponsor", "xxx", "adult", "sex"
}

def sentiment_scores(sentence):
    sid_obj = SentimentIntensityAnalyzer()
    return sid_obj.polarity_scores(sentence)

def get_video_title(video_id):
    try:
        response = youtube.videos().list(part="snippet", id=video_id).execute() 
        if "items" in response and response["items"]:
            return response["items"][0]["snippet"]["title"]
        return "Unknown Title"
    except Exception as e:
        return f"Error fetching title: {str(e)}"

def is_repeating_words(comment):
    words = comment.lower().split()
    word_counts = Counter(words)
    return any(count >= 4 for count in word_counts.values())

def normalized_lev(s1, s2):
    if not s1 or not s2:
        return 1
    return Levenshtein.distance(s1, s2) / max(len(s1), len(s2))

def get_all_comments(video_id):
    comments = []
    user_comment_count = {}
    duplicate_users = {}
    seen_comments = []
    user_last_comment = {}
    user_timestamps = {}
    spam_count = 0
    total_comment_length = 0
    next_page_token = None

    while True:
        response = youtube.commentThreads().list(
            part="snippet", videoId=video_id, maxResults=100, pageToken=next_page_token
        ).execute()

        for item in response.get('items', []):
            snippet = item['snippet']['topLevelComment']['snippet']
            comment_text = snippet['textDisplay']
            user_id = snippet['authorChannelId']['value']
            timestamp = snippet['publishedAt']
            total_comment_length += len(comment_text)

            comments.append({"user_id": user_id, "comment": comment_text})
            user_comment_count[user_id] = user_comment_count.get(user_id, 0) + 1
            user_timestamps[user_id] = user_timestamps.get(user_id, []) + [timestamp]

        next_page_token = response.get('nextPageToken')
        if not next_page_token:
            break

    for item in comments:
        comment_text = item["comment"]
        user_id = item["user_id"]
        spam_score = 0

        if any(keyword in comment_text.lower() for keyword in spam_keywords):
            spam_score += 2

        if len(comment_text) < 5 or len(comment_text) > 300:
            spam_score += 1

        if is_repeating_words(comment_text):
            spam_score += 1

        if user_id in user_last_comment and normalized_lev(comment_text, user_last_comment[user_id]) < 0.3:
            spam_score += 2

        if any(normalized_lev(comment_text, prev) < 0.3 for prev in seen_comments):
            spam_score += 1

        if len(user_timestamps[user_id]) > 1:
            time_diff = time.mktime(time.strptime(user_timestamps[user_id][-1], "%Y-%m-%dT%H:%M:%SZ")) - \
                        time.mktime(time.strptime(user_timestamps[user_id][0], "%Y-%m-%dT%H:%M:%SZ"))
            if time_diff < 60:
                spam_score += 1

        if spam_score >= 3:
            spam_count += 1
        else:
            seen_comments.append(comment_text)
            user_last_comment[user_id] = comment_text

    return comments, user_comment_count, duplicate_users, spam_count

# ---------------------- MAIN -----------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
