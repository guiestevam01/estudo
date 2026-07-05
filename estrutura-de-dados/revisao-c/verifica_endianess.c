#include <stdio.h>

int main(void){
    int i = 10;
    printf("Int: %lu byte\n", sizeof(i));
    char *p = (char *)&i;
    for(int k = 0; k < sizeof(int); k++){
        printf("%02x ", (unsigned char)*p);
        p++;
    }
    return 0;
}
