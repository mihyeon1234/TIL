import sys
sys.stdin = open('swea_1234.txt')

for tt in range(10):
    num, sli = map(str, input().split())
    li=list(sli)
    while True:
        for i in range(1, len(li)):
            if li[i-1] == li[i]:
                del li[i]
                del li[i-1]
                break
        else:
            print(f"#{tt+1} {''.join(li)}")
            break