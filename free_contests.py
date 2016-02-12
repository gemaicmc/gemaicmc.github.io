import urllib2
import time
import hashlib
import json

def make_request (request, params):

	apiSecret = '620e9e83dd2827ec825f401f446b219f5792e2c9'
	full_req = ''

	for key in params:
		request += key + '=' + params[key] + '&' 

	request = request[:-1]
	full_req = request
	request += '#' + apiSecret

	res = hashlib.sha512('123456/' + request).hexdigest()
	full_req += '&apiSig=123456' + res 
	print full_req
	res = urllib2.urlopen("http://codeforces.com/api/"  + full_req).read()
	jres = json.loads(res)
	
	return jres



timestamp = int(time.time())

params = { 
	'time' :  str(timestamp),
	'apiKey' : '32f81e4b7319652f10b46a8b3588ef022c717043'
}

res = make_request ('contest.list?', params)

users = []
f = open ('users', 'r')
for user in f:
	users.append (f)

for contest in res['result']:
	
	contestId = contest['id']
	timestamp = int(time.time())
	params = {
		'time' :  str(timestamp),
		'apiKey' : '32f81e4b7319652f10b46a8b3588ef022c717043',
		'contestId' : str(contestId)
	}
	cont = make_request ('contest.standings?', params)
	for row in cont['rows']:
		print row
