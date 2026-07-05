#include <stdio.h>
#include <string.h>
char* strcpyi(char str[], char dest[]){
    int i = 0;
    char *p = dest; 
    while (*p != '\0'){
        str[i] = dest[i];
        i++;
        p++;
    }
    return dest;
}
int main(){
    char str_o[100] = "origem";
    char str_d[100] = "destino";
    strcpyi(str_o, str_d);
    //strcpy(str_o, str_d);
    printf("origem: %s\n", str_o);
    printf("destino: %s\n", str_d);
}
