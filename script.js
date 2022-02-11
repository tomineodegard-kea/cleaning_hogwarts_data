"use strict";

let students;
const allStudents = [];

window.addEventListener("DOMContentLoaded", getJson);

async function getJson() {
  const url = "https://petlatkea.dk/2021/hogwarts/students.json";
  let data = await fetch(url);
  students = await data.json();

  console.table(students);
  prepareObjects();
}

function prepareObjects() {
  students.forEach((object) => {
    const Student = {
      firstName: "",
      lastName: "",
      middleName: "",
      nickName: "",
      image: "",
      house: "",
    };
    const studentInfo = Object.create(Student);
  });
}
