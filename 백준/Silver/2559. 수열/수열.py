from sys import stdin
input = stdin.readline

m, n = map(int, input().split())
li = list(map(int, input().split()))
# sum(li[i:i+n])으로 할라니까 시간초과뜸
# 그래서 re라는 누적값 들어간 새로운 배열로 만들어줌
re = [0]
co = 0
for i in li:
    co += i
    re.append(co)

# rre라는 새로운 배열에는 n개의 누적합만으로 이뤄진 배열로 만듬
rre=[]
for i in range(m-n+1):
    rre.append(re[i+n] - re[i])

print(max(rre))
