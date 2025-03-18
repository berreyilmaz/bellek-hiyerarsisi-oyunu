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

    // Önceki kaldığı süreyi al
    let savedTime = sessionStorage.getItem("musicTime");
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    audio.play(); // Müziği başlat
    
    // Sayfa değiştirilirken zamanı kaydet
    window.addEventListener("beforeunload", function () {
        sessionStorage.setItem("musicTime", audio.currentTime);
    });

    let musicButton = document.getElementById("muzik-volume-upbtn");
    let musicSlider = document.getElementById("muzikvolumeControl");
    
    window.addEventListener("pagehide", function () {
        window.sharedAudio = audio; // Müziği hafızada tut
    });

    // Müzik butonuna basınca sesi aç/kapat
    musicButton.addEventListener("click", function () {
        if (audio.volume > 0) {
            audio.volume = 0;
            musicButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            audio.volume = musicSlider.value;
            musicButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
    });

    // Ses çubuğuyla sesi ayarla
    musicSlider.addEventListener("input", function () {
        audio.volume = musicSlider.value;
        localStorage.setItem("musicVolume", audio.volume);
        musicButton.innerHTML = audio.volume > 0 ? 
            '<i class="fa-solid fa-volume-high"></i>' : 
            '<i class="fa-solid fa-volume-xmark"></i>';
    });


});




// Jokerler 
document.addEventListener("DOMContentLoaded", function () {
    // Joker butonlarını seç
    const doubleAnswerBtn = document.getElementById("double-answer");
    const fiftyFiftyBtn = document.getElementById("fifty-fifty");
    const timeFreezeBtn = document.getElementById("time-freeze-btn");

    // Çift Cevap Jokeri
    if (doubleAnswerBtn) {
        doubleAnswerBtn.addEventListener("click", function () {
            alert("Çift Cevap Jokeri Kullanıldı! Bu soruda iki cevap hakkınız var.");
            doubleAnswerBtn.disabled = true; // Joker kullanıldıktan sonra devre dışı bırak
        });
    }

    // 50:50 Jokeri
    if (fiftyFiftyBtn) {
        fiftyFiftyBtn.addEventListener("click", function () {
            alert("50:50 Jokeri Kullanıldı! İki yanlış şık kaldırıldı.");
            fiftyFiftyBtn.disabled = true; // Joker kullanıldıktan sonra devre dışı bırak
        });
    }

    // Zaman Dondurma Jokeri
    if (timeFreezeBtn) {
        timeFreezeBtn.addEventListener("click", function () {
            alert("Zaman Dondurma Jokeri Kullanıldı! Süre geçici olarak durduruldu.");
            timeFreezeBtn.disabled = true; // Joker kullanıldıktan sonra devre dışı bırak
            // Burada süreyi durdurma fonksiyonunu çağırabilirsin
        });
    }
 
});







document.addEventListener("DOMContentLoaded", function () {
    const jokerContainer = document.getElementById("joker-container");

    if (jokerContainer) {
        jokerContainer.innerHTML = `
            <button id="double-answer" class="joker-btn" onclick="useDoubleAnswer()">2️⃣✔️Çift Cevap</button>
            <button id="fifty-fifty" class="joker-btn" onclick="useFiftyFifty()">5️⃣0️⃣:5️⃣0️⃣Şık Eleme</button>
            <button id="time-freeze-btn" class="joker-btn" onclick="useTimeFreeze()">⏳ Zaman Dondur</button>
        `;
    }

    // Butonları tekrar seç ve görünür yap
    const timeFreezeBtn = document.getElementById("time-freeze-btn");
    const skipQuestionBtn = document.getElementById("skip-question-btn");

    if (timeFreezeBtn) timeFreezeBtn.style.display = "inline-block";
    if (skipQuestionBtn) skipQuestionBtn.style.display = "inline-block";
});


