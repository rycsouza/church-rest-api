//@ts-nocheck
import { Box, Button, H5 } from '@adminjs/design-system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default () => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      const request = await axios.get('painel/resources')
      setResources(request.data.resources)
    }

    fetchResources()
  }, [])

  return (
    <Box
      padding="lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {resources.length &&
        resources.map((resource) => (
          <Box key={resource.id} margin="md">
            <Button
              mt="md"
              onClick={() => (window.location.href = `/admin/resources/${resource.id}`)}
              variant="primary"
            >
              {resource.id}
            </Button>
          </Box>
        ))}
    </Box>
  )
}
