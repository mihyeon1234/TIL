n=0
while n < 3:
    print(n)
    n += 1


dust=[58,40,70,60,120,54,23,50]
num = 0

for dus in dust:
    num +=1
    if dus>150:
        print('매우나쁨',dus)
    elif dus >80:
        print('나쁨',dus)
    elif dus >30:
        print('보통',dus)
    else: 
        print("좋음",dus)
    
