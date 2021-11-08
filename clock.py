import spotipy
import spotipy.util as util
import numpy as np
import pandas as pd
import time
import pickle
import sqlite3
from datetime import datetime
from statistics import median


client_id = 'XXXX'
client_secret = 'XXXX'
username='XXX'
redirect_uri='http://localhost:3000/'


token = util.prompt_for_user_token(
        username=username,
        scope=['user-read-recently-played', 'playlist-read-private'],
        client_id=client_id,
        client_secret=client_secret,
        redirect_uri=redirect_uri)

sp = spotipy.Spotify(auth=token)

def get_daily_songs(start, stop):
    names, uris, artists, recent_list = [], [], [], []
    
    # get the songs from Sep 1st 0am to Sep 2nd 0am

    # stop when after is past sep 1st 0am
    while (start > stop):
        recent_play = sp.current_user_recently_played(before=start, limit=50) # start at sep 2nd 0am
        try:
            after = int(recent_play['cursors']['before'])
        except:
            after = stop
        # if goes over, find the limit threshold
        if after < stop:
            limit = get_right_limit(stop, start+1)
            if limit != 0:
                recent_play = sp.current_user_recently_played(before=start+1, limit=limit)
            else:
                break

        recent_list.extend( recent_play['items'] ) 
        start = after

    for i in range(len(recent_list)):
        this_song = recent_list[i]['track']
        names.append(this_song['name'])
        uris.append(this_song['uri'])
        artists.append(this_song['artists'][0]['name'])
        
    return names, uris, artists

def get_right_limit(left, right):
    limit=50
    while limit > 0:
        obj = sp.current_user_recently_played(before=right, limit=limit)
        mark = int(obj['cursors']['before'])
        if mark > left:
            break
        limit -= 1
    
    return limit

def get_features_for_playlist2(df, start, stop):
  
    # get all track metadata from given playlist
    song_names, song_uris, song_artists = get_daily_songs(start, stop)
    
    # iterate through each track to get audio features and save data into dataframe
    for name, artist, track_uri in zip(song_names, song_artists, song_uris):              
        
        # access audio features for given track URI via spotipy 
        audio_features = sp.audio_features(track_uri)

        # get relevant audio features
        feature_subset = [audio_features[0][col] for col in df.columns if col not in ["name", "artist", "track_URI", "playlist"]]

        # compose a row of the dataframe by flattening the list of audio features
        row = [name, artist, track_uri]
        row = row + feature_subset
        df.loc[len(df.index)] = row
    return df


if __name__ == '__main__':
    print("this is running")
    mixed = pd.DataFrame(columns=['name', 'artist', 'track_URI', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 
    'speechiness', 'tempo', 'valence'])
    curr_time = int(round(time.time() * 1000))
    print("curr time is:", curr_time)

    mixed = get_features_for_playlist2(mixed, curr_time, curr_time - 86400000) # get 1 day
    lr = pickle.load(open('models/deploy_model.sav', 'rb'))
    vnpred = lr.predict_proba(mixed.drop(['name', 'artist', 'track_URI'], axis=1))[:,1]
    mixed.insert(3, 'prediction', vnpred)

    day_median = float(median(mixed['prediction']))
    this_day = datetime.now().day

    conn = sqlite3.connect('schema.sql')
    sql = ''' UPDATE result SET results = ? WHERE [index] = ?'''
    if this_day == 1:
        result_df = pd.DataFrame(np.zeros(31), columns=['results'])
        result_df.to_sql('result', conn, if_exists='replace')
        cur = conn.cursor()
        cur.execute(sql, (day_median, 0))
        conn.commit()
    else:
        cur = conn.cursor()
        cur.execute(sql, (day_median, this_day-1))
        conn.commit()
