document.addEventListener("DOMContentLoaded", function() {
    loadQuestion(); // Sayfa açıldığında ilk soruyu yükle
});

// Ses dosyalarını yükle
const correctSound = new Audio("sounds/correct.mp3");  // ✅ Doğru cevap sesi
const incorrectSound = new Audio("sounds/incorrect.mp3");  // ❌ Yanlış cevap sesi

// SENIOR seviyesindeki soru listesi
const questions = [
    { question: "1) Hangi bellek türü en düşük gecikmeye sahiptir?", options: ["RAM", "Cache", "Disk", "Register"], correct: "D" },
    { question: "2) İşlemcinin komutları işleme sürecinde ilk baktığı bellek hangisidir?", options: ["RAM", "Cache", "Disk", "Register"], correct: "D" },
    { question: "3) Cache bellek hangi bellek türüne benzer ancak daha hızlıdır?", options: ["RAM", "Cache", "Disk", "Register"], correct: "A" },
    { question: "4) Disk belleği neden RAM yerine kullanılamaz?", options: ["Çok daha yavaş olduğu için", "Daha pahalı olduğu için", "Kapasitesi daha küçük olduğu için", "Elektrik kesildiğinde verileri kaybettiği için"], correct: "A" },
    { question: "5) Bir işlemci komutu çalıştırırken cache miss yaşarsa ne olur?", options: ["RAM’e gider ve daha yavaş çalışır", "İşlem durur", "Disk'e yönlenir", "Sistemi yeniden başlatır"], correct: "A" },
    { question: "6) Cache bellek hiyerarşisinde L3 cache hangi bileşene aittir?", options: ["RAM", "İşlemci (CPU)", "Anakart", "Disk"], correct: "B" },
    { question: "7) Bellek hiyerarşisini hız açısından sıralayın:", options: ["Register → Cache → RAM → Disk", "Cache → Register → RAM → Disk", "Disk → RAM → Cache → Register", "RAM → Cache → Register → Disk"], correct: "A" },
    { question: "8) Hangi bellek türü tek döngüde işlem yapabilir?", options: ["RAM", "Cache", "Disk", "Register"], correct: "D" },
    { question: "9) Virtual Memory, hangi bellek türüne dayanır?", options: ["RAM", "Cache", "Disk", "Register"], correct: "C" },
    { question: "10) L2 Cache, L1 Cache’ten neden daha büyüktür?", options: ["Daha fazla veri tutabilmesi için", "Daha yavaş olduğu için", "Daha pahalı olduğu için", "RAM ile doğrudan çalıştığı için"], correct: "A" }
];

let currentQuestionIndex = 0; 
let score = 0;  
const pointsPerCorrect = 10;
const pointsPerinCorrect = -5;  

let timeLeft = 45;  // Süre sınırı (saniye)
let timerInterval; 

// **Soru yükleme fonksiyonu (TIMER ile birlikte)**
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();  // Tüm sorular bitince oyunu tamamla
        return;
    }

    clearInterval(timerInterval); // Timer'ı sıfırla
    timeLeft = 45; 
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
        document.getElementById("question-text").innerText = "Tebrikler! SENIOR seviyesi tamamlandı 🎉";
        document.querySelector(".answer-buttons").innerHTML = "";
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("result").innerText = "";

        // **OYUNU BİTİRME BUTONUNU GÖSTER**
        const finalLevelContainer = document.createElement("div");
        finalLevelContainer.id = "final-level-container";
        finalLevelContainer.innerHTML = `
            <button id="final-level-btn" onclick="finishGame()">OYUNU BİTİR</button>
        `;

        document.querySelector(".question-box").appendChild(finalLevelContainer);
        return;
    }

    loadQuestion();
}

// **OYUNU BİTİRME FONKSİYONU**
function finishGame() {
    alert("Tebrikler! Tüm seviyeleri başarıyla tamamladınız 🎉");
}
