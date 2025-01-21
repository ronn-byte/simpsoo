#include <iostream>
using namespace std;

  int main() {
     int sum = 0;
     int n = 10;
     int i = 1;
  while (i <= n )
   {
sum += i;
 ++i;
  }
  double average = static_cast<double>(sum) / n ;
  cout << "Sum of the First 10 positive integers = " << sum << endl;
  cout << "Average of the First 10 positive integers = " << average << endl;

  return 0;
 }
  