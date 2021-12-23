Webcam.set({
    height: 220,
    width: 220,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

i = 0;

function capture_img()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src="+data_uri+">";
    });

    if (i >= 1)
    {
        document.getElementById("medicine_info").innerHTML = "";
        document.getElementById("medicine").innerHTML = "";
        document.getElementById("accuracy").innerHTML = "";
    }
    
}

console.log("ml5 version is:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JYC4FpuVb/model.json", modelLoaded);
function modelLoaded()
{
    console.log("Model is loaded");
}

function recognise_img() 
{
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results)
{
    if (error)
    {
        console.error(error);
    } else
    {
        console.log(results);
        document.getElementById("medicine").innerHTML = results[0].label;
        accur = results[0].confidence*100;
        document.getElementById("accuracy").innerHTML = accur.toFixed(2) + "% ";
    }

    if (results[0].label == "Cough Medicine")
    {
        document.getElementById("medicine_info").innerHTML = "Use this medicine when you have a cough.";
        i++;
    } else if (results[0].label == "Paracetamol")
    {
        document.getElementById("medicine_info").innerHTML = "Use this medicine when you have a fever or as painkiller.";
    } else if (results[0].label == "Strepsils")
    {
        document.getElementById("medicine_info").innerHTML = "Use this medicine when you have a sore throat.";
    }
}