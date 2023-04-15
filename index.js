const environment = document.querySelector(".environment");
const figure1_right_arm = document.querySelector("#figure1 .left_arm");
const figure2_left_arm = document.querySelector(".figure2 .left_arm2");
const player_1 = document.querySelector(".p1");
const player_2 = document.querySelector(".p2");
const weapon1 = document.querySelector(".weapon");

const figure_1 = document.querySelector("#figure1");
const head1 = document.querySelector(".head");
const figure_2 = document.querySelector(".figure2");
const head2 = document.querySelector(".head2");

const p1_health = document.querySelector("#p1_health");
const p2_health = document.querySelector("#p2_health");

const p1_health_status = document.querySelector("#health_color1");
const p2_health_status = document.querySelector("#health_color2");

const p1_name = document.querySelector("#p1_name");
const p2_name = document.querySelector("#p2_name");

const start_btn = document.querySelector("#start");
const exit_game_btn = document.querySelector("#exit_game");
const play_again_btn = document.querySelector("#play_again");

const choice_close = document.querySelector("#choice_close");
const menu = document.querySelector(".menu");
const blur = document.querySelector(".blur");
const image_choice = document.querySelectorAll(".choice");
const options = document.querySelector("#options");
const floor = document.querySelector(".floor");

const pop_up = document.querySelector("#pop_up");

let left = false;
let right = false;
let motion = 0;
let action_speed = 27;
const move_speed = 40;

let p1_health_value = 100;
let p2_health_value = 100;

start_btn.addEventListener("click", () => {
  p1_health_value = 100;
  p2_health_value = 100;
  p1_health_status.style.width = "100%";
  p2_health_status.style.width = "100%";

  p1_name.style.display = "block";
  p2_name.style.display = "block";

  p1_health.style.display = "block";
  p2_health.style.display = "block";

  menu.style.display = "none";
  blur.style.display = "none";
  player_1.style.display = "flex";
  player_2.style.display = "flex";
});


play_again_btn.addEventListener("click", () => {
  pop_up.style.display = "none";
  p1_health_value = 100;
  p2_health_value = 100;
  p1_health_status.style.width = "100%";
  p2_health_status.style.width = "100%";
  blur.style.display = "none";
  player_1.style.display = "flex";
  player_2.style.display = "flex";
});

exit_game_btn.addEventListener("click", () => {
  p1_health.style.display = "none";
  p2_health.style.display = "none";
  p1_name.style.display = "none"
  p2_name.style.display = "none"
  pop_up.style.display = "none"
  menu.style.display = "flex"
});

choice_close.addEventListener("click", () => {
  choice_close.style.display = "none";
  menu.style.display = "flex";
  blur.style.display = "flex";
  image_choice.forEach((element) => {
    element.style.display = "none";
  });
});

image_choice[0].addEventListener("click", () => {
  image_choice[1].style.border = "none";
  image_choice[2].style.border = "none";

  choice_close.style.backgroundColor = "transparent";
  choice_close.borderRadius = "none";

  environment.style.backgroundImage = "url(images/africa.jpg)";
  floor.style.backgroundColor = "#546402";
  image_choice[0].style.border = "1px solid white";
});
image_choice[1].addEventListener("click", () => {
  image_choice[0].style.border = "none";
  image_choice[2].style.border = "none";

  choice_close.style.backgroundColor = "white";
  choice_close.borderRadius = "50%";

  image_choice[1].style.border = "1px solid white";
  environment.style.backgroundImage = "url(images/night.jpg)";
  floor.style.backgroundColor = "#170038";
});

image_choice[2].addEventListener("click", () => {
  image_choice[0].style.border = "none";
  image_choice[1].style.border = "none";

  choice_close.style.backgroundColor = "white";
  choice_close.borderRadius = "50%";

  image_choice[2].style.border = "1px solid white";
  environment.style.backgroundImage = "url(images/space.jpg)";
  floor.style.backgroundColor = "#3B3CA6";
});

options.addEventListener("click", () => {
  choice_close.style.display = "block";
  menu.style.display = "none";
  blur.style.display = "none";
  image_choice.forEach((element) => {
    element.style.display = "flex";
  });
});

function are_divs_in_contact(div1, div2) {
  const rect1 = div1.getBoundingClientRect();
  const rect2 = div2.getBoundingClientRect();

  const overlapX = rect1.left < rect2.right && rect1.right > rect2.left;
  const overlapY = rect1.top < rect2.bottom && rect1.bottom > rect2.top;
  return overlapX && overlapY;
}

//MOVEMENT FOR P1
document.addEventListener("keydown", function (e) {
  if (e.key === "a" || e.key === "A") {
    left = true;
  } else if (e.key === "d" || e.key === "D") {
    right = true;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "a" || e.key === "A") {
    left = false;
  } else if (e.key === "d" || e.key === "D") {
    right = false;
  }
});

//MOVEMENT FOR P2
let p2_left = false;
let p2_right = false;
let p2_motion = 0;

document.addEventListener("keydown", function (e) {
  if (e.key === "j" || e.key === "J") {
    p2_left = true;
  } else if (e.key === "l" || e.key === "L") {
    p2_right = true;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "j" || e.key === "J") {
    p2_left = false;
  } else if (e.key === "l" || e.key === "L") {
    p2_right = false;
  }
});

//action press
document.addEventListener("keydown", function (e) {
  if (e.key === "s" || e.key === "S") {
    figure1_right_arm.style.transform = "rotate(360deg)";

    if (are_divs_in_contact(player_2, figure1_right_arm)) {
      console.log("P1 MADE A HIT");
      figure_2.style.backgroundColor = "white";
      head2.style.backgroundColor = "white";
      p2_health_value -= 10;
      p2_health_status.style.width = `${p2_health_value}%`;
      if (p2_health_value <= 0) {
        player_1.style.display = "none";
        player_2.style.display = "none";
        blur.style.display = "flex";
        pop_up.style.display = "flex";
        document.querySelector("#pop_up span").textContent = "Player 1 WON!";
      }
    }
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "k" || e.key === "K") {
    figure2_left_arm.style.transform = "rotate(-360deg)";

    if (are_divs_in_contact(player_1, figure2_left_arm)) {
      console.log("P2 MADE A HIT");
      figure_1.style.backgroundColor = "white";
      head1.style.backgroundColor = "white";
      p1_health_value -= 10;
      p1_health_status.style.width = `${p1_health_value}%`;
      if (p1_health_value <= 0) {
        player_1.style.display = "none";
        player_2.style.display = "none";
        blur.style.display = "flex";
        pop_up.style.display = "flex";
        document.querySelector("#pop_up span").textContent = "Player 2 WON!";
      }
    }
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "s" || e.key === "S") {
    figure1_right_arm.style.transform = "rotate(20deg)";
    figure_2.style.backgroundColor = "black";
    head2.style.backgroundColor = "black";
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "k" || e.key === "K") {
    figure2_left_arm.style.transform = "rotate(-50deg)";
    figure_1.style.backgroundColor = "black";
    head1.style.backgroundColor = "black";
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "a" || e.key === "A") {
  }
});

function update() {
  if (left) {
    motion -= move_speed;
  } else if (right) {
    motion += move_speed;
  } else if (p2_left) {
    p2_motion -= move_speed;
  } else if (p2_right) {
    p2_motion += move_speed;
  }
  player_1.style.transform = `translateX(${motion}px)`;
  player_2.style.transform = `translateX(${p2_motion}px)`;
  requestAnimationFrame(update);
}

update();
