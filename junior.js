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

// Soruyu ve seçenekleri yükleme fonksiyonu
function loadQuestion() {
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
    } else {
        button.classList.add("incorrect");
        resultText.innerText = "Yanlış! Tekrar dene. ❌";
        score += pointsPerinCorrect;  
        button.classList.add("shake"); // Yanlış cevapta titreme efekti ekle
    }

    document.getElementById("score").innerText = score;

    nextBtn.style.display = "block";

    // **Tüm sorular tamamlandıysa geçiş şartı kontrolü**
    if (currentQuestionIndex >= questions.length - 1) {
        document.getElementById("question-text").innerText = "Tebrikler! Tüm soruları tamamladın 🎉";

        const messageContainer = document.createElement("p");
        messageContainer.id = "retry-message";

        document.querySelector(".answer-buttons").innerHTML = "";
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("result").innerText = "";

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "level-container";

        if (score >= 85) {
            // Eğer skor 85 ve üzeri ise, MİD seviyesine geçiş butonu oluştur
            buttonContainer.innerHTML = `
                <button id="mid-level-btn" class="next-level-btn" onclick="goToMidLevel()">MİD seviyesine geçin</button>
            `;
        } else {
            // Eğer skor 85’ten düşükse, mesaj ve baştan başlama butonu oluştur
            messageContainer.innerText = "Ne yazık ki skorunuz düşük, bir üst level için tekrar çözmelisiniz. 🆙🥲";
            messageContainer.classList.add("retry-message");

            buttonContainer.innerHTML = `
                <button id="retry-btn" class="retry-btn" onclick="restartGame()">Junior seviyesine tekrar başla</button>
            `;
        }

        document.querySelector(".question-box").appendChild(messageContainer);
        document.querySelector(".question-box").appendChild(buttonContainer);
    }
}

// Sonraki soruya geçiş fonksiyonu
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        return;
    }

    loadQuestion();
}

// **MİD seviyesine geçiş fonksiyonu**
function goToMidLevel() {
    window.location.href = "mid.html";  
}

// **Oyunu yeniden başlatma fonksiyonu**
function restartGame() {
    window.location.href = "junior.html";  
}
