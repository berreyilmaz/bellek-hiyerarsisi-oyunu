// Başlangıç butonları
const basla = document.querySelector(".baslabtn");
const nasilbtn = document.querySelector(".nasilbtn");
const ayarlar = document.querySelector(".ayarlarbtn");
const legendary = document.querySelector("#legendary");

// Sayfa yönlendirmeleri
document.addEventListener("DOMContentLoaded", () => {
    const junior = document.querySelector("#junior");
    const mid = document.querySelector("#mid");
    const senior = document.querySelector("#senior");

    if (junior) junior.addEventListener("click", () => window.location.href = "junior.html");
    if (mid) mid.addEventListener("click", () => window.location.href = "mid.html");
    if (senior) senior.addEventListener("click", () => window.location.href = "senior.html");

    // loadQuestion fonksiyonu varsa çalıştır
    if (typeof loadQuestion === "function") {
        loadQuestion(); // İlk soruyu yükle
    } else {
        console.warn("loadQuestion fonksiyonu tanımlı değil!");
    }
});

if (basla) basla.addEventListener('click', () => window.location.href = "basla.html");
if (nasilbtn) nasilbtn.addEventListener('click', () => window.location.href = "nasiloynanir.html");
if (ayarlar) ayarlar.addEventListener('click', () => window.location.href = "ayarlar.html");
if (legendary) {
    legendary.addEventListener('click', () => {
        Swal.fire({
            title: 'Herkes efsane olamaz!',
            text: 'Efsanevi de oynamak için önce senioru tamamlamalısın.',
            icon: 'warning',
            background: '#f5f5f5', // Açık gri arka plan
        });
    });
}

// AYARLAR 
document.addEventListener("DOMContentLoaded", function () {
    let audio = new Audio("sounds/ses.mp3");
    audio.loop = true;

    // **Önceki ses seviyesi, zaman ve mute durumu kontrol et**
    let savedVolume = localStorage.getItem("musicVolume");
    let savedTime = localStorage.getItem("musicTime");
    let isMuted = localStorage.getItem("isMuted") === "true"; // Ses kapalı mı?

    // **Ses seviyesi ayarla, eğer mute ise ses 0 olsun**
    if (isMuted) {
        audio.volume = 0;
    } else {
        audio.volume = savedVolume ? parseFloat(savedVolume) : 0.5;
    }

    // **Müzik kaldığı yerden devam etsin**
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    audio.play();

    // **Sayfa kapanırken süreyi kaydet**
    window.addEventListener("beforeunload", function () {
        localStorage.setItem("musicTime", audio.currentTime);
    });

    let musicButton = document.getElementById("muzik-volume-upbtn");
    let musicSlider = document.getElementById("muzikvolumeControl");

    // **Sayfa yüklendiğinde butonun durumunu kontrol et**
    if (isMuted) {
        musicButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; // Sessiz
    } else {
        musicButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>'; // Ses açık
    }

    // **Mute butonu ses kapat/aç**
    musicButton.addEventListener("click", function () {
        if  (audio.volume > 0) {
            // Eğer ses açıksa, sesi kapat
            audio.volume = 0;
            localStorage.setItem("isMuted", "true"); // Ses kapalı
            musicButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
              // Eğer ses kapalıysa, ses aç ve biraz arttır
              audio.volume = Math.min(1, audio.volume + 0.1); // Ses seviyesini arttır (max: 1)
              localStorage.setItem("isMuted", "false"); // Ses açık
              musicButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
        localStorage.setItem("musicVolume", audio.volume); // Ses seviyesini kaydet

          // **Ses açıldığında, çubuğu da yeni seviyeye ayarla**
          musicSlider.value = audio.volume; // Çubuğu güncelle
    });

    // **Ses çubuğuyla sesi ayarla**
    musicSlider.value = audio.volume; // Mevcut sesi kaydırıcıya uygula
    musicSlider.addEventListener("input", function () {
        audio.volume = musicSlider.value;
        localStorage.setItem("musicVolume", audio.volume);
        localStorage.setItem("isMuted", "false"); // Ses açıldı olarak işaretle
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

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalContainer");
    const btn = document.getElementById("hzrbtn");
    const closeBtn = document.querySelector(".close-btn");
    modal.style.display = "none";

    // Butona tıklanınca modal aç
    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Kapatma butonuna tıklanınca modalı kapat
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Modal dışına tıklayınca kapansın
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
