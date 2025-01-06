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
    } else {
        return 'E';
    }
}

// Function to determine the description based on the grade using switch
string determineDescription(char Grade) {
    switch (Grade) {
        case 'A': return "Distinction";
        case 'B': return "Very Good";
        case 'C': return "Good";
        case 'D': return "Pass";
        case 'E': return "Fail";
        default: return "Unknown";
    }
}

int main(void) {
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
    cout << "\n+-----------------+------------+-------+-------+-------------+\n";
    cout << "| Name            | Registration Number| Marks | Grade | Description |\n";
    cout << "+-----------------+------------+-------+-------+-------------+\n";
    for (int i = 0; i < numStudents; ++i) {
        cout << "| " << setw(15) << left << students[i].name
             << " | " << setw(18) << left << students[i].studentIDNo
             << " | " << setw(5) << left << students[i].Marks
             << " | " << setw(5) << left << students[i].Grade
             << " | " << setw(11) << left << students[i].Description << " |\n";
    }
    cout << "+-----------------+------------+-------+-------+-------------+\n";

    delete[] students;

    
}
