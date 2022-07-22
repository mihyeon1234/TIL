import json
from pprint import pprint


def movie_info(movie, genres):
    genre_ids = movie.get('genre_ids') # genre_ids 값만 따로 불러옴
    genre_names=list() # 해당 값을 넣을 리스트 생성
    for ids in genre_ids: 
        for j in genres_list: #  이중 for 문 돌리면서 id가 일치하는 것 만 찾기
            if j['id'] == ids:
                genre_names.append(j['name']) # 같은 id 에 해당하는 name값을 리스트에 추가하기
    
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
