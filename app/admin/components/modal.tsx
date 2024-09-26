import { Box, Button, H5, Modal } from '@adminjs/design-system'
import React, { FC } from 'react'

interface ModalProps {
  title: string
  message: string
  variant: 'success' | 'danger' | 'default' | 'info' | 'primary' | 'secondary' | 'light'
  showModal: boolean
  onClose: () => void
}

const DynamicModal: FC<ModalProps> = ({ title, message, variant, showModal, onClose }) => {
  return (
    <>
      {showModal && (
        <Modal title={title} onClose={onClose} variant={variant}>
          <Box
            padding="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <H5>{message}</H5>
            <Button mt="md" onClick={onClose} variant="primary">
              Ok
            </Button>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default DynamicModal
