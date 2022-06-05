/* Your Code Here */


const createEmployeeRecord = (recArray) => {
    return {
        firstName: recArray[0],
        familyName: recArray[1],
        title: recArray[2],
        payPerHour: recArray[3],
        timeInEvents: [],
        timeOutEvents: []

     }
}


const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(dateStamp) {
    const date = dateStamp.split(" ")[0];
    const time = dateStamp.split(" ")[1];
    const timeInEntry = {
      type: "TimeIn",
      hour: parseInt(time),
      date: date
    }
    this.timeInEvents.push(timeInEntry);
    return this;
  }

  function createTimeOutEvent(dateStamp) {
    const date = dateStamp.split(" ")[0];
    const time = dateStamp.split(" ")[1];
    const timeOutEntry = {
      type: "TimeOut",
      hour: parseInt(time),
      date: date
    }
    this.timeOutEvents.push(timeOutEntry);
    return this;
  }

  const hoursWorkedOnDate = function(targetDate){
    const inEvent = this.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = this.timeOutEvents.find(outEvent => outEvent.date === targetDate )

    return (outEvent.hour - inEvent.hour) / 100
  }

  const wagesEarnedOnDate = function(targetDate){
      return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
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

const findEmployeeByFirstName = function(sourceArray, firstName){
    return sourceArray.find(rec => rec.firstName === firstName)

}

const calculatePayroll = function(recordsArray){
    return recordsArray.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}