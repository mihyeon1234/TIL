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
