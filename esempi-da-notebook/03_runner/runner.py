from wordcount import MRWordFreqCount

mr_job = MRWordFreqCount()
mr_job.stdin = open('lorem.txt')

result = {}

with mr_job.make_runner() as runner:
    runner.run()
    for line in runner.stream_output():
        key, value = mr_job.parse_output_line(line)
        #print 'Word:', key, 'Count:', value
        result[key]=value

print result


# Modifica layout da linea di comando