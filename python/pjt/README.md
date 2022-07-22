# README

## 이번 프로젝트를 통해 느낀점

1. 함수를 만드는 간단한 법만 알았지만 응용을 하여 더 많은 데이터에서 원하는 정보만 빼내서 찾아쓰는 방법 접해서 좋았다.
2. 앞으로도 많은 문제를 접하면서 해결방법이 빨리 떠오르도록 연습을 해야겠다

## A번 문제

### 제공되는 영화 데이터의 주요내용 수집

- **요구사항**
    - movie.json 에서 movie.json에서 id, title, poster_path, vote_average, overview,
    genre_ids 키에 해당하는 값을 추출합니다.
    - 추출한 값을 새로운 dictionary로 반환하는 함수 movie_info를 완성합니다.
- 문제 접근방법
    - 파일을 들고 온 후 원하는 값만 뽑아옴

```python
import json
from pprint import pprint

def movie_info(movie):
    new_movie = {
        'id': movie.get('id'),
        'title': movie.get('title'),
        'poster_path': movie.get('poster_path'),
        'vote_average': movie.get('vote_average'),
        'overview': movie.get('overview'),
        'genre_ids' : movie.get('genre_ids')
    }
    return new_movie
    # 여기에 코드를 작성합니다.    

# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movie_json = open('data/movie.json', encoding='utf-8')
    movie_dict = json.load(movie_json)
    
    pprint(movie_info(movie_dict))
```

- 느낀점
    - 저장할 변수 명이랑, 들고오는 변수명을 자동화로 돌리는 방법으로 하면 필요 자료가 많아질때 값만 넣어서 여러 문장을 돌릴수 있음으로 편할꺼같긴하다.(데이터가 커지면)

## B번 문제

### 제공되는 영화 데이터의 주요내용 수정

- **요구사항**
    - genre_ids를 장르 번호가 아닌 장르 이름 리스트
    genre_names로 바꿔 반환하는 함수를 완성합니다
- 문제 접근방법
    - A 문제에서 찾은 리스트 id 에 하나씩 해당하는 값을 genrs.json에서 매칭해서 출력하기

```python
import json
from pprint import pprint

def movie_info(movie, genres):
	 # genre_ids 값만 따로 불러옴
    genre_ids = movie.get('genre_ids')
		# 해당 값을 넣을 리스트 생성
    genre_names=list() 
    for ids in genre_ids: 
			#  이중 for 문 돌리면서 id가 일치하는 것 만 찾기
        for j in genres_list: 
					# 같은 id 에 해당하는 name값을 리스트에 추가하기
            if j['id'] == ids:
                genre_names.append(j['name']) 
    
    new_data={
        'genre_names' : genre_names,
        'id' : movie.get('id'),
        'title' : movie.get('title'),
        'poster_path' : movie.get('poster_path'),
        'vote_average' : movie.get('vote_average'),
        'overview' : movie.get('overview'),
    }
    return new_data
   # 여기에 코드를 작성합니다.  
        
# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movie_json = open('data/movie.json', encoding='utf-8')
    movie = json.load(movie_json)

    genres_json = open('data/genres.json', encoding='utf-8')
    genres_list = json.load(genres_json)

    pprint(movie_info(movie, genres_list))
```

- 느낀점
    - 다른 파일에 있는 값을 참조하여 내가 원하는 값을 도출하는 부분이 신기했다.

## C번 문제

### 다중 데이터 분석 및 수정

- **요구사항**
    - movies 파일을 순차적으로 돌며 해당값만 모으기
- 문제 접근방법
    - movies 파일에서 b 문제에서 푼 movie 하나의 값을 돌면서 반복해 리스트에 저장

```python
import json
from pprint import pprint

def movie_info(movies, genres):
    new_data =list() # 모든 값을 넣을제일큰 list 
    for movie in movies:
        genre_ids = movie.get('genre_ids') # genre_ids 값만 따로 불러옴
        genre_names=list() # 해당 값을 넣을 리스트 생성
        for ids in genre_ids: 
            for j in genres_list: #  이중 for 문 돌리면서 id가 일치하는 것 만 찾기
                if j['id'] == ids:
                    genre_names.append(j['name']) # 같은 id 에 해당하는 name값을 genre_names 리스트에 추가하기
        
        new_data.append({
            'genre_name' : genre_names,
            'genre_names' : movie.get('genre_ids'),
            'id' : movie.get('id'),
            'title' : movie.get('title'),
            'poster_path' : movie.get('poster_path'),
            'vote_average' : movie.get('vote_average'),
            'overview' : movie.get('overview'),
        })
    return new_data
 
    # 여기에 코드를 작성합니다.  
        
        
# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='utf-8')
    movies_list = json.load(movies_json)

    genres_json = open('data/genres.json', encoding='utf-8')
    genres_list = json.load(genres_json)

    pprint(movie_info(movies_list, genres_list))
```

