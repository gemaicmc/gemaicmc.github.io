import urllib2
import time
import hashlib

timestamp = int(time.time())

params = { 
	'time' :  str(timestamp),
	'apiKey' : '32f81e4b7319652f10b46a8b3588ef022c717043',
	'contestId' : '203053'
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
print "http://codeforces.com/api/"  + full_req
res = urllib2.urlopen("http://codeforces.com/api/"  + full_req).read()
print full_req, '\n'
print res