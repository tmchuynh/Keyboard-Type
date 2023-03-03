const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"];

const timestamps = [];

timestamps.unshift(getTimestamp());

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length-1)]
}

function targetRandomKey() {
  const key = document.getElementById(getRandomKey());
  key.classList.add("selected");
  let start = Date.now()
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000)
}

document.addEventListener("keyup", event => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");
  
  keyElement.classList.add("hit")
  keyElement.addEventListener('animationend', () => {
    keyElement.classList.remove("hit")
  })
  
  if (keyPressed === highlightedKey.innerHTML) {
    timestamps.unshift(getTimestamp());
    highlightedKey.classList.remove("selected");
    targetRandomKey();
  } 
})

targetRandomKey();

function setup (){
    pixelDensity(1);
    createCanvas();
    colorMode(HSB, 1, 1, 1);
    windowResized();
  }
  
  let gw, gh;
  let c1, offset;
  let updatesPerFrame;
  let xSpan = 15;
  let ySpan = xSpan*1.5;
  let init = () => {
    gw = floor(width/xSpan)+1;
    gh = floor(height/ySpan)+1;
    updatesPerFrame = gw*gh*.025;
    c1 = createGraphics(gw*xSpan, gh*ySpan);
    c1.colorMode(HSB, 1, 1, 1);
    c1.textAlign(LEFT, TOP);
    c1.background(0);
    c1.textSize(xSpan*1.5);
    offset = 0;
  }
  
  function draw(){
    background(0);
    offset += 1;
    c1.noStroke();
    for (let i = 0; i < updatesPerFrame; i++){
      let x = floor(random(gw));
      let y = floor(random(gh));
      c1.fill(0);
      c1.rect(x*xSpan, y*ySpan, xSpan, ySpan);
      c1.fill(.33 + random(-.1, .1), random(), random(.5, 1));
      c1.text(floor(random(2)), x*xSpan, y*ySpan);
    }
    for (let i = 0; i < height; i++){
      let w = i;
      image(c1, -w/2, i, width+w, 1, 0, (i+offset)%(gh*ySpan), gw*xSpan, 1);
    }
  }
  
  function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    init();
  }