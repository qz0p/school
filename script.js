// 시설 목록
const facilities = [
    "학교정문", 
    "운동장",
    "과학실",
    "도서관"
];

// 교육과정 목록
const programs = [
    { name: '인문계열', description: '국어, 영어, 수학, 사회 중점' },
    { name: '자연계열', description: '수학, 과학 중점' },
    { name: '특별활동', description: '다양한 동아리 활동' }
];

// 퀴즈 문제
const quizQuestions = [
    {
        question: "남한고등학교의 설립연도는?",
        options: ["1952년", "1998년", "1962년", "1960년"],
        correct: 3
    },
    {
        question: "남한고등학교의 교훈에 들어가는 단어는?",
        options: ["정의", "협동", "창의", "정직"],
        correct: 1
    },
    {
        question: "남한고등학교의 교목으로 올바른 것은??",
        options: ["소나무", "은행나무", "단풍나무", "뽕나무"],
        correct: 2
    }
    // 더 많은 퀴즈 추가 가능
];

let currentQuiz = 0;

// 시설 목록 표시
function displayFacilities() {
    const facilitiesList = document.getElementById('facilitiesList');
    facilities.forEach(facility => {
        const div = document.createElement('div');
        div.className = 'facility-item';
        div.innerHTML = `
            <h3>${facility}</h3>
        `;
        facilitiesList.appendChild(div);
    });
}

// 교육과정 표시
function displayPrograms() {
    const programsList = document.getElementById('programsList');
    programs.forEach(program => {
        const div = document.createElement('div');
        div.className = 'program-item';
        div.innerHTML = `
            <h3>${program.name}</h3>
            <p>${program.description}</p>
            <ul class="program-features">
                ${getProgramFeatures(program.name)}
            </ul>
        `;
        programsList.appendChild(div);
    });
}

// 교육과정별 특징 목록 생성
function getProgramFeatures(programName) {
    const features = {
        '인문계열': [
            '심화 국어',
            '심화 영어',
            '사회탐구'
        ],
        '자연계열': [
            '심화 수학',
            '물리학',
            '화학'
        ],
        '특별활동': [
            '동아리 활동',
            '봉사활동',
            '진로탐색'
        ]
    };

    return features[programName]
        .map(feature => `<li>${feature}</li>`)
        .join('');
}

// 퀴즈 표시
function displayQuiz() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const currentQuestion = quizQuestions[currentQuiz];

    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'quiz-option';
        button.onclick = () => checkAnswer(index);
        optionsEl.appendChild(button);
    });
}

// 정답 체크
function checkAnswer(answer) {
    const resultEl = document.getElementById('result');
    if (answer === quizQuestions[currentQuiz].correct) {
        resultEl.textContent = "정답입니다!";
    } else {
        resultEl.textContent = "틀렸습니다. 다시 시도해보세요.";
    }
}

// 페이지 로드 시 함수 실행
window.onload = function() {
    displayFacilities();
    displayPrograms();
    displayQuiz();
};

// 카카오맵 API 초기화 (카카오맵 API 키가 필요합니다)
function initMap() {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.123456, 127.123456), // 학교 위치의 위도, 경도
        level: 3
    };
    var map = new kakao.maps.Map(container, options);
    
    // 마커 추가
    var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.123456, 127.123456)
    });
    marker.setMap(map);
}