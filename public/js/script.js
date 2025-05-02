import intentResponses from "./intentResponse.js";

const content = document.getElementById('content');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

let isAnswerLoading = false;
let answerSectionId = 0;

sendButton.addEventListener('click', () => handleSendMessage());
chatInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
});

function handleSendMessage() {
    const question = chatInput.value.trim();
    if (question === '' || isAnswerLoading) return;
    sendButton.classList.add('send-button-nonactive');
    addQuestionSection(question);
    chatInput.value = '';

    const intent = detectIntent(question);
    if (intent) {
        handleIntentResponse(intent);
    } else {
        getAnswer(question);
    }
}

function detectIntent(message) {
    const msg = message.toLowerCase();
    if (msg.includes("próxim") && msg.includes("jogo")) return "agenda";
    if (msg.includes("status") || msg.includes("placar")) return "status";
    if (msg.includes("lineup") && msg.includes("cs")) return "lineup_cs";
    if (msg.includes("lineup") && msg.includes("rocket")) return "lineup_rocketleague";
    if (msg.includes("lineup") && msg.includes("lol")) return "lineup_leagueoflegends";
    if ((msg.includes("quem joga") || msg.includes("lineup")) && msg.includes("kings")) return "lineup_kingsleague";
    if (msg.includes("curiosidade") || msg.includes("sabia")) return "quiz";
    if (msg.includes("vai furia") || msg.includes("bora furia") || msg.includes("furiaaaa")) return "torcida";
    return null;
}

function handleIntentResponse(intent) {
    isAnswerLoading = false;
    let response = intentResponses[intent];

    if (intent === 'torcida') {
        response = response[Math.floor(Math.random() * response.length)];
    }

    addAnswerSection(response);
    scrollToBottom();
    sendButton.classList.remove('send-button-nonactive');
}

function getAnswer(question) {
    const enrichedQuestion = "Você é o 'Fala, FURIA!', um bot fanático pela FURIA. Use emojis, emoção e entusiasmo!\n\n" + question;

    fetch('/api/gemini', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: enrichedQuestion }]
            }]
        })
    })
    .then(response => response.json())
    .then(data => {
        let resultData = "❌ Erro ao obter resposta.";
        if (data && data.candidates && data.candidates.length > 0) {
            resultData = data.candidates[0].content.parts[0].text;
        }
        isAnswerLoading = false;
        addAnswerSection(resultData);
    })
    .catch(error => {
        isAnswerLoading = false;
        addAnswerSection("❌ Ocorreu um erro ao se comunicar com a API");
        console.error("Erro na API:", error);
    })
    .finally(() => {
        scrollToBottom();
        sendButton.classList.remove('send-button-nonactive');
    });
}

function addQuestionSection(message) {
    isAnswerLoading = true;
    const sectionElement = document.createElement('section');
    sectionElement.className = 'question-section';
    sectionElement.textContent = message;
    content.appendChild(sectionElement);
    addAnswerSection(message);
    scrollToBottom();
}

function addAnswerSection(message) {
    if (isAnswerLoading) {
        answerSectionId++;
        const sectionElement = document.createElement('section');
        sectionElement.className = 'answer-section';
        sectionElement.innerHTML = getLoadingSvg();
        sectionElement.id = answerSectionId;
        content.appendChild(sectionElement);
    } else {
        const answerSectionElement = document.getElementById(answerSectionId);
        answerSectionElement.textContent = message;
    }
}

function getLoadingSvg() {
    return '<svg style="height: 25px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#6200ea" stroke="#6200ea" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6200ea" stroke="#6200ea" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6200ea" stroke="#6200ea" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>';
}

function scrollToBottom() {
    content.scrollTo({
        top: content.scrollHeight,
        behavior: 'smooth'
    });
}
