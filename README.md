# Sistema de Agendamento de Férias

## Visão Geral

Este é um sistema de gestão de utilizadores e agendamento de férias desenvolvido com Next.js e React. A aplicação permite que os utilizadores visualizem a lista de membros da equipe e gerenciem suas próprias férias através de um calendário interativo. Administradores têm acesso a funcionalidades adicionais, como gerenciamento de utilizadores e visualização de todas as férias agendadas.

## Descrição Detalhada do Projeto

O sistema completo de agendamento de férias inclui:

### Sistema de Autenticação

- Página de login com autenticação por email/senha
- Gestão de sessões utilizando cookies
- Controle de acesso baseado em funções (admin vs utilizadores regulares)

### Gestão de Utilizadores

- Visualização de todos os utilizadores em formato de tabela
- Administradores podem adicionar novos utilizadores com todos os campos necessários
- Administradores podem remover utilizadores existentes

### Agendamento de Férias

- Calendário interativo para marcação de dias de férias
- Utilizadores podem gerenciar apenas suas próprias férias
- Administradores podem visualizar todas as férias da organização

### Navegação

- Barra de navegação responsiva com suporte para dispositivos móveis
- Painel principal com acesso rápido a todas as funcionalidades
- Interface baseada em funções que mostra recursos de administrador apenas para administradores

### Estrutura de Dados

- Modelo de utilizador com todos os campos necessários (ID, nome, email, telemóvel, cargo, senha, tipo)
- Modelo de férias para rastrear datas e atribuições de utilizadores

### Vistas

1. **Página de Login** - Ponto de entrada para autenticação
2. **Painel Principal** - Visão geral com cartões de navegação
3. **Página de Utilizadores** - Tabela de todos os utilizadores (visível para todos)
4. **Página de Calendário** - Gestão pessoal de férias
5. **Painel de Administração** - Gestão de utilizadores e visualização de todas as férias

Para fins de demonstração, a aplicação utiliza dados simulados, mas em um ambiente de produção, você conectaria isso a um banco de dados real.

## Funcionalidades

- **Autenticação**

  - Sistema de login com email e senha
  - Diferentes níveis de acesso (admin e utilizador regular)

- **Gestão de Utilizadores**

  - Visualização de todos os utilizadores (disponível para todos)
  - Adição e remoção de utilizadores (apenas admin)
  - Perfis de utilizador com nome, email, telemóvel, cargo e tipo

- **Agendamento de Férias**

  - Calendário interativo para marcação de férias
  - Utilizadores podem gerenciar apenas suas próprias férias
  - Administradores podem visualizar todas as férias agendadas

  - **Calendário de Férias** (corrigido):
  - Seleção múltipla de dias com persistência.
  - Visualização clara dos dias selecionados.
  - Armazenamento local via `localStorage`.

## Requisitos

- Node.js (18.x ou superior)
- npm (v9 ou superior) ou yarn

## Dependências

### Principais

| Pacote           | Versão Recomendada | Descrição                           |
| ---------------- | ------------------ | ----------------------------------- |
| `next`           | `^14.1.0`          | Framework base do projeto           |
| `react`          | `^18.2.0`          | Biblioteca para construção de UI    |
| `react-dom`      | `^18.2.0`          | Renderização React para navegadores |
| `typescript`     | `^5.3.0`           | Tipagem estática                    |
| `tailwindcss`    | `^3.3.0`           | Framework CSS utilitário            |
| `react-calendar` | `^4.9.0`           | Componente de calendário interativo |
| `shadcn-ui`      | -                  | Biblioteca de componentes UI        |
| `date-fns`       | `^2.30.0`          | Manipulação de datas (opcional)     |

### Desenvolvimento

| Pacote               | Versão Recomendada | Descrição                         |
| -------------------- | ------------------ | --------------------------------- |
| `@types/node`        | `^20.11.0`         | Tipagem para Node.js              |
| `@types/react`       | `^18.2.0`          | Tipagem para React                |
| `@types/react-dom`   | `^18.2.0`          | Tipagem para React DOM            |
| `autoprefixer`       | `^10.4.0`          | Pós-processador CSS               |
| `postcss`            | `^8.4.0`           | Transformação CSS                 |
| `eslint`             | `^8.56.0`          | Linter para JavaScript/TypeScript |
| `prettier`           | `^3.2.0`           | Formatador de código              |
| `eslint-config-next` | `^14.1.0`          | Configurações ESLint para Next.js |

## Instalação

Siga estes passos para instalar e executar a aplicação localmente:

1. Clone o repositório:

```bash
git clone https://github.com/SantanderNycz/VP---Vacation-Scheduler.git
cd VP---Vacation-Scheduler
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Instalar dependências:

```bash
npm install react-calendar
```

5. Acesse a aplicação em seu navegador:

```bash
http://localhost:3000
```

## Como Utilizar

### Acesso ao Sistema

Para acessar o sistema, utilize as seguintes credenciais:

- **Administrador**:

  - Email: admin@example.com
  - Senha: admin123

- **Utilizador Regular**:
  - Email: user@example.com
  - Senha: user123

### Navegação

Após fazer login, você terá acesso ao painel principal com as seguintes opções:

1. **Utilizadores** - Visualize todos os utilizadores registrados no sistema
2. **Meu Calendário** - Gerencie suas próprias férias
3. **Painel de Administração** (apenas para admin) - Gerencie utilizadores e visualize todas as férias

### Marcação de Férias

1. Acesse a página "Meu Calendário"
2. Clique em uma data no calendário para selecionar
3. Clique no botão "Agendar Férias" para confirmar a marcação
4. Para cancelar uma marcação, selecione uma data já marcada e clique em "Cancelar Férias"

### Gestão de Utilizadores (apenas admin)

1. Acesse o "Painel de Administração"
2. Selecione a aba "Gestão de Utilizadores"
3. Para adicionar um novo utilizador, clique no botão "Adicionar Utilizador" e preencha o formulário
4. Para remover um utilizador, clique no ícone de lixeira na linha correspondente

### Visualização de Todas as Férias (apenas admin)

1. Acesse o "Painel de Administração"
2. Selecione a aba "Todas as Férias"
3. Utilize o seletor para filtrar por utilizador específico ou visualizar todas as férias
4. Alterne entre as visualizações de lista e calendário conforme necessário

## Estrutura do Projeto

```bash
sistema-agendamento-ferias/
├── app/                  # Páginas da aplicação (Next.js App Router)
├── components/           # Componentes React reutilizáveis
├── lib/                  # Funções utilitárias e lógica de negócio
└── public/               # Arquivos estáticos
```

## Notas Técnicas

- Esta aplicação foi desenvolvida utilizando Next.js 14 com App Router
- A interface utiliza componentes do shadcn/ui
- Para um ambiente de produção, recomenda-se implementar:

  - Banco de dados real (como PostgreSQL, MongoDB, etc.)
  - Autenticação segura com hashing de senhas
  - Validação de formulários mais robusta
  - Testes automatizados

  ### Correções Recentes

- **Bug**: Seleção de múltiplos dias no calendário não persistia.
- **Solução**: Implementação de estado com `useState` + `localStorage` para armazenar as datas.

## Implantação

Para implantar esta aplicação em produção, recomenda-se utilizar a Vercel:

1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Siga as instruções para implantação

## Suporte

Para questões ou problemas, abra uma issue no repositório do GitHub ou entre em contato com o administrador do sistema.
