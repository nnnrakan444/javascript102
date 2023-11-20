class Vehicle 
{
  constructor(name,company, ID) 
  {
      this.name = name;
      company =company;
      this.ID = ID;
  }
}

class Car extends Vehicle 
{
  constructor(name,company, ID, carType) 
  {
      super(name,company, ID);
      this.carType = carType;
  }
}

class Plane extends Vehicle 
{
  constructor(name,company, ID, planeType) 
  {
      super(name,company, ID);
      this.planeType = planeType;
  }
}

class Employee 
{
  constructor(name, ID, dateOfBirth) 
  {
      this.name = name;
      this.ID = ID;
      this.dateOfBirth = dateOfBirth;
  }
}

class Driver extends Employee 
{
  constructor(name, ID, dateOfBirth, driverLicenseID) 
  {
      super(name, ID, dateOfBirth);
      this.driverLicenseID = driverLicenseID;
  }
}

class Pilot extends Employee 
{
  constructor(name, ID, dateOfBirth, pilotLicenseID)
  {
      super(name, ID, dateOfBirth);
      this.pilotLicenseID = pilotLicenseID;
  }
}

class Reservation 
{
  constructor(reservationID, employeeID, vehicleID, reservationDate) 
  {
      this.reservationID = reservationID;
      this.employeeID = employeeID;
      this.vehicleID = vehicleID;
      this.reservationDate = reservationDate;
  }
}

const car1 = new Car("Didsan", "nissan", "C001", "gas");
const car2 = new Car("Altima ", "nissan", "C002", "electric");
const car3 = new Car("Z370", "nissan", "C003", "gas");

const plane1 = new Plane("airbus a380", "Airbus", "P001", "jet");
const plane2 = new Plane("antonov A225", "Antonov", "P002", "jet");

const driver1 = new Driver("Rakan N", "D001", "1998/05/15", "DL001");
const pilot1 = new Pilot("Ahmed N", "P001", "2002/08/20", "PL001");

const vehicles = [car1, car2, car3, plane1, plane2];
const employees = [driver1, pilot1];

const reservations = [];

function makeReservation(employeeID, vehicleID) 
{
  const employee = employees.find(e => e.ID === employeeID);
  const vehicle = vehicles.find(v => v.ID === vehicleID);

  if (!employee || !vehicle) 
  {
      console.log("Error: Employee or vehicle not found.");
      return;
  }

  if ((employee instanceof Pilot && vehicle instanceof Car) || (employee instanceof Driver && vehicle instanceof Plane)) 
  {
      console.log("Error: Employee type does not match vehicle type.");
      return;
  }

  const reservation = new Reservation
  (
      generateID(),
      employee.ID,
      vehicle.ID,
      new Date().toLocaleDateString()
  );

  reservations.push(reservation);
  console.log("Reservation created:", reservation);
}

function generateID() 
{
  return Math.random().toString(36).substr(2, 9);
}


makeReservation(pilot1.ID, car1.ID); 
makeReservation(driver1.ID, plane1.ID); 
makeReservation(pilot1.ID, plane1.ID); 


const reservationDetails = reservations.map(reservation => ({
  reservationID: reservation.reservationID,
  employeeName: employees.find(e => e.ID === reservation.employeeID).name,
  vehicleName: vehicles.find(v => v.ID === reservation.vehicleID).name,
  reservationDate: reservation.reservationDate,
}));

console.log("Reservations:", reservationDetails);