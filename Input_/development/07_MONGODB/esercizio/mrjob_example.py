__author__ = 'alexcomu'
from mrjob.job import MRJob

class MRExample(MRJob):

    def mapper(self, key, value):
        (userID, name, age, nFriends) = value.split(',')
        yield userID, (name, age, nFriends)

if __name__ == '__main__':
    MRExample.run()