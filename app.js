const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const team = [];


const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Please enter employee's name.",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Employee name cannot be empty."
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "id",
        message: "Please enter employee's ID number. ",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Employee ID cannot be empty."
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "Please enter employee's email address.",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Employee email cannot be empty."
            } else {
                return true;
            }
        }
    },
    {
        type: "list",
        name: "role",
        message: "Please select employee's role.",
        choices: ["manager", "engineer", "intern"]
    }
];


employeeFunc = (name, id, email, role) => {
    if(role === "manager") {
        return new Manager(name, id, email, "");
    } else if (role === "engineer") {
        return new Engineer(name, id, email, "");
    } else {
        return new Intern(name, id, email, "");
    }
};


writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        console.log(err);
    })
    console.log("Team made successfully!")
}


createTeam = async() => {
    let addEmployee = true
    console.log("Team builder running! Answer following questions:");
    while(addEmployee){
        await inquirer.prompt(employeeQuestions).then(async answers => {
            let employee = employeeFunc(answers.name, answers.id, answers.email, answers.role);
            await employee.employeeQuestions();
            team.push(employee);
        });

        await inquirer.prompt(
            {
                type: "confirm",
                name: "addEmployee",
                message: "Would you like to add another employee?"
            }
        ).then(answers => {
            addEmployee = answers.addEmployee;
        });
    }

    const output = render(team);
    writeToFile(outputPath, output);
}


createTeam(); // Execute main program function

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
