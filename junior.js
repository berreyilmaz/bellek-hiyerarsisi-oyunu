// Ses dosyalarını yükle
const correctSound = new Audio("sounds/correct.mp3");  
const incorrectSound = new Audio("sounds/incorrect.mp3");  

// **30 BASİT SEVİYE SORU**
const allQuestions = [
    { question: "Bilgisayarın kısa süreli hafızasına ne ad verilir?", options: ["HDD", "RAM", "SSD", "CD"], correct: "B" },
    { question: "Bilgisayarın uzun süreli veri saklama birimi nedir?", options: ["RAM", "Cache", "HDD", "ROM"], correct: "C" },
    { question: "Bilgisayar kapandığında verileri saklamayan bellek nedir?", options: ["SSD", "RAM", "HDD", "Flash Bellek"], correct: "B" },
    { question: "Bilgisayarın beyni olarak adlandırılan bileşen nedir?", options: ["RAM", "HDD", "CPU", "GPU"], correct: "C" },
    { question: "Bir bilgisayarın hızını en çok etkileyen bileşen nedir?", options: ["RAM", "HDD", "CPU", "Monitör"], correct: "C" },
    { question: "İşlemcinin en hızlı erişebildiği bellek nedir?", options: ["Cache", "RAM", "HDD", "USB"], correct: "A" },
    { question: "Bilgisayarda veri geçici olarak hangi bellekte saklanır?", options: ["RAM", "Cache", "HDD", "CD"], correct: "A" },
    { question: "Aşağıdakilerden hangisi kalıcı veri saklamak için kullanılır?", options: ["RAM", "Cache", "ROM", "SSD"], correct: "D" },
    { question: "Bilgisayar açıldığında işletim sistemini başlatan bellek türü nedir?", options: ["RAM", "ROM", "Cache", "HDD"], correct: "B" },
    { question: "İşlemcinin en çok kullandığı küçük ve hızlı bellek nedir?", options: ["RAM", "SSD", "Cache", "HDD"], correct: "C" },
    { question: "Aşağıdakilerden hangisi taşınabilir bellek türüdür?", options: ["HDD", "Flash Bellek", "RAM", "CPU"], correct: "B" },
    { question: "Bilgisayarın en büyük veri saklama birimi nedir?", options: ["RAM", "Cache", "HDD", "SSD"], correct: "C" },
    { question: "Hangisi bilgisayarın merkezi işlem birimidir?", options: ["RAM", "SSD", "CPU", "USB"], correct: "C" },
    { question: "Hangi bellek bilgisayar kapatıldığında verileri saklamaz?", options: ["HDD", "SSD", "RAM", "Flash Bellek"], correct: "C" },
    { question: "Bilgisayarda veri depolamak için kullanılan donanım nedir?", options: ["RAM", "SSD", "Monitor", "CPU"], correct: "B" },
    { question: "Bilgisayarda en hızlı çalışan bellek türü hangisidir?", options: ["Cache", "RAM", "HDD", "SSD"], correct: "A" },
    { question: "Aşağıdakilerden hangisi bir depolama cihazıdır?", options: ["RAM", "CPU", "HDD", "GPU"], correct: "C" },
    { question: "Hangi donanım birimi verileri kalıcı olarak saklar?", options: ["RAM", "SSD", "CPU", "Cache"], correct: "B" },
    { question: "Bilgisayar açıldığında çalışan ilk bellek nedir?", options: ["RAM", "ROM", "Cache", "HDD"], correct: "B" },
    { question: "Hangi donanım veri işleme görevini yapar?", options: ["RAM", "HDD", "CPU", "GPU"], correct: "C" },
    { question: "Hangisi geçici bellek olarak bilinir?", options: ["SSD", "Cache", "RAM", "ROM"], correct: "C" },
    { question: "Bilgisayarda grafik işlemlerini yöneten donanım hangisidir?", options: ["CPU", "GPU", "RAM", "SSD"], correct: "B" },
    { question: "Veriler en hızlı hangi bellekte saklanır?", options: ["HDD", "RAM", "Cache", "SSD"], correct: "C" },
    { question: "Hangi donanım bilgileri elektrik kesildiğinde saklamaz?", options: ["HDD", "SSD", "RAM", "USB"], correct: "C" },
    { question: "İşlemci ile en hızlı veri alışverişi yapan bellek nedir?", options: ["HDD", "SSD", "RAM", "Cache"], correct: "D" },
    { question: "Hangisi geçici olarak veri saklayan donanımdır?", options: ["RAM", "SSD", "HDD", "Flash Bellek"], correct: "A" },
    { question: "Bilgisayarın hızını artıran en önemli bellek hangisidir?", options: ["RAM", "Cache", "HDD", "SSD"], correct: "B" },
    { question: "Hangisi bir depolama birimidir?", options: ["CPU", "RAM", "HDD", "Cache"], correct: "C" },
    { question: "Bilgisayarda programları çalıştırmak için kullanılan bellek nedir?", options: ["RAM", "ROM", "HDD", "GPU"], correct: "A" }
];

// **Soruları rastgele karıştır ve ilk 10 tanesini seç**
function getRandomQuestions() {
    let shuffled = allQuestions.sort(() => 0.5 - Math.random());  // Soruları karıştır
    return shuffled.slice(0, 10); // İlk 10 tanesini seç
}

