const body = document.querySelector("body");

const IMG_NUMBER = 4;

// function handleImgLoad() {
//   console.log("finished loading");
// }

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `picture/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
  //   image.addEventListener("loaded", handleImgLoad);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const rnadomNumber = genRandom();
  paintImage(rnadomNumber);
}
init();
