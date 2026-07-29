#include <stdio.h>

int main(void){
    char str[10] = "Brasil";
    unsigned char *p = (unsigned char *) str;
    for(size_t k = 0; k < sizeof(str); k++){
        printf("%02x ", p[k]);
    }
    printf("\n");
    return 0;
}
