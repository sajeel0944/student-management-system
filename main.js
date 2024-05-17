#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.yellow("=").repeat(41));
console.log(chalk.magentaBright.bgBlue.bold("wellcome to SUK Student Management System"));
console.log(chalk.yellow("=".repeat(41)));
class student {
    static counter = 400000;
    id;
    name;
    course;
    balance;
    subject_fees;
    constructor(name) {
        this.id = student.counter++ + 74356, student.counter++ * 3;
        this.name = name;
        this.course = [];
        this.balance = 0;
        this.subject_fees = ["Typescript = $25 per month fees",
            "Python = $32 per month fees",
            "CSS = $18 per month fees",
            "C/C++ = $19 per month fees",
            "SQL = $22 per month fees\n"
        ];
    }
    async enroll_course(course) {
        this.course.push(course);
    }
    view_course() {
        console.log(chalk.blueBright("\nFive languages in this course \n"));
        this.subject_fees.forEach(view => console.log(`${chalk.magentaBright(view)}`));
    }
    pay_fees(amount) {
        this.balance = amount;
        console.log(chalk.blueBright(`\nfees paid successfully for ${chalk.greenBright(this.name)}`));
        console.log(chalk.blueBright(`Your fees amount is $${chalk.greenBright(this.balance)}\n`));
    }
    show_status() {
        console.log(chalk.blueBright(`\nID : ${chalk.yellowBright(this.id)}`));
        console.log(chalk.blueBright(`Name : ${chalk.yellowBright(this.name)}`));
        console.log(chalk.blueBright(`course : ${chalk.yellowBright(this.course)}`));
        console.log(chalk.blueBright(`Balance : $${chalk.yellowBright(this.balance)}\n`));
    }
}
class student_manage {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student_1 = new student(name);
        this.students.push(student_1);
        console.log(chalk.blueBright(`\nstudent: ${chalk.redBright(name)} added successfully student ID : ${chalk.redBright(student_1.id)}\n`));
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
    enroll_student_course(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
        }
    }
    view_course_name(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_course();
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.blueBright("student not found. enter correct ID"));
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
}
async function main() {
    console.log(chalk.blueBright("wellcome to SUK student management system"));
}
let student_manages = new student_manage();
while (true) {
    let choice = await inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: chalk.yellow("select option"),
            choices: ["Add Student",
                "View course",
                "Select course",
                "Pay Fees",
                "Show Status",
                "Exit"
            ]
        }
    ]);
    switch (choice.choice) {
        case "Add Student":
            let name_input = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: chalk.blue("Enter a student name")
                }
            ]);
            student_manages.add_student(name_input.name);
            break;
        case "Select course":
            let course_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: chalk.blue("Enter a student ID"),
                },
                {
                    name: "courses",
                    message: chalk.blue("select your course"),
                    type: "list",
                    choices: [
                        "Typescript",
                        "Python",
                        "CSS",
                        "C/C++",
                        "SQL"
                    ]
                },
            ]);
            console.log("\n");
            student_manages.enroll_student_course(course_input.student_id, course_input.courses); //
            break;
        case "View course":
            let balance_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: chalk.blue("Enter a student ID")
                }
            ]);
            student_manages.view_course_name(balance_input.student_id);
            break;
        case "Pay Fees":
            let fees = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: chalk.blue("Enter a student ID")
                },
                {
                    name: "amount",
                    type: "number",
                    message: chalk.blue("Enter your amount to pay fees"),
                }
            ]);
            student_manages.pay_student_fees(fees.student_id, fees.amount);
            break;
        case "Show Status":
            let status = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: chalk.blue("Enter a student ID")
                }
            ]);
            student_manages.show_student_status(status.student_id);
            break;
        case "Exit":
            console.log("Exit");
            process.exit();
    }
}
main();
