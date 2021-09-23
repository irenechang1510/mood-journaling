// var s = "";
// for (var i = 1; i <= numberOfItems; i++) {
//   var hexColour = rainbow.colourAt(i);
//   s += "#" + hexColour + ", ";
// }
function getColor(rainbow, results, index) {
  if (results.length > index) {
    var hexColour = rainbow.colourAt(Math.round(results[index] * 1000));
    s = "#" + hexColour;
    return s;
  } else {
    return "transparent";
  }
}
function draw(results) {
  var rainbow = new Rainbow();
  rainbow.setNumberRange(1, 1000);
  rainbow.setSpectrum("#192d5b", "#00743f", "#f1a104");
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext("2d");
  const d = addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  console.log(results.length);
  // block 1
  c.beginPath();
  c.moveTo(-Math.sqrt(110716) + 700, 522);
  c.bezierCurveTo(400, 420, 410, 450, 430, 390);
  c.bezierCurveTo(440, 390, 450, 380, 450, 450);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 0);
  c.fill();
  c.fillStyle = "black";
  c.fillText("1", 425, 440);
  c.stroke();

  // block 2
  c.beginPath();
  c.lineWidth = 1;
  c.moveTo(450, 450);
  c.arc(700, 300, 400, (Math.PI * 3) / 4, (Math.PI * 3.25) / 4, false);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 1);
  c.fill();
  c.fillStyle = "black";
  c.fillText("2", 420, 500);
  c.stroke();

  // block 3
  c.beginPath();
  c.moveTo(460, 581.75);
  c.lineTo(417, 582);
  c.lineTo(450, 450);
  c.quadraticCurveTo(455, 480, 470, 450);
  c.bezierCurveTo(485, 465, 490, 410, 500, 420);
  c.bezierCurveTo(540, 480, 500, 350, 550, 430);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 2);
  c.fill();
  c.fillStyle = "black";
  c.fillText("3", 480, 500);
  c.stroke();

  // block 4
  c.beginPath();
  c.arc(700, 300, 400, (Math.PI * 2.8) / 4, (Math.PI * 3) / 4, false);
  c.lineTo(590, 580);
  c.bezierCurveTo(595, 605, 600, 590, 610, 622);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 3);
  c.fill();
  c.fillStyle = "black";
  c.fillText("4", 500, 600);
  c.stroke();

  // block 5
  c.beginPath();
  c.moveTo(460, 581.5);
  c.lineTo(590, 580);
  c.bezierCurveTo(600, 520, 540, 500, 560, 470);
  c.lineTo(550, 430);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 4);
  c.fill();
  c.fillStyle = "black";
  c.fillText("5", 530, 530);
  c.stroke();

  //block 6
  c.beginPath();
  c.moveTo(630, 430);
  c.quadraticCurveTo(600, 500, 610, 622);
  c.bezierCurveTo(600, 590, 595, 605, 590, 580);
  c.bezierCurveTo(600, 520, 540, 500, 560, 470);
  c.lineTo(550, 430);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 5);
  c.fill();
  c.fillStyle = "black";
  c.fillText("6", 580, 500);
  c.stroke();

  // block 7
  c.beginPath();
  c.moveTo(660, 390);
  c.bezierCurveTo(670, 410, 690, 410, 700, 440);
  c.bezierCurveTo(580, 500, 650, 580, 610, 622);
  c.quadraticCurveTo(600, 500, 630, 430);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 6);
  c.fill();
  c.fillStyle = "black";
  c.fillText("7", 650, 450);
  c.stroke();

  // block 8
  c.beginPath();
  c.arc(700, 300, 400, (Math.PI * 2.5) / 4, (Math.PI * 2.8) / 4, false);
  c.lineTo(570, 622);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 7);
  c.fill();
  c.fillStyle = "black";
  c.fillText("8", 520, 650);
  c.stroke();

  // block 9
  c.beginPath();
  c.arc(700, 300, 400, (Math.PI * 2.5) / 4, (Math.PI * 2.4) / 4, true);
  c.bezierCurveTo(580, 650, 600, 650, 610, 622);
  c.lineTo(570, 622);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 8);
  c.fill();
  c.fillStyle = "black";
  c.fillText("9", 570, 650);
  c.stroke();

  // block 10
  c.beginPath();
  c.moveTo(630, 430);
  c.lineTo(550, 430);
  c.bezierCurveTo(560, 410, 570, 440, 580, 400);
  c.bezierCurveTo(600, 370, 610, 400, 620, 360);
  c.bezierCurveTo(640, 380, 650, 360, 660, 390);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 9);
  c.fill();
  c.fillStyle = "black";
  c.fillText("10", 620, 400);
  c.stroke();

  // block 11
  c.beginPath();
  c.moveTo(589, 230);
  c.quadraticCurveTo(559, 272, 550, 310);
  c.bezierCurveTo(580, 330, 550, 320, 620, 360);
  c.quadraticCurveTo(628, 370, 640, 370);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 10);
  c.fill();
  c.fillStyle = "black";
  c.fillText("11", 580, 320);
  c.stroke();

  // block 12
  c.beginPath();
  c.moveTo(615, 300);
  c.lineTo(665, 200);
  c.bezierCurveTo(650, 220, 660, 170, 650, 180);
  c.bezierCurveTo(635, 190, 655, 170, 623, 190);
  c.lineTo(589, 230);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 11);
  c.fill();
  c.fillStyle = "black";
  c.fillText("12", 610, 250);
  c.stroke();

  // block 13
  c.beginPath();
  c.moveTo(615, 300);
  c.lineTo(665, 200);
  c.bezierCurveTo(670, 220, 680, 160, 690, 180);
  c.lineTo(640, 370);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 12);
  c.fill();
  c.fillStyle = "black";
  c.fillText("13", 630, 310);
  c.stroke();

  // block 14
  c.beginPath();
  c.moveTo(665, 275);
  c.lineTo(690, 180);
  c.quadraticCurveTo(693, 180, 698, 175);
  c.lineTo(730, 320);
  c.lineTo(687, 380);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 13);
  c.fill();
  c.fillStyle = "black";
  c.fillText("14", 690, 300);
  c.stroke();

  // block 15
  c.beginPath();
  c.moveTo(640, 370);
  c.quadraticCurveTo(658, 373, 660, 390);
  c.bezierCurveTo(670, 410, 690, 410, 700, 440);
  c.lineTo(665, 275);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 14);
  c.fill();
  c.fillStyle = "black";
  c.fillText("15", 660, 360);
  c.stroke();

  // block 16
  c.beginPath();
  c.moveTo(700, 440);
  c.bezierCurveTo(775, 410, 740, 365, 770, 340);
  c.lineTo(687, 380);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 15);
  c.fill();
  c.fillStyle = "black";
  c.fillText("16", 720, 400);
  c.stroke();

  // block 17
  c.beginPath();
  c.moveTo(730, 320);
  c.lineTo(698, 175);
  c.lineTo(715, 178);
  c.bezierCurveTo(730, 178, 730, 150, 740, 160);
  c.bezierCurveTo(755, 220, 725, 190, 745, 250);
  c.lineTo(760, 279);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 16);
  c.fill();
  c.fillStyle = "black";
  c.fillText("17", 730, 270);
  c.stroke();

  // block 18
  c.beginPath();
  c.moveTo(745, 250);
  c.bezierCurveTo(725, 190, 755, 220, 740, 160);
  c.bezierCurveTo(760, 200, 760, 163, 771, 165);
  c.bezierCurveTo(780, 190, 775, 220, 799, 249);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 17);
  c.fill();
  c.fillStyle = "black";
  c.fillText("18", 750, 230);
  c.stroke();

  // block 19
  c.beginPath();
  c.moveTo(687, 380);
  c.lineTo(760, 279);
  c.lineTo(770, 340);
  c.closePath();
  c.fillStyle = "black";
  c.fillText("19", 740, 340);
  c.fillStyle = getColor(rainbow, results, 18);
  c.fill();
  c.stroke();

  // block 20
  c.beginPath();
  c.moveTo(745, 250);
  c.lineTo(799, 249);
  c.bezierCurveTo(805, 253, 814, 278, 830, 280);
  c.quadraticCurveTo(775, 325, 770, 340);
  c.lineTo(760, 279);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 19);
  c.fill();
  c.fillStyle = "black";
  c.fillText("20", 780, 300);
  c.stroke();

  // block 21
  c.beginPath();
  c.arc(700, 300, 400, (Math.PI * 2.1) / 4, (Math.PI * 2.4) / 4, false);
  c.bezierCurveTo(580, 650, 600, 650, 610, 622);
  c.bezierCurveTo(630, 606, 625, 540, 625, 540);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 20);
  c.fill();
  c.fillStyle = "black";
  c.fillText("21", 620, 650);
  c.stroke();

  // block 22
  c.beginPath();
  c.moveTo(625, 540);
  c.quadraticCurveTo(622, 480, 700, 440);
  c.lineTo(669, 700);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 21);
  c.fill();
  c.fillStyle = "black";
  c.fillText("22", 650, 570);
  c.stroke();

  // block 23
  c.beginPath();
  c.arc(700, 300, 400, (Math.PI * 1.9) / 4, (Math.PI * 2.1) / 4, false);
  c.lineTo(693, 500);
  c.lineTo(740, 475);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 22);
  c.fill();
  c.fillStyle = "black";
  c.fillText("23", 700, 600);
  c.stroke();

  // block 24
  c.beginPath();
  c.moveTo(890, 550);
  c.lineTo(740, 475);
  c.lineTo(731, 700);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 23);
  c.fill();
  c.fillStyle = "black";
  c.fillText("24", 780, 570);
  c.stroke();

  // block 25
  c.beginPath();
  c.moveTo(890, 550);
  c.lineTo(740, 475);
  c.lineTo(820, 435);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 24);
  c.fill();
  c.fillStyle = "black";
  c.fillText("25", 800, 490);
  c.stroke();

  // block 26
  c.beginPath();
  c.arc(700, 300, 400, (Math.PI * 1.2) / 4, (Math.PI * 1.9) / 4, false);
  c.lineTo(890, 550);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 25);
  c.fill();
  c.fillStyle = "black";
  c.fillText("26", 850, 650);
  c.stroke();

  // block 27
  c.beginPath();
  c.moveTo(820, 435);
  c.lineTo(935.5, 625);
  c.lineTo(900, 470);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 26);
  c.fill();
  c.fillStyle = "black";
  c.fillText("27", 880, 500);
  c.stroke();

  // block 28
  c.beginPath();
  c.arc(700, 300, 400, (Math.PI * 0.85) / 4, (Math.PI * 1.2) / 4, false);
  c.lineTo(900, 470);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 27);
  c.fill();
  c.fillStyle = "black";
  c.fillText("28", 940, 550);
  c.stroke();

  // block 29
  c.beginPath();
  c.arc(700, 300, 400, (Math.PI * 0.6) / 4, (Math.PI * 0.85) / 4, false);
  c.lineTo(900, 470);
  c.lineTo(1030, 440);
  c.quadraticCurveTo(1060, 450, Math.sqrt(127239) + 700, 480);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 28);
  c.fill();
  c.fillStyle = "black";
  c.fillText("29", 980, 500);
  c.stroke();

  // block 30
  c.beginPath();
  c.moveTo(820, 435);
  c.lineTo(693, 500);
  c.lineTo(700, 440);
  c.quadraticCurveTo(747, 417, 748, 400);
  c.bezierCurveTo(780, 420, 750, 365, 780, 350);
  c.bezierCurveTo(800, 390, 810, 330, 820, 360);
  c.bezierCurveTo(818, 380, 830, 350, 835, 370);
  c.bezierCurveTo(843, 380, 848, 365, 850, 380);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 29);
  c.fill();
  c.fillStyle = "black";
  c.fillText("30", 930, 450);
  c.stroke();

  // block 31
  c.beginPath();
  c.moveTo(850, 380);
  c.bezierCurveTo(870, 450, 870, 390, 890, 420);
  c.bezierCurveTo(920, 450, 890, 340, 962, 400);
  c.quadraticCurveTo(999, 432, 1030, 440);
  c.lineTo(900, 470);
  c.lineTo(820, 435);
  c.closePath();
  c.fillStyle = getColor(rainbow, results, 30);
  c.fill();
  c.fillStyle = "black";
  c.fillText("31", 770, 430);
  c.stroke();

  // ice block
  c.beginPath();
  c.moveTo(430, 390);
  c.bezierCurveTo(440, 390, 450, 380, 450, 450);
  c.quadraticCurveTo(455, 480, 470, 450);
  c.bezierCurveTo(485, 465, 490, 410, 500, 420);
  c.bezierCurveTo(540, 480, 500, 350, 550, 430);
  c.bezierCurveTo(560, 410, 570, 440, 580, 400);
  c.bezierCurveTo(600, 370, 610, 400, 620, 360);
  c.bezierCurveTo(550, 320, 580, 330, 550, 310);
  c.quadraticCurveTo(520, 280, 510, 290);
  c.bezierCurveTo(490, 320, 490, 290, 465, 320);
  c.bezierCurveTo(450, 360, 435, 360, 430, 390);
  c.closePath();
  c.fillStyle = "#b4c9d6";
  c.fill();
  c.stroke();

  // ice block
  c.beginPath();
  c.moveTo(748, 400);
  c.bezierCurveTo(780, 420, 750, 365, 780, 350);
  c.bezierCurveTo(800, 390, 810, 330, 820, 360);
  c.bezierCurveTo(818, 380, 830, 350, 835, 370);
  c.bezierCurveTo(843, 380, 848, 365, 850, 380);
  c.bezierCurveTo(870, 450, 870, 390, 890, 420);
  c.bezierCurveTo(920, 450, 890, 340, 962, 400);
  c.bezierCurveTo(917, 350, 919, 350, 880, 290);
  c.quadraticCurveTo(850, 240, 830, 280);
  c.bezierCurveTo(756, 338, 758, 360, 750, 400);
  c.closePath();
  c.fillStyle = "#b4c9d6";
  c.fill();
  c.stroke();

  // ice block
  c.beginPath();
  c.moveTo(623, 190);
  c.bezierCurveTo(655, 170, 635, 190, 650, 180);
  c.bezierCurveTo(660, 170, 650, 220, 665, 200);
  c.bezierCurveTo(670, 220, 680, 160, 690, 180);
  c.quadraticCurveTo(693, 180, 698, 175);
  c.lineTo(715, 178);
  c.bezierCurveTo(730, 178, 730, 150, 740, 160);
  c.bezierCurveTo(760, 200, 760, 163, 771, 165);
  c.quadraticCurveTo(762, 128, 720, 90);
  c.quadraticCurveTo(705, 70, 700, 90);
  c.bezierCurveTo(690, 120, 660, 75, 650, 150);
  c.quadraticCurveTo(641, 170, 623, 190);
  c.closePath();
  c.fillStyle = "#b4c9d6";
  c.fill();
  c.stroke();

  // base outline of the mountain
  c.beginPath();
  c.lineWidth = 3;
  c.strokeStyle = "black";
  c.arc(700, 300, 400, (Math.PI * 0.6) / 4, (Math.PI * 3.25) / 4, false);
  c.bezierCurveTo(400, 420, 410, 450, 430, 390);
  c.bezierCurveTo(435, 360, 450, 360, 465, 320);
  c.bezierCurveTo(490, 290, 490, 320, 510, 290);
  c.quadraticCurveTo(520, 280, 550, 310);
  c.bezierCurveTo(580, 210, 630, 200, 650, 150);
  c.bezierCurveTo(660, 75, 690, 120, 700, 90);
  c.quadraticCurveTo(705, 70, 720, 90);
  c.bezierCurveTo(800, 160, 760, 210, 800, 250);
  c.bezierCurveTo(805, 255, 815, 280, 830, 280);
  c.quadraticCurveTo(850, 240, 880, 290);
  c.bezierCurveTo(890, 300, 950, 420, 1030, 440);
  c.quadraticCurveTo(1060, 450, Math.sqrt(127239) + 700, 480);
  c.closePath();
  c.stroke();

  //sub-mountain
  c.beginPath();
  c.lineWidth = 3;
  c.strokeStyle = "black";
  c.arc(700, 300, 400, (Math.PI * 0.6) / 4, (Math.PI * 2.4) / 4, false);
  c.bezierCurveTo(580, 650, 600, 650, 610, 622);
  c.bezierCurveTo(650, 580, 580, 500, 700, 440);
  c.bezierCurveTo(800, 390, 700, 380, 830, 280);
  c.stroke();

  // sub-mountain
  c.beginPath();
  c.lineWidth = 3;
  c.strokeStyle = "black";
  c.moveTo(550, 310);
  // 3 beizer curve
  c.bezierCurveTo(580, 330, 550, 320, 620, 360);
  c.bezierCurveTo(640, 380, 650, 360, 660, 390);
  c.bezierCurveTo(670, 410, 690, 410, 700, 440);
  c.stroke();
}
// includeJs("rainbowvis.js");
