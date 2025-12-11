const quizBtn = document.getElementById("quiz-btn");
const quizOutput = document.getElementById("quiz-output");
const MAX_QUESTIONS = 5; 

// Data Kuis (tetap sama)
const quizData = [
    {
        question: "Apa nama rumah adat dari suku Minangkabau?",
        options: ["Honai", "Joglo", "Gadang", "Tongkonan"],
        answer: "Gadang"
    },
    {
        question: "Energi alternatif yang berasal dari panas bumi (geothermal) disebut?",
        options: ["Energi Surya", "Energi Geothermal", "Energi Biomassa", "Energi Angin"],
        answer: "Energi Geothermal"
    },
    {
        question: "Tarian dari Bali yang terkenal dan sering menceritakan kisah Ramayana adalah?",
        options: ["Tari Saman", "Tari Kecak", "Tari Piring", "Tari Jaipong"],
        answer: "Tari Kecak"
    },
    {
        question: "Kearifan lokal Subak di Bali terkait dengan manajemen sumber daya apa?",
        options: ["Hutan", "Air", "Angin", "Panas Bumi"],
        answer: "Air"
    },
    {
        question: "Yang mana dari berikut ini yang merupakan sumber energi terbarukan?",
        options: ["Batu Bara", "Gas Alam", "Minyak Bumi", "Energi Angin"],
        answer: "Energi Angin"
    },
    {
        question: "Sistem Sasi di Maluku adalah kearifan lokal yang berfungsi untuk menjaga sumber daya apa?",
        options: ["Lahan Pertanian", "Hutan Bakau", "Hasil Laut", "Pohon Jati"],
        answer: "Hasil Laut"
    },
    {
        question: "Jenis kain tradisional Indonesia yang proses pembuatannya menggunakan malam (lilin) adalah?",
        options: ["Ulos", "Tenun Ikat", "Songket", "Batik"],
        answer: "Batik"
    },
    {
        question: "Pembangkit Listrik Tenaga Surya (PLTS) mengubah energi dari apa menjadi listrik?",
        options: ["Angin", "Cahaya Matahari", "Air", "Panas Bumi"],
        answer: "Cahaya Matahari"
    },
    {
        question: "Alat musik tradisional Jawa Barat yang terbuat dari bambu dan dimainkan dengan cara digoyangkan adalah?",
        options: ["Gamelan", "Angklung", "Sasando", "Kolintang"],
        answer: "Angklung"
    },
    {
        question: "Mengapa energi terbarukan penting untuk 'Harmoni Budaya'?",
        options: ["Mempercepat Pembangunan", "Mengurangi Polusi dan Menjaga Alam", "Tidak Membutuhkan Biaya", "Hanya Digunakan di Kota Besar"],
        answer: "Mengurangi Polusi dan Menjaga Alam"
    }
];

let availableQuestions = []; 
let currentQuestionIndex = -1; 
let score = 0; 
let questionsAnswered = 0; 

// === FUNGSI EXPANDABLE CONTENT ===
function setupExpandableContent() {
    const clickableCards = document.querySelectorAll('.card.clickable');

    clickableCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                // Tutup semua konten yang sedang terbuka
                document.querySelectorAll('.expandable-content.active').forEach(activeContent => {
                    if (activeContent.id !== targetId) {
                        activeContent.classList.remove('active');
                    }
                });
                
                // Toggle konten yang diklik
                targetContent.classList.toggle('active');
            }
        });
    });
}


function startQuiz() {
    score = 0;
    questionsAnswered = 0;
    availableQuestions = Array.from({ length: quizData.length }, (_, i) => i);
    
    const totalQuestionsToShow = Math.min(quizData.length, MAX_QUESTIONS);
    
    quizOutput.innerHTML = `<p>Siap memulai kuis? Anda akan menjawab ${totalQuestionsToShow} pertanyaan.</p>`;
    quizBtn.textContent = "Mulai Kuis";
    quizBtn.onclick = displayQuestion;
    quizBtn.style.display = 'block';
}


