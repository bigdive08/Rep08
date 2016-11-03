from mrjob.job import MRJob
from mrjob.step import MRStep

import re
WORD_REGEXP = re.compile(r"[\w']+")


# Exercise 1
# From the lorem.txt file calculate how many words starts for each letter of the alphabet.


class MREx_01(MRJob):
    def steps(self):
        return [
            MRStep(mapper=self.mapper_lettercount,
                    reducer=self.reducer_lettercount)
        ]

    def mapper_lettercount(self, _, line):
        words = WORD_REGEXP.findall(line)
        for w in words:
            yield w.lower()[0], 1

    def reducer_lettercount(self, letter, count):
        yield letter, sum(count)


if __name__ == '__main__':
    MREx_01.run()
