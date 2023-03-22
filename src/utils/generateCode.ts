import * as codeGenerator from 'voucher-code-generator'

export const generateCode = () => {
  return codeGenerator
    .generate({ length: 7, charset: codeGenerator.charset('alphanumeric'), count: 1 })
    ?.at(0)
    ?.toUpperCase()
}