function displayQuestion() {
    const totalQuestionsToShow = Math.min(quizData.length, MAX_QUESTIONS);

    if (questionsAnswered >= totalQuestionsToShow || availableQuestions.length === 0) {
        showResults(totalQuestionsToShow); 
        return;
    }

    const randomIndexInAvailable = Math.floor(Math.random() * availableQuestions.length);
    currentQuestionIndex = availableQuestions[randomIndexInAvailable];
    availableQuestions.splice(randomIndexInAvailable, 1);

    const currentQuiz = quizData[currentQuestionIndex];

    let optionsHTML = currentQuiz.options.map(option =>
        `<button class="quiz-option" data-answer="${option}">${option}</button>`
    ).join('');

    quizOutput.innerHTML = `
        <div id="quiz-container">
            <h3>Pertanyaan ${questionsAnswered + 1} dari ${totalQuestionsToShow}</h3>
            <p>${currentQuiz.question}</p>
            <div class="options-container">
                ${optionsHTML}
            </div>
            <p id="feedback" class="feedback-text"></p>
        </div>
    `;
    
    quizBtn.style.display = 'none';

    document.querySelectorAll('.quiz-option').forEach(button => {
        button.addEventListener('click', handleAnswer);
    });
}

function handleAnswer(event) {
    const selectedAnswer = event.target.dataset.answer;
    const correctAnswer = quizData[currentQuestionIndex].answer;
    const feedback = document.getElementById('feedback');
    const totalQuestionsToShow = Math.min(quizData.length, MAX_QUESTIONS);

    document.querySelectorAll('.quiz-option').forEach(button => {
        button.disabled = true;
        if (button.dataset.answer === correctAnswer) {
            button.classList.add('correct'); 
        }
        if (button.dataset.answer === selectedAnswer && selectedAnswer !== correctAnswer) {
            button.classList.add('incorrect-selected'); 
        }
    });

    if (selectedAnswer === correctAnswer) {
        feedback.textContent = "✅ Jawaban Anda Benar! Kerja bagus!";
        score++; 
    } else {
        feedback.textContent = `❌ Jawaban Salah. Jawaban yang benar adalah: ${correctAnswer}.`;
    }

    questionsAnswered++; 

    quizBtn.style.display = 'block';
    
    quizBtn.textContent = (questionsAnswered >= totalQuestionsToShow) ? "Lihat Hasil Akhir" : "Pertanyaan Selanjutnya";
    
    quizBtn.onclick = displayQuestion;
}

function showResults(totalQuestions) {
    let message = "";
    
    if (score === totalQuestions) {
        message = "Luar Biasa! Pengetahuan Budaya dan Energi Anda Sempurna! Anda adalah penjaga harmoni yang hebat.";
    } else if (score >= totalQuestions * 0.7) {
        message = "Hebat! Anda memiliki pemahaman yang sangat baik tentang Budaya dan Energi Bersih.";
    } else if (score >= totalQuestions / 2) {
        message = "Bagus! Pemahaman Anda sudah cukup baik. Mari jelajahi lebih banyak di website ini.";
    } else {
        message = "Terima kasih sudah mencoba. Jangan menyerah, mari tingkatkan pengetahuan Anda!";
    }

    quizOutput.innerHTML = `
        <div id="quiz-results">
            <h2>🎉 Kuis Selesai! 🎉</h2>
            <p>Skor Akhir Anda adalah: <b>${score} dari ${totalQuestions}</b></p>
            <p>${message}</p>
        </div>
    `;

    quizBtn.textContent = "Mulai Kuis Baru";
    quizBtn.onclick = startQuiz; 
}


// Inisialisasi
document.addEventListener("DOMContentLoaded", function() {
    setupExpandableContent(); 
    startQuiz(); 
});