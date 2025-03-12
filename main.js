const basla = document.querySelector(".baslabtn");
const nasilbtn = document.querySelector(".nasilbtn");
const ayarlar = document.querySelector(".ayarlarbtn");



document.addEventListener("DOMContentLoaded", () => {
    const junior = document.querySelector("#junior");
    const mid = document.querySelector("#mid");
    const senior = document.querySelector("#senior");

    junior.addEventListener("click", () => {
        window.location.href = "junior.html";
    });

    mid.addEventListener("click", () => {
        window.location.href = "mid.html";
    });

    senior.addEventListener("click", () => {
        window.location.href = "senior.html";
    });
});



basla.addEventListener('click', () => {
    window.location.href = "basla.html";
})

nasilbtn.addEventListener('click', () => {
    window.location.href = "nasiloynanir.html";
})

ayarlar.addEventListener('click', () => {
    window.location.href = "ayarlar.html";
})



function checkAnswer(button, answer) {
    const correctAnswer = "B"; // Doğru cevap Önbellek (Cache)

    // Önce tüm butonların rengini sıfırla
    let buttons = document.querySelectorAll(".option");
    buttons.forEach(btn => {
        btn.classList.remove("correct", "incorrect");
    });

    if (answer === correctAnswer) {
        button.classList.add("correct");
        document.getElementById("result").innerText = "Doğru! 🚀";
    } else {
        button.classList.add("incorrect");
        document.getElementById("result").innerText = "Yanlış! Tekrar dene. ❌";
    }
}




