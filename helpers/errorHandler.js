function errorHandler(err, req, res) {
  if (err.force) {
    return res.status(err.status).json({
      mensagem: err.message
    })
  }

  if (err.name === 'UnauthorizedError') {
    const status = err.code === 'credentials_required' ? 403 : 401

    return res.status(status).json({
      mensagem: 'Não autorizado'
    })
  }

  return res.status(500).json({
    mensagem: err.message
  })
}

export default errorHandler