import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import * as S from './styles'

const faqs = [
  {
    question: "1- Qual o propósito da ferramenta?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
  },
  {
    question: "2- Como faço para criar uma conta?",
    answer: "Para criar uma conta, basta clicar no botão de cadastro no canto superior direito e seguir os passos."
  },
  {
    question: "3- A ferramenta é gratuita?",
    answer: "Sim, a ferramenta possui uma versão gratuita, com opções de upgrade para planos pagos."
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
