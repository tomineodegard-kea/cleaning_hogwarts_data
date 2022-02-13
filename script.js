"use strict";

let students;
const allStudents = [];

window.addEventListener("DOMContentLoaded", getJson);

// MVC: Controller
async function getJson() {
  // API url
  const url = "https://petlatkea.dk/2021/hogwarts/students.json";
  let data = await fetch(url);
  students = await data.json();

  createStudents();
}

// MVC: Model
function createStudents() {
  students.forEach((object) => {
    const Student = {
      firstName: "",
      lastName: "",
      middleName: "",
      nickName: "",
      image: "",
      house: "",
    };

    // create a objects from a prototype
    const studentInfo = Object.create(Student);

    // ----- First name -----
    // Trim objects for whitespace
    let originalName = object.fullname.trim();
    //Find first name in string
    if (originalName.includes(" ")) {
      studentInfo.firstName = originalName.substring(originalName.indexOf(0), originalName.indexOf(" "));
    } else {
      studentInfo.firstName = originalName.substring(originalName.indexOf(0));
    }
    studentInfo.firstName = studentInfo.firstName.substring(0, 1).toUpperCase() + studentInfo.firstName.substring(1).toLowerCase();

    //----- Middle name -----
    //Find the middle name (if any)
    studentInfo.middleName = originalName.substring(originalName.indexOf(" ") + 1, originalName.lastIndexOf(" "));
    //Change to upper- and lower case
    studentInfo.middleName = studentInfo.middleName.substring(0, 1).toUpperCase() + studentInfo.middleName.substring(1).toLowerCase();

    //----- Nick name -----
    //Find the nick name (if any)
    if (originalName.includes('"')) {
      studentInfo.middleName = undefined;
      studentInfo.nickName = originalName.substring(originalName.indexOf('"') + 1, originalName.lastIndexOf('"'));
    }

    // ----- Last name -----
    //Find last name in string
    if (originalName.includes(" ")) {
      studentInfo.lastName = originalName.substring(originalName.lastIndexOf(" ") + 1);
      //Change to upper- and lower case
      studentInfo.lastName = studentInfo.lastName.substring(0, 1).toUpperCase() + studentInfo.lastName.substring(1).toLowerCase();
    }

    // ----- House -----
    //Trim objects
    let originalHouse = object.house.trim();
    //Find the name of the house
    studentInfo.house = originalHouse;
    //Change to upper- and lower case
    studentInfo.house = studentInfo.house.substring(0, 1).toUpperCase() + studentInfo.house.substring(1).toLowerCase();

    // // ----- Image -----
    //Find the right image
    let studentPicture = new Image();
    studentPicture.scr = "images/" + studentInfo.lastName + ".png";
    studentInfo.image = studentPicture.scr;

    allStudents.push(studentInfo);
  });
  showAllStudents();
}

// MVC: View
function showAllStudents() {
  console.table(allStudents);
}
