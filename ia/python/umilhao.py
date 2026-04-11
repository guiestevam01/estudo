n = int(input())
conjunto = []
soma = 0
dias = -1
for i in range(n):
    conjunto.append(input())
    soma += int(conjunto[i])
    if(soma >= 1000000 and dias == -1):
        dias = i + 1
print(dias)
