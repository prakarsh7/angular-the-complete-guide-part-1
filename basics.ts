// Basics of Typescript - Section 34 

// Primitives: number, string, booleans, null, undefined
// More complex: arrays, objects
// Function Types, parameters

// Primitives
let age: number = 29;
age = 's'; // Error

let firstName: string;
firstName = 'Prakarsh'

let isAdult: boolean;
isAdult = true;

//More complex
let hobbies: string[];
hobbies = ['music', 'ukulele']
hobbies = ['music', 'ukulele', 12]; // Error

hobbies = 'abc'; // Error

let person: {
    name: string,
    age: number,
    isAdult: boolean
}; // object

person = {
    name: 'Prakarsh',
    age: 23,
    isAdult: true
};

person = {
    name: 'Prakarsh',
    age: 23,
}; // Error

person = {
    isEmployee: true,
}; // Error

// Array of Objects
let people: {
    name: string,
    age: number,
    isAdult: boolean
}[];

people = [
    {
        name: 'Prakarsh',
        age: 23,
        isAdult: true,
    },
    {
        name: 'Radhika',
        age: 24,
        isAdult: true
    }
];

// Type Inference
let course = 'React'; // TS automatically assigns type 'string' to course var.
let platform: string = 'Udemy'; // redundant, do not need to specify type if we are already defining the variable.
course = 123; // Error

// Union Type - allowing variable to have more than one type

let employeeCode: string | number = 12;
employeeCode = 'C1209'
employeeCode = 1092;

// Type Aliases - only a feature of TS, not in JS
// The keyword 'type' is only available in TS, so at the time of compiling, this statement is removed in the .js file and definition is copied wherever we use the alias (or type name)

type Employee = {
    name: string,
    age: number,
    employeeCode: string | number
};

let employeeList: Employee[];

// Functions and Function Types

function multiply(a: number, b: number) {
    return a * b;
} // Return type is inferred as number

function getEmployeeWithCode(code: string | number) { // inferred return type is Employee
    return employeeList.find((employee) => employee.employeeCode == code);
}

function print(value: any) { // inferred return type is void
    console.log("Printing Statement: ", value);
}

// Generics (only in TS)

function insertAtBeginning(array: any[], value: any) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -2); // inferred return type is any[]

// If this updated array is string[] then the below line will work fine, but if it is a number[] (as in our case) the below line will throw runtime error
updatedArray[0].split('');
// This the reason we use Generics

function insertAtBeginningGeneric<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}
const demoArrayGeneric = [1, 2, 3];
const updatedArrayGeneric = insertAtBeginningGeneric(demoArray, -2);
updatedArrayGeneric[0].split(''); // Now we see a compilation error

const demoArrayStringGeneric = ['abc', '2', 'something'];
const updatedArrayStringGeneric = insertAtBeginningGeneric(demoArrayStringGeneric, 2); // Error because 2 is not a string
const updatedArrayStringGeneric1 = insertAtBeginningGeneric(demoArrayStringGeneric, 'name');
updatedArrayStringGeneric1[0].split('');

// Classes (also in modern JS)

class Student {
    firstName: string;
    lastName: string;
    age: number;
    private courses: string[];

    constructor(first: string, lastName: string, age: number, courses: string[]) {
        firstName = first;
        this.lastName = lastName;
        this.age = age;
        this.courses = courses;
    }

    // Same constructor & properties can be written with short-hand notation as:
    // constructor(
    //     public firstName: string, // Assign modifier as needed for each property, it is important to specif even public if you want to define it as property
    //     public lastName: string, 
    //     public age: number, 
    //     private courses: string[]
    // ) {}

    enroll(courseName: string) {
        this.courses.push(courseName);
    }

    listCourses() {
        return this.courses.slice(); // slice will return a copy of courses array
    }
}

const student = new Student('Luke', 'Dunphy', 21, ['React', 'Angular']);
student.enroll('TS');
student.enroll('JS');
console.log(student.courses); // Error because of modifier
student.listCourses();

// Interfaces (only in TS, not in Vanilla JS)

interface Human {
    name: string;
    age: number;

    greet: () => void;
}

let max: Human;

max = 12; // Error
max = { // Error
    name: 'Max Schitts',
    age: 20
}

max = {
    name: 'Max Schitts',
    age: 20,
    greet() {
        console.log('Hello!');
    },
}

class Instructor implements Human {
    name: string;
    age: number;
    // greet: () => void; // Allowed
    greet() {
        console.log('Hello!');
    }
}