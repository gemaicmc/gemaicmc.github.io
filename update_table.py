import urllib2
import time
import hashlib
import json

problemas_player = {}
players = {}
teams = {}
contest_res = []
team_contests = []
#  Dict -> player -> pos
contests = { '203053' }

f = open ('scripts/config/score_individual', 'r')
points = []
for line in f:
	val = int(line)
	points.append(val)

# k = 1
# for p in points:
# 	print '<tr><td> ', k, '</td> <td>', p, '</tr>'
# 	k = k + 1
for contest in contests:
	contest_res.append({})
	timestamp = int(time.time())

	params = { 
		'time' :  str(timestamp),
		'apiKey' : '32f81e4b7319652f10b46a8b3588ef022c717043',
		'contestId' : contest
	}

	apiSecret = '620e9e83dd2827ec825f401f446b219f5792e2c9'

	request = 'contest.standings?'
	full_req = ''

	for key in params:
		request += key + '=' + params[key] + '&' 

	request = request[:-1]
	full_req = request
	request += '#' + apiSecret

	res = hashlib.sha512('123456/' + request).hexdigest()
	full_req += '&apiSig=123456' + res 
	# print "http://codeforces.com/api/"  + full_req
	res = urllib2.urlopen("http://codeforces.com/api/"  + full_req).read()


	jres = json.loads(res)
	stand = jres['result']['rows']

	pos = 0
	for row in stand:
		# if 'teamName' in row['party']:
			# print 'Team ', row['party']['teamName']
		if 'party' in row:
			for player in row['party']['members']:
				handle = player['handle']
				players[handle] = 1
				if handle not in problemas_player:
					problemas_player[handle] = row['points']
				else:
					problemas_player[handle] += row['points']
				contest_res[-1][player['handle']] = pos
		if 'teamName' in row['party']:
			pos = pos + 2
		else:
			pos = pos + 1
# print contest_res

penalty = {}
points_player = {}
contests_player = {}
table_rows = []

for player in players:
	points_player[player] = 0
	contests_player[player] = 0
	penalty[player] = 0

for contest in contest_res:
	for handle in players:
		if handle not in contest: 
			if penalty[handle] == 0:
				contest[handle] = 0
			elif penalty[handle] == 1:
				contest[handle] = -30
			elif penalty[handle] == 2:
				contest[handle] = -70
			else:
				contest[handle] = -100
			penalty[handle] += 1

	for handle in contest:
		points_player[handle] += points[contest[handle]]

for player in points_player:
	table_rows.append( [points_player[player], player] )

print 'Handle #Contests #Problemas #Pontos'
for row in sorted(table_rows, reverse=True):
	handle = row[1]
	if handle == 'LaercioJr':
		continue
	print  handle, contests_player[handle], int(problemas_player[handle]), row[0] 