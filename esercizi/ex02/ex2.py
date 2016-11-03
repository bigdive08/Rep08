from mrjob.job import MRJob
from mrjob.step import MRStep

import re
WORD_REGEXP = re.compile(r"[\w']+")

# Exercise 2
# From the lorem.txt file calculate how many words starts for each letter of the alphabet and print out the max and the min.


class MREx_02(MRJob):
    def steps(self):
        return [MRStep(mapper=self.mapper_lettercount,
                    reducer=self.reducer_lettercount),
                
                MRStep(mapper=self.mapper_freq,
                    reducer=self.reducer_freq),
                
                MRStep(mapper=self.mapper_minmax,
                    reducer=self.reducer_minmax)
                    
        ]

    def mapper_lettercount(self, _, line):
        words = WORD_REGEXP.findall(line)
        for w in words:
            yield w.lower()[0], 1

    def reducer_lettercount(self, letter, count):
        yield letter, sum(count)
        
    
    def mapper_freq(self, letters, total):
        yield total, letters 

    def reducer_freq(self, total, letters):
        print letters
        yield total, letters.next() 
        
     

    def mapper_minmax(self, freq, letter):
        yield 'freq_min', [freq, letter]
        yield 'freq_max', [freq, letter]
    
        
    def reducer_minmax(self, key, freqs):
        if key == 'freq_min':
            yield 'min', min(freqs)
        if key == 'freq_max':
            yield 'max', max(freqs)
    

if __name__ == '__main__':
    MREx_02.run()
