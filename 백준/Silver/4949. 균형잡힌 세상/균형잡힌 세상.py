while True:
    text = list(input())
    if text == ['.']:
        break
    else:
        stack = []
        re = True
        for i in text:
            if i == '.':
                break
            if i == '(' or i == '[':
                stack.append(i)

            elif i == ')':
                if stack:
                    a = stack.pop()
                    if a == '(':
                        re = True
                    else:
                        re = False
                        break
                else:
                    re = False
                    break
            elif i == ']':
                if stack:
                    a = stack.pop()
                    if a == '[':
                        re = True
                    else:
                        re = False
                        break
                else:
                    re = False
                    break
        if stack:
            re = False

        if re==True:
            print('yes')

        else:
            print('no')
