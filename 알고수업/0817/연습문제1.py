stack = []

def push(item):
    stack.append(item)
    return

def pop():
    po = stack.pop()
    print(po)
    return
push(1)
push(1)
push(1)
pop()
pop()
pop()
