```html
{% extends 'base.html' %}

{% block content %}
  <p class="main_title">Movies</p>
  {% for movie in movies %}
  {% if movie.overview %}
  <div class='card'>
    <a class='title' href="{% url 'movies:detail' movie.pk %}">{{ movie.title }}</a><br>
    <div class="box">
      <div class="left_box">
        <a href="{% url 'movies:detail' movie.pk %}">
          <img src="{{movie.poster_path}}" alt="" class='img'>
        </a>
        <p class='score'>
          평점: {{movie.vote_average}}
        </p>
      </div>
      <div class="right_box">
        {{movie.overview}}
      </div>
    </div>
  </div>
  {% endif %}
  
<style>
  .main_title{
    font-size:35px;
    font-weight: bold;
  }
  .box{
    display:flex;
  }
  .img {
    width: 200px;
  }
  .img:hover {
    width:300px;
    transition: all 0.8s;
  }
  .card{
    margin-bottom: 10px;
    padding: 10px;
  }
  .title{
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    color:gray;
  }
  .title:hover {
    font-size: 40px;
    font-weight: bold;
    text-decoration: none;
    color:black;
  }
  .score{
    margin-top: 10px;
    font-weight: bold;
  }
  .left_box{
  }
  .right_box{
    padding:15px;
  }
</style>
  {% endfor %}
{% endblock %}

```



index.html



장고 때와 다름 없어서 상대적으로 쉬운 편이었다.

미현이가 예쁘게 잘 만들어줬다.





```python
@require_POST
def follow(request, user_pk):
    if request.user.is_authenticated:
        User = get_user_model()
        me = request.user
        you = User.objects.get(pk=user_pk)
        if me != you:
            if you.followers.filter(pk=me.pk).exists():
                you.followers.remove(me)
                is_followed = False
            else:
                you.followers.add(me)
                is_followed = True
            context = {
                'is_followed': is_followed,
                'followers_count': you.followers.count(),
                'followings_count': you.followings.count(),
            }
            return JsonResponse(context)
        return redirect('accounts:profile', you.username)
    return redirect('accounts:login')


```



views의 follow함수

유저가 로그인 되어있는지 확인한다.

me(로그인한 사람)와 you(팔로우 대상)을 구분한다.

me와 you가 동일하면 작동하지 않도록 한다. (html에서도 가려놨지만 만약을 대비)

서로 다르다면 exists를 이용하여, 팔로우 되어있는지 확인한 다음 상태를 토글해준다.

json만 보내서 새로고침되지 않도록 한다.



```html

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    const form = document.querySelector('#follow-form')
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
    
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      // console.log(event.target.dataset)
      
      const userId = event.target.dataset.userId
    
      axios({
        method: 'post',
        url: `/accounts/${userId}/follow/`,
        headers: {'X-CSRFToken': csrftoken,}
      })
        .then((response) => {
          // console.log(response)
          // console.log(response.data)
    
          // 버튼 토글
          const isFollowed = response.data.is_followed
          const followBtn = document.querySelector('#follow-form > input[type=submit]')
          
          if (isFollowed === true) {
            followBtn.value = '언팔로우'
          } else {
            followBtn.value = '팔로우'
          }
    
          // 팔로우, 팔로워 인원 수 
          const followersCountTag = document.querySelector('#followers-count')
          const followingsCountTag = document.querySelector('#followings-count')
          const followersCount = response.data.followers_count
          const followingsCount = response.data.followings_count
          followersCountTag.innerText = followersCount
          followingsCountTag.innerText = followingsCount
        })
        .catch((error) => {
          console.log(error.response)
        })
    })
  </script>
```



이벤트를 요청하여 팔로우 관련 데이터를 받아온다.





```python
movies.views
# Create your views here.
@require_safe
def index(request):
    movies = Movie.objects.all()
    context = {
        'movies': movies,
    }
    return render(request, 'movies/index.html', context)


@require_safe
def detail(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    context = {
       'movie': movie,
    }
    return render(request,'movies/detail.html', context)
    pass



@require_safe
def recommended(request):
    movies = random.sample(list(Movie.objects.all()),10)
    print(movies)
    context = {
       'movies': movies,
    }

    return render(request, 'movies/recommended.html', context)
    pass
```

장고와 동일해서 처리하기 쉬웠다.

recommended는 랜덤으로 추출하였습니다.

html은 index와 동일하게 작성





느낀점 - 미현

프로젝트를 점점 더 업그레이드 시켜 가는데 작동이 잘 되는것을 보니 자신감이 생긴다.

개인 프로젝트도 진행하면 잘 할수 있을꺼같다고 생각되고,

시간이 되면 css 나 세부적으로 더 꾸미고, 기능을 추가해보고 싶다(검색 기능 등)




