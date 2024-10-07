import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import * as S from './styles'

const faqs = [
  {
    question: "1. Como o clinic360 pode me ajudar no dia a dia do consultorio? ",
    answer: "O clinic360 é uma ferramenta capaz de oferecer informações detalhadas que seriam necessárias semanas para serem identificas por assessorias presenciais. Veja um exemplo: ele é capaz de informar qual o verdadeiro valor da sua consulta, e como você deve se organizar para poder ter lucros solidos, apenas preenchendo os seus gastos mensais. "
  },
  {
    question: "2. O que diferencia o Clinic360 dos outros sistemas? ",
    answer: "O clinic360 diferente dos outros sistemas é capaz de gerir sua agenda, sua saúde financeira da clinica e ainda é um sistema que oferecer uma auto-consultoria que oferece dados rápidos: Como cobrar suas consultas, planos de acompanhamento, gastos que estão sem controle, pagamentos e trabalho de contabilidade como emissão de nota fiscal e abertura de CNPJ e alvara de funcionamento."
  },
]

export const Questions = () => {
  return (
    <S.Container>
      <Typography variant="h4">Perguntas Frequentes</Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ margin: '20px 0 0 0', width: '100%', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </S.Container>
  )
}

export default Questions
