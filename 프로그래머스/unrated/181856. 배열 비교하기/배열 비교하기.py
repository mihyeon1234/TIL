def solution(arr1, arr2):
    if len(arr1) != len(arr2):
        if len(arr1)>len(arr2):
            return 1
        if len(arr1)<len(arr2):
            return -1
    else:
        if sum(arr1) > sum(arr2):
            return 1
        elif sum(arr1) == sum(arr2):
            return 0
        else:
            return -1

