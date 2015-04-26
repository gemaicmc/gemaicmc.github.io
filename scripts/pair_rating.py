from os import listdir
from os.path import isfile, join

points = {}

f = open ('config/points', 'r')
for line in f:
	pos = int(line.split(' ')[0])
	val = int(line.split(' ')[1])
	points[pos] = val

contests = 8
path = 'contests/sample/'
contestfiles = [ f for f in listdir(path) if isfile(join(path,f)) ]

results = {}

for fi in contestfiles:
	pst = []
	f = open(path + fi)
	# f = open('contests/sample/1', 'r')
	for line in f:
		pst.append(line[:-1])
	
	for i in range(0, len(pst)):
		for j in range(i, len(pst)):
			A = points[i + 1]
			B = points[j + 1]
			if pst[i] not in results:
				results[pst[i]] = 0
			if pst[j] not in results:
				results[pst[j]] = 0
			results[pst[i]] += (A - B)
			results[pst[j]] -= (A - B)

for x in results:	
	print x, results[x]