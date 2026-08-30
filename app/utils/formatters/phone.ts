// şuan türk telefonları için daha sonra global yapılacak
export const formatPhoneNumber = (event: Event): string => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')

  if (value.length > 0 && value[0] !== '0') {
    value = '0' + value
  }

  if (value.length > 11) {
    value = value.slice(0, 11)
  }

  let formatted = ''
  if (value.length > 0) {
    formatted = value.substring(0, 4) // 05XX
  }
  if (value.length >= 5) {
    formatted += ' ' + value.substring(4, 7) // XXX
  }
  if (value.length >= 8) {
    formatted += ' ' + value.substring(7, 9) // XX
  }
  if (value.length >= 10) {
    formatted += ' ' + value.substring(9, 11) // XX
  }

  input.value = formatted
  return formatted
}