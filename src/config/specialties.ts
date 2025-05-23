export type Field =
  | { id: string, label: string, type: 'text' | 'textarea', required?: boolean, minLength?: number, maxLength?: number }
  | { id: string, label: string, type: 'number', required?: boolean, min?: number, max?: number }
  | { id: string, label: string, type: 'boolean' }
  | { id: string, label: string, type: 'select', options: string[], required?: boolean }
export const SPECIALTIES_CONFIG = {
  NUTRICAO: {
    fields: [
      { id: 'dados_clinicos.queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'dados_clinicos.doencas_diagnosticas', label: 'Doenças diagnosticadas', type: 'textarea' },
      { id: 'dados_clinicos.historico_familiar', label: 'Histórico familiar', type: 'textarea' },
      { id: 'dados_clinicos.uso_medicamentos', label: 'Uso de medicamentos', type: 'textarea' },
      { id: 'dados_clinicos.uso_suplementos', label: 'Uso de suplementos', type: 'textarea' },
      { id: 'dados_clinicos.alergias_intolerancias', label: 'Alergias / Intolerâncias', type: 'textarea' },
      { id: 'dados_clinicos.cirurgias_anteriores', label: 'Cirurgias anteriores', type: 'textarea' },
      { id: 'dados_clinicos.exames_recentess', label: 'Exames recentes', type: 'textarea' },
  
      { id: 'dados_clinicos.sono.horas_sono', label: 'Horas de sono', type: 'number' },
      { id: 'dados_clinicos.sono.qualidade_sono', label: 'Qualidade do sono', type: 'text' },
      { id: 'dados_clinicos.sono.insônia', label: 'Insônia', type: 'boolean' },
      { id: 'dados_clinicos.sono.ronco', label: 'Ronco', type: 'boolean' },
      { id: 'dados_clinicos.sono.apneia', label: 'Apneia', type: 'boolean' },
  
      { id: 'dados_clinicos.estresse.nivel_estresse', label: 'Nível de estresse', type: 'text' },
      { id: 'dados_clinicos.estresse.fatores_estressantes', label: 'Fatores estressantes', type: 'textarea' },
  
      { id: 'dados_clinicos.atividade_fisica.pratica', label: 'Pratica atividade física', type: 'boolean' },
      { id: 'dados_clinicos.atividade_fisica.frequencia', label: 'Frequência', type: 'text' },
      { id: 'dados_clinicos.atividade_fisica.tipo', label: 'Tipo de atividade', type: 'text' },
      { id: 'dados_clinicos.atividade_fisica.tempo_duracao', label: 'Tempo/duração', type: 'text' },
  
      { id: 'habitos_alimentares.restricoes_alimentares', label: 'Restrições alimentares', type: 'textarea' },
      { id: 'habitos_alimentares.preferencias_alimentares', label: 'Preferências alimentares', type: 'textarea' },
      { id: 'habitos_alimentares.aversoes_alimentares', label: 'Aversões alimentares', type: 'textarea' },
      { id: 'habitos_alimentares.alimentos_consumidos_frequentemente', label: 'Alimentos consumidos frequentemente', type: 'textarea' },
      { id: 'habitos_alimentares.alimentos_evita', label: 'Alimentos que evita', type: 'textarea' },
      { id: 'habitos_alimentares.frequencia_refeicoes', label: 'Frequência de refeições', type: 'text' },
      { id: 'habitos_alimentares.pula_refeicoes', label: 'Pula refeições', type: 'boolean' },
      { id: 'habitos_alimentares.motivacao_dieta', label: 'Motivação para dieta', type: 'textarea' },
      { id: 'habitos_alimentares.consumo_agua_diario_ml', label: 'Consumo de água (ml/dia)', type: 'number', min: 0 },
  
      { id: 'habitos_alimentares.consumo_bebidas_alcoolicas.frequencia', label: 'Álcool – Frequência', type: 'text' },
      { id: 'habitos_alimentares.consumo_bebidas_alcoolicas.quantidade', label: 'Álcool – Quantidade', type: 'text' },
  
      { id: 'habitos_alimentares.uso_cafeina.frequencia', label: 'Cafeína – Frequência', type: 'text' },
      { id: 'habitos_alimentares.uso_cafeina.tipo_bebida', label: 'Cafeína – Tipo de bebida', type: 'text' },
  
      { id: 'habitos_alimentares.diario_24h.cafe_da_manha', label: '24 h – Café da manhã', type: 'textarea' },
      { id: 'habitos_alimentares.diario_24h.lanche_manha', label: '24 h – Lanche da manhã', type: 'textarea' },
      { id: 'habitos_alimentares.diario_24h.almoco', label: '24 h – Almoço', type: 'textarea' },
      { id: 'habitos_alimentares.diario_24h.lanche_tarde', label: '24 h – Lanche da tarde', type: 'textarea' },
      { id: 'habitos_alimentares.diario_24h.jantar', label: '24 h – Jantar', type: 'textarea' },
      { id: 'habitos_alimentares.diario_24h.ceia', label: '24 h – Ceia', type: 'textarea' },
  
      { id: 'avaliacao_antropometrica.peso_kg', label: 'Peso (kg)', type: 'number' },
      { id: 'avaliacao_antropometrica.altura_cm', label: 'Altura (cm)', type: 'number' },
  
      { id: 'avaliacao_antropometrica.circunferencias.cintura', label: 'Circunferência cintura', type: 'number' },
      { id: 'avaliacao_antropometrica.circunferencias.quadril', label: 'Circunferência quadril', type: 'number' },
      { id: 'avaliacao_antropometrica.circunferencias.abdomen', label: 'Circunferência abdômen', type: 'number' },
      { id: 'avaliacao_antropometrica.circunferencias.braco', label: 'Circunferência braço', type: 'number' },
  
      { id: 'avaliacao_antropometrica.dobras_cutaneas.tricipital', label: 'Dobra tricipital', type: 'number' },
      { id: 'avaliacao_antropometrica.dobras_cutaneas.subescapular', label: 'Dobra subescapular', type: 'number' },
      { id: 'avaliacao_antropometrica.dobras_cutaneas.suprailiaca', label: 'Dobra supra-ilíaca', type: 'number' },
      { id: 'avaliacao_antropometrica.dobras_cutaneas.abdominal', label: 'Dobra abdominal', type: 'number' },
  
      { id: 'avaliacao_antropometrica.bioimpedancia.massa_gorda_percentual', label: '% Massa gorda', type: 'number' },
      { id: 'avaliacao_antropometrica.bioimpedancia.massa_magra_kg', label: 'Massa magra (kg)', type: 'number' },
      { id: 'avaliacao_antropometrica.bioimpedancia.agua_corporal_percentual', label: '% Água corporal', type: 'number' },
      { id: 'avaliacao_antropometrica.bioimpedancia.idade_metabolica', label: 'Idade metabólica', type: 'number' },
  
      { id: 'objetivos.objetivo_principal', label: 'Objetivo principal', type: 'text' },
      { id: 'objetivos.tempo_estimado', label: 'Tempo estimado', type: 'text' },
      { id: 'objetivos.motivacoes_pessoais', label: 'Motivações pessoais', type: 'textarea' },
      { id: 'objetivos.nível_engajamento', label: 'Nível de engajamento', type: 'text' },
  
      { id: 'comportamento_alimentar.fome_fisiologica', label: 'Fome fisiológica', type: 'boolean' },
      { id: 'comportamento_alimentar.fome_emocional', label: 'Fome emocional', type: 'boolean' },
      { id: 'comportamento_alimentar.compulsao', label: 'Compulsão', type: 'boolean' },
      { id: 'comportamento_alimentar.belisca_durante_o_dia', label: 'Belisca durante o dia', type: 'boolean' },
      { id: 'comportamento_alimentar.come_por_tedio', label: 'Come por tédio', type: 'boolean' },
      { id: 'comportamento_alimentar.avaliacao_mindful_eating', label: 'Avaliação mindful eating', type: 'text' },
  
      { id: 'observacoes_adicionais', label: 'Observações adicionais', type: 'textarea' },
  
      { id: 'assinatura_profissional.nome_profissional', label: 'Nome do profissional', type: 'text' },
      { id: 'assinatura_profissional.registro', label: 'Registro', type: 'text' },
      { id: 'assinatura_profissional.crn', label: 'CRN', type: 'text' },
      { id: 'assinatura_profissional.data_avaliacao', label: 'Data da avaliação', type: 'text' }
    ]
  },
  DERMATOLOGIA: {
    fields: [
      { id: 'dados_gerais.queixa_principal',           label: 'Queixa principal',            type: 'textarea', required: true },
      { id: 'dados_gerais.inicio_sintomas',            label: 'Início dos sintomas',         type: 'text' },
      { id: 'dados_gerais.evolucao',                   label: 'Evolução / duração',          type: 'text' },
  
      { id: 'historia_pessoal.alergias_medicamentos',  label: 'Alergia a medicamentos',       type: 'textarea' },
      { id: 'historia_pessoal.doencas_previas',        label: 'Doenças prévias',             type: 'textarea' },
      { id: 'historia_pessoal.uso_medicamentos',       label: 'Uso de medicamentos',          type: 'textarea' },
      { id: 'historia_pessoal.antecedentes_familiares',label: 'Antecedentes familiares',      type: 'textarea' },
  
      { id: 'habitos.exposicao_solar_horas',           label: 'Exposição solar (h/dia)',      type: 'number',  min: 0 },
      { id: 'habitos.uso_protetor_solar',              label: 'Usa protetor solar',           type: 'boolean' },
      { id: 'habitos.tipo_protetor_solar',             label: 'Tipo de protetor',             type: 'text' },
      { id: 'habitos.tabagismo',                       label: 'Tabagismo',                    type: 'boolean' },
      { id: 'habitos.etilismo',                        label: 'Etilismo',                     type: 'boolean' },
  
      { id: 'rotina_cuidados.uso_sabonete',            label: 'Sabonete facial',              type: 'text' },
      { id: 'rotina_cuidados.uso_hidratante',          label: 'Hidratante',                   type: 'text' },
      { id: 'rotina_cuidados.uso_acidos',              label: 'Ácidos / peelings',            type: 'text' },
      { id: 'rotina_cuidados.uso_maquiagem',           label: 'Maquiagem diária',             type: 'boolean' },
      { id: 'rotina_cuidados.remove_maquiagem',        label: 'Remove maquiagem antes de dormir', type: 'boolean' },
  
      { id: 'exame_fisico.lesoes',                     label: 'Descrição das lesões',         type: 'textarea' },
      { id: 'exame_fisico.localizacao',                label: 'Localização das lesões',       type: 'textarea' },
      { id: 'exame_fisico.tipos_pele',                 label: 'Tipo de pele',                 type: 'select',
        options: ['oleosa','mista','seca','normal'] },
  
      { id: 'avaliacao_acne.grau',                     label: 'Acne – Grau',                  type: 'select',
        options: ['I','II','III','IV'] },
      { id: 'avaliacao_acne.presenca_cicatrizes',      label: 'Cicatrizes de acne',           type: 'boolean' },
  
      { id: 'avaliacao_melasma.distribuicao',          label: 'Melasma – Distribuição',       type: 'text' },
      { id: 'avaliacao_melasma.fatores_desencadeantes',label: 'Fatores desencadeantes',       type: 'textarea' },
  
      { id: 'tratamentos_previos.topicos',             label: 'Tratamentos tópicos prévios',  type: 'textarea' },
      { id: 'tratamentos_previos.orais',               label: 'Tratamentos orais prévios',    type: 'textarea' },
  
      { id: 'objetivos_paciente',                      label: 'Objetivos do paciente',        type: 'textarea' },
      { id: 'observacoes_adicionais',                  label: 'Observações adicionais',       type: 'textarea' },
  
      { id: 'assinatura_profissional.nome',            label: 'Profissional',                 type: 'text' },
      { id: 'assinatura_profissional.registro',        label: 'Registro (CRM/CRP etc.)',      type: 'text' },
      { id: 'assinatura_profissional.data',            label: 'Data',                         type: 'text' }
    ]
  },
  ENDOCRINOLOGIA: {
    fields: [
      { id: 'motivo_consulta', label: 'Motivo da consulta', type: 'textarea', required: true },
  
      { id: 'queixa_principal.descricao', label: 'Queixa – Descrição', type: 'textarea' },
      { id: 'queixa_principal.inicio', label: 'Queixa – Início', type: 'text' },
      { id: 'queixa_principal.tempo_evolucao', label: 'Queixa – Tempo de evolução', type: 'text' },
      { id: 'queixa_principal.fatores_agravantes', label: 'Queixa – Fatores agravantes', type: 'textarea' },
      { id: 'queixa_principal.fatores_ameliorantes', label: 'Queixa – Fatores amenizantes', type: 'textarea' },
      { id: 'queixa_principal.sintomas_associados', label: 'Queixa – Sintomas associados', type: 'textarea' },
  
      { id: 'historico_pessoal.doencas_previas', label: 'Doenças prévias', type: 'textarea' },
      { id: 'historico_pessoal.tratamentos_anteriores', label: 'Tratamentos anteriores', type: 'textarea' },
      { id: 'historico_pessoal.cirurgias_previas', label: 'Cirurgias prévias', type: 'textarea' },
      { id: 'historico_pessoal.uso_medicamentos_atual', label: 'Medicamentos em uso', type: 'textarea' },
      { id: 'historico_pessoal.alergias', label: 'Alergias', type: 'textarea' },
      { id: 'historico_pessoal.hospitalizacoes', label: 'Hospitalizações', type: 'textarea' },
  
      { id: 'historico_familiar.familiares_com_endocrinopatias.diabetes_mellitus', label: 'Familiar com diabetes', type: 'boolean' },
      { id: 'historico_familiar.familiares_com_endocrinopatias.doencas_tiroideanas', label: 'Familiar com doença tireoidiana', type: 'boolean' },
      { id: 'historico_familiar.familiares_com_endocrinopatias.dislipidemia', label: 'Familiar com dislipidemia', type: 'boolean' },
      { id: 'historico_familiar.familiares_com_endocrinopatias.obesidade', label: 'Familiar com obesidade', type: 'boolean' },
      { id: 'historico_familiar.familiares_com_endocrinopatias.neoplasias_endocrinas', label: 'Neoplasias endócrinas na família', type: 'boolean' },
      { id: 'historico_familiar.familiares_com_endocrinopatias.osteoporose', label: 'Osteoporose na família', type: 'boolean' },
      { id: 'historico_familiar.familiares_com_endocrinopatias.hiperplasia_adrenal_congenita', label: 'Hiperplasia adrenal congênita', type: 'boolean' },
  
      { id: 'avaliacao_endocrina_sintomas.tiroide.ganho_peso', label: 'Tireóide – Ganho de peso', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.tiroide.perda_peso', label: 'Tireóide – Perda de peso', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.tiroide.palpitacoes', label: 'Tireóide – Palpitações', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.tiroide.intolerancia_ao_frio', label: 'Intolerância ao frio', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.tiroide.intolerancia_ao_calor', label: 'Intolerância ao calor', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.tiroide.queda_de_cabelo', label: 'Queda de cabelo', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.tiroide.alteracao_de_pele', label: 'Alteração de pele', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.tiroide.constipacao', label: 'Constipação', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.tiroide.diarreia', label: 'Diarréia', type: 'boolean' },
  
      { id: 'avaliacao_endocrina_sintomas.diabetes.poliuria', label: 'Poliúria', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.diabetes.polidipsia', label: 'Polidipsia', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.diabetes.polifagia', label: 'Polifagia', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.diabetes.visao_turva', label: 'Visão turva', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.diabetes.infecoes_recorrentes', label: 'Infecções recorrentes', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.diabetes.feridas_que_nao_cicatrizam', label: 'Feridas que não cicatrizam', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.diabetes.hipoglicemias', label: 'Hipoglicemias', type: 'boolean' },
  
      { id: 'avaliacao_endocrina_sintomas.funcoes_sexuais.libido', label: 'Libido', type: 'text' },
      { id: 'avaliacao_endocrina_sintomas.funcoes_sexuais.disfuncoes_eretil', label: 'Disfunção erétil', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.funcoes_sexuais.irregularidade_menstrual', label: 'Irregularidade menstrual', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.funcoes_sexuais.amenorreia', label: 'Amenorreia', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.funcoes_sexuais.hirsutismo', label: 'Hirsutismo', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.funcoes_sexuais.galactorreia', label: 'Galactorreia', type: 'boolean' },
  
      { id: 'avaliacao_endocrina_sintomas.crescimento_e_massa_óssea.alteracao_altura', label: 'Alteração de altura', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.crescimento_e_massa_óssea.fraturas_frequentes', label: 'Fraturas frequentes', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.crescimento_e_massa_óssea.dor_ossea_muscular', label: 'Dor óssea/muscular', type: 'boolean' },
  
      { id: 'avaliacao_endocrina_sintomas.neuroendocrino.cefaleia', label: 'Cefaleia', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.neuroendocrino.alteracao_visao', label: 'Alteração de visão', type: 'boolean' },
      { id: 'avaliacao_endocrina_sintomas.neuroendocrino.convulsoes', label: 'Convulsões', type: 'boolean' },
  
      { id: 'habitos_de_vida.tabagismo.ativo', label: 'Tabagismo ativo', type: 'boolean' },
      { id: 'habitos_de_vida.tabagismo.tempo', label: 'Tabagismo – Tempo (anos)', type: 'text' },
      { id: 'habitos_de_vida.tabagismo.quantidade_dia', label: 'Tabagismo – Qtde/dia', type: 'number', min: 0 },
  
      { id: 'habitos_de_vida.etilismo', label: 'Etilismo', type: 'boolean' },
  
      { id: 'habitos_de_vida.alimentacao.restricoes_alimentares', label: 'Restrições alimentares', type: 'textarea' },
      { id: 'habitos_de_vida.alimentacao.ingestao_carboidrato_simples', label: 'Carboidrato simples – ingestão', type: 'text' },
      { id: 'habitos_de_vida.alimentacao.ingestao_fibras', label: 'Ingestão de fibras', type: 'text' },
      { id: 'habitos_de_vida.alimentacao.frequencia_refeicoes', label: 'Frequência de refeições', type: 'number', min: 0 },
  
      { id: 'habitos_de_vida.atividade_fisica.pratica', label: 'Prática de atividade física', type: 'boolean' },
      { id: 'habitos_de_vida.atividade_fisica.tipo', label: 'Tipo de atividade física', type: 'text' },
      { id: 'habitos_de_vida.atividade_fisica.frequencia_semana', label: 'Freq. (vezes/sem)', type: 'number', min: 0 },
  
      { id: 'habitos_de_vida.sono.qualidade', label: 'Qualidade do sono', type: 'text' },
      { id: 'habitos_de_vida.sono.quantidade_horas', label: 'Horas de sono', type: 'number', min: 0 },
  
      { id: 'sinais_vitais.pressao_arterial_mmHg', label: 'Pressão arterial (mmHg)', type: 'text' },
      { id: 'sinais_vitais.frequencia_cardiaca_bpm', label: 'Frequência cardíaca (bpm)', type: 'number', min: 0 },
      { id: 'sinais_vitais.temperatura_celsius', label: 'Temperatura (°C)', type: 'number' },
      { id: 'sinais_vitais.glicemia_capilar_mgdl', label: 'Glicemia capilar (mg/dL)', type: 'number' },
      { id: 'sinais_vitais.saturacao_O2_percent', label: 'Saturação O₂ (%)', type: 'number' },
  
      { id: 'avaliacao_antropometrica.circunferencia_abdominal_cm', label: 'Circunferência abdominal (cm)', type: 'number' },
      { id: 'avaliacao_antropometrica.percentual_gordura_corporal', label: '% Gordura corporal', type: 'number' },
  
      { id: 'exames_complementares.exames_pedidos', label: 'Exames pedidos', type: 'textarea' },
      { id: 'exames_complementares.resultados_disponiveis', label: 'Resultados disponíveis', type: 'textarea' },
  
      { id: 'conduta_planejada.diagnosticos_presuntivos', label: 'Diagnósticos presuntivos', type: 'textarea' },
      { id: 'conduta_planejada.condutas_iniciais', label: 'Condutas iniciais', type: 'textarea' },
      { id: 'conduta_planejada.encaminhamentos', label: 'Encaminhamentos', type: 'textarea' },
      { id: 'conduta_planejada.retorno_em_dias', label: 'Retorno (dias)', type: 'number', min: 0 },
  
      { id: 'assinatura_profissional.nome', label: 'Profissional', type: 'text' },
      { id: 'assinatura_profissional.registro', label: 'Registro', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  NUTROLOGIA: {
    fields: [
      { id: 'queixa_principal_hda.queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'queixa_principal_hda.inicio_sintomas', label: 'Início dos sintomas', type: 'text' },
      { id: 'queixa_principal_hda.hda', label: 'História da doença atual', type: 'textarea' },
      { id: 'queixa_principal_hda.objetivo_paciente', label: 'Objetivo do paciente', type: 'textarea' },

      { id: 'historico_pessoal.doencas_preexistentes', label: 'Doenças pré-existentes', type: 'textarea' },
      { id: 'historico_pessoal.historico_obesidade', label: 'Histórico de obesidade/sobrepeso', type: 'textarea' },
      { id: 'historico_pessoal.doencas_autoimunes', label: 'Doenças autoimunes', type: 'textarea' },
      { id: 'historico_pessoal.doencas_gastro', label: 'Doenças gastrointestinais', type: 'textarea' },
      { id: 'historico_pessoal.cirurgias', label: 'Cirurgias prévias', type: 'textarea' },
      { id: 'historico_pessoal.medicamentos', label: 'Medicamentos contínuos', type: 'textarea' },
      { id: 'historico_pessoal.hormonios', label: 'Hormônios / anabolizantes', type: 'textarea' },
      { id: 'historico_pessoal.suplementos', label: 'Suplementos em uso', type: 'textarea' },
      { id: 'historico_pessoal.alergias', label: 'Alergias', type: 'textarea' },

      { id: 'historico_familiar.obesidade_familiar', label: 'Obesidade na família', type: 'text' },
      { id: 'historico_familiar.diabetes_familiar', label: 'Diabetes na família', type: 'text' },

      { id: 'habitos_alimentares.frequencia_refeicoes', label: 'Frequência de refeições', type: 'number', min: 0 },
      { id: 'habitos_alimentares.ingestao_carboidrato_simples', label: 'Carboidrato simples', type: 'text' },
      { id: 'habitos_alimentares.ingestao_fibras', label: 'Ingestão de fibras', type: 'text' },
      { id: 'habitos_alimentares.restricoes_alimentares', label: 'Restrições alimentares', type: 'textarea' },

      { id: 'exames_laboratoriais.hemograma_completo', label: 'Hemograma completo', type: 'text' },
      { id: 'exames_laboratoriais.glicemia_jejum', label: 'Glicemia de jejum', type: 'text' },
      { id: 'exames_laboratoriais.perfil_lipidico', label: 'Perfil lipídico', type: 'text' },
      { id: 'exames_laboratoriais.tireoide', label: 'TSH / T3 / T4', type: 'text' },
      { id: 'exames_laboratoriais.vitamina_d', label: 'Vitamina D', type: 'text' },

      { id: 'objetivos_terapeuticos.objetivos', label: 'Objetivos terapêuticos', type: 'textarea' },
      { id: 'objetivos_terapeuticos.tratamentos_previos', label: 'Tratamentos prévios', type: 'textarea' },
      { id: 'objetivos_terapeuticos.motivacao', label: 'Motivação/adesão', type: 'textarea' },

      { id: 'finalizacao.data_consulta', label: 'Data da consulta', type: 'text' },
      { id: 'finalizacao.assinatura_paciente', label: 'Assinatura do paciente', type: 'text' },
      { id: 'finalizacao.assinatura_profissional', label: 'Assinatura do nutrólogo', type: 'text' },
      { id: 'finalizacao.crm', label: 'CRM', type: 'text' }
    ]
  },

  CARDIOLOGIA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },

      { id: 'historia_molestia_atual.inicio_sintomas', label: 'Início dos sintomas', type: 'text' },
      { id: 'historia_molestia_atual.descricao', label: 'Descrição da HMA', type: 'textarea' },

      { id: 'historia_molestia_atual.caracteristicas_dor.localizacao', label: 'Dor – Localização', type: 'text' },
      { id: 'historia_molestia_atual.caracteristicas_dor.intensidade', label: 'Dor – Intensidade', type: 'text' },
      { id: 'historia_molestia_atual.caracteristicas_dor.duracao', label: 'Dor – Duração', type: 'text' },
      { id: 'historia_molestia_atual.caracteristicas_dor.fatores_agravantes', label: 'Dor – Fatores agravantes', type: 'textarea' },
      { id: 'historia_molestia_atual.caracteristicas_dor.fatores_amenizantes', label: 'Dor – Fatores amenizantes', type: 'textarea' },

      { id: 'historia_molestia_atual.dispneia.grau', label: 'Dispneia – Grau', type: 'text' },
      { id: 'historia_molestia_atual.palpitacoes.presenca', label: 'Palpitações', type: 'boolean' },
      { id: 'historia_molestia_atual.sincopes.presenca', label: 'Síncopes', type: 'boolean' },
      { id: 'historia_molestia_atual.edema.presenca', label: 'Edema', type: 'boolean' },

      { id: 'historico_patologico_pregresso.doencas_previas', label: 'Doenças prévias', type: 'textarea' },
      { id: 'historico_patologico_pregresso.cirurgias_previas', label: 'Cirurgias prévias', type: 'textarea' },
      { id: 'historico_patologico_pregresso.uso_medicamentos', label: 'Medicamentos em uso', type: 'textarea' },

      { id: 'historico_familiar.doencas_cardiovasculares.presenca', label: 'Doença cardiovascular na família', type: 'boolean' },
      { id: 'historico_familiar.morte_subita.presenca', label: 'Morte súbita na família', type: 'boolean' },

      { id: 'habitos_vida.tabagismo.ativo', label: 'Tabagismo', type: 'boolean' },
      { id: 'habitos_vida.etilismo.ativo', label: 'Etilismo', type: 'boolean' },
      { id: 'habitos_vida.atividade_fisica.pratica', label: 'Atividade física', type: 'boolean' },

      { id: 'sinais_vitais.pressao_arterial_mmHg', label: 'Pressão arterial', type: 'text' },
      { id: 'sinais_vitais.frequencia_cardiaca_bpm', label: 'Frequência cardíaca', type: 'number', min: 0 },

      { id: 'exames_complementares.ecg', label: 'ECG', type: 'text' },
      { id: 'exames_complementares.ecocardiograma', label: 'Ecocardiograma', type: 'text' },
      { id: 'exames_complementares.teste_ergometrico', label: 'Teste ergométrico', type: 'text' },
      { id: 'exames_complementares.mapa', label: 'MAPA', type: 'text' },
      { id: 'exames_complementares.radiografia_torax', label: 'RX tórax', type: 'text' },

      { id: 'hipoteses_diagnosticas', label: 'Hipóteses diagnósticas', type: 'textarea' },

      { id: 'conduta.medicamentos_prescritos', label: 'Medicamentos prescritos', type: 'textarea' },
      { id: 'conduta.orientacoes', label: 'Orientações', type: 'textarea' },
      { id: 'conduta.encaminhamentos', label: 'Encaminhamentos', type: 'textarea' },

      { id: 'acompanhamento.data_retorno', label: 'Data de retorno', type: 'text' },
      { id: 'acompanhamento.observacoes', label: 'Observações', type: 'textarea' }
    ]
  },
  FISIOTERAPIA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'hda.descricao', label: 'História da doença/lesão', type: 'textarea' },
      { id: 'hda.inicio', label: 'Início', type: 'text' },
      { id: 'hda.mecanismo_lesao', label: 'Mecanismo da lesão', type: 'textarea' },
  
      { id: 'avaliacao_dor.intensidade', label: 'Dor – Intensidade (0-10)', type: 'number', min: 0, max: 10 },
      { id: 'avaliacao_dor.tipo', label: 'Dor – Tipo', type: 'text' },
      { id: 'avaliacao_dor.frequencia', label: 'Dor – Frequência', type: 'text' },
      { id: 'avaliacao_dor.irradiacao', label: 'Dor – Irradiação', type: 'text' },
  
      { id: 'exame_fisico.inspecao', label: 'Inspeção', type: 'textarea' },
      { id: 'exame_fisico.palpacao', label: 'Palpação', type: 'textarea' },
      { id: 'exame_fisico.amplitude_movimento', label: 'Amplitude de movimento', type: 'text' },
      { id: 'exame_fisico.forca_muscular', label: 'Força muscular', type: 'text' },
      { id: 'exame_fisico.teste_funcional', label: 'Testes funcionais', type: 'textarea' },
  
      { id: 'diagnostico_fisioterapico', label: 'Diagnóstico fisioterapêutico', type: 'textarea' },
  
      { id: 'objetivos_tratamento.curto_prazo', label: 'Objetivos – Curto prazo', type: 'textarea' },
      { id: 'objetivos_tratamento.longo_prazo', label: 'Objetivos – Longo prazo', type: 'textarea' },
  
      { id: 'plano_tratamento.recursos_terapeuticos', label: 'Recursos terapêuticos', type: 'textarea' },
      { id: 'plano_tratamento.frequencia', label: 'Frequência (sessões/sem)', type: 'number', min: 0 },
      { id: 'plano_tratamento.duracao_prevista_semanas', label: 'Duração prevista (semanas)', type: 'number', min: 0 },
  
      { id: 'reavaliacao.data_prevista', label: 'Data da reavaliação', type: 'text' },
      { id: 'assinatura_profissional.nome', label: 'Profissional', type: 'text' },
      { id: 'assinatura_profissional.crefito', label: 'CREFITO', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  
  PSICOLOGIA: {
    fields: [
      { id: 'motivo_busca_terapia', label: 'Motivo da busca por terapia', type: 'textarea', required: true },
  
      { id: 'historico_pessoal.eventos_marcantes', label: 'Eventos marcantes', type: 'textarea' },
      { id: 'historico_pessoal.saude_mental_previa', label: 'Saúde mental prévia', type: 'textarea' },
      { id: 'historico_pessoal.uso_psicofarmacos', label: 'Uso de psicofármacos', type: 'textarea' },
  
      { id: 'historico_familiar.transtornos_mentais', label: 'Transtornos mentais na família', type: 'textarea' },
      { id: 'historico_familiar.suicidio', label: 'Ideação ou ato suicida na família', type: 'boolean' },
  
      { id: 'avaliação_atual.estado_humor', label: 'Estado de humor atual', type: 'text' },
      { id: 'avaliação_atual.nivel_ansiedade', label: 'Nível de ansiedade', type: 'text' },
      { id: 'avaliação_atual.qualidade_sono', label: 'Qualidade do sono', type: 'text' },
      { id: 'avaliação_atual.alimentacao', label: 'Alimentação', type: 'text' },
      { id: 'avaliação_atual.uso_substancias', label: 'Uso de substâncias', type: 'textarea' },
  
      { id: 'relacoes_sociais.familia', label: 'Família', type: 'textarea' },
      { id: 'relacoes_sociais.trabalho_estudos', label: 'Trabalho/Estudos', type: 'textarea' },
      { id: 'relacoes_sociais.amigos', label: 'Amigos', type: 'textarea' },
  
      { id: 'objetivos_terapia', label: 'Objetivos da terapia', type: 'textarea' },
  
      { id: 'plano_terapeutico.abordagem', label: 'Abordagem terapêutica', type: 'text' },
      { id: 'plano_terapeutico.frequencia_sessoes', label: 'Frequência de sessões', type: 'text' },
      { id: 'plano_terapeutico.duracao_estimada', label: 'Duração estimada', type: 'text' },
  
      { id: 'observacoes_adicionais', label: 'Observações adicionais', type: 'textarea' },
  
      { id: 'assinatura_profissional.nome', label: 'Psicólogo(a)', type: 'text' },
      { id: 'assinatura_profissional.crp', label: 'CRP', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  ORTOPEDIA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'hda.inicio', label: 'Início', type: 'text' },
      { id: 'hda.mecanismo_trauma', label: 'Mecanismo/trauma', type: 'textarea' },
      { id: 'hda.intensidade_dor', label: 'Intensidade da dor (0-10)', type: 'number', min: 0, max: 10 },
      { id: 'hda.localizacao_dor', label: 'Localização da dor', type: 'text' },
      { id: 'hda.irradiacao_dor', label: 'Irradiação', type: 'text' },
      { id: 'hda.fatores_agravantes', label: 'Fatores agravantes', type: 'textarea' },
      { id: 'hda.fatores_amenizantes', label: 'Fatores amenizantes', type: 'textarea' },
      { id: 'hda.sintomas_associados', label: 'Sintomas associados', type: 'textarea' },
  
      { id: 'historico_pessoal.fraturas_previas', label: 'Fraturas prévias', type: 'textarea' },
      { id: 'historico_pessoal.cirurgias_previas', label: 'Cirurgias ortopédicas', type: 'textarea' },
      { id: 'historico_pessoal.doencas_reumatologicas', label: 'Doenças reumatológicas', type: 'textarea' },
      { id: 'historico_pessoal.medicamentos', label: 'Medicamentos em uso', type: 'textarea' },
      { id: 'historico_pessoal.alergias', label: 'Alergias', type: 'textarea' },
  
      { id: 'historico_familiar.doencas_osteoarticulares', label: 'Doenças osteoarticulares na família', type: 'textarea' },
  
      { id: 'exame_fisico.inspecao', label: 'Inspeção', type: 'textarea' },
      { id: 'exame_fisico.palpacao', label: 'Palpação', type: 'textarea' },
      { id: 'exame_fisico.amplitude_movimento', label: 'Amplitude de movimento', type: 'text' },
      { id: 'exame_fisico.forca_muscular', label: 'Força muscular', type: 'text' },
      { id: 'exame_fisico.testes_especiais', label: 'Testes especiais', type: 'textarea' },
  
      { id: 'exames_complementares.radiografia', label: 'Radiografia', type: 'text' },
      { id: 'exames_complementares.ressonancia', label: 'Ressonância', type: 'text' },
      { id: 'exames_complementares.tomografia', label: 'Tomografia', type: 'text' },
  
      { id: 'diagnostico', label: 'Diagnóstico', type: 'textarea' },
  
      { id: 'plano_tratamento.tratamento_clinico', label: 'Tratamento clínico', type: 'textarea' },
      { id: 'plano_tratamento.fisioterapia_indicada', label: 'Fisioterapia indicada', type: 'boolean' },
      { id: 'plano_tratamento.ortese', label: 'Uso de órtese', type: 'boolean' },
      { id: 'plano_tratamento.cirurgia_indicada', label: 'Cirurgia indicada', type: 'boolean' },
  
      { id: 'retorno.data_prevista', label: 'Data de retorno', type: 'text' },
  
      { id: 'assinatura_profissional.nome', label: 'Ortopedista', type: 'text' },
      { id: 'assinatura_profissional.crm', label: 'CRM', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  
  GINECOLOGIA: {
    fields: [
      { id: 'motivo_consulta', label: 'Motivo da consulta', type: 'textarea', required: true },
  
      { id: 'historia_menstrual.menarca_idade', label: 'Menarca (idade)', type: 'number', min: 8 },
      { id: 'historia_menstrual.ciclo_duracao', label: 'Ciclo (dias)', type: 'number', min: 15 },
      { id: 'historia_menstrual.fluxo', label: 'Fluxo', type: 'text' },
      { id: 'historia_menstrual.dismenorreia', label: 'Dismenorreia', type: 'boolean' },
  
      { id: 'antecedentes_obstetricos.gesta', label: 'Gesta', type: 'number', min: 0 },
      { id: 'antecedentes_obstetricos.para', label: 'Para', type: 'number', min: 0 },
      { id: 'antecedentes_obstetricos.abortos', label: 'Abortos', type: 'number', min: 0 },
      { id: 'antecedentes_obstetricos.partos_normais', label: 'Partos normais', type: 'number', min: 0 },
      { id: 'antecedentes_obstetricos.partos_cesareos', label: 'Cesáreas', type: 'number', min: 0 },
  
      { id: 'historico_pessoal.doencas_ginecologicas', label: 'Doenças ginecológicas', type: 'textarea' },
      { id: 'historico_pessoal.uso_medicamentos', label: 'Medicamentos contínuos', type: 'textarea' },
      { id: 'historico_pessoal.alergias', label: 'Alergias', type: 'textarea' },
  
      { id: 'vida_sexual.inicio_atividade', label: 'Início da atividade sexual (idade)', type: 'number', min: 10 },
      { id: 'vida_sexual.numero_parceiros', label: 'Número de parceiros', type: 'number', min: 0 },
      { id: 'vida_sexual.metodo_contraceptivo', label: 'Método contraceptivo', type: 'text' },
  
      { id: 'exame_ginecologico.especular', label: 'Exame especular', type: 'textarea' },
      { id: 'exame_ginecologico.toque', label: 'Toque bimanual', type: 'textarea' },
      { id: 'exame_ginecologico.mamas', label: 'Exame das mamas', type: 'textarea' },
  
      { id: 'exames_complementares.preventivo', label: 'Preventivo (Papanicolau)', type: 'text' },
      { id: 'exames_complementares.ultrassonografia', label: 'USG pélvica/transvaginal', type: 'text' },
      { id: 'exames_complementares.beta_hcg', label: 'β-hCG', type: 'text' },
  
      { id: 'diagnostico', label: 'Diagnóstico', type: 'textarea' },
  
      { id: 'conduta.tratamento', label: 'Tratamento', type: 'textarea' },
      { id: 'conduta.orientacoes', label: 'Orientações', type: 'textarea' },
      { id: 'conduta.encaminhamentos', label: 'Encaminhamentos', type: 'textarea' },
  
      { id: 'retorno.data_prevista', label: 'Data de retorno', type: 'text' },
  
      { id: 'assinatura_profissional.nome', label: 'Ginecologista', type: 'text' },
      { id: 'assinatura_profissional.crm', label: 'CRM', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  DERMATOFUNCIONAL: {
    fields: [
      { id: 'queixa_estetica', label: 'Queixa estética principal', type: 'textarea', required: true },
      { id: 'tempo_queixa', label: 'Tempo da queixa', type: 'text' },
      { id: 'tratamentos_previos', label: 'Tratamentos prévios', type: 'textarea' },
  
      { id: 'habitos_vida.tabagismo', label: 'Tabagismo', type: 'boolean' },
      { id: 'habitos_vida.etilismo', label: 'Etilismo', type: 'boolean' },
      { id: 'habitos_vida.atividade_fisica', label: 'Atividade física', type: 'boolean' },
  
      { id: 'avaliacao_pele.tipo', label: 'Tipo de pele', type: 'select', options: ['oleosa', 'mista', 'seca', 'normal'] },
      { id: 'avaliacao_pele.hidratacao', label: 'Hidratação', type: 'text' },
      { id: 'avaliacao_pele.elasticidade', label: 'Elasticidade', type: 'text' },
  
      { id: 'avaliacao_corporea.circunferencias.cintura', label: 'Circunf. cintura (cm)', type: 'number' },
      { id: 'avaliacao_corporea.circunferencias.quadril', label: 'Circunf. quadril (cm)', type: 'number' },
      { id: 'avaliacao_corporea.dobras_cutaneas.abdominal', label: 'Dobra abdominal (mm)', type: 'number' },
  
      { id: 'disfuncoes_esteticas.celulite', label: 'Celulite', type: 'boolean' },
      { id: 'disfuncoes_esteticas.flacidez', label: 'Flacidez', type: 'boolean' },
      { id: 'disfuncoes_esteticas.gordura_localizada', label: 'Gordura localizada', type: 'boolean' },
      { id: 'disfuncoes_esteticas.estrias', label: 'Estrias', type: 'boolean' },
  
      { id: 'objetivos_tratamento', label: 'Objetivos do tratamento', type: 'textarea' },
  
      { id: 'plano_tratamento.recursos', label: 'Recursos terapêuticos', type: 'textarea' },
      { id: 'plano_tratamento.numero_sessoes', label: 'Nº de sessões', type: 'number', min: 0 },
      { id: 'plano_tratamento.frequencia', label: 'Frequência (semana)', type: 'text' },
  
      { id: 'assinatura_profissional.nome', label: 'Profissional', type: 'text' },
      { id: 'assinatura_profissional.registro', label: 'Registro', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  
  CIRURGIA_PLASTICA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'desejo_paciente', label: 'Desejo do paciente', type: 'textarea' },
  
      { id: 'avaliacao_geral_saude.doencas_previas', label: 'Doenças prévias', type: 'textarea' },
      { id: 'avaliacao_geral_saude.cirurgias_previas', label: 'Cirurgias prévias', type: 'textarea' },
      { id: 'avaliacao_geral_saude.alergias', label: 'Alergias', type: 'textarea' },
      { id: 'avaliacao_geral_saude.medicamentos', label: 'Medicamentos em uso', type: 'textarea' },
  
      { id: 'exame_fisico.medidas', label: 'Medidas corporais', type: 'textarea' },
      { id: 'exame_fisico.pele', label: 'Condição da pele', type: 'textarea' },
      { id: 'exame_fisico.cicatrizes', label: 'Cicatrizes', type: 'textarea' },
  
      { id: 'exames_complementares.hemograma', label: 'Hemograma', type: 'text' },
      { id: 'exames_complementares.coagulograma', label: 'Coagulograma', type: 'text' },
      { id: 'exames_complementares.imagem', label: 'Exames de imagem', type: 'text' },
  
      { id: 'plano_cirurgico.procedimento', label: 'Procedimento', type: 'text' },
      { id: 'plano_cirurgico.tecnica', label: 'Técnica', type: 'text' },
      { id: 'plano_cirurgico.anestesia', label: 'Tipo de anestesia', type: 'text' },
      { id: 'plano_cirurgico.duracao_prevista', label: 'Duração prevista (h)', type: 'number', min: 0 },
  
      { id: 'riscos_explicitados', label: 'Riscos explicitados', type: 'textarea' },
  
      { id: 'orientacoes.pre_operatorio', label: 'Orientações pré-operatórias', type: 'textarea' },
      { id: 'orientacoes.pos_operatorio', label: 'Orientações pós-operatórias', type: 'textarea' },
  
      { id: 'data_cirurgia_prevista', label: 'Data prevista da cirurgia', type: 'text' },
  
      { id: 'assinatura_profissional.nome', label: 'Cirurgião plástico', type: 'text' },
      { id: 'assinatura_profissional.crm', label: 'CRM', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  ENDOCRINOLOGIA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'historia_doenca_atual.inicio', label: 'Início dos sintomas', type: 'text' },
      { id: 'historia_doenca_atual.evolucao', label: 'Evolução', type: 'textarea' },
  
      { id: 'antecedentes_pessoais.doencas_endocrinas', label: 'Doenças endócrinas prévias', type: 'textarea' },
      { id: 'antecedentes_pessoais.cirurgias', label: 'Cirurgias prévias', type: 'textarea' },
      { id: 'antecedentes_pessoais.medicamentos', label: 'Medicamentos contínuos', type: 'textarea' },
      { id: 'antecedentes_pessoais.hormonios', label: 'Terapia hormonal', type: 'textarea' },
  
      { id: 'sinais_vitais.peso', label: 'Peso (kg)', type: 'number' },
      { id: 'sinais_vitais.altura', label: 'Altura (cm)', type: 'number' },
      { id: 'sinais_vitais.imc', label: 'IMC', type: 'number' },
      { id: 'sinais_vitais.pressao_arterial', label: 'Pressão arterial', type: 'text' },
  
      { id: 'exames_laboratoriais.tireoide', label: 'TSH/T3/T4', type: 'text' },
      { id: 'exames_laboratoriais.glicemia_jejum', label: 'Glicemia jejum', type: 'text' },
      { id: 'exames_laboratoriais.hba1c', label: 'Hemoglobina glicada', type: 'text' },
      { id: 'exames_laboratoriais.vitamina_d', label: 'Vitamina D', type: 'text' },
  
      { id: 'diagnostico', label: 'Diagnóstico', type: 'textarea' },
      { id: 'conduta.tratamento', label: 'Tratamento', type: 'textarea' },
      { id: 'conduta.orientacoes', label: 'Orientações', type: 'textarea' },
  
      { id: 'assinatura_profissional.nome', label: 'Endocrinologista', type: 'text' },
      { id: 'assinatura_profissional.crm', label: 'CRM', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  
  ANGIOLOGIA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'historia_molestia_atual', label: 'História da moléstia atual', type: 'textarea' },
  
      { id: 'historico_patologico_pessoal.insuficiencia_venosa_cronica', label: 'Insuficiência venosa crônica', type: 'boolean' },
      { id: 'historico_patologico_pessoal.trombose_venosa_profunda', label: 'TVP prévia', type: 'boolean' },
      { id: 'historico_patologico_pessoal.doenca_arterial_periferica', label: 'Doença arterial periférica', type: 'boolean' },
      { id: 'historico_patologico_pessoal.aneurismas_previos', label: 'Aneurismas prévios', type: 'boolean' },
  
      { id: 'avaliacao_sintomas_vasculares.dor_em_membros_inferiores', label: 'Dor MMII', type: 'boolean' },
      { id: 'avaliacao_sintomas_vasculares.inchaço_edema', label: 'Edema', type: 'boolean' },
      { id: 'avaliacao_sintomas_vasculares.formigamento', label: 'Formigamento', type: 'boolean' },
  
      { id: 'exame_fisico.pulsos_perifericos', label: 'Pulsos periféricos', type: 'text' },
      { id: 'exame_fisico.troficos_cutaneos', label: 'Tróficos cutâneos', type: 'text' },
  
      { id: 'exames_complementares.doppler_venoso', label: 'Doppler venoso', type: 'text' },
      { id: 'exames_complementares.doppler_arterial', label: 'Doppler arterial', type: 'text' },
  
      { id: 'diagnostico', label: 'Diagnóstico', type: 'textarea' },
      { id: 'conduta.tratamento_clinico', label: 'Tratamento clínico', type: 'textarea' },
      { id: 'conduta.tratamento_cirurgico', label: 'Tratamento cirúrgico', type: 'textarea' },
  
      { id: 'assinatura_profissional.nome', label: 'Angiologista', type: 'text' },
      { id: 'assinatura_profissional.crm', label: 'CRM', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  
  OTORRINOLARINGOLOGIA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'historia_doenca_atual', label: 'História da doença atual', type: 'textarea' },
  
      { id: 'antecedentes_pessoais.doencas_cronicas', label: 'Doenças crônicas', type: 'textarea' },
      { id: 'antecedentes_pessoais.alergias', label: 'Alergias', type: 'textarea' },
      { id: 'antecedentes_pessoais.medicamentos', label: 'Medicamentos em uso', type: 'textarea' },
  
      { id: 'habitos_de_vida.tabagismo', label: 'Tabagismo', type: 'boolean' },
      { id: 'habitos_de_vida.etilismo', label: 'Etilismo', type: 'boolean' },
      { id: 'habitos_de_vida.exposicao_profissional', label: 'Exposição profissional', type: 'text' },
  
      { id: 'avaliacao_sistemas.respiratorio.dispneia', label: 'Dispneia', type: 'boolean' },
      { id: 'avaliacao_sistemas.neurologico.cefaleia', label: 'Cefaleia', type: 'boolean' },
  
      { id: 'exame_fisico.otoscopia.meato_acustico_externo', label: 'Otoscopia – MAE', type: 'text' },
      { id: 'exame_fisico.rinoscopia.mucosa_nasal', label: 'Rinoscopia – Mucosa nasal', type: 'text' },
      { id: 'exame_fisico.oroscopia.amigdalas', label: 'Oroscopia – Amígdalas', type: 'text' },
  
      { id: 'exames_complementares.audiometria.resultado', label: 'Audiometria', type: 'text' },
      { id: 'exames_complementares.nasofibroscopia.resultado', label: 'Nasofibroscopia', type: 'text' },
  
      { id: 'diagnostico_presuntivo', label: 'Diagnóstico presuntivo', type: 'textarea' },
      { id: 'conduta.encaminhamentos', label: 'Encaminhamentos', type: 'textarea' },
      { id: 'conduta.prescricoes', label: 'Prescrições', type: 'textarea' },
  
      { id: 'assinatura_profissional.nome', label: 'Otorrino', type: 'text' },
      { id: 'assinatura_profissional.crm', label: 'CRM', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  
  UROLOGIA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'historico_sexual.atividade_sexual_ativa', label: 'Atividade sexual ativa', type: 'boolean' },
      { id: 'historico_sexual.numero_parceiros', label: 'Nº de parceiros', type: 'number', min: 0 },
      { id: 'historico_sexual.disfuncao_eretil', label: 'Disfunção erétil', type: 'boolean' },
      { id: 'historico_sexual.libido_reduzida', label: 'Libido reduzida', type: 'boolean' },
  
      { id: 'habitos_vida.tabagismo', label: 'Tabagismo', type: 'boolean' },
      { id: 'habitos_vida.etilismo', label: 'Etilismo', type: 'boolean' },
  
      { id: 'exames_complementares.psa_total', label: 'PSA total', type: 'text' },
      { id: 'exames_complementares.ultrassom_renal_vesical_prostata', label: 'USG RVPróstata', type: 'text' },
  
      { id: 'avaliacao_clinica_inicial.toque_retal.realizado', label: 'Toque retal realizado', type: 'boolean' },
      { id: 'avaliacao_clinica_inicial.toque_retal.descricao', label: 'Descrição toque retal', type: 'text' },
  
      { id: 'diagnostico', label: 'Diagnóstico', type: 'textarea' },
      { id: 'plano_terapeutico.medicacoes', label: 'Medicações', type: 'textarea' },
      { id: 'plano_terapeutico.encaminhamentos', label: 'Encaminhamentos', type: 'textarea' },
  
      { id: 'assinatura_profissional.nome', label: 'Urologista', type: 'text' },
      { id: 'assinatura_profissional.crm', label: 'CRM', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  
  NEFROLOGIA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'historico_medico.doencas_previas', label: 'Doenças renais prévias', type: 'textarea' },
      { id: 'historico_medico.medicacoes_em_uso', label: 'Medicações em uso', type: 'textarea' },
  
      { id: 'sinais_vitais.peso', label: 'Peso (kg)', type: 'number' },
      { id: 'sinais_vitais.pressao_arterial_mmHg', label: 'Pressão arterial', type: 'text' },
  
      { id: 'exames_complementares.laboratoriais.creatinina', label: 'Creatinina', type: 'text' },
      { id: 'exames_complementares.laboratoriais.ureia', label: 'Ureia', type: 'text' },
      { id: 'exames_complementares.laboratoriais.clearance_creatinina', label: 'Clearance creatinina', type: 'text' },
      { id: 'exames_complementares.imagem.ultrassonografia_renal.tamanho_rins', label: 'USG renal – Tamanho dos rins', type: 'text' },
  
      { id: 'avaliacao_funcional.estagio_drc', label: 'Estágio DRC', type: 'text' },
      { id: 'avaliacao_funcional.necessidade_dialise', label: 'Necessita diálise', type: 'boolean' },
  
      { id: 'plano_terapeutico.medicacoes', label: 'Medicações', type: 'textarea' },
      { id: 'plano_terapeutico.orientacoes_dieteticas', label: 'Orientações dietéticas', type: 'textarea' },
  
      { id: 'assinatura_profissional.nome', label: 'Nefrologista', type: 'text' },
      { id: 'assinatura_profissional.crm', label: 'CRM', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
  
  PROCTOLOGIA: {
    fields: [
      { id: 'queixa_principal', label: 'Queixa principal', type: 'textarea', required: true },
      { id: 'historia_doenca_atual.inicio_sintomas', label: 'Início dos sintomas', type: 'text' },
      { id: 'historia_doenca_atual.evolucao', label: 'Evolução', type: 'textarea' },
  
      { id: 'sintomas_proctologicos.dor_anal', label: 'Dor anal', type: 'boolean' },
      { id: 'sintomas_proctologicos.sangramento_ret_ret', label: 'Sangramento retal', type: 'boolean' },
      { id: 'sintomas_proctologicos.prurido_anal', label: 'Prurido anal', type: 'boolean' },
      { id: 'sintomas_proctologicos.alteracao_habito_intestinal', label: 'Alteração hábito intestinal', type: 'boolean' },
  
      { id: 'exame_fisico.inspecao.lesoes_perianais', label: 'Lesões perianais', type: 'boolean' },
      { id: 'exame_fisico.toque_retaldigital', label: 'Toque retal digital', type: 'text' },
      { id: 'exame_fisico.anoscopia', label: 'Anoscopia', type: 'text' },
  
      { id: 'diagnostico_presuntivo', label: 'Diagnóstico presuntivo', type: 'textarea' },
      { id: 'conduta.prescricoes', label: 'Prescrições', type: 'textarea' },
      { id: 'conduta.encaminhamentos', label: 'Encaminhamentos', type: 'textarea' },
  
      { id: 'assinatura_profissional.nome', label: 'Proctologista', type: 'text' },
      { id: 'assinatura_profissional.crm', label: 'CRM', type: 'text' },
      { id: 'assinatura_profissional.data', label: 'Data', type: 'text' }
    ]
  },
} as const

export type SpecialtyKey = keyof typeof SPECIALTIES_CONFIG