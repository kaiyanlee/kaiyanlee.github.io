// Copyright (c) 2022 Kaiyan M. Lee
//
// This website is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License v3.0.

var correctAnswer = 0;

function evaluate(fn) {
  return new Function("return " + fn)();
}

async function generateCaptcha() {
  const a = Math.floor(Math.random() * 12);
  const b = Math.floor(Math.random() * 12);

  var canvas = document.getElementById("captcha-question");
  var ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.font = "16px Arial";
  ctx.textAlign = "center";

  var expr = `${a} + ${b}`;
  correctAnswer = evaluate(expr);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(`${expr} = ?`, canvas.width / 2, canvas.height / 2);

  canvas.style.display = "block";
}

function decodeb64(element) {
  element.textContent = atob(atob(element.textContent));
}

function verifyCaptcha() {
  var answer = document.getElementById("captcha-answer").value;

  if (answer != correctAnswer) {
    window.open("https://www.mathsisfun.com/numbers/addition.html", "_blank");
    generateCaptcha();
    return;
  }

  var captcha = document.getElementById("captcha-container");
  captcha.style.visibility = "hidden";
  captcha.style.display = "none";

  var contact = document.getElementById("contact-container");
  contact.style.visibility = "visible";
  contact.style.display = "flex";

  decodeb64(document.getElementById("contact-email"));
  decodeb64(document.getElementById("contact-address"));
  decodeb64(document.getElementById("contact-phone"));

  document.getElementById("contact-form").action = `mailto:${document.getElementById("contact-email").textContent}`;
}

generateCaptcha();
