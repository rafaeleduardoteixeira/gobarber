interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      name: string,
      email: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'contato@mullersfotografia.com.br',
      name: "Contato Muller's Fotografia"
    }
  }
} as IMailConfig;