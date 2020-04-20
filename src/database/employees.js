let employees = [];

// const employee = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   manager: false,
//   password: "",
//   pinNumber: 0,
//   phoneNumber: "",
//   hireDate: null,
//   position: "",
//   payRate: 0,
//   pto: 0,
//   ptoRemaining: 0
// }

function getOne(employeeId) {
  return employees.filter((emp) => emp.id === employeeId)[0] || null;
}

function getAll(page, perPage = 10) {
  const startIdx = (page - 1) * perPage;
  const endIdx = startIdx + perPage;
  const pages = Math.ceil(employees.length / perPage);

  return {
    employees: employees.slice(startIdx, endIdx),
    pages,
  };
}

function post(employee = {}) {
  employees.push({
    id: post.getNextId(),
    ...employee,
  });
}

post.nextId = 1;
post.getNextId = () => post.nextId++;

function remove(employeeId) {
  employees = employees.filter((emp) => emp.id !== employeeId);
}

function update(employee) {
  const found = employees.filter((emp) => emp.id === employee.id);

  if (!found) return;

  for (let key in employee) {
    found[key] = employee[key];
  }
}

export default {
  getOne,
  getAll,
  post,
  update,
  remove,
  employees,
};
