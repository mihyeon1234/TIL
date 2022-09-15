import sys
input = sys.stdin.readline
n, k = map(int,input().split())
circle = [x for x in range(1,n+1)]
removed = []
now = k-1
while circle:
    removed.append(circle.pop(now))
    if circle:
        # k번째의 숫자를 하나씩 빼면 인덱스도 하나씩 줄어들기 때문에
        # k를 더한 후 1을 빼줌
        # 인덱스 범위가 벗어나지 않도록 리스트 전체길이로 나누값 사용
        now = ((now-1) + k) % len(circle)
print(f'<{", ".join(map(str,removed))}>')
