# 📊 GitHub Calendar Vite — Visualização Interativa de Eventos

[![Made with Vite](https://img.shields.io/badge/Made%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![html2canvas](https://img.shields.io/badge/html2canvas-007ACC?logo=canvas&logoColor=white)](https://html2canvas.hertzen.com/)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-blue?logo=github)](https://github.com/lucas-santosr/github-calendar-vite)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

Visualização interativa de **eventos diários em formato de calendário estilo GitHub**, desenvolvida com **Vite, HTML, CSS e JavaScript puro**.  
O projeto permite o upload de base CSV e gera automaticamente calendários anuais que representam a densidade de eventos por dia, com gradação de cores inspirada no layout clássico do GitHub.

---

## 🧠 Sobre o Projeto

Este projeto foi criado com o objetivo de **analisar e visualizar eventos de forma intuitiva**, transformando dados brutos em uma **experiência visual clara e moderna**.  
Ele foi desenvolvido para ser utilizado em **apresentações e relatórios internos**, sendo também uma excelente demonstração de domínio técnico e design de interface.

---

## 🚀 Funcionalidades Principais

✅ Upload de arquivos `.csv` com colunas `data_evento` e `total_eventos`  
✅ Geração automática de múltiplos anos (um calendário completo por ano)  
✅ Escala de cores baseada na densidade de eventos  
✅ Responsividade total — ajusta-se a qualquer tamanho de tela  
✅ Exportação do gráfico em imagem `.png` via `html2canvas`  
✅ Layout inspirado no **GitHub Contributions Chart**, em **modo claro**  
✅ Navegação fluida e centralizada 

---

## 🧱 Estrutura do Projeto

```

github-calendar-vite/
│
├── index.html          # Estrutura principal da página
├── main.js             # Lógica principal (upload, parsing e renderização)
├── styles.css          # Estilo visual completo (modo claro, responsivo)
│
├── package.json        # Configuração do projeto Vite
└── vite.config.js      # Definição de build e preview

````

---

## 🛠️ Tecnologias Utilizadas

- ⚡ **Vite** — ambiente leve e rápido para desenvolvimento frontend  
- 🧩 **HTML5 / CSS3 / JavaScript puro**  
- 🎨 **html2canvas** — exportação do calendário como imagem PNG  
- 🧠 **Design responsivo** inspirado na UI do GitHub  

---

## 🧩 Como Executar o Projeto

### 🔹 Opção 1 — Usando Vite (recomendado)

```bash
# Instalar dependências
npm install

# Iniciar ambiente de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Visualizar build localmente
npm run preview
````

O projeto será executado em:
👉 [http://localhost:5173](http://localhost:5173)

---

### 🔹 Opção 2 — HTML puro (sem Node)

Se preferir, basta abrir o arquivo `index.html` diretamente no navegador:

```bash
# Caminho do projeto
github-calendar-vite/index.html
```

Isso carregará o aplicativo completo sem necessidade de dependências externas.

---

## 📄 Exemplo de Uso

1️⃣ Clique em **“Escolher arquivo”** e selecione um `.csv` com os campos:

```
data_evento,total_eventos
2025-01-01,12
2025-01-02,8
2025-01-03,0
```

2️⃣ O sistema renderiza automaticamente o calendário, organizando os dias por mês e ano.
3️⃣ Clique em **“Exportar como PNG”** para salvar a visualização.

---

## 💡 Visual do Projeto

![Preview do Calendário](./preview.png)

> *Visualização estilo GitHub Contributions com gradação de verdes e estrutura horizontal por meses.*

---

## 🧰 Stacks & Ferramentas

| Categoria        | Ferramentas                                           |
| ---------------- | ----------------------------------------------------- |
| ⚙️ Build e Dev   | Vite, Node.js                                         |
| 💻 Linguagens    | JavaScript (ES6+), HTML5, CSS3                        |
| 🧩 Bibliotecas   | html2canvas                                           |
| 🧠 Padrões       | Modularização, Responsividade, UI inspirada no GitHub |
| 🧪 Testes Locais | Cursor, VS Code, Live Server, GitHub Pages            |

---

## 🤝 Contribuições

Contribuições são muito bem-vindas!
Sinta-se à vontade para abrir *issues*, sugerir melhorias ou enviar *pull requests*.

Se quiser adaptar o projeto para outros tipos de métricas (como energia gerada, disponibilidade ou performance), basta ajustar as colunas de entrada no CSV.

---

## 📬 Contato

Desenvolvido com 💚 por **Lucas dos Santos Rodrigues**
📧 [GitHub: @lucas-santosr](https://github.com/lucas-santosr)
📅 © 2025 — Projeto público open source

---

## 🪪 Licença

Este projeto é distribuído sob a licença **MIT** — sinta-se livre para utilizar, modificar e aprimorar.

````