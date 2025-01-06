#include <cs50.h>
#include <stdio.h>

int main()
{
    printf("hello, world\n");
    string name = get_string("What is your name? \n");
    printf("hello, %s \n", name);
return 0;
}
