# 네이버 조회수 순으로 영화 랭킹 Top 50 가져오기
# 순위가 같을때 처리 해줘야됨

import requests
from bs4 import BeautifulSoup

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=cnt&date=20221109',headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

movies = soup.select("#old_content > table > tbody > tr")
for movie in movies:
    movie_name = movie.select_one("td.title > div > a")
    # movie_point = movie.select_one("td.point")
    if movie_name is not None:
        if movie.select_one("td:nth-child(1) > img"):
            ranking = movie.select_one("td:nth-child(1) > img")["alt"]
            print(ranking, movie_name.text)
        else:
            ranking = 0
            print(ranking, movie_name.text)


            #old_content > table > tbody > tr:nth-child(36) > td:nth-child(1)