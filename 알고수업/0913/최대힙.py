# 최대 힙

def enq(n):
    global last
    last += 1       # 마지막 정점 추가
    heap[last] = n  # 마지막 정점에 key 추가
    c = last
    p = c // 2      # 완전이진트리에서 부모 정점 번호

    # 부모가 있고 부모 < 자식 인경우 자리 교환
    while p and heap[p] < heap[c]:
        heap[p], heap[c] = heap[c], heap[p]
        c = p
        p = c // 2


heap = [0] * 100
last = 0

enq(2)
enq(5)
print()
