import { estadosBrasileiros } from "../mocks/states"

export const formatCrm = (value: string): string => {
  let formattedValue = value.toUpperCase().replace(/[^0-9A-Z/]/g, "")

  let [numPart, ufPart] = formattedValue.split("/")

  numPart = numPart?.slice(0, 6) || ""

  if (numPart.length === 6 && !ufPart) {
    formattedValue = `${numPart}/`
  }

  if (ufPart) {
    ufPart = ufPart.slice(0, 2)

    if (ufPart.length === 2 && !estadosBrasileiros.includes(ufPart)) {
      ufPart = ""
    }

    formattedValue = `${numPart}/${ufPart}`
  }

  return formattedValue
}

export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}