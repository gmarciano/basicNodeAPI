import mongoose from 'mongoose'

const schema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false
  },
  nome: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  ddd: {
    type: Number,
    required: true
  },
  data_criacao: {
    type: Date,
    default: Date.now
  },
  data_atualizacao: {
    type: Date,
    default: Date.now
  },
  ultimo_login: {
    type: Date,
    default: Date.now
  }
})

schema.set('toJSON', { virtual: true })

module.exports = mongoose.model('User', schema)