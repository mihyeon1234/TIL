class Queue:
    # n : queue의 사이즈
    def __init__(self, n):
        # 사이즈 선언 ex) q = Queue(3) 이되면 n = 3
        self.size = n
        self.items = [None] * n # 미리 들어갈 메모리를 잡아놔야됨
        self.front = -1 # 마지막으로 꺼낸위치
        self.rear = -1 # 마지막으로 저장된위치

    # item : queue에 들어갈 데이터 ex) q.enQueue(1) 이되면 item = 1
    def enQueue(self, item):
        if self.isFull():
            print('큐가 가득찼어')
        else:
            self.rear += 1
            self.items[self.rear] = item # raar를 증가시킨 위치에 받은 데이터를 저잘해

    # 삭제하는거(젤 앞에있는것부터)
    def deQueue(self):
        if self.isEmpty():
            print('큐가 비었음') # 디버깅
        else:
            self.front += 1
            # item = self.items[self.front]
            # self.item
            # return


    # 비었는지 확인
    def isEmpty(self):
        # return self.front == self.rear (한줄로도 가능)
        if self.front == self.rear:
            return True
        else:
            return False

    # 가득찼는지 확인
    def isFull(self):
        # return self.rear == self.size - 1 (한줄로도 가능)
        if self.rear == self.size - 1:
            return True
        else:
            return False

    def Qpeek(self):
        return self.items[self.front]


q = Queue(3)
q.enQueue(1)
q.enQueue(2)
q.enQueue(3)
print(q.items) # [1,2,3]

print(q.deQueue()) # 1
print(q.items) # [None, 2, 3]
print(q.deQueue()) # 2
print(q.items) # [None, None, 3]
print(q.deQueue()) # 3
print(q.items) # [None, None, None]

