// Valores, estoque e o produto ER8-0400-PL são dados de exemplo: substitua pelos dados reais da empresa.
export const CATEGORIAS = ['Carregamento', 'Solda', 'Paletização']
const seg = ['Segmentos', 'Indústria Metalúrgica, Indústria Metalmecânica']
export const produtos = [
  { id: 'er8-0103-cw', codigo: 'ER8-0103-CW', nome: 'Robô de carregar ER8-0103-CW', categoria: 'Carregamento', preco: 187500, estoque: 4, imagem: 'robo-carga',
    descricao: 'Robô de carregar com 6 eixos, carga máxima de 8kg, alcance de 2010mm. Instalação: Piso/Teto.',
    specs: [['Número de eixos', '6'], ['Grau de proteção IP', 'IP54'], ['Instalação', 'Piso'], ['Alcance do braço', '2800mm'], ['Carga máxima', '700kg'], ['Peso do corpo', '2930kg'], seg] },
  { id: 'er8-2000-cw', codigo: 'ER8-2000-CW', nome: 'Robô de solda ER8-2000-CW', categoria: 'Solda', preco: 214900, estoque: 2, imagem: 'robo-solda',
    descricao: 'Robô de solda com 6 eixos, carga máxima de 8kg, alcance de 2010mm. Instalação: Piso/Teto.',
    specs: [['Número de eixos', '6'], ['Grau de proteção IP', 'IP54'], ['Instalação', 'Piso/Teto'], ['Alcance do braço', '2800mm'], ['Carga máxima', '8kg'], ['Peso do corpo', '281kg'], seg] },
  { id: 'er8-0400-pl', codigo: 'ER8-0400-PL', nome: 'Robô de paletização ER8-0400-PL', categoria: 'Paletização', preco: 245000, estoque: 0, imagem: 'robo-palet',
    descricao: 'Robô de paletização para linhas de embalagem e expedição.',
    specs: [['Número de eixos', '4'], ['Instalação', 'Piso'], seg] },
]
export const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
export const disponibilidade = (p) => (p.estoque > 0 ? 'Em estoque' : 'Sob encomenda')
