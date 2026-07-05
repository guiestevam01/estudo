#include <stdio.h>

int str(char c[]){
    char *p = c;
    int i = 0;
    while(*p != '\0'){
        i++;
        p++;
    }
    return i;
}

int main(){
    char str_t[10] = "Brasil";
    printf("%d", str(str_t)); 
}

