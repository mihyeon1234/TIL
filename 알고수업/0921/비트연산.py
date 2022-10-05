# 비트연산
arr = [1,2,3]
result = []
for i in range(1, 1<<len(arr)):     #공집합 제외
  subset = []
  for j in range(len(arr)):
    if i & (1<<j):
      subset.append(arr[j])
  result.append(subset)
print(result)

# 단순 for 에 for
arr = [1, 2, 3]
subsets = [[]]

for num in arr:
  size = len(subsets)
  for y in range(size):
    subsets.append(subsets[y]+[num])
print(subsets)



