// console.log(soruListesi[0].cevapKontrol("d")); // Listeden soru objemizi seçtik, verilen cevapla, doğru cevabımızı karşılaştırdık, true/false olarak döndü.

const soruListesi = [ 
new Soru ("1-Which one is a JavaScript package management application?", {a: "Node.js", b: "Typescript", c: "Nuget", d: "NPM"}, "d"),
    new Soru ("2-Which one is not considered within the scope of Frontend?", {a: "CSS", b: "HTML", c: "JavaScript", d: "SQL"}, "d"),
    new Soru ("3-Which one is considered within the scope of Backend?", {a: "Node.JS", b: "TypeScript", c: "Angular", d: "React"}, "a"),
    new Soru ("4-Which one does not use the JavaScript programming language?", {a: "React", b: "Angular", c: "VUE", d: "Asp.NET"}, "d"),
    new Soru ("5-What is the result of the expression '5' == 5?", {a: "SyntaxError", b: "true", c: "false", d: "null"}, "b"),
    new Soru ("6-Which of the following returns the number of elements in a JavaScript array?", {a: "count", b: "size()", c: "length", d: "elements()"}, "c"),
    new Soru ("7-How is a function defined in JavaScript?", {a: "function myFunction() {}", b: "myFunction function() {}", c: "function: myFunction() {}", d: "def myFunction() {}"}, "a"),
    new Soru ("8-What do the `//` characters mean in JavaScript?", {a: "Division operation", b: "Comment line", c: "Code line start", d: "Function start"}, "b"),
    new Soru ("9-In JavaScript, which event is used to run a function when a button is clicked?", {a: "onchange", b: "onclick", c: "onmouseover", d: "onload"}, "b"),
    new Soru ("10-Which DOM event is triggered when a user presses a key on the keyboard in an input field on a web page?", {a: "onkeydown", b: "onmouseover", c: "onclick", d: "onsubmit"}, "a"),
];


const quiz = new Quiz(soruListesi);
const ui = new UI()

ui.btnStart.addEventListener("click", function(){
    startTimer(10); // Sayacı başlattık
    startTimeLine(); // Animasyonu başlattık
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex +1, quiz.sorular.length); 
    ui.btnNext.classList.remove("active");

});


ui.btnNext.addEventListener("click", function(e){
    
    if (quiz.sorular.length != quiz.soruIndex){
        startTimer(10); // Sayacı başlattık  
        startTimeLine(); // Animasyonu başlattık 
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex +1, quiz.sorular.length); 
        ui.btnNext.classList.remove("active");

    }
    else {
        console.log(quiz.dogruCevapSayisi);
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");
        ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
        ui.basariOrani(quiz.dogruCevapSayisi, quiz.sorular.length);
    }   
});


function optionSelected(e){
    clearInterval(counter);
    clearInterval(counterLine);

    const cevap = e.target.textContent[0]; // Soruunun ilk karakterini alır, o da a,b,c,d şıklarından biridir.
    const soru = quiz.soruGetir();

    // Sonraki soruya geç 
    ui.btnNext.classList.add("active");


    let selectedElement = e.target;

    // Span seçilirse eğer bir üst elemanı seçtirdik
    if (selectedElement.localName == "span"){
        selectedElement = selectedElement.parentElement;
    }

    if (soru.cevapKontrol(cevap)) {
        quiz.dogruCevapSayisi += 1;
        selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    }
    else {
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.incorrectIcon);
        console.log(soruListesi[quiz.soruIndex]);

    }
    ui.disableAllOption();
    quiz.soruIndex += 1;
    
    ui.btnNext.classList.add("active");

}

ui.btnQuit.addEventListener("click", function(){
    window.location.reload();

});

ui.btnReplay.addEventListener("click", function(){
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    
    //start butonus
    ui.btnStart.click();
    ui.scoreBox.classList.remove("active");

});

let counter;
function startTimer(time){
    counter = setInterval(timer, 1000); //1000 milisecond'da yani 1 saniye de bir timer fonksiyonunu çağır

    function timer(){
        ui.timeSecond.textContent = time;
        time--;
        if( time < 0 ){
            clearInterval(counter);
            ui.timeText.textContent = "Time Left";
            ui.disableAllOption();
            ui.btnNext.classList.add("active");
            quiz.soruIndex += 1;
        }
    }
}

let counterLine;
function startTimeLine(){
    let lineWidth = 0;

    counterLine = setInterval(timer, 20);

    function timer (){
        lineWidth +=1;

        ui.timeLine.style.width = lineWidth + "px";
        if (lineWidth > 549) {
            clearInterval(counterLine);
        }
    }


}
