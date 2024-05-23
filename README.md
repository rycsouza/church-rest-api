
# Church Rest API

Este repositório contém a implementação do backend de um sistema dinâmico de inscrições, inicialmente desenvolvido para gerenciar inscrições de eventos para uma igreja. O sistema é flexível e pode ser adaptado para vários tipos de inscrições por diferentes usuários. Melhorias futuras incluem a expansão das capacidades do sistema e o desenvolvimento de um aplicativo móvel complementar.

## Tecnologias Utilizadas

- **AdonisJS 6**: Um framework web completo para Node.js.
- **Node.js**: Ambiente de execução JavaScript para programação no servidor.
- **TypeScript**: Um superconjunto de JavaScript com tipagem estática.
- **AdminJS**: Um painel administrativo para gerenciar o backend.
- **MySQL**: Um sistema de gerenciamento de banco de dados relacional.

## Estrutura do Projeto

```
/controllers
  - usuarios_controller.ts
  - eventos_controller.ts
  - churches_controller.ts
  - inscricoes_controller.ts
  - payments_controller.ts
/routes
  - usuario.ts
  - evento.ts
  - igreja.ts
  - inscricao.ts
  - payment.ts
```

## Rotas e Endpoints

### Rotas de Usuário

- **POST /criar**: Criar um novo usuário.
- **PATCH /atualizar**: Atualizar informações do usuário.
- **GET /perfil**: Obter informações do perfil do usuário.

### Rotas de Evento

- **POST /criar**: Criar um novo evento.
- **GET /**: Obter todos os eventos.
- **GET /:id**: Obter detalhes do evento por ID.
- **GET /forms/:id**: Exibir formulários de inscrição do evento.
- **PATCH /atualizar/:id**: Atualizar informações do evento.
- **DELETE /deletar/:id**: Deletar um evento.

### Rotas de Igreja

- **POST /criar**: Criar uma nova igreja.
- **PATCH /atualizar**: Atualizar informações da igreja.
- **GET /**: Obter todas as igrejas.
- **GET /:id**: Obter detalhes da igreja por ID.
- **DELETE /deletar/:id**: Deletar uma igreja.

### Rotas de Inscrição

- **POST /criar**: Criar uma nova inscrição.
- **PATCH /atualizar**: Atualizar informações da inscrição.
- **GET /**: Obter todas as inscrições.
- **GET /:id**: Obter detalhes da inscrição por ID.
- **DELETE /deletar/:id**: Deletar uma inscrição.

### Rotas de Pagamento

- **POST /criar**: Criar um novo pagamento.

## Instalação e Configuração

1. Clone o repositório:

   ```sh
   git clone https://github.com/rycsouza/church-rest-api.git
   ```

2. Navegue até o diretório do projeto:

   ```sh
   cd church-rest-api
   ```

3. Instale as dependências:

   ```sh
   npm install
   ```

4. Configure as variáveis de ambiente:

   ```sh
   cp .env.example .env
   # Atualize o arquivo .env com as configurações do seu banco de dados e outras configurações
   ```

5. Inicie o servidor de desenvolvimento:

   ```sh
   npm run dev
   ```

## Contribuição

Contribuições são bem-vindas! Por favor, faça um fork do repositório e crie um pull request com suas alterações.

## Planos Futuros

- Expansão das funcionalidades do sistema.
- Desenvolvimento de um aplicativo móvel com os seguintes recursos:

  - Bíblia com versões derivadas, ou somente a versão do Pastor
  - Comentários do Pastor na Bíblia
  - Assistir a Live pelo APP
  - Dashboard de atualizações/eventos da igreja
  - Cadastro de membro (Disponível para nível de admin: >= Obreiro)
  - Inscrições de Acampamentos/Eventos (Ver de ter pagamento direto também)
  - Sistema de Oferta/Dízimo, direto no APP

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para quaisquer dúvidas ou feedback, por favor, abra uma issue no repositório ou entre em contato com o proprietário do repositório.

---

