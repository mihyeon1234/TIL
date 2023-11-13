def solution(arr, k):
    answer=[]
    [answer.append(x) for x in arr if x not in answer]
    
    
    if len(answer) >= k:
        return answer[:k]
    else:
        return (answer + [-1]*k)[:k]