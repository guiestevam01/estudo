#include <stdio.h>

int main(void){
    int i = 10;
    unsigned char *ci = (unsigned char *)&i;
    for(int z = 0; z < sizeof(i); z++){
        printf("|%02x ", ci[z]);
    }
    printf("\n");
    int *p = &i;
    unsigned char *c = (unsigned char *)&p;

    for (int k = 0; k < sizeof(p); k++) {
        printf("|%02x ", c[k]);
    }
}
