let mobilenet;
let video;

let label = '';

function modelReady() {
  console.log("Model is ready!!");
  mobilenet.predict(video, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.log("Error: " + err);
  } else {
    // console.log(results);
    label = results[0].className;
    mobilenet.predict(video, gotResults);
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  // muffin = createImg("images/muffin.jpg", imageReady);
  // muffin.hide();
  mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}


function draw() {
  image(video, 0, 0);
  fill(255);
  textSize(34);
  text(label, 10, height - 100);
}
