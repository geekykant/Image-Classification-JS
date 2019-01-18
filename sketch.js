let mobilenet;
let video;

let classifier;
let label = '';

let bookButton;
let baymaxButton;
let trainButton;

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
    label = result;
    classifier.classify(gotResults);
  }
}

function whileTraining(loss) {
  if (loss == null) {
    console.log("Completed training!");
    classifier.classify(gotResults);
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
  classifier = mobilenet.classification(video, videoReady);

  bookButton = createButton('book');
  bookButton.mousePressed(function() {
    classifier.addImage('book');
  });
  baymaxButton = createButton('baymax');
  baymaxButton.mousePressed(function() {
    classifier.addImage('baymax');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });

}

function draw() {
  image(video, 0, 0);
  fill(255);
  textSize(34);
  text(label, 10, height - 100);
}
