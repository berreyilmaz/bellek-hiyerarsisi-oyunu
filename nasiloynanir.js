// Tıklanan görseli büyütüp tam ekran göstermek için fonksiyon
function enlargeImage(img) {
    const overlay = document.getElementById("overlay"); // Overlay alanını seçiyoruz
    const expandedImg = document.getElementById("expanded-img"); // Büyütülmüş görseli alıyoruz
    
    expandedImg.src = img.src;  // Tıklanan görselin 'src' değerini büyütülmüş görsele kopyalıyoruz
    overlay.style.display = "flex";  // Overlay'i görünür hale getiriyoruz
}

// Overlay'e tıklandığında büyütülen görseli kapatmak için fonksiyon
function closeImage() {
    const overlay = document.getElementById("overlay"); // Overlay alanını seçiyoruz
    overlay.style.display = "none";  // Overlay'i gizli hale getiriyoruz
}

// Sayfa yüklendikten sonra, görsellerin üzerine tıklanabilir işlev eklemek
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".thumbnail"); // Görselleri seçiyoruz
    images.forEach(image => {
        image.addEventListener("click", function() {
            enlargeImage(image); // Tıklanan görseli büyütüyoruz
        });
    });

    // Overlay alanına tıklanırsa, büyütülen görseli kapatıyoruz
    const overlay = document.getElementById("overlay");
    overlay.addEventListener("click", function() {
        closeImage(); // Görseli kapatıyoruz
    });
});
