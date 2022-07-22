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
