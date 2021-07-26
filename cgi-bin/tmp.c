#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include <time.h>
#include <linux/limits.h>

int main()
{
    printf("Content-Type: text/plain\n\n");

    unsigned char *str_len_ = getenv("CONTENT_LENGTH");
    int halfbytelen = strtol(str_len_, NULL, 10);
    int len = halfbytelen/2;

    unsigned char *halfbytequery = malloc(halfbytelen + 1);
    unsigned char *query = malloc(len + 1);

    if (!halfbytequery || !query)
    {
        exit(EXIT_FAILURE);
    }

    fread(halfbytequery, halfbytelen, 1, stdin);

    unsigned char tmp = 0;
    for (int i = 0; i < len; ++i)
    {
        tmp = 0;

        tmp = tmp | halfbytequery[i * 2];
        tmp = tmp << 4;
        tmp = tmp | halfbytequery[i * 2 + 1];

        query[i] = tmp;

        // printf("%02x ",tmp);
    }

    for (int i = 0; i < len; ++i)
    {
        printf("%02x ",query[i]);
    }

    printf("\n%d\n", len);

    free(halfbytequery);
    free(query);
}
