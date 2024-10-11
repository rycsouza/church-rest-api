import MercadoPagoService from '#services/mercado_pago_service'

const Constants = {
  Situacao: {
    Concluido: 3,
    Pendente: 2,
    Cancelado: 1,
  },
  Perfis: {
    Usuario: 1,
    Membro: 2,
    Obreiro: 3,
    Pastor: 4,
    Administrador: 5,
    Server_Administrador: 6,
  },
  FormaPagamento: {
    checkout: async ({ evento, usuario, pId, externalReference }: any) => {
      return await MercadoPagoService.checkout({ evento, usuario, pId, externalReference })
    },
  },
  Traducao: {
    ptBR: {
      actions: {
        list: 'Listar',
        new: 'Criar',
        edit: 'Editar',
        show: 'Exibir',
        delete: 'Excluir',
        addToGroup: 'Adicionar ao Grupo',
        addAllToGroup: 'Adicionar Todos ao Grupo',
        bulkDelete: 'Excluir tudo',
      },
      messages: {
        successfullyBulkDeleted: '{{count}} registro removido com sucesso',
        successfullyBulkDeleted_plural: '{{count}} registros removidos com sucesso',
        successfullyDeleted: 'Registro excluído com sucesso',
        successfullyUpdated: 'Registro atualizado com sucesso',
        thereWereValidationErrors: 'Existem erros de validação - confira-os abaixo',
        forbiddenError: 'Você não pode executar a ação {{actionName}} em {{resourceId}}',
        anyForbiddenError: 'Você não pode executar a ação solicitada',
        successfullyCreated: 'Novo registro criado com sucesso',
        bulkDeleteError:
          'Houve um erro ao excluir os registros. Verifique os logs para mais informações',
        errorFetchingRecords:
          'Houve um erro ao obter os registros. Verifique os logs para mais informações',
        errorFetchingRecord:
          'Houve um erro ao obter o registro, Verifique os logs para mais informações',
        noRecordsSelected: 'Você não selecionou nenhum registro',
        theseRecordsWillBeRemoved: 'O registro a seguir será excluído',
        theseRecordsWillBeRemoved_plural: 'Os registros a seguir serão excluídos',
        pickSomeFirstToRemove: 'Para remover registros você precisa selecioná-los primeiro',
        error404Resource: 'Recurso indentificado pelo id: {{resourceId}} não pôde ser encontrado',
        error404Action:
          'Recurso indentificado pelo id: {{resourceId}} não possui uma ação com nome: {{actionName}} ou você não está autorizado a usá-la!',
        error404Record:
          'Recurso indentificado pelo id: {{resourceId}} não possui um registro com id: {{recordId}} ou você não está autorizado a acessá-lo!',
        seeConsoleForMore: 'Veja o console de desenvolvimento para mais detalhes...',
        noActionComponent: 'Você precisa implementar componente de ação para a sua Ação',
        noRecordsInResource: 'Não existem registros neste recurso',
        noRecords: 'Nenhum registro',
        confirmDelete: 'Você tem certeza que deseja remover este item? Essa ação é irreversível',
        welcomeOnBoard_title: 'Bem-vindo à bordo!',
        welcomeOnBoard_subtitle:
          'Agora você é um de nós! Preparamos algumas dicas para você começar:',
        addingResources_title: 'Adicionando Recursos',
        addingResources_subtitle: 'Como adicionar novos recursos à barra lateral',
        customizeResources_title: 'Personalizar Recursos',
        customizeResources_subtitle: 'Definindo comportamento, adicionando propriedades e mais...',
        customizeActions_title: 'Personalizar Ações',
        customizeActions_subtitle: 'Modificar ações existentes e adicionar novas',
        writeOwnComponents_title: 'Escrever Componentes',
        writeOwnComponents_subtitle: 'Como modificar o visual do AdminJS',
        customDashboard_title: 'Dashboard Personalizado',
        customDashboard_subtitle:
          'Como modificar esta página e adicionar novas páginas à barra lateral',
        roleBasedAccess_title: 'Controle de Acesso Baseado em Perfil',
        roleBasedAccess_subtitle: 'Criar perfis de usuário e permissões no AdminJS',
        community_title: 'Junte-se à comunidade Discord',
        community_subtitle: 'Fale com os criadores do AdminJS e outros usuários do AdminJS',
        foundBug_title: 'Encontrou um Bug? Precisa de alguma melhoria?',
        foundBug_subtitle: 'Levante um issue em nosso repositório no GitHub',
        needMoreSolutions_title: 'Precisa de mais soluções avançadas?',
        needMoreSolutions_subtitle:
          'Estamos aqui para te entregar um belo desenho de UX/UI e software feito sob medida baseado (não apenas) no AdminJS',
        invalidCredentials: 'Nome de usuário e/ou senha incorretos',
        pageNotFound_title: 'Página não encontrada',
        pageNotFound_subtitle: 'Página <strong>"{{pageName}}"</strong> não existe',
        componentNotFound_title: 'Nenhum componente especificado',
        componentNotFound_subtitle:
          'Você tem que especificar o componente que renderizará este elemento',
      },
      labels: {
        confirm: 'ATENÇÃO',
        navigation: 'Navegação',
        pages: 'Páginas',
        selectedRecords: 'Selecionado ({{selected}})',
        filters: 'Filtros',
        adminVersion: 'Admin: {{version}}',
        appVersion: 'App: {{version}}',
        dashboard: 'Dashboard',
        Usuarios: 'Usuários',
        Inscricoes: 'Inscrições',
        Situacoes: 'Situações',
        Administracao: 'Administração',
      },
      buttons: {
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        save: 'Salvar',
        addNewItem: 'Adicionar Novo Item',
        filter: 'Filtrar',
        filterActive: 'Filtrar ({{count}})',
        applyChanges: 'Aplicar mudanças',
        resetFilter: 'Redefinir',
        confirmRemovalMany: 'Confirmar a exclusão de {{count}} registro',
        confirmRemovalMany_plural: 'Confirmar a exclusão de {{count}} registros',
        logout: 'Sair',
        login: 'Entrar',
        seeTheDocumentation: 'Ver: <1>a documentação</1>',
        createFirstRecord: 'Criar Primeiro Registro',
      },
      properties: {
        cpf: 'CPF',
        uf: 'Estado',
        situacaoId: 'Situação da Inscrição',
        eventoId: 'Evento',
        descricao: 'Descrição',
        churchId: 'Organização',
        dataEvento: 'Data do Evento',
        perfilId: 'Nível de Acesso',
        inscricaoJson: 'Detalhes da Inscrição',
        mercadoPagoId: 'Referência do Pagamento',
        urlWhatsapp: 'Link do WhatsApp',
        length: 'Tamanho',
        from: 'De',
        to: 'Até',
        formularioJson: 'Formulário JSON',
      },
      components: {
        Login: {
          welcomeHeader: 'Bem-vindo',
          welcomeMessage: 'DynamicBoard - O seu Dashboard de Administração.',
          properties: {
            email: 'Email',
            password: 'Senha',
          },
          loginButton: 'Login',
        },
        DropZone: {
          placeholder: 'Solte seu arquivo aqui ou clique para navegar',
          acceptedSize: 'Tamanho máximo: {{maxSize}}',
          acceptedType: 'Suporta: {{mimeTypes}}',
          unsupportedSize: 'O arquivo {{fileName}} é muito grande',
          unsupportedType: 'O arquivo {{fileName}} tem um tipo não compatível: {{fileType}}',
        },
      },
      pages: {},
      resources: {
        Inscricoes: {
          properties: {
            dataCadastro: 'Data da Inscrição',
          },
        },
        Eventos: {
          actions: {
            uploadImage: 'UPLOAD Imagem',
          },
        },
        Igrejas: {
          actions: {
            uploadImage: 'UPLOAD Logo',
          },
        },
        Usuarios: {
          actions: {
            uploadImage: 'UPLOAD Foto',
          },
        },
      },
    },
  },
}

export default Constants
