import os
import sys
import urllib.request
client_id = "zp580fkHgE57jjytcezD"
client_secret = "opbueu7dbW"
encText = urllib.parse.quote("기생충")
url = "https://openapi.naver.com/v1/search/movie.json?query=" + encText # JSON 결과
# url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # XML 결과
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",'zp580fkHgE57jjytcezD')
request.add_header("X-Naver-Client-Secret",'opbueu7dbW')
response = urllib.request.urlopen(request)
rescode = response.getcode()
if(rescode==200):
    response_body = response.read()
    print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)

