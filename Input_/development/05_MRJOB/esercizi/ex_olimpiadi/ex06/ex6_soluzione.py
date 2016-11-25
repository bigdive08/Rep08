from mrjob.job import MRJob
from mrjob.step import MRStep

# Exercise 6
# Calcolare il numero di uomini e donne per ogni eta.

# age,birthdate,gender,height,name,weight,gold_medals,silver_medals,
# bronze_medals,total_medals,sport,country

class MREx_06(MRJob):
    def steps(self):
        return [MRStep(mapper=self.lineMapper,
                       reducer=self.ageReducer)]

    def lineMapper(self, _, line):
        splitted = line.split(',')
        if splitted[0] == 'age': return
        yield splitted[0], splitted[2]

    def ageReducer(self, age, entries):
        male = 0
        female = 0
        for entry in entries:
            if entry == "Male":
                male += 1
            else:
                female += 1
        yield age, (male, female)


if __name__ == '__main__':
    MREx_06.run()
