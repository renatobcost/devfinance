export const format = (value) => {       //função para substituir virgula por ponto, tirar o cifrão e conferir se é positivo ou negativo
    let formattedValue
  
    formattedValue = value.replace(',', '.')                         
    formattedValue = Number(formattedValue.split('$')[1].trim())
  
    formattedValue = String(value).includes('-') ? -formattedValue : formattedValue
  
    return formattedValue
  }
  