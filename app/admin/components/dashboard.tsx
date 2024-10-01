//@ts-nocheck
import { Box, Icon, Text } from '@adminjs/design-system'
import { useCurrentAdmin } from 'adminjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default () => {
  const [resources, setResources] = useState([])
  const [currentAdmin] = useCurrentAdmin()
  const userPermissoes = currentAdmin.permissoes

  useEffect(() => {
    axios.get('painel/resources').then((response) => {
      setResources(response.data.resources)
    })
  }, [])

  return (
    <Box
      padding="lg"
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)" // Garante 4 colunas por linha
      gap="20px" // Espaçamento lateral e vertical entre os cards
      justifyContent="center"
      alignItems="center"
    >
      {resources.length &&
        resources.map((resource) => {
          if (!userPermissoes.find((permissao) => permissao.code === resource.code)) return

          // Verifique se o ícone existe em resource.options.navigation.icon
          const icon = resource.options?.navigation?.icon

          return (
            <Box
              key={resource.options.id}
              width={375}
              height={150} // Altura do card
              padding="lg" // Padding interno do card
              margin="10px 0" // Adiciona margem em cima e embaixo para espaçamento vertical
              onClick={() => (window.location.href = `/admin/resources/${resource.options.id}`)}
              variant="white"
              borderWidth="10px" // Borda do card
              borderColor="grey20"
              boxShadow="card" // Adiciona uma sombra suave para parecer um card
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              cursor="pointer" // Cursor de clique
              color="#8906E6"
              style={{
                transition: 'transform 0.3s ease, background-color 0.3s ease', // Suave transição para transform e background-color
                transform: 'scale(1)', // Escala inicial
                position: 'relative', // Permite manipular o z-index
                zIndex: 1, // Define a ordem de empilhamento inicial
                cursor: 'pointer', // Certifique-se de que o cursor é uma mãozinha
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)' // Aumenta levemente o card ao passar o mouse
                e.currentTarget.style.backgroundColor = '#8906E6' // Altera a cor ao passar o mouse
                e.currentTarget.style.color = 'white' // Altera a cor do texto
                e.currentTarget.style.zIndex = 10 // Traz o card para frente ao passar o mouse
                e.currentTarget.style.cursor = 'pointer' // Garante que a mãozinha apareça ao passar o mouse
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)' // Volta ao tamanho original ao sair com o mouse
                e.currentTarget.style.backgroundColor = 'white' // Volta para a cor original
                e.currentTarget.style.color = '#8906E6' // Volta para a cor original do texto
                e.currentTarget.style.zIndex = 1 // Retorna à posição original ao sair com o mouse
                e.currentTarget.style.cursor = 'pointer' // Garante que a mãozinha permaneça no hover
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)' // Reduz levemente o tamanho ao clicar
                e.currentTarget.style.cursor = 'pointer' // Garante que o cursor é uma mãozinha ao clicar
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)' // Volta para a escala ao soltar o clique
                e.currentTarget.style.cursor = 'pointer' // Garante que o cursor é uma mãozinha após clicar
              }}
            >
              {/* Renderizando o ícone do AdminJS baseado no nome fornecido */}
              {icon && <Icon icon={icon} size={40} style={{ marginBottom: '10px' }} />}
              <Text style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                {resource.options.label}
              </Text>{' '}
              {/* Título do card */}
            </Box>
          )
        })}
    </Box>
  )
}
