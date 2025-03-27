// let questions = [];  // Global değişken olarak tanımla

// document.addEventListener("DOMContentLoaded", function() {
//     questions = getRandomQuestions(); // Sayfa yüklendiğinde 10 rastgele soru al
//     loadQuestion(); // İlk soruyu yükle
// });

// Ses dosyalarını yükle
const correctSound = new Audio("sounds/correct.mp3");  // ✅ Doğru cevap sesi
const incorrectSound = new Audio("sounds/incorrect.mp3");  // ❌ Yanlış cevap sesi

// SENIOR seviyesindeki soru listesi
const allQuestionsAdvanced = [
    { question: "Bir işlemcinin içindeki çekirdeklerin birbirinden bağımsız çalışmasına ne denir?", options: ["Hyper-threading", "Multi-core Processing", "Parallel Processing", "Virtualization"], correct: "B" },
    { question: "64-bit sistemlerin 32-bit sistemlere göre avantajı nedir?", options: ["Daha fazla RAM adreslemesi yapabilirler", "Daha hızlı işlemci performansı sağlarlar", "Daha az enerji tüketirler", "Daha düşük fiyatlarla satılırlar"], correct: "A" },
    { question: "Bir bilgisayardaki veri yolu bant genişliği, hangi faktörle doğru orantılıdır?", options: ["İşlemci hızı", "Bellek frekansı", "GPU kapasitesi", "Ekran kartı hızı"], correct: "B" },
    { question: "RAM ve CPU arasındaki veri iletişimi hangi yolu kullanarak yapılır?", options: ["PCIe", "Bus", "SATA", "USB"], correct: "B" },
    { question: "Bir bilgisayardaki işlemcinin performansını artırmak için hangi işlem yapılır?", options: ["Overclocking", "Underclocking", "Fragmentation", "Virtualization"], correct: "A" },
    { question: "SSD teknolojisinde kullanılan NAND flash bellek hücresinin temel yapısı nedir?", options: ["Yazma ve silme işlemleri için daha fazla enerji harcar", "Veriler sadece tek katman üzerinde saklanır", "Veriler elektriksel yükle saklanır", "Sadece okuma işlemleri yapılabilir"], correct: "C" },
    { question: "Hangi bellek türü, veri iletim hızının düşük olmasına rağmen, sürekli veri saklamak için kullanılır?", options: ["RAM", "Cache", "ROM", "EPROM"], correct: "C" },
    { question: "İşlemcinin çalıştırdığı komutların sayısına ve hızına göre performansı belirlemek için hangi ölçüm kullanılır?", options: ["Clock Cycles", "MIPS", "Throughput", "FLOPS"], correct: "B" },
    { question: "Aşağıdakilerden hangisi işlemci için bir paralel işlem yapabilme özelliğini ifade eder?", options: ["Pipelining", "Multithreading", "Virtualization", "Cache Memory"], correct: "B" },
    { question: "İşlemci ve bellek arasındaki veri transferini hızlandıran teknolojilerin genel adı nedir?", options: ["Direct Memory Access (DMA)", "Hyper-Threading", "Cache Coherency", "Bus Width"], correct: "A" },
    { question: "Aşağıdakilerden hangisi SSD'nin en büyük avantajlarından biridir?", options: ["Daha düşük güç tüketimi", "Daha fazla kapasite", "Daha hızlı veri erişimi", "Daha ucuz"], correct: "C" },
    { question: "Hangi sistem bileşeni, daha yüksek işlem gücü ve çoklu görev kapasitesi sağlamak için işlemcinin çekirdek sayısını artırır?", options: ["GPU", "RAM", "Cache", "CPU"], correct: "D" },
    { question: "DDR4 bellek teknolojisinin avantajı nedir?", options: ["Daha düşük güç tüketimi", "Daha hızlı veri transferi", "Daha fazla depolama kapasitesi", "Daha düşük gecikme süreleri"], correct: "B" },
    { question: "İşlemci hızını artırmak için kullanılan işlemci saat frekansı neyi ifade eder?", options: ["Frekans arttıkça işlemci daha hızlı çalışır", "Daha fazla çekirdek sayısı", "İşlemcinin daha fazla veri saklama kapasitesi", "Daha fazla güç tüketimi"], correct: "A" },
    { question: "Aşağıdaki bileşenlerden hangisi en düşük gecikme süresine sahip olanıdır?", options: ["HDD", "RAM", "Cache", "SSD"], correct: "C" },
    { question: "Bir işletim sisteminde sanal bellek oluşturulması, hangi donanım bileşenini kullanır?", options: ["RAM", "SSD", "CPU", "HDD"], correct: "B" },
    { question: "CPU'nun çalışma hızını artırmak için hangi yöntem uygulanır?", options: ["Overclocking", "ECC RAM kullanımı", "Yüksek bellek kapasitesi", "Daha fazla çekirdek kullanımı"], correct: "A" },
    { question: "İşlemcinin tek bir komut döngüsünde gerçekleştirdiği işlem sayısına ne denir?", options: ["Clock Speed", "Throughput", "Instructions Per Cycle (IPC)", "FLOPS"], correct: "C" },
    { question: "Bir CPU'nun işlem yaparken kullandığı küçük veri depolama alanlarına ne ad verilir?", options: ["Cache", "Registers", "RAM", "ROM"], correct: "B" },
    { question: "Aşağıdaki teknolojilerden hangisi işlemci çekirdeklerini sanal olarak artırarak paralel işleme yapabilmeyi sağlar?", options: ["Virtualization", "Hyper-Threading", "Multithreading", "Pipelining"], correct: "B" },
    { question: "İşlemcinin, işlem sırasında başvuracağı talimat seti ve uygulama türünü belirleyen özellik nedir?", options: ["Instruction Set Architecture (ISA)", "Processor Core", "Clock Cycle", "Cache Size"], correct: "A" },
    { question: "İşlemcilerde kullanılan 'turbo boost' teknolojisinin amacı nedir?", options: ["İşlemci hızını otomatik olarak arttırmak", "Fazla enerji tüketimini azaltmak", "Soğutma sistemini iyileştirmek", "İşlemci çekirdek sayısını artırmak"], correct: "A" },
    { question: "İşlemci ve bellek arasındaki veri akışını yöneten ve hızlandıran teknoloji nedir?", options: ["HyperTransport", "PCIe", "SATA", "USB 3.0"], correct: "A" },
    { question: "Bir bilgisayarın merkezi işlem biriminin tüm hesaplama işlemlerini kontrol eden birimi nedir?", options: ["Control Unit", "ALU", "Register", "Cache"], correct: "A" },
    { question: "Modern CPU'larda çoklu görevleri daha hızlı işlemek için hangi özellik kullanılır?", options: ["Hyper-Threading", "Overclocking", "Turbo Boost", "Cache Memory"], correct: "A" },
    { question: "Bir RAM modülünün daha fazla veri transfer hızına sahip olması için hangi faktör etkili olur?", options: ["Frekansı", "Bant genişliği", "Boyutu", "Tüm şıklar"], correct: "D" },
    { question: "SSD'lerde kullanılan S.M.A.R.T teknolojisi ne işe yarar?", options: ["SSD'nin çalışma ömrünü izler", "Sistemi hızlandırır", "Veri şifreleme yapar", "Sadece okuma hızını artırır"], correct: "A" },
    { question: "Aşağıdaki bellek türlerinden hangisi bilgisayarda en hızlı veri erişim hızına sahiptir?", options: ["HDD", "Cache", "RAM", "SSD"], correct: "B" }
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



function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    loadQuestion();
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById("question-text").innerHTML = `<h2>Tebrikler! Senior seviyesini tamamladınız! 🎉</h2>`;

    document.querySelector(".answer-buttons").innerHTML = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("result").innerText = "";

    if (score >= 75) {
        document.getElementById("question-text").innerHTML += `
        <p>Gerçek bir efsane misin? "Legendary" seviyesine geçmeye cesaretin var mı?</p>
        <div class="button-container">
            <button id="yes-legendary" class="btn-yes">Evet, efsane olmaya hazırım!</button>
            <button id="no-legendary" class="btn-no">Şimdilik yeterli!</button>
        </div>
        <div id="video-container" style="display: none;">
            <video id="legendary-video" width="640" height="360" controls>
                <source src="videos/video2.mp4" type="video/mp4">
                Tarayıcınız video etiketini desteklemiyor.
            </video>
        </div>
        `;

        document.getElementById("yes-legendary").addEventListener("click", function() {
            document.querySelector(".button-container").style.display = "none"; // Butonları gizle
            document.getElementById("video-container").style.display = "block"; // Videoyu göster
            let video = document.getElementById("legendary-video");
            video.play();

            // Fullscreen işlemi
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) { // Firefox
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) { // Chrome, Safari ve Opera
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { // IE/Edge
                video.msRequestFullscreen();
            }

            // Video bitince Legendary seviyesine yönlendir
            video.onended = function() {
                window.location.href = "legendary.html";
            };
        });

        document.getElementById("no-legendary").addEventListener("click", function() {
            document.getElementById("question-text").innerHTML = `
                <h2>Tebrikler! Skorunuz: ${score} 🏆</h2>
                <p>Daha cesur bir zamanında görüşmek üzere...</p>
            `;
        });

    } else {
        document.getElementById("question-text").innerHTML += `
            <p>😞 Skorunuz yeterli değil! Yeniden deneyin.</p>
            <button id="retry-btn" class="btn-retry">Yeniden Çöz</button>
        `;

        // **Burada 'addEventListener' Hatasını Engellemek İçin Kontrol Ekliyoruz**
        setTimeout(() => {
            let retryButton = document.getElementById("retry-btn");
            if (retryButton) {
                retryButton.addEventListener("click", function() {
                    window.location.reload();
                });
            } else {
                console.error("Yeniden Çöz butonu bulunamadı!");
            }
        }, 500);
    }
}





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