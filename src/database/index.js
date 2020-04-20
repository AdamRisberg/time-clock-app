import faker from "faker";

import hours from "./hours";
import employees from "./employees";

for (let i = 0; i < 20; i++) {
  const pto = faker.random.number(20);

  employees.post({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    manage: false,
    password: faker.internet.password(),
    pinNumber: faker.random.number({ min: 1000, max: 9999 }),
    phoneNumber: faker.phone.phoneNumber(faker.phone.phoneNumberFormat(0)),
    hireDate: faker.date.past(10),
    position: "",
    payRate: faker.random.number({ min: 12, max: 20 }),
    pto: pto,
    ptoRemaining: faker.random.number({ min: 0, max: pto }),
  });
}

for (let emp of employees.employees) {
  hours.clockIn(
    emp.id,
    `${emp.firstName} ${emp.lastName}`,
    new Date(2020, 4, 12, 9, faker.random.number(5))
  );
  hours.clockOut(emp.id, new Date(2020, 4, 12, 17, faker.random.number(5)));
}

for (let emp of employees.employees) {
  hours.clockIn(
    emp.id,
    `${emp.firstName} ${emp.lastName}`,
    new Date(2020, 5, 12, 9, faker.random.number(5))
  );
  hours.clockOut(emp.id, new Date(2020, 5, 12, 17, faker.random.number(5)));
}

export default {
  hours,
  employees,
};
