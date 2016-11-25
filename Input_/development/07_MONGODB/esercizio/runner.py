from mrjob_example import MRExample
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/')
db = client.mrjob_example


mr_job = MRExample()
mr_job.stdin = open('fakefriends.csv')


with mr_job.make_runner() as runner:
    runner.run()
    for line in runner.stream_output():
        userID, value = mr_job.parse_output_line(line)
        db.fakefriends.insert({"_id":userID, "name": value[0],
                              "age": value[1], "nFriends": value[2]})
        print 'Inserting %s..' % userID

print 'Complete!'