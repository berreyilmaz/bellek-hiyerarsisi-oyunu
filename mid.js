// Soru listesi
const questions = [
    { question: "1) Bellek hiyerarşisinde en hızlı bileşen hangisidir?", options: ["RAM", "Cache", "Disk", "Register"], correct: "D" },
    { question: "2) Cache bellek, hangi bileşene en yakın çalışır?", options: ["RAM", "Disk", "İşlemci (CPU)", "USB Bellek"], correct: "C" },
    { question: "3) RAM ile Disk arasındaki hız farkı nasıl bir etki yaratır?", options: ["Bilgisayarın açılış süresi uzar", "İşlemci daha az güç tüketir", "Veriler daha hızlı işlenir", "Hiçbir fark yaratmaz"], correct: "A" },
    { question: "4) RAM ve Cache arasındaki temel fark nedir?", options: ["Cache daha büyüktür", "RAM daha hızlıdır", "Cache daha küçüktür ama daha hızlıdır", "RAM daha ucuzdur"], correct: "C" },
    { question: "5) Cache bellek neden vardır?", options: ["Disk'teki verileri depolamak için", "İşlemciye daha hızlı veri sağlamak için", "Elektrik tüketimini azaltmak için", "RAM'i yedeklemek için"], correct: "C" }
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
        document.getElementById("result").innerText = "";
        return;
    }

    loadQuestion();
}
