#include <stdio.h>

int pot(int base, int exp){
    int res = 1;
    int i;
    for (i = 0; i < exp; i++){
        res = res * base;
    }
    return res;
}
int fat(int n){
    int i;
    int res = 1;
    if(n == 0){
        return 1;
    }
    if(n > 0){
        for(i = 1; i <= n; i++){
            res = res * i;
        }
        return res;
    } else{
        return -1;
    }

}
int main(void){
    int base, expoente, num;
    scanf("%d %d", &base, &expoente);
    int resultado = pot(base,expoente );
    printf("resultado: %d\n", resultado);
    scanf("%d", &num);
    printf("%d\n", fat(num));
    return 0;
}
