let mobilenet;

let muffin;

function modelReady() {
  console.log("Model is ready!!");
}

function imageReady() {
  image(muffin, 0, 0, width, height);
  mobilenet.predict(muffin, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.log("Error: " + err);
  } else {
    console.log(results);
    let label = results[0].className;
    createElement('h1', label);
  }
}

function setup() {
  createCanvas(321, 240);
  background(0);

  muffin = createImg("images/muffin.jpg", imageReady);
  muffin.hide();
  mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}
