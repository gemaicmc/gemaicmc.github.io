import urllib2
import time
import hashlib
import json
import sys

def make_request (request, params):
	full_req = ''
	for key in params:
		request += key + '=' + params[key] + '&'
        if request[-1] == '&':
                request = request[:-1]
	full_req = "http://codeforces.com/api/"  + request
	res = urllib2.urlopen(full_req).read()
	jres = json.loads(res)
	return jres



params = {}

res = make_request ('contest.list?', params)

users = {}

f = open ('users', 'r')
for line in f:
    users[line[:-1]] = 1

print 'Finding contests for:'
for user in users:
    print user
print '==============='

for contest in res['result']:
    try:
	contestId = contest['id']
	params = {
		'contestId' : str(contestId)
	}
	cont = make_request ('contest.standings?', params)

        good = True
        for u in cont['result']['rows']:
            if 'party' in u:
                for member in u['party']['members']:
                    if member['handle'] in users:
                        good = False
        if good == True:
            print cont['result']['contest']['name']

    except:
        continue
