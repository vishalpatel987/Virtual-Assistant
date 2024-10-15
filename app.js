let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice=document.querySelector("#voice");

//sound ke liye speck
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
 // text_speak.lang="hi-GB";
  window.speechSynthesis.speak(text_speak);
}

// time ke liye
function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  console.log(hours);
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}
window.addEventListener("load", () => {
  wishMe();
});

// jab apn kuch bole uske liye puchana
let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display="none";
  voice.style.display="block";
});

//  question ka replay
function takeCommand(message) {
  btn.style.display="flex";
  voice.style.display="none";
  if (message.includes("hello") || message.includes("hey")) {
    speak("hello sir,what can i help you?");
  } else if (message.includes("who are you")) {
    speak("i am virtual assistant ,created by Vishal sir");
  } else if (message.includes("open youtube")) {
    speak("opening youtube...");
    window.open("https://youtube.com/", "_blank");
  }else if (message.includes("open google")) {
    speak("opening google...");
    window.open("https://google.com/", "_blank");
  }else if (message.includes("open facebook")) {
    speak("opening facebook...");
    window.open("https://facebook.com/", "_blank");
}else if (message.includes("open instagram")) {
    speak("opening instagram...");
    window.open("https://instagram.com/", "_blank");
}else if (message.includes("open calculator")) {
  speak("opening calculator...");
  window.open("calculator://", "_blank");
}else if (message.includes("open whatsapp")) {
  speak("opening whatsapp...");
  window.open("whatsapp://", "_blank");
}
else if(message.includes("time")){
  let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
  speak(time);
}else if(message.includes("date")){
  let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
  speak(date);
}
else{
  speak(`this is what i found on internet regarding ${message.replace("vikrant","")}`);
  window.open(`https://www.google.com/search?q=${message.replace("vikrant","")}`);
}
}