st = input()
se = set(st.upper())
li=dict()

for i in se:
    li[i]=st.upper().count(i)
if len([key for key, value in li.items() if value == (max(li.values()))]) >=2:
    print('?')
else:
    print([key for key, value in li.items() if value == (max(li.values()))][0])