import sys
sys.stdin = open('p1.txt')

t = int(input())

for tt in range(t):


    #방법 1
    text = input()
    print(f'{tt+1} {text[::-1]}')

    #방법 2
    text = input()
    text.reverse()
    print(''.join(text))

    #방법 3
    text = input()
    li=[]
    for i in range(1,len(text)+1):
        li.append(text[-i])
    print(''.join(li))

    #방법 4
    text = list(input())
    for i in range(len(text)//2):
        text[i],text[-i-1] = text[-i-1],text[i]
    print(''.join(text))

    #팰린드롬
    text = input()
    if text==text[::-1]:
        print(True)
    else:
        print(False)

    #len사용 안하고 \0나오기 전까지의 문자열 수 세기
    a = ['a', 'b', 'c', '\0']

    def strlen(a):
        co = 0
        while a[co]!= '\0':
            co+=1

        return(co)

    print(strlen(a))
