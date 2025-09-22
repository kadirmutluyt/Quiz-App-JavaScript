function Soru (soruMetni, cevapSecenekleri, dogruCevap ) {
     this.soruMetni = soruMetni;
     this.cevapSecenekleri = cevapSecenekleri;
     this.dogruCevap = dogruCevap;
}

Soru.prototype.cevapKontrol = function (cevap){
    return cevap === this.dogruCevap;
}

// Aşağıda önce değişkene atadım, böyle yapabilirdik ama fazladan değişken oluşturmaya gerek yok, onun yerine bir dizi oluşturup soruları içine girdim. O diziden de indeks ile soruları çekeceğim. İndeks ile çekildiğinde nesne o anda oluşuyor.

// const s1 = new Soru ("1-Hangisi JavaScript paket yönetim uygulamasidir?", {a: "node.js", b: "Typescript", c: "Nuget", d: "npm"}, "d");
// const s2 = new Soru ("2-Hangisi Frontend kapsamında değerlendirilmez?", {a: "css", b: "html", c: "javascript", d: "sql"}, "d");
// const s3 = new Soru ("3-Hangisi Backend kapsamında değerlendirilir?", {a: "node.js", b: "Typescript", c: "anguler", d: "react"}, "b");
// const s4 = new Soru ("4-Hangisi JavaScript programlama dilini kullanmaz?", {a: "react", b: "angular", c: "vue", d: "asp.net"}, "d");

const soruListesi = [
    new Soru ("1-Hangisi JavaScript paket yönetim uygulamasidir?", {a: "node.js", b: "Typescript", c: "Nuget", d: "npm"}, "d"),
    new Soru ("2-Hangisi Frontend kapsaminda değerlendirilmez?", {a: "css", b: "html", c: "javascript", d: "sql"}, "d"),
    new Soru ("3-Hangisi Backend kapsaminda değerlendirilir?", {a: "node.js", b: "Typescript", c: "anguler", d: "react"}, "a"),
    new Soru ("4-Hangisi JavaScript programlama dilini kullanmaz?", {a: "react", b: "angular", c: "vue", d: "asp.net"}, "d"),
];

