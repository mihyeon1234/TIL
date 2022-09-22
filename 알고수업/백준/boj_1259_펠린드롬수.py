while True:
    arr = list(input())
    if arr == ['0']:
        break
    else:
        if arr == arr[::-1]:
            print('yes')
        else:
            print('no')