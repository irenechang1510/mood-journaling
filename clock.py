import spotipy
import spotipy.util as util
import numpy as np
import pandas as pd
import time
import pickle
import sqlite3
from datetime import datetime
from statistics import median


client_id = 'a4601a5ae121413e9450015d6c0febaa'
client_secret = 'ed18559d5243412281ab9c5e80a0db65'
username='5dpgk6tgb1w0swe0ni3v8s1c9'
redirect_uri='http://localhost:3000/'


token = util.prompt_for_user_token(
        username=username,
        scope=['user-read-recently-played', 'playlist-read-private'],
        client_id=client_id,
        client_secret=client_secret,
        redirect_uri=redirect_uri)

sp = spotipy.Spotify(auth=token)

def get_daily_songs(start, stop):
    '''
      Purpose: Get the names, URIs, and artists of all the songs listened to in a day
      
      Arguments: 
            start: the starting point, which is Now, going backwards (in millis)
            stop: 24 hours in the past, aka (Now - 24hrs) (in millis)
      
      Returns: The desired tuples. 
      
      How this works:
      Keep getting the next batch of 50 songs until we exceed the 24-hour mark, at which point, we find the max number
      of songs we can get before exceeding the 24 hour mark. Examples: 
          
                  24hr                                                                              <- Now
    ----------------|-----------------------------------------------------------------------------------|
                    |.......().......|................()...............|...............()...............|
                         17 songs                   50 songs                            50 songs
    |...............()...............|
                    50 songs
  
    Note: Spotipy recent update only keeps track of the 50 most recent tracks and discards the rest; so the most number
    of songs we can get is 50.
    '''
    names, uris, artists, recent_list = [], [], [], []
    
    # get batch of 50 every time
    while (start > stop):
        recent_play = sp.current_user_recently_played(before=start, limit=50) 
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

    # after getting the list of songs, extract the information
    for i in range(len(recent_list)):
        this_song = recent_list[i]['track']
        names.append(this_song['name'])
        uris.append(this_song['uri'])
        artists.append(this_song['artists'][0]['name'])
        
    return names, uris, artists

def get_right_limit(left, right):
    '''
    Purpose: Find the number of songs listened to starting from the previous cursor to the 24hr mark

    Arguments: 
        left: the 24hr mark - the final cursor obtained should be at some time later that this 
        right: the time of the previous cursor - aka the starting point for our checking

    Return: The appropriate 'limit' such that the final cursor doesn't exceed the 24 hour mark (=left)
    '''
    limit=50
    while limit > 0:
        obj = sp.current_user_recently_played(before=right, limit=limit)
        mark = int(obj['cursors']['before'])
        
        # right when we encounter a song that gives us a cursor within range, we return the limit.
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
    mixed = pd.DataFrame(columns=['name', 'artist', 'track_URI', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 
    'speechiness', 'tempo', 'valence'])

    # get all songs from 11:59pm yesterday to 11:59pm today
    curr_time = int(round(time.time() * 1000))
    mixed = get_features_for_playlist2(mixed, curr_time, curr_time - 86400000) # get 1 day

    # make predictions 
    lr = pickle.load(open('models/deploy_model.sav', 'rb'))
    vnpred = lr.predict_proba(mixed.drop(['name', 'artist', 'track_URI'], axis=1))[:,1]
    mixed.insert(3, 'prediction', vnpred)

    # get the median of all scores -> the mood score of the day
    day_median = float(median(mixed['prediction']))
    this_day = datetime.now().day

    # update the table 
    conn = sqlite3.connect('schema.sql')
    sql = ''' UPDATE result SET results = ? WHERE [index] = ?'''
    if this_day == 1: # if turn to a new month
        result_df = pd.DataFrame(np.zeros(31), columns=['results'])
        result_df.to_sql('result', conn, if_exists='replace')
        cur = conn.cursor()
        cur.execute(sql, (day_median, 0))
        conn.commit()
    else:
        cur = conn.cursor()
        cur.execute(sql, (day_median, this_day-1))
        conn.commit()
