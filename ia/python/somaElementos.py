n = int(input())
lista = []
lista = (input().split())
if n == len(lista):
    soma = 0
    for i in range(len(lista)):
        lista[i] = int(lista[i])
        soma += lista[i]
    print(soma)


