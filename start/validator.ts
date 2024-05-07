import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  required: '{{field}} é obrigatório para o cadastro!',
  string: '{{field}} deve ser uma string!',
  email: '{{ field }} não é um email válido!',
  minLength: '{{ field }} deve ser maior!',
  maxLength: '{{ field }} deve ser menor!',
  regex: '{{ field }} não atende o formato padrão!',
})