- 느낀점
    - append에 대해서 완전 이해한것같다.

## D번 문제

### 알고리즘을 사용한 데이터 출력

- **요구사항**
    - id에 해당하는 폴더에서 해당 값 가져와서 최고값 출력하기
- 문제 접근방법
    - movies 파일에서 id 를 찾은 값으로 id폴더를 열고 그 폴더에 있는 수익 데이터 가져오기

```python
import json

def max_revenue(movies):
    total_date = {}
    for ids in movies_list: # movies_list 를 하나씩 돌기
        li_id = str(ids.get('id')) 
        link = 'data/movies/'+ li_id +'.json' # 하나씩 id 값을 찾아서 파일 링크 만들기
        movies_js = open(link, encoding='utf-8')
        movies_lis = json.load(movies_js) # 위에서 만든 링크 변수사용해서 파일 열기
        total_date[movies_lis.get('title')] = movies_lis.get('revenue') # 파일에서 원하는 값 가져와서 [key:value]로 만들기
        sort_data = sorted(total_date.values()) # 하나씩 sort 한 데이터를 sort_data에 저장
        max_values = sort_data[-1] # 오름차순으로 정렬해서 젤 뒤에수가 제일 큰 수임으로 뽑아내기
    
    for key,value in total_date.items(): # 위에서 뽑아낸 제일 큰 수에 해당하는 value값 찾기
        if value == max_values:
            return key # 해당 value값 리턴.

    return max_revenue

    # 여기에 코드를 작성합니다.  

        
# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='utf-8')
    movies_list = json.load(movies_json)
    
    print(max_revenue(movies_list))
```

- 느낀점
    - for 함수 덕분에 코드를 짜면 노가다 안해도 된다
    - 파일을 타고 변수 찾아서 또 파일을 타고 변수를 저장하는 과정에서 집중력이 깨지면 꼬이는 느낌이 든다
    - dictionary 는 자료저장, 정리, 값 찾기 가 유용하다

## E번 문제

### 알고리즘을 사용한 데이터 출력

- **요구사항**
    - 반복문을 통해 movies 폴더 내부의 파일들을 오픈해야 합니다.
    개봉일이 12월인 영화들의 제목을 리스트로 출력하는 함수
    dec_movies를 완성합니다.
- 문제 접근방법
    - movies 파일에서 id 를 찾은 값으로 id폴더를 열고 그 폴더에 있는 데이터 중에 원하는 12월에 개봉한 영화만 찾기

```python
import json

def dec_movies(movies):
    total_date = {}
    for movie in movies_list: # movies_list 를 하나씩 돌기
        li_id = str(movie.get('id'))
        link = 'data/movies/'+ li_id +'.json' # 하나씩 id 값을 찾아서 파일 링크 만들기
        movies_li = json.load(open(link, encoding='utf-8')) # 위에서 만든 링크 변수사용해서 파일 열기
        
        total_date[movies_li.get('title')] = movies_li.get('release_date')[5:7] # 파일에서 원하는 값 가져와서 [key:value]로 만들기
    dec_movies=[] # 답을 모아줄 list 생성
    for key, val in total_date.items():
        if val == '12': # value값이 12인 값 찾기
            dec_movies.append(key) # 찾은 값 위에서 생성한 리스트에 넣기
    return dec_movies

    # 여기에 코드를 작성합니다.  
        

# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='utf-8')
    movies_list = json.load(movies_json)
    
    print(dec_movies(movies_list))
```

- 느낀점
    - 프로젝트하면 잘할꺼같다!!
    - 어렵지만 배운거를 잘 응용하면 원하는 결과값이 나와서 재밌다

## 후기

문제만 보는것에 비해 직접 해보니 감이 오는것같았다.

생각을 많이하게 되고, 배운것을 애매하게 알면 사용방법이 잘 떠오르지 않아 검색을 하여야 되서 앞으로 잘 익혀서 원하는데로 막 쓰도록 노력해봐야겠다.