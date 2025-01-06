#include <stdio.h>
#include <cs50.h>

int main()
    {
      int i;
  do{
      i = get_int ("Height: ");
     }
   while (i < 1 || i > 8);
  for (int j = 1; j <= i; j++)
  {
  for (int k = 1; k<=j; k++)
     {
  printf ("#");
      }
      printf("\n");
    }
    }
