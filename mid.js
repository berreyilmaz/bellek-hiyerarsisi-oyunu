document.addEventListener("DOMContentLoaded", function() {
    loadQuestion(); // Sayfa açıldığında ilk soruyu yükle
});

// Ses dosyalarını yükle
const correctSound = new Audio("sounds/correct.mp3");  // ✅ Doğru cevap sesi
const incorrectSound = new Audio("sounds/incorrect.mp3");  // ❌ Yanlış cevap sesi

// MİD seviyesindeki soru listesi
const questions = [
    { question: "1) RAM'de depolanan veriler ne zaman kaybolur?", options: ["Bilgisayar kapandığında", "İşlemci devre dışı kaldığında", "Disk dolduğunda", "RAM'in kapasitesi dolduğunda"], correct: "A" },
    { question: "2) Cache bellek neden çok küçük tutulur?", options: ["Daha pahalı olduğu için", "Daha yavaş olduğu için", "Daha az güç tükettiği için", "Daha fazla kapasite gerektirdiği için"], correct: "A" },
    { question: "3) Virtual Memory'nin temel amacı nedir?", options: ["İşlemcinin daha hızlı çalışmasını sağlamak", "RAM dolduğunda disk alanını bellek gibi kullanmak", "Cache belleği hızlandırmak", "Register kapasitesini artırmak"], correct: "B" },
    { question: "4) Hangi bellek doğrudan işlemci ile entegre edilmiştir?", options: ["RAM", "Cache", "Disk", "Register"], correct: "D" },
    { question: "5) Hangi bellek, L1, L2 ve L3 olarak sınıflandırılır?", options: ["RAM", "Cache", "Disk", "SSD"], correct: "B" },
    { question: "6) Bir işlemci, bellekten veri çağırırken en çok hangi belleğe bakar?", options: ["RAM", "Disk", "Register", "Cache"], correct: "D" },
    { question: "7) RAM neden SSD'den daha hızlıdır?", options: ["Manyetik disk yerine yarı iletkenler kullanıldığı için", "Daha fazla kapasiteye sahip olduğu için", "Sürekli veri okuma ve yazma yaptığı için", "Elektrik kesildiğinde veri kaybolduğu için"], correct: "A" },
    { question: "8) Bellek erişim sürelerini en hızlıdan en yavaşa doğru sıralayın:", options: ["Register → Cache → RAM → Disk", "Cache → Register → RAM → Disk", "Disk → RAM → Cache → Register", "RAM → Cache → Register → Disk"], correct: "A" },
    { question: "9) Bir program çalıştırıldığında ilk olarak hangi bellek kullanılır?", options: ["Register", "RAM", "Cache", "Disk"], correct: "B" },
    { question: "10) Hangi bellek doğrudan CPU'ya gömülüdür?", options: ["Cache", "RAM", "Disk", "Virtual Memory"], correct: "A" }
];

let currentQuestionIndex = 0;
let score = 0;  
const pointsPerCorrect = 10;
const pointsPerinCorrect = -5;

let timeLeft = 30;  // Süre sınırı (saniye)
let timerInterval; 

// **Soru yükleme fonksiyonu (TIMER ile birlikte)**
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();  // Tüm sorular bitince oyunu tamamla
        return;
    }

    clearInterval(timerInterval); // Timer'ı sıfırla
    timeLeft = 30; 
    document.getElementById("timer-btn").innerText = `⏳ ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-btn").innerText = `⏳ ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();  // **Süre bitince otomatik geçiş**
        }
    }, 1000);

    const questionText = document.getElementById("question-text");
    const buttons = document.querySelectorAll(".option");
    const currentQuestion = questions[currentQuestionIndex];

    if (!questionText || !buttons.length) return;

    questionText.innerText = currentQuestion.question;

    buttons.forEach((btn, index) => {
        btn.innerText = currentQuestion.options[index];
        btn.classList.remove("correct", "incorrect", "shake");
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
        score += pointsPerCorrect; 
        correctSound.play();  // ✅ Doğru cevap sesi çal
    } else {
        button.classList.add("incorrect");
        resultText.innerText = "Yanlış! Tekrar dene. ❌";
        score += pointsPerinCorrect;  
        incorrectSound.play();  // ❌ Yanlış cevap sesi çal
        button.classList.add("shake"); // Yanlış cevapta titreme efekti ekle
    }

    document.getElementById("score").innerText = score;

    // Ses bitene kadar "Sonraki" butonunu gizle
    correctSound.onended = incorrectSound.onended = function() {
        nextBtn.style.display = "block"; // Ses bitince buton görünür olur
    };
}

// Sonraki soruya geçiş fonksiyonu
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        document.getElementById("question-text").innerText = "Tebrikler! MİD seviyesi tamamlandı 🎉";
        document.querySelector(".answer-buttons").innerHTML = "";
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("result").innerText = "";

        // **SENIOR seviyesine geçiş butonunu ekleyelim**
        const seniorLevelContainer = document.createElement("div");
        seniorLevelContainer.id = "senior-level-container";
        seniorLevelContainer.innerHTML = `
            <button id="senior-level-btn" onclick="goToSeniorLevel()">SENIOR seviyesine geçin</button>
        `;

        document.querySelector(".question-box").appendChild(seniorLevelContainer);
        return;
    }

    loadQuestion();
}

// **SENIOR seviyesine geçiş fonksiyonu**
function goToSeniorLevel() {
    window.location.href = "senior.html";  // senior.html sayfasına yönlendir
}