// **Seçilen sorular**
let questions = getRandomQuestions();
let currentQuestionIndex = 0; 
let score = 0;  
const pointsPerCorrect = 10;
const pointsPerinCorrect = -5;   
isPaused=false;

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
        if (!isPaused) {  // **Eğer süre durdurulmamışsa zaman azalsın**
            timeLeft--;
            document.getElementById("timer-btn").innerText = `⏳ ${timeLeft}s`;
    
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                nextQuestion();  // **Süre bitince otomatik geçiş**
            }
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
        btn.style.display = "block";  // **50:50 jokeri sonrası gizlenen şıkları geri getir**
        btn.setAttribute("onclick", `checkAnswer(this, '${String.fromCharCode(65 + index)}')`);
    });

    document.getElementById("result").innerText = "";
    document.getElementById("next-btn").style.display = "none";
}

/*Cevap kontrol fonksiyonu
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
} */


// **Cevap kontrol fonksiyonu**
function checkAnswer(button, answer) {
    clearInterval(timerInterval);  // **Doğru/yanlış cevap verildiğinde süreyi durdur**

    const currentQuestion = questions[currentQuestionIndex];
    let buttons = document.querySelectorAll(".option");
    let resultText = document.getElementById("result");
    let nextBtn = document.getElementById("next-btn");

    if (answer === currentQuestion.correct) {
        button.classList.add("correct");
        resultText.innerText = "Doğru! 🚀";
        correctSound.play();  
        score += pointsPerCorrect;
        nextBtn.style.display = "block";  // **Doğruysa Sonraki Soru butonunu aç**
        
        // Çift cevap jokerini sıfırla
        doubleAnswerActive = false;
        secondChanceUsed = false;

        // Tüm butonları devre dışı bırak
        buttons.forEach(btn => btn.disabled = true);
    } else {
        // Eğer çift cevap jokeri aktifse ve ilk yanlış cevapsa
        if (doubleAnswerActive && !secondChanceUsed) {
            secondChanceUsed = true;  // İlk yanlış yapıldı
            resultText.innerText = "Yanlış! Bir hakkın daha var. 🔄";
            button.classList.add("incorrect");
            incorrectSound.play();  // Yanlış cevap sesi  
            button.classList.add("shake");  // Yanlış cevapta titreme efekti ekle

            console.log("İlk yanlış yapıldı, ikinci hak verildi.");  

            // **Sadece yanlış seçilen butonu devre dışı bırak**
            button.disabled = true;  
            return;  // **Burada durmalı, ikinci hak için devam etmeli**
        }

        // Eğer çift cevap hakkı yoksa veya ikinci yanlış yapıldıysa:
        button.classList.add("incorrect");
        resultText.innerText = "Yanlış! ❌";
        incorrectSound.play();  
        score += pointsPerinCorrect;

        // Tüm butonları devre dışı bırak
        buttons.forEach(btn => btn.disabled = true);
        nextBtn.style.display = "block";  // **Yanlışsa Sonraki Soru butonunu aç**

        // Çift cevap jokerini sıfırla
        doubleAnswerActive = false;
        secondChanceUsed = false;
    }

    document.getElementById("score").innerText = score;
}


// **Sonraki soruya geçiş fonksiyonu**
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        endGame();  // Eğer sorular bitti ise bitiş ekranı göster
        return;
    }

    loadQuestion(); // Yeni soruyu yükle
    clearInterval();
    isPaused=false;
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




// 50:50 JOKER
let usedFiftyFifty = false;  // 50:50 jokerinin kullanılıp kullanılmadığını kontrol ediyoruz

function useFiftyFifty() {
    if (usedFiftyFifty) {
        alert("50:50 jokeri zaten kullanıldı!");
        return;
    }

    // Şıkları alıyoruz
    const options = document.querySelectorAll(".option");
    let wrongAnswers = [];

    // Yanlış şıkları buluyoruz
    options.forEach(option => {
        if (!option.classList.contains("correct")) {
            wrongAnswers.push(option);
        }
    });

    // Yanlış şıkları gizliyoruz (2 tanesini)
    if (wrongAnswers.length >= 2) {
        wrongAnswers[0].style.display = "none";
        wrongAnswers[1].style.display = "none";
    }

    // Jokeri kullandık, butonu devre dışı bırakıyoruz
    usedFiftyFifty = true;
    document.getElementById("fifty-fifty").disabled = true;
}

// **ÇİFT CEVAP JOKERİ**
let usedDoubleAnswer = false;  // Jokerin kullanılıp kullanılmadığını kontrol eder
let doubleAnswerActive = false; // Çift cevap hakkının aktif olup olmadığını takip eder
let secondChanceUsed = false;  // İlk hakkın kullanılıp kullanılmadığını tutar

function useDoubleAnswer() {
    if (usedDoubleAnswer) {
        alert("Çift cevap jokeri zaten kullanıldı!");
        return;
    }

    doubleAnswerActive = true;
    secondChanceUsed = false; // Yeni soru başladığında sıfırlanır
    usedDoubleAnswer = true;

    document.getElementById("double-answer").disabled = true; // Butonu devre dışı bırak
    console.log("Çift cevap jokeri aktif!");
}

// **Çift Cevap Jokeri Butonu Tıklanınca**
document.getElementById("double-answer-joker").addEventListener("click", function() {
    doubleAnswerActive = true;
    secondChanceUsed = false;
    this.disabled = true;  // Joker kullanıldıktan sonra devre dışı bırak
    console.log("Çift cevap jokeri aktifleştirildi!");
});




// ZAMAN DONDURMA JOKERİ //

const freeze = document.getElementById("time-freeze-btn");
// Süreyi dondur
function useTimeFreeze() {
    isPaused = true;
    useTimeFreeze = true;
    document.getElementById("time-freeze-btn").disabled = true;
}




