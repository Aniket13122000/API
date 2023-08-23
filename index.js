// Create a basic endpoints using node. use the following schema for same.

// 1) Create a API to filter by department.
// 2) Create a API to sort by salary.
// 3) Create a API to search by employee_id.

// {
// employee_id:'123'
// first_name:"xyz",
// last_name:"xyz",
// department:"IT",
// Address:"xyz",
// hire_date:"01-02-2023",
// dob:"01-02-2012",
// joiningDate:"20-02-2023",
// salary:'123'
// }

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000; // You can change the port if needed

// Sample data
const employees = [
  {
    employee_id: '123',
    first_name: 'xyz',
    last_name: 'xyz',
    department: 'IT',
    Address: 'xyz',
    hire_date: '01-02-2023',
    dob: '01-02-2012',
    joiningDate: '20-02-2023',
    salary: '123',
  },{
    employee_id: '321',
    first_name: 'erf',
    last_name: 'erg',
    department: 'Market',
    Address: 'xyz',
    hire_date: '01-02-2023',
    dob: '01-02-2012',
    joiningDate: '20-02-2023',
    salary: '123',
  },{
    employee_id: '654',
    first_name: 'sdfsdf',
    last_name: 'sdfdfv',
    department: 'Support',
    Address: 'xyz',
    hire_date: '01-02-2023',
    dob: '01-02-2012',
    joiningDate: '20-02-2023',
    salary: '123',
  },
  // Add more employee objects here
];

app.use(bodyParser.json());

// API to filter by department
app.get('/filter/:department', (req, res) => {
  const department = req.params.department;
  const filteredEmployees = employees.filter(employee => employee.department === department);
  res.json(filteredEmployees);
});

// API to sort by salary
app.get('/sort/salary', (req, res) => {
  const sortedEmployees = employees.slice().sort((a, b) => a.salary - b.salary);
  res.json(sortedEmployees);
});

// API to search by employee_id
app.get('/search/:employee_id', (req, res) => {
  const employee_id = req.params.employee_id;
  const employee = employees.find(employee => employee.employee_id === employee_id);
  
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
