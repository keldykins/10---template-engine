const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function addManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the manager's name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager's id?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the manager's office number?",
      },
    ])
    .then(function (response) {
      const manager = new Manager(
        response.managerName,
        response.managerId,
        response.managerEmail,
        response.managerOfficeNumber
      );
      employees.push(manager);
      engineerOrIntern();
    });
}
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the engineer's name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the engineer's id?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineer's email?",
      },
      {
        type: "input",
        name: "engineerOfficeNumber",
        message: "What is the engineer's GitHub Account Username?",
      },
    ])
    .then(function (response) {
      const engineer = new Engineer(
        response.engineerName,
        response.engineerId,
        response.engineerEmail,
        response.engineerOfficeNumber
      );

      employees.push(engineer);
      addAnother();
    });
}
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the intern's name?",
      },
      {
        type: "input",
        name: "internId",
        message: "What is the intern's id?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the intern's email?",
      },
      {
        type: "input",
        name: "internOfficeNumber",
        message: "What school is the intern currently enrolled in?",
      },
    ])
    .then(function (response) {
      const intern = new Intern(
        response.internName,
        response.internId,
        response.internEmail,
        response.internOfficeNumber
      );

      employees.push(intern);
      addAnother();
    });
}

function addAnother() {
  inquirer
    .prompt({
      type: "confirm",
      name: "addAnother",
      message: "would you like to add another employee?",
    })
    .then(function (response) {
      console.log(response);
      // if they say yes to the above question, ask them do you want to add an engineer or intern
      if (response.addAnother === true) {
        engineerOrIntern();
      } else {
        // if they say no, build team
        buildTeam();
      }
    });
}

function engineerOrIntern() {
  inquirer
    .prompt({
      type: "list",
      name: "engineerOrIntern",
      message: "would you like to add an engineer or an intern?",
      choices: ["engineer?", "intern?"],
    })
    .then(function (response) {
      console.log(response);
      console.log(response.engineerOrIntern);
      if (response.engineerOrIntern === "engineer?") {
        addEngineer();
      } else if (response.engineerOrIntern === "intern?") {
        addIntern();
      }
    });
}

function buildTeam() {
  const html = render(employees);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFile(outputPath, html, "utf-8", function (err) {
    if (err) throw err;
    console.log("success");
  });
}

addManager();
// First ask them the manager's name, id, email, and office number
// Then ask them if they want to add an employee
// If they say yes, ask them do you want to add an engineer or an intern
// If they want to add an engineer, ask them their name, id, email, and github
// If they want to add an intern, ask them their name, id, email, and school
// If they say no, build your team and send them to the htmlRenderer file using render from line 11

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
