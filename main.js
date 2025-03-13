const basla = document.querySelector(".baslabtn");
const nasilbtn = document.querySelector(".nasilbtn");
const ayarlar = document.querySelector(".ayarlarbtn");



document.addEventListener("DOMContentLoaded", () => {
    const junior = document.querySelector("#junior");
    const mid = document.querySelector("#mid");
    const senior = document.querySelector("#senior");

    junior.addEventListener("click", () => {
        window.location.href = "junior.html";
    });

    mid.addEventListener("click", () => {
        window.location.href = "mid.html";
    });

    senior.addEventListener("click", () => {
        window.location.href = "senior.html";
    });
});



basla.addEventListener('click', () => {
    window.location.href = "basla.html";
})

nasilbtn.addEventListener('click', () => {
    window.location.href = "nasiloynanir.html";
})

ayarlar.addEventListener('click', () => {
    window.location.href = "ayarlar.html";
})

function checkAnswer(button, answer) {
    const correctAnswer = "B"; // Doğru cevap Önbellek (Cache)
    let buttons = document.querySelectorAll(".option");
    let resultText = document.getElementById("result");
    let nextBtn = document.getElementById("next-btn");

    // Önce tüm butonları temizle
    buttons.forEach(btn => {
        btn.classList.remove("correct", "incorrect");
        btn.disabled = true; // Seçimden sonra butonlar devre dışı
    });

    if (answer === correctAnswer) {
        button.classList.add("correct");
        resultText.innerText = "Doğru! 🚀";
    } else {
        button.classList.add("incorrect");
        resultText.innerText = "Yanlış! Tekrar dene. ❌";
    }

    // "Sonraki Soru" butonunu görünür yap
    nextBtn.style.display = "block";
}

function nextQuestion() {
    // Yeni soru ve seçenekleri değiştirmek için
    document.getElementById("question-text").innerText = "Bir CPU'nun ana görevi nedir?";
    
    let buttons = document.querySelectorAll(".option");
    let nextBtn = document.getElementById("next-btn");
    let resultText = document.getElementById("result");

    // Yeni seçenekleri güncelle (şu an statik ama sonra dinamik hale getirebiliriz)
    let newOptions = ["Veri depolamak", "İşlem yapmak", "Ekrana görüntü vermek", "Ağ bağlantısını yönetmek"];
    let correctAnswer = "B"; // Yeni sorunun doğru cevabı

    buttons.forEach((btn, index) => {
        btn.innerText = newOptions[index]; // Butonları güncelle
        btn.classList.remove("correct", "incorrect"); // Önceki renklendirmeyi temizle
        btn.disabled = false; // Tekrar seçilebilir hale getir
        btn.setAttribute("onclick", `checkAnswer(this, '${String.fromCharCode(65 + index)}')`); // Yeni tıklama olayını güncelle
    });

    // "Sonraki" butonunu tekrar gizle
    nextBtn.style.display = "none";

    // Sonuç mesajını temizle
    resultText.innerText = "";


}




