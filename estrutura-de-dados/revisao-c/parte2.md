minha cpu é intel então ela usa little endian.
O menor byte é salvo primeiro então o 10 seria | 0a | 00 | 00  | 00 |

Quando char str[100] significa que reservo um espaco em memoria de 100 * sizeof(char)

Na heap seria:
    char *str = malloc (100 * sizeof(char));
    ...
    free(str);
    return 0;
