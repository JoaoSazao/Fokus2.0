// CORES
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

// IMAGENS
const banner = document.querySelector('.app__image');

// TEXTOS
const titulo = document.querySelector('.app__title');

// BOTÕES
const botoes = document.querySelectorAll('.app__card-button');

// MÚSICAS E SONS
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const musicaPlay = new Audio('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

// TEMPORIZADOR

let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;
const startPauseBt = document.querySelector('#start-pause');

const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');

const tempoNaTela = document.querySelector('#timer');

musicaFocoInput.addEventListener('change', () => {
  if (musica.paused) {
    musica.play()
    musica.volume = 0.1;
  } else {
    musica.pause()
  }
})

focoBt.addEventListener('click', () => {

  tempoDecorridoEmSegundos = 1500;
  alterarContexto('foco');
  focoBt.classList.add('active');

})

curtoBt.addEventListener('click', () => {

  tempoDecorridoEmSegundos = 300;
  alterarContexto('descanso-curto');
  curtoBt.classList.add('active');

})

longoBt.addEventListener('click', () => {

  tempoDecorridoEmSegundos = 900;
  alterarContexto('descanso-longo');
  longoBt.classList.add('active');

})

function alterarContexto(contexto) {

  mostrarTempo();

  botoes.forEach(function (contexto) {
    contexto.classList.remove('active');
  })

  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
      Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>
      `
      break;

    case "descanso-curto":
      titulo.innerHTML = `
      Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `
      break;

    case "descanso-longo":
      titulo.innerHTML = `
      Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `

    default:
      break;
  }

}

const contagemRegressiva = () => {

  if (tempoDecorridoEmSegundos <= 0) {

    audioTempoFinalizado.play();
    audioTempoFinalizado.volume = 0.3;

    const focoAtivo = html.getAttribute('data-contexto') == 'foco';
    if (focoAtivo) {
      const evento = new CustomEvent('FocoFinalizado');
      document.dispatchEvent(evento);
    }

    alert('Tempo finalizado!');
    zerar();
    return
  }

  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

// FUNÇÕES TEMPORIZADOR
function iniciarOuPausar() {
  if (intervaloID) {
    musicaPause.play();
    musicaPause.volume = .3;
    zerar();
    return
  }
  musicaPlay.play();
  musicaPlay.volume = .3;
  intervaloID = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = 'Pausar';
  iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
  clearInterval(intervaloID);
  iniciarOuPausarBt.textContent = 'Começar';
  iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`);
  intervaloID = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo(); 