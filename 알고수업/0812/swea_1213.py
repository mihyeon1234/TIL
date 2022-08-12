import sys
sys.stdin = open('swea_1213.txt','rt', encoding='UTF8')

for i in range(10):
    num = int(input())
    find_text = input()
    text = input()
    a =text.count(find_text)
    print(f'#{i+1} {a}')


