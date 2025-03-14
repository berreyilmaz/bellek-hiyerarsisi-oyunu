// Ses dosyalarını yükle
const correctSound = new Audio("sounds/correct.mp3");  // ✅ Doğru cevap sesi
const incorrectSound = new Audio("sounds/incorrect.mp3");  // ❌ Yanlış cevap sesi

// Soru listesi (10 soru)
const questions = [
    { question: "1) Bellek hiyerarşisinde en hızlı bileşen hangisidir?", options: ["RAM", "Cache", "Disk", "Register"], correct: "D" },
    { question: "2) Cache bellek, hangi bileşene en yakın çalışır?", options: ["RAM", "Disk", "İşlemci (CPU)", "USB Bellek"], correct: "C" },
    { question: "3) RAM ile Disk arasındaki hız farkı nasıl bir etki yaratır?", options: ["Bilgisayarın açılış süresi uzar", "İşlemci daha az güç tüketir", "Veriler daha hızlı işlenir", "Hiçbir fark yaratmaz"], correct: "A" },
    { question: "4) RAM ve Cache arasındaki temel fark nedir?", options: ["Cache daha büyüktür", "RAM daha hızlıdır", "Cache daha küçüktür ama daha hızlıdır", "RAM daha ucuzdur"], correct: "C" },
    { question: "5) Cache bellek neden vardır?", options: ["Disk'teki verileri depolamak için", "İşlemciye daha hızlı veri sağlamak için", "Elektrik tüketimini azaltmak için", "RAM'i yedeklemek için"], correct: "B" },
    { question: "6) Hangi bellek türü kalıcıdır?", options: ["RAM","Cache","Disk","Register"], correct: "C" },
    { question: "7) Aşağıdaki bellek türlerinden hangisi en büyük kapasiteye sahiptir?", options: ["Register","Cache","RAM","Disk"], correct: "D" },
    { question: "8) Hangi bellek, işlemcinin en sık eriştiği verileri saklar?", options: ["RAM","Cache","Disk","Register"], correct: "B" },
    { question: "9) Disk belleğinin diğer adı nedir?", options: ["Swap Alanı","Virtual Memory","Flash Bellek","A ve B doğru"], correct: "D" },
    { question: "10) SSD’ler hangi belleğe kıyasla daha hızlıdır?", options: ["RAM","Cache","HDD","Register"], correct: "C" }
];

let currentQuestionIndex = 0; 
let score = 0;  
const pointsPerCorrect = 10;
const pointsPerinCorrect = -5;  

let timeLeft = 15;  // Süre sınırı (saniye)
let timerInterval; 

// **Soru yükleme fonksiyonu (TIMER ile birlikte)**
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();  // Tüm sorular bitince oyunu tamamla
        return;
    }

    clearInterval(timerInterval); // Timer'ı sıfırla
    timeLeft = 15; 
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

// **Cevap kontrol fonksiyonu**
function checkAnswer(button, answer) {
    clearInterval(timerInterval);  // **Doğru/yanlış cevap verildiğinde süreyi durdur**
    
    const currentQuestion = questions[currentQuestionIndex];
    let buttons = document.querySelectorAll(".option");
    let resultText = document.getElementById("result");
    let nextBtn = document.getElementById("next-btn");

    buttons.forEach(btn => btn.disabled = true);
    
    if (answer === currentQuestion.correct) {
        button.classList.add("correct");
        resultText.innerText = "Doğru! 🚀";
        correctSound.play();  // Doğru cevap sesi
        score += pointsPerCorrect; 
    } else {
        button.classList.add("incorrect");
        resultText.innerText = "Yanlış! Tekrar dene. ❌";
        score += pointsPerinCorrect;
        incorrectSound.play();  // Yanlış cevap sesi  
        button.classList.add("shake"); // Yanlış cevapta titreme efekti ekle
    }

    document.getElementById("score").innerText = score;
    nextBtn.style.display = "block";
}

// **Sonraki soruya geçiş fonksiyonu**
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        endGame();  // Eğer sorular bitti ise bitiş ekranı göster
        return;
    }

    loadQuestion(); // Yeni soruyu yükle
}

// **OYUN BİTTİĞİNDE ÇALIŞACAK FONKSİYON**
function endGame() {
    clearInterval(timerInterval); // Timer'ı durdur
    document.getElementById("question-text").innerText = "Tebrikler! Tüm soruları tamamladın 🎉";
    
    document.querySelector(".answer-buttons").innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("result").innerText = "";

    const messageContainer = document.createElement("p");
    messageContainer.id = "retry-message";
    
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "level-container";

    if (score >= 85) {
        buttonContainer.innerHTML = `
            <button id="mid-level-btn" class="next-level-btn" onclick="goToMidLevel()">MİD seviyesine geçin</button>
        `;
    } else {
        messageContainer.innerText = "Ne yazık ki skorunuz düşük, bir üst level için tekrar çözmelisiniz. 🆙🥲";
        messageContainer.classList.add("retry-message");

        buttonContainer.innerHTML = `
            <button id="retry-btn" class="retry-btn" onclick="restartGame()">Junior seviyesine tekrar başla</button>
        `;
    }

    document.querySelector(".question-box").appendChild(messageContainer);
    document.querySelector(".question-box").appendChild(buttonContainer);
}

// **MİD seviyesine geçiş fonksiyonu**
function goToMidLevel() {
    window.location.href = "mid.html";  
}

// **Oyunu yeniden başlatma fonksiyonu**
function restartGame() {
    window.location.href = "junior.html";  
}

// **İlk soruyu yükle**
loadQuestion();

