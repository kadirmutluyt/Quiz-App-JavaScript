// console.log(soruListesi[0].cevapKontrol("d")); // Listeden soru objemizi seçtik, verilen cevapla, doğru cevabımızı karşılaştırdık, true/false olarak döndü.

const soruListesi = [ 
    new Soru ("1-Hangissi JavaScript paket yönetim uygulamasidir?", {a: "node.js", b: "Typescript", c: "Nuget", d: "npm"}, "d"),
    new Soru ("2-Hangisi Frontend kapsaminda değerlendirilmez?", {a: "css", b: "html", c: "javascript", d: "sql"}, "d"),
    new Soru ("3-Hangisi Backend kapsaminda değerlendirilir?", {a: "node.js", b: "Typescript", c: "anguler", d: "react"}, "a"),
    new Soru ("4-Hangisi JavaScript programlama dilini kullanmaz?", {a: "react", b: "angular", c: "vue", d: "asp.net"}, "d"),
];

const quiz = new Quiz(soruListesi);
const ui = new UI()

ui.btnStart.addEventListener("click", function(){
    startTimer(10); // Sayacı başlattık
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex +1, quiz.sorular.length); 
    ui.btnNext.classList.remove("active");

});


ui.btnNext.addEventListener("click", function(e){
    
    if (quiz.sorular.length != quiz.soruIndex){
        startTimer(10); // Sayacı başlattık    
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex +1, quiz.sorular.length); 
        ui.btnNext.classList.remove("active");

    }
    else {
        console.log(quiz.dogruCevapSayisi);
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");
        ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
    }   
});


function optionSelected(e){
    clearInterval(counter);
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

let counter
function startTimer(time){
    counter = setInterval(timer, 1000) //1000 milisecond'da yani 1 saniye de bir timer fonksiyonunu çağır

    function timer(){
        ui.timeSecond.textContent = time;
        time--;
        if( time < 0 ){
            clearInterval(counter);
            ui.timeText.textContent = "Süre Bitti!";
            ui.disableAllOption();
            ui.btnNext.classList.add("active");
            quiz.soruIndex += 1;
        }
    }
}