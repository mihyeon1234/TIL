t = int(input())
mem_list=[]
for i in range(t):
    key, val = map(str,input().split())
    mem_list.append([int(key), val])
mem_lists = sorted(mem_list, key=lambda x: x[0])


for i in mem_lists:
    print(i[0], i[1])