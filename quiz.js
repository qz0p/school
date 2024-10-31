const quizQuestions = [
    {
        question: "남한고등학교의 설립연도는?",
        options: ["1950년", "1957년", "1961년", "1962년"],
        correct: 3
    },
    {
        question: "우리 학교의 교훈에 있는 내용은?",
        options: ["성실", "협동", "창의", "정직"],
        correct: 0
    },
    {
        question: "우리 학교의 교화는?",
        options: ["장미", "무궁화", "개나리", "진달래"],
        correct: 2
    },
    {
        question: "우리 학교의 교목은?",
        options: ["은행나무", "소나무", "느티나무", "단풍나무"],
        correct: 0
    },
    {
        question: "우리 학교가 위치한 지역은?",
        options: ["경기도 성남시", "경기도 광주시", "경기도 하남시", "경기도 용인시"],
        correct: 2
    }
];

let currentQuiz = 0;
let score = 0;
let answered = false;

function loadQuiz() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const currentQuestion = quizQuestions[currentQuiz];
    
    document.getElementById('currentQuestion').textContent = currentQuiz + 1;
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';
    
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'quiz-option';
        button.onclick = () => selectOption(index);
        optionsEl.appendChild(button);
    });
    
    answered = false;
    document.getElementById('submitBtn').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('result').textContent = '';
}

function selectOption(index) {
    if (answered) return;
    
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
}

function checkAnswer() {
    if (answered) return;
    
    const selectedOption = document.querySelector('.quiz-option.selected');
    if (!selectedOption) {
        alert('답을 선택해주세요!');
        return;
    }
    
    answered = true;
    const selectedAnswer = Array.from(document.querySelectorAll('.quiz-option')).indexOf(selectedOption);
    const correct = quizQuestions[currentQuiz].correct;
    
    if (selectedAnswer === correct) {
        score++;
        document.getElementById('result').textContent = '정답입니다!';
        selectedOption.classList.add('correct');
    } else {
        document.getElementById('result').textContent = '틀렸습니다.';
        selectedOption.classList.add('wrong');
        document.querySelectorAll('.quiz-option')[correct].classList.add('correct');
    }
    
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
    currentQuiz++;
    
    if (currentQuiz < quizQuestions.length) {
        loadQuiz();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    document.getElementById('quizBox').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('finalResult').style.display = 'block';
    document.getElementById('correctCount').textContent = score;
    document.getElementById('totalCorrect').textContent = quizQuestions.length;

    // 만점일 경우 축하 효과 표시
    if (score === quizQuestions.length) {
        showCelebration();
        document.getElementById('finalResult').innerHTML += `
            <div class="perfect-score">
                <h3>🎉 완벽합니다! 🎉</h3>
                <p>남한고등학교에 대해 정말 잘 알고 계시네요!</p>
                <div class="fireworks"></div>
            </div>
        `;
    } else {
        document.getElementById('finalResult').innerHTML += `
            <p>다시 한 번 도전해보세요!</p>
        `;
    }
}

// 축하 효과 함수
function showCelebration() {
    const celebrationStyles = document.createElement('style');
    celebrationStyles.innerHTML = `
        @keyframes confetti {
            0% { transform: translateY(0) rotateX(0) rotateY(0); }
            100% { transform: translateY(100vh) rotateX(360deg) rotateY(360deg); }
        }
    `;
    document.head.appendChild(celebrationStyles);

    // 색종이 효과 생성
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: ${getRandomColor()};
            left: ${Math.random() * 100}vw;
            top: -20px;
            animation: confetti 3s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        document.body.appendChild(confetti);
    }

    // 3초 후 색종이 제거
    setTimeout(() => {
        document.querySelectorAll('.confetti').forEach(el => el.remove());
    }, 5000);
}

// 랜덤 색상 생성 함수
function getRandomColor() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function restartQuiz() {
    currentQuiz = 0;
    score = 0;
    document.getElementById('quizBox').style.display = 'block';
    document.getElementById('result').style.display = 'block';
    document.getElementById('finalResult').style.display = 'none';
    loadQuiz();
}

// 이벤트 리스너 설정
document.getElementById('submitBtn').addEventListener('click', checkAnswer);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('restartBtn').addEventListener('click', restartQuiz);

// 퀴즈 초기 로드
loadQuiz(); 