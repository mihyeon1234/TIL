
t = int(input())
li=["ZRO ", "ONE ", "TWO ", "THR ", "FOR ", "FIV ", "SIX ", "SVN ", "EGT ", "NIN "]

for tt in range(t):
    num = input()
    text = input()
    print(f'#{tt + 1}')

    for i in li:
        a = text.count(i)
        print(i*a)
