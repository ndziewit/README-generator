const fs = require("fs");
const inquirer = require("inquirer");

const questions = [
{
    type: "input",
    message: "What's the title of the project you're making this README for?",
    name: "title"
},
{
    type: "input",
    message: "Enter the description of your project",
    name: "description"
},
{
    type: "list",
    message: "Do you want to include a table of contents?",
    name: "tableofcontents",
    choices: ['Yes','No']
},
{
    type: "input",
    message: "Enter installation instructions",
    name: "installation"
},
{
    type: "input",
    message: "Describe this application's usage",
    name: "usage"
},
{
    type: "input",
    message: "Enter the contribution guidelines",
    name: "contrib"
},
{
    type: "list",
    message: "Choose what license you're using",
    name: "license",
    choices:['APACHE 2.0','BSD 3','GPL 3.0','MIT','None']
},
{
    type: "input",
    message: "Enter this application's test instructions",
    name: "tests"
},
{
    type: "input",
    message: "Please enter your Github username",
    name: "username"
},
{
    type: "input",
    message: "Now let's have your email",
    name: "email"
},
{
    type: "list",
    message: "Your README is now generated! Hit enter to end the program",
    name: "goodbye",
    choices: ["This README generator was created by Nicholas Dziewit nicholas.dziewit@gmail.com"]
}
];

function runProgram() {
    inquirer
    .prompt(questions)
    .then( response => writeToFile("README.md", response))
}

function writeToFile(fileName, data) {
    let {username, email, title, description, tableofcontents, installation, usage, contrib, license, tests} = data;
    let fileData = `# ${title} \n${description} \n\n`;
    let titles = ['Installation','Usage','Contributions','Tests'];
    let options = [installation, usage, contrib, tests];
    if(tableofcontents === 'Yes'){
        fileData += "## Table of Contents\n";
        titles.forEach((x,index) => {
            if(options[index].length >= 1){
                fileData += `* [${x}](#${x.toLowerCase()}) \n`;
            }
        })
        fileData += '* [Questions](#questions) \n';
    }
    fileData += '\n';
    for(let i = 0; i < options.length; i++){
        (options[i].length > 0) ? fileData += `## ${titles[i]}\n${options[i]}\n\n` : null;
    }
    fileData += `## License\n`;
    switch(license) {
        case 'APACHE 2.0':
            fileData += '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n\n';
            break;
        case 'BSD 3':
            fileData += '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)\n\n';
            break;
        case 'GPL 3.0':
            fileData += '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n\n';
            break;      
        case 'MIT':
          fileData += '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n';
          break;
        default:
      }
        fileData += "## Questions: https://github.com/";
        fileData += `${username}\n`;
        fileData += `Email: ${email}\n`;

    fs.writeFile(fileName, fileData, function(err){
        if(err){
            console.log(err)
        }
    })
}

runProgram();