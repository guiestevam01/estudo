import tf, { softmax } from '@tensorflow/tfjs-node';

async function trainModel(inputXs, outputYs){
    //camada de fluxo sequencial
    const model = tf.sequential()
    //primeira camada da rede:
    //entrada de 7 posicoes(idade normalizasda + 3 cores + 3 localizacao)
    model.add(tf.layers.dense({ inputShape: [7], units: 80, activation: 'relu' }))
    //setar neuronio de calculo
    // 80 neuronios, quanto mais neuronios mais complexiidade a rede a prende e mais porcessamento ela vai usar.

    //ativacao: ReLU age como um filtro: ela deixa somente os dados interessantes seguirem na rede. mensagem chegou = positivo se for 0 ou negativo joga fora.

    //saida: 3 neuronios
    //um para cada categoria
    //softmax    normaliza a saida em probabilidades
    model.add(tf.layers.dense({units: 3, activation: 'softmax'}))
    // adam e um treinador para redes neurais
    //ajusta os pesos de forma eficiente,
    //aprende com historico de erros e acertos
    //loss aprende com erros e acertos
    
    // loss compara o que o modelo acha com a resposta certa
    //resposta certa entre varias outras é bom.
    model.compile({ 
        optimizer: 'adam', 
        loss: 'categoricalCrossentropy', 
        metrics: ['accuracy'] // taxa de loss, se tiver alta ele nao aprende
    })

    //treinamento
    //verbose : desabilita o log interno
    // epochs quantidade de vezes que v ai passar no data base
    //shuffle embaralha os dados evitar ficar viciado
    await model.fit(
        inputXs,
        outputYs,
        {
            verbose: 0,
            epochs: 100, //PASSA 100 VEZES POR TODA DATABASE
            shuffle: true,
            callbacks: {
                onEpochEnd: (epochs, log) => console.log(
                    `Epoch: ${epochs}: loss = ${log.loss}`  
                )

            }
        }
    )
    return model //salva em disco,navegador e utilizar
}
async function predict(model, pessoa){
    //transformar array js e tensor(tfjs)
    const tfInput = tf.tensor2d(pessoa)
    //faz a predicao
    const pred =  model.predict(tfInput)
    const predArray = await pred.array()
    return  predArray[0].map((prob,index) => ({prob,index}))
}
    
//Exemplo de pessoas para treino
// {nome: "Erick", idade: 30, cor: "azul", localizacao: "São Paulo"},
// {nome: "Ana", idade: 25, cor: "vermelho", localizacao: "Rio"},
// {nome: "Carlos", idade: 40   , cor: "verde", localizacao: "Curitiva"},
// Vetores de entrada com valores ja normalizados e one-hot
//ordem [idade_normalizada, azul,vemelho,verde,saopaulo,rio,curiba]
//const tensorPessoas = [
//      [0.33,1,0,0,1,0,0], //Erick
//      [0,0,1,0,0,1,0], Ana
//      [1,0,0,1,0,0,1] Carlos 
// ]
//Usamos apenas dados numericos, pois a rede neural so entende
//noramalizou a idade.
const tensorPessoasNormalizado = [
    [0.33, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 1]
]
//llabels das categorias a serem previstas (one-hot encoded)
//[premium, medium,basic]
const labelsNomes = ["Premium", "medium", "Basic"];
const tensorLabels = [
    [1,0,0], //premium = erick
    [0,1,0], //medium = ana
    [0,0,1] //basic = carlos
];

//criando tensores de entrada xs e saida ys
const inputXs = tf.tensor2d(tensorPessoasNormalizado)
const outputYs = tf.tensor2d(tensorLabels)

//ETAPA TREINAMENTO
//quanto mais dado melhor
const model = await trainModel(inputXs, outputYs)
const pessoa = {nome: 'zé', idade: 28, cor: 'verde', localizacao: 'curitiba'}
//normalizando
//exemplo: idade_min = 25, idade_max = 40, entao 28-25 / (40-25) = 0.2
const pessoaNormalizada = [
    [
        0.2, //idade
        0, //cor azul
        0, //cor vermelho
        1, //cor verde
        0, // loc: sao paulo
        0, // loc rio
        1 //loc curitiba
    ]
]
const predictions = await predict(model, pessoaNormalizada)
const results = predictions
    .sort((a,b) => b.prob - a.prob)
.map(p => `${labelsNomes[p.index]} (${(p.prob * 100).toFixed(2)}%)`)
console.log(results) 