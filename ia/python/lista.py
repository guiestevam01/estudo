lista = [1,3.2,"ola"]
lista.append(9) 
print(lista)
print(lista[2])
lista[2] = "mudei"
print(lista[2])
print(lista)
lista.insert(2, "novo elemento")
print(lista)
print("##########repeticao##########")
for i in [1,2,3]:
    print(lista[i])

for i in range(0,5):
    lista.append(i)
    print(lista[i])

print(lista)

x = [1,2,3,4]
sums = 0
for i in range(0,len(x)):
    sums += x[i]
    print(x[i])

print(sums)
