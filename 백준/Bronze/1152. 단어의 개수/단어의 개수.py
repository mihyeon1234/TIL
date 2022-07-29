a = input()
if a !=' ':
    b = a.strip().count(' ')
    print(b+1)
elif a == ' ':
    print(0)