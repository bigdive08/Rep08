from mrjob.job import MRJob
from mrjob.step import MRStep

import re

# Exercise 4
# Utilizzando il dataset, calcolare per ogni eta il numero di atleti.

# age,birthdate,gender,height,name,weight,gold_medals,silver_medals,
# bronze_medals,total_medals,sport,country

class MREx_04(MRJob):
    def steps(self):
        return [
            MRStep(mapper=self.Age_mapper,
                  reducer=self.Age_reducer)
        ]

    def Age_mapper(self, _, line):
        if line.split(',')[0] <> 'age':
            yield line.split(',')[0], 1
    
    def Age_reducer (self, age, count):
        yield int(age), sum(count)

    #def ageReducer(self, age, occurrences_list):
    #    pass

if __name__ == '__main__':
    MREx_04.run()
