num = input()
ti = 0
for i in num:
    if i in ['A' , 'B' , 'C']:
        ti += 3
    elif i in ['D' , 'E' , 'F']:
        ti += 4
    elif i in ['G' , 'H' , 'I']:
        ti += 5
    elif i in ['J' , 'K' , 'L']:
        ti += 6
    elif i in ['M' , 'N' , 'O']:
        ti += 7
    elif i in ['P' , 'Q' , 'R' , 'S']:
        ti += 8
    elif i in ['T' , 'U' , 'V']:
        ti += 9
    elif i in ['W' , 'X' , 'Y' , 'Z']:
        ti += 10
print(ti)   