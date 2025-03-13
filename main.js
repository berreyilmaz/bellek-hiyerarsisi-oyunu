// Başlangıç butonları
const basla = document.querySelector(".baslabtn");
const nasilbtn = document.querySelector(".nasilbtn");
const ayarlar = document.querySelector(".ayarlarbtn");

// Sayfa yönlendirmeleri
document.addEventListener("DOMContentLoaded", () => {
    const junior = document.querySelector("#junior");
    const mid = document.querySelector("#mid");
    const senior = document.querySelector("#senior");

    if (junior) junior.addEventListener("click", () => window.location.href = "junior.html");
    if (mid) mid.addEventListener("click", () => window.location.href = "mid.html");
    if (senior) senior.addEventListener("click", () => window.location.href = "senior.html");
    
    loadQuestion(); // İlk soruyu yükle
});

if (basla) basla.addEventListener('click', () => window.location.href = "basla.html");
if (nasilbtn) nasilbtn.addEventListener('click', () => window.location.href = "nasiloynanir.html");
if (ayarlar) ayarlar.addEventListener('click', () => window.location.href = "ayarlar.html");

// Soru listesi
const questions = [
    { question: "Bellek hiyerarşisinde en hızlı bileşen hangisidir?", options: ["RAM", "Cache", "Disk", "Register"], correct: "D" },
    { question: "Cache bellek, hangi bileşene en yakın çalışır?", options: ["RAM", "Disk", "İşlemci (CPU)", "USB Bellek"], correct: "C" },
    { question: "RAM ile Disk arasındaki hız farkı nasıl bir etki yaratır?", options: ["Bilgisayarın açılış süresi uzar", "İşlemci daha az güç tüketir", "Veriler daha hızlı işlenir", "Hiçbir fark yaratmaz"], correct: "A" }
];

let currentQuestionIndex = 0; // Mevcut soru indeksi

// Soruyu ve seçenekleri yükleme fonksiyonu
function loadQuestion() {
    const questionText = document.getElementById("question-text");
    const buttons = document.querySelectorAll(".option");
    const currentQuestion = questions[currentQuestionIndex];

    if (!questionText || !buttons.length) return;

    questionText.innerText = currentQuestion.question;

    buttons.forEach((btn, index) => {
        btn.innerText = currentQuestion.options[index];
        btn.classList.remove("correct", "incorrect");
        btn.disabled = false;
        btn.setAttribute("onclick", `checkAnswer(this, '${String.fromCharCode(65 + index)}')`);
    });

    document.getElementById("result").innerText = "";
    document.getElementById("next-btn").style.display = "none";
}

// Cevap kontrol fonksiyonu
function checkAnswer(button, answer) {
    const currentQuestion = questions[currentQuestionIndex];
    let buttons = document.querySelectorAll(".option");
    let resultText = document.getElementById("result");
    let nextBtn = document.getElementById("next-btn");

    buttons.forEach(btn => btn.disabled = true);

    if (answer === currentQuestion.correct) {
        button.classList.add("correct");
        resultText.innerText = "Doğru! 🚀";
    } else {
        button.classList.add("incorrect");
        resultText.innerText = "Yanlış! Tekrar dene. ❌";
    }

    nextBtn.style.display = "block";
}

// Sonraki soruya geçiş fonksiyonu
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        document.getElementById("question-text").innerText = "Tebrikler! Tüm soruları tamamladın 🎉";
        document.querySelector(".answer-buttons").innerHTML = "";
        document.getElementById("next-btn").style.display = "none";
        return;
    }

    loadQuestion();
}







