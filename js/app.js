// console.log(soruListesi[0].cevapKontrol("d")); // Listeden soru objemizi seçtik, verilen cevapla, doğru cevabımızı karşılaştırdık, true/false olarak döndü.

const soruListesi = [ 
    new Soru ("1-Hangissi JavaScript paket yönetim uygulamasidir?", {a: "node.js", b: "Typescript", c: "Nuget", d: "npm"}, "d"),
    new Soru ("2-Hangisi Frontend kapsaminda değerlendirilmez?", {a: "css", b: "html", c: "javascript", d: "sql"}, "d"),
    new Soru ("3-Hangisi Backend kapsaminda değerlendirilir?", {a: "node.js", b: "Typescript", c: "anguler", d: "react"}, "a"),
    new Soru ("4-Hangisi JavaScript programlama dilini kullanmaz?", {a: "react", b: "angular", c: "vue", d: "asp.net"}, "d"),
];

const quiz = new Quiz(soruListesi);
const ui = new UI();

ui.btnNext.addEventListener("click", function(e){
    
    if (quiz.sorular.length != quiz.soruIndex){
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex +1, quiz.sorular.length) 
    }
    else {
        console.log("quiz bitti");

    }   
});


function optionSelected(e){
    const cevap = e.target.textContent[0]; // Soruunun ilk karakterini alır, o da a,b,c,d şıklarından biridir.
    const soru = quiz.soruGetir();

    let selectedElement = e.target;

    // Span seçilirse eğer bir üst elemanı seçtirdik
    if (selectedElement.localName == "span"){
        selectedElement = selectedElement.parentElement;
    }

    if (soru.cevapKontrol(cevap)) {
        selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    }
    else {
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }
    ui.disableAllOption();
    quiz.soruIndex += 1;

}