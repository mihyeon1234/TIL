def solution(numbers, n):
    answer = 0
    for i in numbers:
        if answer <= n:
            answer +=i
        if answer > n:
            return answer