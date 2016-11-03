from mrjob.job import MRJob
from mrjob.step import MRStep




# Exercise 6
# Calcolare il numero di uomini e donne per ogni eta.

# age,birthdate,gender,height,name,weight,gold_medals,silver_medals,
# bronze_medals,total_medals,sport,country

class MREx_06(MRJob):
    def steps(self):
        return [
            MRStep(mapper=self.AgeSex_mapper,
                  reducer=self.AgeSex_reducer)
        ]

    def AgeSex_mapper(self, _, line):
        if line.split(',')[0] <> 'age':
            yield [line.split(',')[0],line.split(',')[2]], 1
         
    def AgeSex_reducer(self, age_sex, count):
        yield age_sex, sum(count)

if __name__ == '__main__':
    MREx_06.run()
