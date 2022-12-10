function createEmployeeRecord(array) {
    const employee = {};
    employee.firstName = array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee
}

function createEmployeeRecords(arrayArray) {
    const employees = [];
    for (const element of arrayArray) {
        let record = createEmployeeRecord(element)
        employees.push(record)
    }
    return employees
}

function createTimeInEvent(timeInStamp) {
    let timeIn = {
        type: 'TimeIn',
        hour: Number(timeInStamp.substring(11, 15)),
        date: timeInStamp.substring(0, 10)
    };
    this.timeInEvents.push(timeIn);
    return this;
}

function createTimeOutEvent(timeOutStamp) {
    let timeOut = {
        type: 'TimeOut',
        hour: Number(timeOutStamp.substring(11, 15)),
        date: timeOutStamp.substring(0, 10)
    };
    this.timeOutEvents.push(timeOut);
    return this;
}

function hoursWorkedOnDate(formDate) {
    const timeInArray = this.timeInEvents;
    const timeOutArray = this.timeOutEvents;
    for (let i = 0; i < timeInArray.length; i++) {
        if (timeInArray[i].date === formDate) {
            let timeIn = timeInArray[i].hour
            for (let x = 0; x < timeOutArray.length; x++) {
                if (timeOutArray[x].date === formDate) {
                    return (timeOutArray[x].hour - timeIn)/100
                }
            }
        }
    }
}

function wagesEarnedOnDate(formDate) {
    const wages = hoursWorkedOnDate.call(this, formDate) * this.payPerHour;
    return wages;
}

function findEmployeeByFirstName(records, searchTerm) {
    for (let i = 0; i < records.length; i++) {
        if (records[i].firstName = searchTerm) {
            return records[i];
        } 
    }
}

function calculatePayroll(employeeRecords) {
    let payroll = 0;
        for (let i = 0; i < employeeRecords.length; i++) {
            payroll += allWagesFor.call(employeeRecords[i])
        }
    return payroll;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

