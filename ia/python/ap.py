A, B = input().split()
A = float(A)
B = float(B)
media =(A + B) / 2
if media >= 7:
    print("Aprovado")
elif media < 7 and media >= 4:
    print("Recuperacao")
else:
    print("Reprovado")
