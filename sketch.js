let video;
let mobilenet;

let classifier;
let label = 'loading model';
let trainButton;
let happyButton, sadButton;

function modelReady() {
  console.log("Model is ready!!");
  classifier.load('model/model.json', customModelReady);
}

function customModelReady() {
  console.log("Custom model ready!");
  label = 'model ready';
  classifier.classify(gotResults);
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

// function whileTraining(loss) {
//   if (loss == null) {
//     console.log("Completed training!");
//     classifier.classify(gotResults);
//   } else {
//     console.log("Loss: " + loss);
//   }
// }

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  // happyButton = createButton('happy');
  // sadButton = createButton('sad');
  //
  // happyButton.mousePressed(() => classifier.addImage('happy'));
  // sadButton.mousePressed(() => classifier.addImage('sad'));
  //
  // trainButton = createButton('train');
  // trainButton.mousePressed(function() {
  //   classifier.train(whileTraining);
  // });
  //
  // let saveButton = createButton('save');
  // saveButton.mousePressed(function() {
  //   classifier.save();
  // });
}

function draw() {
  image(video, 0, 0);
  fill(255);
  textSize(34);
  text(label, 10, height - 100);
}
