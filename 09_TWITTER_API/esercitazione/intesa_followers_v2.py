'''
Creare uno script che recuperi da Twitter tutti i follower dell'account intesasanpaolo e salvi i dati
all'interno di una collection di MongoDB


From FOLLOWERS_IDS --> for each user call GET_USER
'''

import tweepy
import time
from datetime import datetime as dt
from pymongo import MongoClient


class IntesaFollowers(object):

    def __init__(self, auth):
        self.auth = auth
        self.api = tweepy.API(self.auth)
        self.intesa = self.api.get_user('intesasanpaolo')

    def get_followers(self):
        for follower_id in self.intesa.followers_ids():
            try:
                yield self.api.get_user(follower_id)
            except tweepy.RateLimitError:
                print "[LOG %s] Timeout reached.. I'm going to sleep for 15 minutes.." % dt.now()
                time.sleep(15*60)
                print "[LOG %s] Try Again!" % dt.now()
            except Exception as e:
                # Generic Exception
                print "[LOG %s] Generic error " % dt.now(), e
                print "[LOG %s] Wait 60 seconds..." % dt.now()
                time.sleep(60)


print "[LOG %s] STARTING" % dt.now()

# SETUP TWITTER
CONSUMER_KEY = "GaOW7ZLn8pQgITC0EH5qEaRnq"
SECRET_KEY = "FGG1KkUB6DE5ScLk6rluRToDX2Wk99odoUz0fcCPyj0n2rDzQz"
ACCESS_TOKEN = "775822357-JMIjKZAAqPGahbfH1mZStlkS4KrESDsVNVA4D1xz"
SECRET_ACCESS_TOKEN = "VjP6b42NOBhGbrh4MsfxvqX7LTXga76t9fNqvXaJpibDu"

auth = tweepy.OAuthHandler(CONSUMER_KEY, SECRET_KEY)
auth.set_access_token(ACCESS_TOKEN, SECRET_ACCESS_TOKEN)

intesa = IntesaFollowers(auth)

print "[LOG] Twitter Setup Complete"

# SETUP PYMONGO
client = MongoClient('mongodb://localhost:27017/')
db = client.intesa

counter = 0
for follower in intesa.get_followers():
    counter += 1
    print "[LOG %s ] Follower: %s" % (dt.now(), counter)
    db.followers.insert({'userid': follower.id,
                         'description': follower.description,
                         'favourites_count': follower.favourites_count,
                         'followers_count': follower.followers_count,
                         'friends_count': follower.friends_count,
                         'lang': follower.lang,
                         'location': follower.location,
                         'name': follower.name,
                         'screen_name': follower.screen_name,
                         'geo_enabled': follower.geo_enabled,
                         'url': follower.url,
                         'time_zone': follower.time_zone,
                         'statuses_count': follower.statuses_count
                         })

print "[LOG %s] Script Completed!" % dt.now()
