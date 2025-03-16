document.addEventListener("DOMContentLoaded", function() {
    loadQuestion();
});

// Ses dosyalarını yükle
const correctSound = new Audio("sounds/correct.mp3");  
const incorrectSound = new Audio("sounds/incorrect.mp3");  

// MID seviyesindeki soru listesi
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
const pointsPerIncorrect = -5;

let timeLeft = 30;  
let timerInterval; 

// **Soru yükleme fonksiyonu (TIMER ile birlikte)**
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();  
        return;
    }

    clearInterval(timerInterval); 
    timeLeft = 30;  
    document.getElementById("timer-btn").innerText = `⏳ ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-btn").innerText = `⏳ ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();  
        }
    }, 1000);

    const questionText = document.getElementById("question-text");
    const buttons = document.querySelectorAll(".option");
    const currentQuestion = questions[currentQuestionIndex];

    questionText.innerText = currentQuestion.question;

    buttons.forEach((btn, index) => {
        btn.innerText = currentQuestion.options[index];
        btn.classList.remove("correct", "incorrect", "shake");
        btn.disabled = false;
        btn.style.display = "block";  
        btn.setAttribute("onclick", `checkAnswer(this, '${String.fromCharCode(65 + index)}')`);
    });

    document.getElementById("result").innerText = "";
    document.getElementById("next-btn").style.display = "none";
}

// **Cevap kontrol fonksiyonu**
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
        correctSound.play();
    } else {
        button.classList.add("incorrect");
        resultText.innerText = "Yanlış! ❌";
        score += pointsPerIncorrect;  
        incorrectSound.play();
        button.classList.add("shake");
    }

    document.getElementById("score").innerText = score;

    correctSound.onended = incorrectSound.onended = function() {
        nextBtn.style.display = "block";
    };
}

// **Sonraki soruya geçiş fonksiyonu**
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    loadQuestion();
}

// **Oyunun tamamlanması fonksiyonu**
function endGame() {
    clearInterval(timerInterval);
    document.getElementById("question-text").innerText = "Tebrikler! MID seviyesi tamamlandı 🎉";

    document.querySelector(".answer-buttons").innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("result").innerText = "";

    if (score >= 80) {
        document.getElementById("question-text").innerHTML += `<br>🏆 Yeni bir seviyeye geçmeye hazır mısın?`;
        const seniorButton = document.createElement("button");
        seniorButton.innerText = "Senior Seviyesine Geç";
        seniorButton.classList.add("level-btn");
        seniorButton.onclick = () => window.location.href = "senior.html";
        document.querySelector(".question-box").appendChild(seniorButton);
    } else {
        document.getElementById("question-text").innerHTML += `<br>😞 Skorunuz yetersiz! Tekrar çözün.`;
        const retryButton = document.createElement("button");
        retryButton.innerText = "Mid Seviyesini Yeniden Çöz";
        retryButton.classList.add("retry-btn");
        retryButton.onclick = () => window.location.reload();
        document.querySelector(".question-box").appendChild(retryButton);
    }
}

// **50:50 JOKER**
let usedFiftyFifty = false;

function useFiftyFifty() {
    if (usedFiftyFifty) {
        alert("50:50 jokeri zaten kullanıldı!");
        return;
    }

    const options = document.querySelectorAll(".option");
    let wrongAnswers = [];

    options.forEach(option => {
        if (!option.classList.contains("correct")) {
            wrongAnswers.push(option);
        }
    });

    if (wrongAnswers.length >= 2) {
        wrongAnswers[0].style.display = "none";
        wrongAnswers[1].style.display = "none";
    }

    usedFiftyFifty = true;
    document.getElementById("fifty-fifty").disabled = true;
}
