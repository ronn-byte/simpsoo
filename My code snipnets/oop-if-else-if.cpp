#include <iostream>
#include <iomanip>
#include <string>

using namespace std;

struct Student {
    string name;
    string studentIDNo;
    float Marks;
    char Grade;
    string Description;
};

// Function to determine the grade
char determineGrade(float Marks) {
    if (Marks >= 70) {
        return 'A';
    } else if (Marks >= 60) {
        return 'B';
    } else if (Marks >= 50) {
        return 'C';
    } else if (Marks >= 40) {
        return 'D';
    } else if (Marks >= 1 && Marks < 40) {
        return 'E';
    }
    //if marks are out of expected range
       return 'F';
}

// Function to determine the description based on the grade
string determineDescription(char Grade) {
    if (Grade == 'A') {
        return "Distinction";
    } else if (Grade == 'B') {
        return "Very Good";
    } else if (Grade == 'C') {
        return "Good";
    } else if (Grade == 'D') {
        return "Pass";
    } else if (Grade == 'E'){
        return "Fail";
    }
    //if grade is out of expected range
    return "Invalid";
}

int main() {
    int numStudents;

    // Prompting user to input the number of students
    cout << "Enter the number of registered students who sat for the OOP exams: ";
    cin >> numStudents;

    // Creating a dynamic array of Student structures
    Student* students = new Student[numStudents];

    // Input student's data
    for (int i = 0; i < numStudents; ++i) {
        cout << "Enter the Student's name " << i + 1 << ": ";
        cin.ignore(); // To ignore any leftover newline character from previous input
        getline(cin, students[i].name);

        cout << "Enter the Student's registration number " << i + 1 << ": ";
        getline(cin, students[i].studentIDNo);

        cout << "Enter the Marks scored in the OOP Exams " << i + 1 << ": ";
        cin >> students[i].Marks;

        students[i].Grade = determineGrade(students[i].Marks);
        students[i].Description = determineDescription(students[i].Grade);
    }

    // Display the student's data in a table
    cout << "\n+-----------------+---------------------+-------+-------+-------------+\n";
    cout << "| Name             | Registration Number | Marks | Grade | Description |\n";
    cout << "+-----------------+---------------------+-------+-------+-------------+\n";
    for (int i = 0; i < numStudents; ++i) {
        cout << "| " << setw(15) << left << students[i].name
             << " | " << setw(19) << left << students[i].studentIDNo
             << " | " << setw(5) << left << students[i].Marks
             << " | " << setw(5) << left << students[i].Grade
             << " | " << setw(11) << left << students[i].Description << " |\n";
    }
    cout << "+-----------------+---------------------+-------+-------+-------------+\n";

    delete[] students;

    return 0;
}
