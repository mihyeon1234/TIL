def solution(names):
    answer = []
    if len(names)<5:
        return [names[0]]
    else:
        for i in range(1,len(names)+1,5):
            answer.append(names[i-1])
        return answer