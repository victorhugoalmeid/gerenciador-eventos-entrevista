## Gestão de Eventos — Guia Rápido

Aplicação Next.js com Material UI e Redux para CRUD de eventos. Usa `json-server` como API mock em `http://localhost:3001`.

### Requisitos
- Node.js 18+ (recomendado LTS)
- npm (incluso no Node)

### Instalação
1. Instale dependências:
   ```bash
   npm install
   ```
2. (Opcional) Ajuste a API base em `src/services/api.ts` se precisar outro host/porta.

### Executando localmente
1. Suba a API mock em um terminal:
   ```bash
   npm run json-server
   # disponível em http://localhost:3001
   ```
2. Em outro terminal, suba o app:
   ```bash
   npm run dev
   # app em http://localhost:3000
   ```

Credenciais de teste (definidas em `db.json`):
- Admin: `admin@events.com` / `admin123`
- Leitor: `reader@events.com` / `reader123`

### Scripts úteis
- `npm run dev` — modo desenvolvimento.
- `npm run build` — build de produção.
- `npm start` — roda o build.
- `npm run lint` — lint com ESLint.
- `npm test` — testes com Jest.
- `npm run json-server` — API mock com `db.json`.

### Testes
Execute todos os testes:
```bash
npm test
```
Ambiente de testes usa `jest-environment-jsdom` e `ts-jest` (ver `jest.config.mjs`).

### Rodar localmente

1. Clonar o repositório e acessar o projeto
Caso esteja trabalhando a partir do fork do repositório oficial:

git clone https://github.com/<seu-usuario>/developer-challenges.git
cd developer-challenges/event-management

2. Instalar dependências
Dentro da pasta event-management:
npm install

3. Subir a API fake (json-server)
Em um terminal separado, dentro de event-management:
npm run json-server

4. Subir a aplicação Next.js
Em outro terminal, também dentro de event-management:
npm run dev
URL: http://localhost:3000

<img width="667" height="595" alt="Captura de Tela 2025-12-06 às 21 58 07" src="https://github.com/user-attachments/assets/105be097-754b-4463-b388-f7c0f21e2d26" />
<img width="662" height="589" alt="Captura de Tela 2025-12-06 às 21 57 47" src="https://github.com/user-attachments/assets/881c7edd-623a-44df-bcd9-2bac68a38d22" />
<img width="1147" height="593" alt="Captura de Tela 2025-12-06 às 21 55 37" src="https://github.com/user-attachments/assets/bfe1df1a-4062-46ba-a1f5-c3b30303ccd5" />
<img width="1147" height="595" alt="Captura de Tela 2025-12-06 às 21 54 54" src="https://github.com/user-attachments/assets/5dac132b-b89a-4d97-900c-d59028374e23" />
<img width="1147" height="584" alt="Captura de Tela 2025-12-06 às 21 53 38" src="https://github.com/user-attachments/assets/4d69b0ee-46a1-4d4b-b7fd-1497ab719140" />
<img width="1147" height="591" alt="Captura de Tela 2025-12-06 às 21 49 45" src="https://github.com/user-attachments/assets/1406dfe5-7ce9-4e84-9c16-7275351fed90" />
