from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from books.serializers import BookListSerializer, BookSerializer, CommentSerializer
from books.models import Book, Comment

@api_view(['GET', 'POST'])
def book_list(request):
    # Q 1.
    if request.method == 'GET':
        books = get_list_or_404(Book) # 모든 데이터 불러오기
        serializer = BookListSerializer(books, many=True) 
        return Response(serializer.data)
    
    # Q 2.
    elif request.method == 'POST':
        serializer = BookListSerializer(data=request.data)
        if serializer.is_valid():       # 유효성 검사
            serializer.save()           # 통과 되면 저장
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def book_detail(request, book_pk):
    # Q 3.
    if request.method == 'GET':
        books = get_object_or_404(Book, pk=book_pk)  # url 에서 받은 book_pk가 pk이면
        serializer = BookSerializer(books)      # 해당 게시물 불러오기
        return Response(serializer.data)
    # Q 4.
    elif request.method == 'DELETE':
        book = get_object_or_404(Book, pk=book_pk)  # url 에서 받은 book_pk가 pk이면
        book.delete()       # 해당 책 게시물 삭제
        return Response(status=status.HTTP_204_NO_CONTENT)
    # Q 5.

    elif request.method == 'PUT':
        book = get_object_or_404(Book, pk=book_pk) 
        serializer = BookSerializer(book, data=request.data)  
        if serializer.is_valid():   # 유효성 검사
            serializer.save()   # 되면 저장
            return Response(serializer.data)


@api_view(['GET'])
def comment_list(request):
    # Q 7.
    comment = Comment.objects.all()
    serializer = CommentSerializer(comment, many=True) 
    return Response(serializer.data)

@api_view(['POST'])
def comment_create(request, book_pk):
    # Q 8.
    book = get_object_or_404(Book, pk=book_pk) 
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(book=book)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'DELETE'])
def comment_detail(request, comment_pk):
    # Q 9.
    if request.method == 'GET':
        comment = get_object_or_404(Comment, pk=comment_pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    
    # Q 10.
    if request.method == 'DELETE':
        comment = get_object_or_404(Comment, pk=comment_pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

