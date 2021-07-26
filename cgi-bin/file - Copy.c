#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include <time.h>
#include <linux/limits.h>

const char *delim = "|";

void ReadFile(unsigned char *filePath)
{
    struct stat st;
    int exist = stat(filePath, &st);

    if (exist == 0)
    {
        int size = st.st_size;
        unsigned char *buff = malloc(size);
        FILE *fp = fopen(filePath, "r");
        if (fp)
        {
            fread(buff, size, 1, fp);

            for (int i = 0; i < size; ++i)
            {
                printf("%c", buff[i]);
            }
            fclose(fp);
        }
        free(buff);
    }
}

void GetFileInfo(unsigned char *filePath)
{
    struct stat st;
    int exist = stat(filePath, &st);

    if (exist == 0)
    {
        printf("%d", S_ISDIR(st.st_mode));
        printf("%s",delim);
        printf("%d", S_ISREG(st.st_mode));
        printf("%s",delim);
        printf("%s", ctime(&st.st_mtime));
    }
}

void WriteFile(unsigned char *filePath, unsigned char *Content)
{
    FILE *fp = fopen(filePath, "w");

    // fwrite(Content, 229, 1, fp);

    fputs(Content, fp);
    fclose(fp);
}

void ListFilesName(const unsigned char *folderpath, unsigned char *output)
{
    struct stat st;
    int exist = stat(folderpath, &st);

    if (exist == 0)
    {
        DIR *d;
        struct dirent *dir;
        d = opendir(folderpath);
        if (d)
        {
            while ((dir = readdir(d)) != NULL)
            {
                printf("%s\n", dir->d_name);
            }
            closedir(d);
        }
    }
}

void DeleteFile(unsigned char *filePath)
{
    remove(filePath);
}

void RenameFile(unsigned char *filePath, unsigned char *newName)
{
    rename(filePath, newName);
}

void GetAbsPath(unsigned char *filePath)
{
    unsigned char abs_path[PATH_MAX];
    realpath(filePath, abs_path);
    printf("%s", abs_path);
}

int main()
{
    printf("Content-Type: text/plain\n\n");

    unsigned char *str_len_ = getenv("CONTENT_LENGTH");
    int len = strtol(str_len_, NULL, 10);

    unsigned char *query = malloc(len + 1);
    unsigned char *buf = malloc(len + 1);

    if (!query || !buf)
    {
        exit(EXIT_FAILURE);
    }

    while (fgets(buf, len + 1, stdin))
    {
        strcat(query, buf);
    }

    if (strlen(query) != 0)
    {
        unsigned char *token = strtok(query, delim);
        if (token)
        {
            if (strcmp("read", token) == 0)
            {
                token = strtok(NULL, delim);
                if (token)
                {
                    ReadFile(token);
                }
            }
            else if (strcmp("write", token) == 0)
            {
                unsigned char filePath[PATH_MAX] = {0};
                token = strtok(NULL, delim);
                strcpy(filePath, token);
                token = strtok(NULL, delim);
                WriteFile(filePath, token);
            }
            else if (strcmp("list", token) == 0)
            {
                unsigned char folderPath[100] = {0};
                token = strtok(NULL, delim);
                strcpy(folderPath, token);
                token = strtok(NULL, delim);
                ListFilesName(folderPath, token);
            }
            else if (strcmp("info", token) == 0)
            {
                token = strtok(NULL, delim);
                if (token)
                {
                    GetFileInfo(token);
                }
            }
            else if (strcmp("delete", token) == 0)
            {
                token = strtok(NULL, delim);
                if (token)
                {
                    DeleteFile(token);
                }
            }
            else if (strcmp("rename", token) == 0)
            {
                unsigned char filePath[PATH_MAX] = {0};
                token = strtok(NULL, delim);
                strcpy(filePath, token);
                token = strtok(NULL, delim);
                RenameFile(filePath, token);
            }
            else if (strcmp("path", token) == 0)
            {
                token = strtok(NULL, delim);
                if (token)
                {
                    GetAbsPath(token);
                }
            }
        }
    }

    free(query);
    free(buf);
}
