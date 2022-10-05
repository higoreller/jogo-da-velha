//Declaração das variáveis relacionadas ao jogo da velha
let playerOrder = document.getElementById("sJogadorDaVez")
let playerPointsX = document.getElementById("xPoints")
let playerPointsO = document.getElementById("oPoints")
const getAllSpan = document.getElementsByTagName('span')
const resetButton = document.getElementById("resetButton")
let getTime = document.getElementById("bestTime")
let checked
let winner
let checkedStatus = 0
let checkVictory = []
let playerPoints = {
  'X': 0,
  'O': 0
}

//Declaração das variáveis relacionadas ao cronômetro
let hh = 0
let mm = 0
let ss = 0
let stopwatch
let startCounter
let bestTime = {
  'X': [],
  'O': []
}

/////////////////////////////////////////   Cronômetro   /////////////////////////////////////////

//Inicia o temporizador
function start() {
  if (startCounter != 1) {
    stopwatch = setInterval(() => { timer(); }, 1000)
  }
  startCounter = 1
}

//Para o temporizador, mas preserva as variáveis
function pause() {
  clearInterval(stopwatch)
}

//Para o temporizador e limpa as variáveis
function stop() {
  clearInterval(stopwatch)
  hh = 0
  mm = 0
  ss = 0
  document.getElementById('counter').innerText = '00:00:00'
}

//Faz a contagem do tempo e exibição
function timer() {
  ss++  //Incrementa +1 na variável ss
  if (ss == 60) { //Verifica se deu 59 segundos
    ss = 0 //Volta os segundos para 0
    mm++ //Adiciona +1 na variável mm
    if (mm == 60) { //Verifica se deu 59 minutos
      mm = 0 //Volta os minutos para 0
      hh++ //Adiciona +1 na variável hora
    }
  }
  //Cria uma variável com o valor tratado HH:MM:SS utilizando operadores ternários
  var format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)
  //Insere o valor tratado no elemento counter
  document.getElementById('counter').innerText = format
  //Retorna o valor tratado
  return format
}

//Função para pegar o melhor tempo
function bestTimeEver(bestTimeX, bestTimeO) {
  let timeX = Math.max(null, bestTimeX)
  let timeO = Math.max(null, bestTimeO)
  console.log(timeX, timeO)
  if (timeX != 0 && timeO != 0) {
    if (timeX < timeO) {
      getTime.innerHTML = `O melhor tempo é do jogador X: ${timeX} segundos`
    } else if (timeX > timeO) {
      getTime.innerHTML = `O melhor tempo é do jogador O: ${timeO} segundos`
    }
  } else if (timeX == 0 && timeO != 0) {
    getTime.innerHTML = `O melhor tempo é do jogador O: ${timeO} segundos`
  } else if (timeX != 0 && timeO == 0) {
    getTime.innerHTML = `O melhor tempo é do jogador X: ${timeX} segundos`
  }
}

//Função que pega o tempo em segundos
function getSeconds(seconds, minutes, hours) {
  return seconds + minutes * 60 + hours * 3600
}

/////////////////////////////////////   Jogo da velha   ////////////////////////////////////////////

//Seleciona o campo, desabilita o campo clicado, estiliza a marcação e atribui um estado para o campo clicado
function markDiv(eventValue) {
  const selectedItem = eventValue.target
  checked = document.getElementById(selectedItem.id)
  if (checkedStatus == 0) {
    checked.innerText = "X"
    checked.style.pointerEvents = "none"
    checkVictory[Number(selectedItem.id) - 1] = 1
  } else {
    checked.innerText = "O"
    checked.style.pointerEvents = "none"
    checkVictory[Number(selectedItem.id) - 1] = 2
  }
  //Estilizando o 'X' e o 'O'
  checked.style.fontSize = "28px"
  checked.style.fontFamily = "Sans-serif"
  checked.style.fontWeight = "700"
}

//Função que determina a ordem dos jogadores
function playOrder(checkedValue, playerOrderValue) {
  if (checkedValue.innerText == "X") {
    playerOrderValue.innerText = `O`
    checkedStatus = 1
  } else {
    playerOrderValue.innerText = `X`
    checkedStatus = 0
  }
}

//Função que seleciona o ganhador, atribui a pontuação, pausa o tempo quando ganha e o //salva para uso em outra função
function getWinner(winnerValue) {
  if (winnerValue == 'O') {
    playerOrder.innerText = `Parabéns o jogador ${winnerValue} venceu!`
    playerPoints[winnerValue] += 1
    playerPointsO.innerText = playerPoints['O']
    pause()
    bestTime['O'] = getSeconds(ss, mm, hh)
    winner = winnerValue
  } else if (winnerValue == 'X') {
    playerOrder.innerText = `Parabéns o jogador ${winnerValue} venceu!`
    playerPoints[winnerValue] += 1
    playerPointsO.innerText = playerPoints['O']
    pause()
    bestTime['X'] = getSeconds(ss, mm, hh)
    winner = winnerValue
  }
}

//Exibir alerta com o número da casa clicada
function giveAlert(event, selectedValue) {
  const selectedItem = event.target
  let selectedItemValue = selectedValue
  checked = document.getElementById(selectedItem.id)
  alert(`A casa ${selectedItemValue} foi clicada!`)
}

