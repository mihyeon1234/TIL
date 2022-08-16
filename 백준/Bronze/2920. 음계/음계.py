num = list(input().split())
renum = ['8', '7', '6', '5', '4', '3', '2', '1']
if num == renum :
    print('descending')
elif num == renum[::-1]:
    print('ascending')
else:
    print('mixed')