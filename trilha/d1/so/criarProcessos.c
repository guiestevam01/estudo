#include <stdio.h>
#include <unistd.h>

int main() {
    printf("pid do processo atual(futuro pai): %d\n", getpid());
    pid_t pid = fork();

    if (pid < 0) {
        perror("fork failed");
    } else if (pid == 0) {
        printf("Filho: meu PID é %d, meu pai é %d\n", getpid(), getppid());
    } else {
        printf("Pai: eu criei um PID:  %d\n", pid);
    }

    return 0;
}
