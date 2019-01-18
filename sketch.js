let video;
let mobilenet;

let predictor;
let value = 0;
let slider;
let trainButton;

let addButton;

function modelReady() {
  console.log("Model is ready!!");
}

function videoReady() {
  console.log("Video is ready!!");
}

function gotResults(err, result) {
  if (err) {
    console.log("Error: " + err);
  } else {
    value = result;
    predictor.predict(gotResults);
  }
}

function whileTraining(loss) {
  if (loss == null) {
    console.log("Completed training!");
    predictor.predict(gotResults);
  } else {
    console.log("Loss: " + loss);
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  predictor = mobilenet.regression(video, videoReady);

  slider = createSlider(0, 1, 0.5, 0.01);

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });

  addButton = createButton('Add image example');
  addButton.mousePressed(() => predictor.addImage(slider.value()));
}

function draw() {
  image(video, 0, 0);
  rectMode(CENTER);
  fill(255,0,0);
  rect(value * width, height/2, 50, 250);

  fill(255);
  textSize(34);
  text(value, 10, height - 100);
}
