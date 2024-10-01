//@ts-nocheck
import { Box } from '@adminjs/design-system'
import { ActionProps, useCurrentAdmin } from 'adminjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DynamicModal from './modal.js'

export default (props: ActionProps) => {
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('Download CSV')
  const [modalMessage, setModalMessage] = useState('Download concluído com Sucesso.')
  const [modalVariant, setModalVariant] = useState('success')
  const [currentAdmin] = useCurrentAdmin()
  const { record, resource } = props

  useEffect(() => {
    axios
      .get(`/painel/download/csv/${currentAdmin.empresaId}`, {
        responseType: 'blob'
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'vendas.csv');
        link.click(); // Disparar o clique no link automaticamente

        window.location.href = `/admin/resources/${resource.id}`
      })
      .catch((reject) => {
        setModalTitle('ERRO: Download CSV')
        setModalMessage('O ID da Empresa é obrigatório.')
        setModalVariant('danger')
        setShowModal(true)
      })
  }, [])

  return (
    <Box>
      <DynamicModal
        title={modalTitle}
        message={modalMessage}
        variant={modalVariant}
        showModal={showModal}
        onClose={() => {
          setShowModal(false)
          if (modalVariant === 'success') {
            window.location.href = `/admin/resources/${resource.id}`
          }
        }}
      />
    </Box>
  )
}
