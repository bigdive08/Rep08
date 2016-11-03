from mrjob.job import MRJob
from mrjob.step import MRStep
import re

## Exercise 3
# Write a MapReduce job that report the most frequent word grouped by word length.

WORD_REGEXP = re.compile(r"[\w']+")

class MREx_03(MRJob):
    def steps(self):
        return [
            MRStep(mapper=self.mapper_wordcount,
                    reducer=self.reducer_wordcount),
            MRStep(mapper=self.mapper_char,
                    reducer=self.reducer_char)
        ]

    def mapper_wordcount(self, __, line):
        words = WORD_REGEXP.findall(line)
        for w in words:
            yield w.lower(), 1

    def reducer_wordcount(self, word, counts):
        yield word, sum(counts)

    def mapper_char(self, word, freq):
        yield len(word), [freq, word] #key, value

    def reducer_char(self, len, freqs): # freqs e' [freq, word] del prec mapreduce
        yield len, max(freqs) # massimo calcolato sul primo elemento di valore
        
        
if __name__ == '__main__':
    MREx_03.run()
