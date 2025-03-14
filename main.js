// Başlangıç butonları
const basla = document.querySelector(".baslabtn");
const nasilbtn = document.querySelector(".nasilbtn");
const ayarlar = document.querySelector(".ayarlarbtn");


// Sayfa yönlendirmeleri
document.addEventListener("DOMContentLoaded", () => {
    const junior = document.querySelector("#junior");
    const mid = document.querySelector("#mid");
    const senior = document.querySelector("#senior");

    if (junior) junior.addEventListener("click", () => window.location.href = "junior.html");
    if (mid) mid.addEventListener("click", () => window.location.href = "mid.html");
    if (senior) senior.addEventListener("click", () => window.location.href = "senior.html");
    
    loadQuestion(); // İlk soruyu yükle
});

if (basla) basla.addEventListener('click', () => window.location.href = "basla.html");
if (nasilbtn) nasilbtn.addEventListener('click', () => window.location.href = "nasiloynanir.html");
if (ayarlar) ayarlar.addEventListener('click', () => window.location.href = "ayarlar.html");


//Ayarlar

document.addEventListener("DOMContentLoaded", function () {
    let audio = new Audio("sounds/ses.mp3"); // Buraya müzik dosyanızın yolunu ekleyin
    audio.loop = true; // Müziğin sürekli çalmasını sağlar
    audio.volume = 0.5; // Ses seviyesi %50

    let savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime); // Kaldığı yerden devam ettir
    }

    audio.play(); // Müziği başlat

    window.addEventListener("beforeunload", function () {
        localStorage.setItem("musicTime", audio.currentTime); // Sayfa kapanırken zamanı kaydet
    });
});


// Jokerler 
document.addEventListener("DOMContentLoaded", function () {
    // Joker butonlarını seç
    const doubleAnswerBtn = document.getElementById("double-answer");
    const fiftyFiftyBtn = document.getElementById("fifty-fifty");

    // Çift Cevap Jokeri
    if (doubleAnswerBtn) {
        doubleAnswerBtn.addEventListener("click", function () {
            alert("Çift Cevap Jokeri Kullanıldı! Bu soruda iki cevap hakkınız var.");
            // Burada çift cevap jokeri uygulanacak
            doubleAnswerBtn.disabled = true; // Joker kullanıldıktan sonra devre dışı bırak
        });
    }

    // 50:50 Jokeri
    if (fiftyFiftyBtn) {
        fiftyFiftyBtn.addEventListener("click", function () {
            alert("50:50 Jokeri Kullanıldı! İki yanlış şık kaldırıldı.");
            // Burada yanlış iki şıkkı kaldıracak fonksiyon çağrılabilir
            fiftyFiftyBtn.disabled = true; // Joker kullanıldıktan sonra devre dışı bırak
        });
    }
});






