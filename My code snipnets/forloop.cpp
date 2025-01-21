#include <iostream>
 using namespace std;
  
   int main () {
  //first 10 positive integers
int sum = 0;
int  n = 10;
  // calculate the sum of the first 10 integers
for ( int i = 1; i <= 10; ++i) {
    sum += i;
}
  double average = static_cast<double>(sum)/n;
  cout << "Sum of the first 10 positive integers = " << sum << endl;
  cout << "Average of the first 10 positive integers = " << average << endl;

return 0;
   }