//Verifica a vitória na linha
function lineCheck(checkVictoryValue, playerOrderValue) {
  for (let i = 0; i < checkVictoryValue.length; i++) {
    if (checkVictoryValue[i] == checkVictoryValue[i + 1] && checkVictoryValue[i + 1] == checkVictoryValue[i + 2] && checkVictoryValue[i] != undefined && (i == 0 || i == 3 || i == 6)) {
      let lastPlayer = playerOrderValue.innerText
      if (lastPlayer == 'X') {
        getWinner('O')
      } else {
        getWinner('X')
      }
    }
  }
}

//Verifica a vitória na coluna
function columnCheck(checkVictoryValue, playerOrderValue) {
  for (let i = 0; i < checkVictoryValue.length; i++) {
    if (checkVictoryValue[i] == checkVictoryValue[i + 3] && checkVictoryValue[i + 3] == checkVictoryValue[i + 6] && checkVictoryValue[i] != undefined && (i == 0 || i == 1 || i == 2)) {
      let lastPlayer = playerOrderValue.innerText
      if (lastPlayer == 'X') {
        getWinner('O')
      } else {
        getWinner('X')
      }
    }
  }
}

//Verifica a vitória na diagonal
function diagonalCheck(checkVictoryValue, playerOrderValue) {
  if (checkVictoryValue[0] == 1 && checkVictoryValue[4] == 1 && checkVictoryValue[8] == 1 || checkVictoryValue[0] == 2 && checkVictoryValue[4] == 2 && checkVictoryValue[8] == 2) {
    let lastPlayer = playerOrderValue.innerText
    if (lastPlayer == 'X') {
      getWinner('O')
    } else {
      getWinner('X')
    }
  } else if (checkVictoryValue[2] == 1 && checkVictoryValue[4] == 1 && checkVictoryValue[6] == 1 || checkVictoryValue[2] == 2 && checkVictoryValue[4] == 2 && checkVictoryValue[6] == 2) {
    let lastPlayer = playerOrderValue.innerText
    if (lastPlayer == 'X') {
      getWinner('O')
    } else {
      getWinner('X')
    }
  }
}

//Pontuando os jogadores
function playerPointsMark(checkVictoryValue, winnerValue, playerPointsXValue, playerPointsOValue) {
  let numberOfPlaysX = checkVictoryValue.filter((item) => item == 1).length
  let numberOfPlaysO = checkVictoryValue.filter((item) => item == 2).length
  if (numberOfPlaysX <= 4 && winnerValue == 'X') {
    playerPoints[winnerValue] += 1
    playerPointsXValue.innerText = playerPoints[winnerValue]
  } else if (numberOfPlaysO <= 4 && winnerValue == 'O') {
    playerPoints[winnerValue] += 1
    playerPointsOValue.innerText = playerPoints[winnerValue]
  } else if (numberOfPlaysX > 4 && winnerValue == 'X') {
    playerPointsXValue.innerText = playerPoints[winnerValue]
  } else if (numberOfPlaysO > 4 && winnerValue == 'O') {
    playerPointsOValue.innerText = playerPoints[winnerValue]
  }
}

//Função que mostra o botão de reiniciar a partida
function showResetButton(playerOrderValue, resetButtonValue, winnerValue) {
  if (playerOrderValue.innerText == `O jogo deu velha!` || playerOrderValue.innerText == `Parabéns o jogador ${winnerValue} venceu!`) {
    resetButtonValue.style.display = "block"
    //Travando o tabuleiro quando a partida acaba
    for (let i = 0; i < 9; i++) {
      let allDiv = []
      allDiv[i] = document.getElementById(String(i + 1))
      allDiv[i].style.pointerEvents = "none"
    }
  }
}

//Função que verifica se o jogo deu velha
function drawGame(checkVictoryValue, winnerValue, playerOrderValue) {
  if (checkVictoryValue.length == 9 && winnerValue == undefined && checkVictoryValue.includes(undefined) == false) {
    playerOrderValue.innerText = `O jogo deu velha!`
  }
}

//Função principal do programa
function selectedDiv(event) {
  const selectedItem = event.target
  checked = document.getElementById(selectedItem.id)
  //Iniciando o cronômetro
  start()
  //Capturando o evento dos cliques nos campos
  markDiv(event)
  //Estabelecendo a ordem dos jogadores
  playOrder(checked, playerOrder)
  //Checando a vitória na linha
  lineCheck(checkVictory, playerOrder)
  //Checando a vitória na coluna
  columnCheck(checkVictory, playerOrder)
  //Checando a vitória nas diagonais
  diagonalCheck(checkVictory, playerOrder)
  //Checando se deu velha
  drawGame(checkVictory, winner, playerOrder)
  //Mostrando o botão de resetar quando a partida termina
  showResetButton(playerOrder, resetButton, winner)
  //Pontuando com mais um ponto o jogador que venceu em até 4 jogadas
  playerPointsMark(checkVictory, winner, playerPointsX, playerPointsO)
  //Pegando o melhor tempo
  bestTimeEver(bestTime['X'], bestTime['O'])
}

//Resetando o jogo
function reset() {
  for (let i = 3; i < 12; i++) {
    getAllSpan[i].innerHTML = null
    getAllSpan[i].style.pointerEvents = "auto"
  }
  checkVictory = []
  winner = undefined
  playerOrder.innerHTML = ''
  resetButton.style.display = "none"
  stop()
  startCounter = 0
}

