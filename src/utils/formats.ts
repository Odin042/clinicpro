import { estadosBrasileiros } from "../mocks/states"

export const formatCrm = (value: string): string => {
  let formattedValue = value.toUpperCase().replace(/[^0-9A-Z]/g, "")


  let numPart = formattedValue.replace(/[^0-9]/g, "").slice(0, 6)


  let ufPart = formattedValue.slice(numPart.length).replace(/[^A-Z]/g, "").slice(0, 2)

 
  if (ufPart && !estadosBrasileiros.includes(ufPart)) {
    ufPart = ""
  }

  return `${numPart}${ufPart}`
}

export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

export const formatCpfCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  } else {
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
}

export function formatSpecialtyLabel(key: string) {
  const cleaned = key.replace('_', ' ')
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}