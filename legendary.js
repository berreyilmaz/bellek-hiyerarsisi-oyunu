// Ses dosyalarını yükle
const correctSound = new Audio("sounds/correct.mp3");  
const incorrectSound = new Audio("sounds/incorrect.mp3");  


// **20 ekstra zor  SEVİYE SORU**
const  allQuestionsAdvanced = [
    { question: "Out-of-Order Execution (OoOE) mekanizmasının işlemcide sağladığı en büyük avantaj nedir?", options: ["Enerji verimliliğini artırır", "Komutları sırayla yürütür", "Veri bağımlılıklarını en aza indirir", "Pipeline tıkanmalarını artırır"], correct: "C" },
    { question: "Branch Prediction algoritmalarında kullanılan Two-Level Adaptive Predictor modelinin temel çalışma prensibi nedir?", options: ["Statik tahmin yöntemi kullanır", "Geçmiş dallanma sonuçlarını analiz ederek dinamik tahmin yapar", "Tahmin yapılmaz, direkt dallanma sonucu işlenir", "Tüm dallanmaları yanlış olarak varsayar"], correct: "B" },
    { question: "Cache belleklerde kullanılan Write-Through ve Write-Back mekanizmalarının farkı nedir?", options: ["Write-Back, veriyi doğrudan ana belleğe yazar", "Write-Through, daha az enerji tüketir", "Write-Back, bellek erişim sayısını azaltarak performansı artırır", "Write-Through, veriyi CPU yerine disk belleğine kaydeder"], correct: "C" },
    { question: "CPU’daki Speculative Execution tekniğinin güvenlik açığı oluşturabileceği saldırı türü nedir?", options: ["Stack Overflow", "Row Hammer", "Spectre & Meltdown", "Side-Channel Timing Attack"], correct: "C" },
    { question: "İşlemcideki L1, L2 ve L3 önbelleklerin temel farkı nedir?", options: ["L1 en büyük boyutlu, L3 en küçük boyutlu önbellektir", "L1 en hızlı, L3 en yavaş erişim süresine sahiptir", "L2 ve L3 sadece işlemcide kullanılmaz, RAM içinde de bulunur", "L3 yalnızca enerji tasarrufu sağlar"], correct: "B" },
    { question: "CISC ve RISC işlemci mimarileri arasındaki temel fark nedir?", options: ["RISC, daha fazla komut türü kullanır", "CISC, daha düşük transistör sayısına sahiptir", "RISC, daha basit komut setleri kullanarak yüksek performans sağlar", "CISC, pipeline optimizasyonu için tasarlanmıştır"], correct: "C" },
    { question: "Hangi bellek erişim modeli, işlemcinin çok çekirdekli ortamlarda önbellek tutarlılığını korumasını sağlar?", options: ["NUMA", "DMA", "SMP", "Cache Coherency Protocol"], correct: "D" },
    { question: "Bir işlemcide ILP (Instruction-Level Parallelism) optimizasyonu sağlamak için hangi teknik kullanılır?", options: ["Vectorization", "Branch Merging", "Thread Pooling", "Memory Swapping"], correct: "A"},
    { question: "Pipelining aşamalarında 'hazard' (tehlike) türlerinden biri olan 'data hazard' nedir?", options: ["Bellek yetersizliği nedeniyle yaşanan gecikmeler", "Bir komutun sonucu, diğer bir komut tarafından kullanılmadan önce hesaplanamazsa ortaya çıkar", "CPU çekirdekleri arasındaki iletişim gecikmeleri", "Tahmin edilen dallanmaların yanlış sonuçlanması"], correct: "B" },
    { question: "Bir CPU’nun Out-of-Order Execution mekanizmasını başarılı bir şekilde uygulayabilmesi için hangi bileşene ihtiyaç duyulur?", options: ["Instruction Window", "Stack Pointer", "Program Counter", "Thread Scheduler"], correct: "A" },
    { question: "Hangi CPU tasarım tekniği, bir çekirdeğin birçok iş parçacığını aynı anda çalıştırmasını sağlar?", options: ["Super-scalar Execution", "Hyper-Threading", "Out-of-Order Execution", "Dynamic Branch Prediction"], correct: "B" },
    { question: "Hangi bellek yönetimi stratejisi, CPU’nun aynı anda birden fazla bellek bloğuna erişerek performansı artırmasını sağlar?", options: ["Paging", "Memory Interleaving", "Segmentation", "Swapping"], correct: "B" },
    { question: "Modern CPU'larda 'register renaming' neden kullanılır?", options: ["Bellek erişim süresini azaltmak için", "Komut satırlarını daha verimli işleyebilmek için", "Pipeline’daki veri bağımlılıklarını azaltmak için", "RAM kullanımını en aza indirmek için"], correct: "C" },
    { question: "Modern bilgisayarlarda kullanılan giriş/çıkış portları arasında, veri aktarım hızı ve çoklu cihaz desteği açısından en gelişmiş olan aşağıdakilerden hangisidir?", options: [" USB 3.1 Gen 1", "Thunderbolt 4", "HDMI 2.1", "PCIe 4.0"], correct: "B", video: "video1.mp4" },
    { question: "Hangi optimizasyon tekniği, aynı anda birden fazla ALU birimi kullanarak birden çok komutun yürütülmesini sağlar?", options: ["Branch Prediction", "Pipeline Execution", "Superscalar Execution", "Simultaneous Multithreading"], correct: "C" },
    { question: "Bir CPU'da kullanılan TLB (Translation Lookaside Buffer) hangi amaçla kullanılır?", options: ["Veri önbelleklemeyi hızlandırmak", "Sanal bellek adreslerini fiziksel adreslere çevirmek", "Veri bağımlılığını en aza indirmek", "CPU çekirdekleri arasında iletişimi sağlamak"], correct: "B" },
    { question: "Modern işlemcilerde SMT (Simultaneous Multithreading) teknolojisinin temel amacı nedir?", options: ["İşlemci frekansını dinamik olarak artırmak", "Bellek erişim hızını iyileştirmek", "Aynı çekirdek içinde birden fazla iş parçacığını eşzamanlı yürütmek", "Talimat setlerini optimize etmek"], correct: "C"},
    { question: "Bir işlemcide Prefetching mekanizması neden kullanılır?", options: ["Tahmin edilen verileri önceden yükleyerek bellek erişim gecikmesini azaltmak", "CPU’nun komutlarını hızlandırmak", "Overclocking için işlemciye daha fazla güç sağlamak", "Yanlış tahminleri düzeltmek için"], correct: "A" },
    { question: "Hangi optimizasyon yöntemi, kodun belirli bölümlerini işlemci önbelleğinde daha verimli saklamayı sağlar?", options: ["Loop Unrolling", "Cache Blocking", "Thread Pooling", "Memory Swapping"], correct: "B" }
];

