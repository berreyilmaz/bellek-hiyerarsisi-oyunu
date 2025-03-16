let questions = [];  // Global değişken olarak tanımla

document.addEventListener("DOMContentLoaded", function() {
    questions = getRandomQuestions(); // Sayfa yüklendiğinde 10 rastgele soru al
    loadQuestion();
});

// Ses dosyalarını yükle
const correctSound = new Audio("sounds/correct.mp3");  
const incorrectSound = new Audio("sounds/incorrect.mp3");  

// MID seviyesindeki soru listesi

const allQuestions = [
    { question: "İşlemcinin komutları geçici olarak depoladığı bellek türü nedir?", options: ["RAM", "Cache", "ROM", "Register"], correct: "D" },
    { question: "Aşağıdaki bellek türlerinden hangisi kalıcı veri saklama için kullanılır?", options: ["RAM", "Cache", "SSD", "Register"], correct: "C" },
    { question: "RAM neden işlemciye kıyasla daha yavaştır?", options: ["Mekanik parçalar içerdiği için", "Elektrik sinyalleri geç işlediği için", "Gecikme süreleri daha yüksek olduğu için", "İşlemciden daha büyük olduğu için"], correct: "C" },
    { question: "Aşağıdakilerden hangisi sistem belleği türlerinden biri değildir?", options: ["RAM", "ROM", "Cache", "PCIe"], correct: "D" },
    { question: "Bir işletim sistemi bellek yönetimi yaparken hangi yöntemi kullanır?", options: ["Fragmentation", "Virtual Memory", "Overclocking", "Defragmentation"], correct: "B" },
    { question: "Hangi bileşen en hızlı veri erişim hızına sahiptir?", options: ["HDD", "RAM", "SSD", "Cache"], correct: "D" },
    { question: "32-bit bir sistemin maksimum RAM adresleme kapasitesi nedir?", options: ["2GB", "4GB", "8GB", "16GB"], correct: "B" },
    { question: "CPU ve RAM arasındaki veri transfer hızını artıran bileşen nedir?", options: ["Cache Bellek", "Sabit Disk", "Ethernet Kartı", "Ekran Kartı"], correct: "A" },
    { question: "Aşağıdaki depolama birimlerinden hangisi en düşük erişim süresine sahiptir?", options: ["HDD", "SSD", "Cache", "RAM"], correct: "C" },
    { question: "Bir sistemin bellek bant genişliği nasıl artırılabilir?", options: ["SSD hızını artırarak", "Daha fazla işlemci çekirdeği ekleyerek", "RAM frekansını yükselterek", "Daha büyük bir ekran kartı kullanarak"], correct: "C" },
    { question: "Swap alanı hangi amaçla kullanılır?", options: ["İşlemcinin daha hızlı çalışmasını sağlamak", "RAM yetersiz kaldığında sanal bellek olarak kullanmak", "Sabit diskte geçici dosya depolamak", "Sistemi daha güvenli hale getirmek"], correct: "B" },
    { question: "RAM’de saklanan veriler bilgisayar kapatıldığında ne olur?", options: ["Silinir", "Sabit diske taşınır", "ROM içine kaydedilir", "Hiçbir değişiklik olmaz"], correct: "A" },
    { question: "L1, L2 ve L3 önbellek arasındaki temel fark nedir?", options: ["Kapasiteleri ve hızları farklıdır", "L1 en yavaş olanıdır", "L3 işlemci içinde yer almaz", "L2 sadece grafik işlemleri için kullanılır"], correct: "A" },
    { question: "RAM frekansı neden önemlidir?", options: ["Görsel kalitesi artırmak için", "İşlemci hızıyla senkron çalışmasını sağlamak için", "Daha fazla depolama alanı sağlamak için", "Sistemin güç tüketimini düşürmek için"], correct: "B" },
    { question: "DDR4 ile DDR5 arasındaki fark nedir?", options: ["DDR5 daha az güç tüketir", "DDR4 daha hızlıdır", "DDR5 sadece mobil cihazlarda kullanılır", "DDR4 daha yüksek frekanslara ulaşır"], correct: "A" },
    { question: "Bellek modüllerinin kapasitesi hangi birim ile ölçülür?", options: ["MHz", "GB", "ns", "Kb"], correct: "B" },
    { question: "RAM’in veri aktarım hızını belirleyen en önemli faktör nedir?", options: ["Boyutu", "Frekansı ve zamanlaması", "Markası", "Kasa tipi"], correct: "B" },
    { question: "Hangi bellek türü verileri sadece okuma amaçlı saklar?", options: ["RAM", "ROM", "Cache", "VRAM"], correct: "B" },
    { question: "ECC RAM’in avantajı nedir?", options: ["Daha yüksek kapasite sunar", "Hata düzeltme mekanizması içerir", "Daha az güç tüketir", "Grafik işlemleri için optimize edilmiştir"], correct: "B" },
    { question: "İşlemci çekirdek sayısının fazla olması hangi avantajı sağlar?", options: ["Daha fazla enerji tasarrufu", "Daha yüksek ekran yenileme hızı", "Daha iyi çoklu görev performansı", "Daha düşük ısı üretimi"], correct: "C" },
    { question: "Bir işlemciye aynı anda birden fazla komut vermek için hangi teknik kullanılır?", options: ["Overclocking", "Pipelining", "Defragmentation", "Partitioning"], correct: "B" },
    { question: "RAM ve ROM arasındaki temel fark nedir?", options: ["RAM geçici, ROM kalıcıdır", "RAM sadece okunabilir, ROM yazılabilir", "ROM verileri daha hızlı işler", "RAM daha az enerji tüketir"], correct: "A" },
    { question: "Hangi bellek türü en düşük gecikme süresine sahiptir?", options: ["HDD", "RAM", "SSD", "Cache"], correct: "D" },
    { question: "İşlemcinin hızını belirleyen en önemli faktörlerden biri nedir?", options: ["Çekirdek sayısı", "Anakart modeli", "İşletim sistemi", "Ekran kartı"], correct: "A" },
    { question: "Bilgisayarda verilerin uzun süreli saklanması için hangi bellek türü kullanılır?", options: ["RAM", "Cache", "SSD", "Register"], correct: "C" },
    { question: "İşlemcinin temel bileşenlerinden biri olan ALU'nun açılımı nedir?", options: ["Arithmetic and Logic Unit", "Advanced Learning Unit", "Automatic Load Utility", "Address Line Unit"], correct: "A" },
    { question: "Aşağıdakilerden hangisi RAM’in hızını etkileyen faktörlerden biri değildir?", options: ["Frekans değeri", "CAS gecikme süresi", "Anakart modeli", "Güç kaynağı kapasitesi"], correct: "D" },
    { question: "Sanal bellek hangi bileşen üzerinde oluşturulur?", options: ["RAM", "SSD veya HDD", "GPU", "İşlemci"], correct: "B" },
    { question: "SSD’lerin en büyük avantajı nedir?", options: ["Daha fazla depolama alanı sunar", "Daha düşük gecikme süresine sahiptir", "Daha ucuzdur", "Daha fazla mekanik parça içerir"], correct: "B" },
    { question: "Bilgisayarda bellek yönetimini hangi bileşen gerçekleştirir?", options: ["İşlemci", "RAM", "İşletim Sistemi", "Güç kaynağı"], correct: "C" },
    { question: "CPU’nun çalışma hızını artırmak için hangi yöntem uygulanır?", options: ["RAM kapasitesini artırma", "SSD kullanımını artırma", "Overclocking", "BIOS güncellemesi yapma"], correct: "C" },
    { question: "Hangi bellek türü yalnızca okuma işlemi için kullanılır?", options: ["RAM", "ROM", "Cache", "Virtual Memory"], correct: "B" },
    { question: "Bilgisayarda L1, L2 ve L3 bellek türleri neyi ifade eder?", options: ["RAM çeşitlerini", "Ön bellek seviyelerini", "Sabit disk bölümlerini", "Grafik belleği türlerini"], correct: "B" },
    { question: "RAM’in veri işleme hızını belirleyen en önemli faktörlerden biri nedir?", options: ["CAS Latency (Gecikme Süresi)", "İşlemci frekansı", "GPU modeli", "Anakart boyutu"], correct: "A" },
    { question: "Bilgisayar kapatıldığında hangi bellek türündeki veriler silinmez?", options: ["RAM", "Cache", "ROM", "Register"], correct: "C" },
    { question: "İşlemci ile RAM arasındaki veri akışını yöneten bileşen nedir?", options: ["GPU", "Northbridge", "SSD", "PSU"], correct: "B" },
    { question: "Aşağıdakilerden hangisi birincil bellek türüdür?", options: ["RAM", "SSD", "HDD", "Flash Bellek"], correct: "A" },
    { question: "Bilgisayarda L1, L2 ve L3 bellek türleri neyi ifade eder?", options: ["RAM çeşitlerini", "Ön bellek seviyelerini", "Sabit disk bölümlerini", "Grafik belleği türlerini"], correct: "B" },
    { question: "RAM’in veri işleme hızını belirleyen en önemli faktörlerden biri nedir?", options: ["CAS Latency (Gecikme Süresi)", "İşlemci frekansı", "GPU modeli", "Anakart boyutu"], correct: "A" },
    { question: "Bilgisayar kapatıldığında hangi bellek türündeki veriler silinmez?", options: ["RAM", "Cache", "ROM", "Register"], correct: "C" }
];


// **Soruları rastgele karıştır ve ilk 10 tanesini seç**
function getRandomQuestions() {
    let shuffled = allQuestions.sort(() => 0.5 - Math.random());  // Soruları karıştır
    return shuffled.slice(0, 10); // İlk 10 tanesini seç
}


// **Seçilen sorular**
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
