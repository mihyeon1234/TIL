m = int(input())
li = list(map(int, input().split()))
su = 0
for i in li:
    su += i/max(li)*100
print(su/len(li))