// Soruları karıştıran ve ilk 10 soruyu döndüren fonksiyon
function getRandomQuestions() {
    let shuffled = allQuestionsAdvanced.sort(() => 0.5 - Math.random()); // Soruları karıştır
    return shuffled.slice(0, 10); // İlk 10 tanesini al
}
// **Seçilen sorular**
let questions = getRandomQuestions();
let currentQuestionIndex = 0; 
let score = 0;  
const pointsPerCorrect = 10;
const pointsPerinCorrect = -5;   
isPaused=false;

let timeLeft = 20;  // Süre sınırı (saniye)
let timerInterval; 


// **Soru yükleme fonksiyonu (TIMER ile birlikte)**
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();  // Tüm sorular bitince oyunu tamamla
        return;
    }

    clearInterval(timerInterval); // Timer'ı sıfırla
    timeLeft = 20; 
    document.getElementById("legendary-timer-btn").innerText = `⏳ ${timeLeft}s`;  // Legendary timer'ı güncelle


    timerInterval = setInterval(() => {
        if (!isPaused) {  // **Eğer süre durdurulmamışsa zaman azalsın**
            timeLeft--;
            document.getElementById("legendary-timer-btn").innerText = `⏳ ${timeLeft}s`;  // Legendary timer'ı güncelle
    
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

 
  // Eğer videolu soru ise video kaynağını yükle
    if (currentQuestion.video) {
        const videoElement = document.getElementById("question-video");
        const videoSource = document.getElementById("video-source");
        videoSource.src = `videos/${currentQuestion.video}`;  // Videoyu videos klasöründen al
        videoElement.muted = false;  // Sesli başlat
        videoElement.load(); //video yüklendi
        videoElement.play();
        videoElement.style.display = "block";  // Videoyu görünür yap
        document.getElementById("video-container").style.display = "block";  // Video alanını göster
    } else {
        document.getElementById("question-video").style.display = "none";  // Video gizle
        document.getElementById("video-container").style.display = "none";  // Video alanını gizle
    }



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

              // **Titreme efekti ekle**
        button.classList.add("shake");
        setTimeout(() => {
            button.classList.remove("shake"); // 0.5 saniye sonra kaldır
        }, 500);

            console.log("İlk yanlış yapıldı, ikinci hak verildi.");  

            // **Sadece yanlış seçilen butonu devre dışı bırak**
            button.disabled = true;  
            return;  // **Burada durmalı, ikinci hak için devam etmeli**
        }

        // Eğer çift cevap hakkı yoksa veya ikinci yanlış yapıldıysa:
        button.classList.add("incorrect");
        resultText.innerText = "Yanlış! ❌";
        incorrectSound.play();  

          // **Titreme efekti ekle**
          button.classList.add("shake");
          setTimeout(() => {
              button.classList.remove("shake"); // 0.5 saniye sonra kaldır
          }, 500);
          
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
    
    document.querySelector(".answer-buttons").innerHTML = `
            <div class="home-button-container">
        <button class="home-button" onclick="window.location.href='index.html'">Ana Sayfaya Dön</button>
            </div>`;
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("result").innerText = "";

    const messageContainer = document.createElement("p");
    messageContainer.id = "retry-message";
    
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "level-container";

    if (score >= 100) {
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
document.getElementById("double-answer").addEventListener("click", function() {
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




