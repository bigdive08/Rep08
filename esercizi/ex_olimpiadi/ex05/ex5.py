from mrjob.job import MRJob
from mrjob.step import MRStep

# Exercise 5
# Partendo dall'esercizio precedente, restituire come output l'eta' con il numero maggiore di occorrenze.

# age,birthdate,gender,height,name,weight,gold_medals,silver_medals,
# bronze_medals,total_medals,sport,country

class MREx_05(MRJob):
    def steps(self):
        return [
            MRStep(mapper=self.Age_mapper,
                  reducer=self.Age_reducer),
            MRStep(mapper=self.Freq_mapper,
                  reducer=self.Freq_reducer)
        ]

    def Age_mapper(self, _, line):
        if line.split(',')[0] <> 'age':
            yield line.split(',')[0], 1
    
    def Age_reducer (self, age, count):
        yield sum(count), int(age)
        
    def Freq_mapper(self, count, age):
        yield "Most Freq", (count, age)
        
    def Freq_reducer(self, key, m_freq):
        yield key, max(m_freq)   

if __name__ == '__main__':
    MREx_05.run()
