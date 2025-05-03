# furiaChallenge-1
Desafio técnico para Assistente de Engenharia de Software - Challenge #1
# 🧠 Fala, FURIA! – Chatbot Fanático

Chatbot temático da FURIA Esports que interage com fãs em linguagem natural, com respostas personalizadas e integração com IA generativa (Google Gemini).

## 🚀 Funcionalidades

- Chat com detecção local de intenções (ex: lineup, próximos jogos, torcida etc.)
- Integração com a API Gemini (modelo Flash)
- Animação de carregamento SVG
- Respostas da IA com scroll automático
- Suporte a envio por botão ou tecla Enter

## 🛠️ Tecnologias

- **HTML, CSS e JavaScript puro**
- **Node.js** com **Express**
- **Google Gemini API**
- **Dotenv** para variáveis de ambiente
  
## 💬 Como o chatbot responde

O Fala, FURIA! identifica automaticamente perguntas com base em palavras-chave e aciona respostas prontas para temas como lineup, torcida e curiosidades da FURIA. Quando a pergunta não corresponde a nenhuma intenção específica, o chatbot utiliza a API do modelo Gemini (Flash) para gerar uma resposta personalizada com linguagem empolgada, emojis e tom fanático. Isso garante uma conversa divertida, responsiva e cheia de paixão pelo time!
    
    Exemplos de mensagem:
      - Quem é você ?
      - Lineup cs
      - Lineup lol
      - Próximo jogo
      - bora furia

## ▶️ Configuração e Avisos para uso

## Clonar o repositório

Para clonar o repositório pelo terminal, basta usar o seguinte comando:

    git clone https://github.com/EdYass/furiaChallenge-1.git
    cd furiaChallenge-1
    code .

### Configurar o projeto node

No terminal, dentro da pasta **falaFuria/**:

    npm init -y
    npm install express dotenv node-fetch

### Aviso sobre a API Key e Backend

Por motivos de segurança e boas práticas, a chave da API Gemini não está incluída diretamente no repositório. Ela é carregada a partir de uma variável de ambiente .env, que é ignorada pelo Git (conforme definido no .gitignore).

#### 🔑 Como obter a API Key da Gemini

- Acesse Google AI Studio.
- Faça login com sua conta Google.
- Clique em “Get API Key”.
- Copie a chave gerada.
Crie um arquivo .env na raiz do projeto falafuria/ com o seguinte conteúdo:

      API_KEY=cole_sua_chave_aqui
  
### Dar Run no servidor node

      npm start

Acessar a url: **http://localhost:3000/page/chatFuria**
