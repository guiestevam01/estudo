#include <stdio.h>

int main(void) {
    char str[10] = "Brasil";

    unsigned char *p = (unsigned char *)str;

    for (int k = 0; k < sizeof(str); k++) {
        printf("byte %d: |%02x| caractere: |%c|\n", k, p[k], p[k]);
    }

    return 0;
}
