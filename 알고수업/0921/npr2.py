# 재귀호출을 통한 순열 생성 방법
def f(i, k):
    if i == k:          # 인덱스 n이 원소의 개수
        print(p)
    else:
        for j in range(i, k):
            p[i], p[j] = p[j], p[i]
            f(i+1, k)
            p[i], p[j] = p[j], p[i] # 원상복구

p = [1,2,3,4,5]
f(0,5)