import 'normalize.css';
import './assets/styles/global.scss';
import './components/highlight/highlight';
import App from './components/app/app';
import { toggleAsideMenu } from './components/utils/utils';
import { highlight } from './components/highlight/highlight';

window.addEventListener('DOMContentLoaded', (): void => {
  const app = new App(localStorage.getItem('level'));
  app.start();

  document.getElementById('burger')?.addEventListener('change', toggleAsideMenu);

  app.editor.input.element.addEventListener('keyup', app.checkAnswer);

  const prevBtn: HTMLButtonElement | null = document.querySelector('.aside__btn_previous');
  if (prevBtn) prevBtn.addEventListener('click', app.prevLevel);

  const nextBtn: HTMLButtonElement | null = document.querySelector('.aside__btn_next');
  if (nextBtn) nextBtn.addEventListener('click', app.nextLevel);

  const resetBtn: HTMLButtonElement | null = document.querySelector('.reset');
  if (resetBtn) resetBtn.addEventListener('click', app.resetLevels);

  const enterBtn: HTMLButtonElement | null = document.querySelector('.enter');
  if (enterBtn) enterBtn.addEventListener('click', app.checkAnswer);

  highlight();

  window.addEventListener('keyup', app.prevLevel);
  window.addEventListener('keyup', app.nextLevel);
  window.addEventListener('unload', (): void => {
    localStorage.setItem('level', app.currentLevel);
    localStorage.setItem('progress', app.progress);
  });

  console.log(app);
});
