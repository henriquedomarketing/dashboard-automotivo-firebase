# Dashboard Automotivo com Firebase

Esta versão usa:

- **Firebase Hosting** para deixar o site online
- **Cloud Firestore** como banco de dados
- **Cloud Functions + Scheduler** para atualizar o dashboard todos os dias
- **React + Vite** no front-end

## Passo 1 — Criar projeto no Firebase

1. Acesse Firebase Console
2. Crie um projeto
3. Ative **Cloud Firestore**
4. Ative **Hosting**
5. Ative **Functions**

> Para usar agendamento automático com Cloud Functions/Scheduler, normalmente o projeto precisa estar no plano Blaze, mesmo que o uso comece pequeno.

## Passo 2 — Configurar o front-end

Abra `src/firebase.ts` e troque os dados do `firebaseConfig` pelos dados do seu projeto.

Você encontra isso no Firebase Console:

```txt
Configurações do projeto > Geral > Seus apps > Web app
```

## Passo 3 — Instalar dependências

```bash
npm install
cd functions
npm install
cd ..
```

## Passo 4 — Entrar no Firebase

```bash
npm install -g firebase-tools
firebase login
firebase use --add
```

Escolha o projeto que você criou.

## Passo 5 — Publicar regras do Firestore

```bash
firebase deploy --only firestore:rules
```

## Passo 6 — Colocar os primeiros dados

```bash
npm run seed
```

## Passo 7 — Publicar o site e o robô

```bash
npm run deploy
```

Depois disso o site ficará em:

```txt
https://SEU-PROJETO.web.app
```

## Como a atualização automática funciona

Todo dia às 06:00 no horário de São Paulo, a função `updateMarketDaily` roda e atualiza:

```txt
dashboard/current
```

O site escuta esse documento no Firestore e atualiza sozinho quando os dados mudam.

## Arquivos principais

```txt
src/App.tsx                       Dashboard visual
src/firebase.ts                   Configuração Firebase do site
functions/src/index.ts            Robô diário
functions/src/demoData.ts         Dados base / fallback
functions/src/collectors.ts       Onde entram Fenabrave, SENATRAN e FIPE
firestore.rules                   Regras de leitura pública e escrita protegida
firebase.json                     Configuração Hosting + Functions
```

## Próximo ajuste real

Os coletores em `functions/src/collectors.ts` estão prontos para conectar com dados reais. Hoje eles usam fallback seguro para o painel não quebrar.
