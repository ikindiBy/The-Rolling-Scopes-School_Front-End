  class MatchGame {
    constructor () { 
      this.levelDiff = 0;
      this.indexOfSkirt = 0;
      this.countCards = 10;
      this.guesedCards = 0;
      this.setCardsArr;
      this.playingArea = document.body.querySelector('.playingArea');
      this.rules = this.playingArea.innerHTML;
      this.cardsOnScreen
      this.permissionNext = true;
      this.startinGame = true;
      this.timer;
    }

    addInitialListeners () {
      let setSkirts = document.body.querySelector('.skirts');
      let setDiffLevels = document.body.querySelector('.difficulty');
      let startNewGame = document.body.querySelector('button');
      let homeButton = document.body.querySelector('#home');
      
      setSkirts.addEventListener('click', e => {
        this.indexOfSkirt = this.choosenElementIndex(setSkirts, e);
      });

      setDiffLevels.addEventListener('click', e => {
        this.levelDiff = this.choosenElementIndex(setDiffLevels, e);
        this.setCountCards(this.levelDiff);
      }); 

      startNewGame.addEventListener('click', this.startGame.bind(this) );
      this.playingArea.addEventListener('click', this.computeGame.bind(this) );

      homeButton.addEventListener('click', e => {
        this.playingArea.innerHTML = null;
        if (this.timer) {
        this.timer.clearClock();
        }
        this.playingArea.innerHTML = this.rules;
      }); 
    }

    choosenElementIndex(watchedSet, e) {
      let target = e.target;
      if (target.tagName == 'IMG') {
        target = target.parentElement;
      }
      return  Array.from(watchedSet.children).indexOf(target.parentElement);
    }

    setCountCards(levelDiff) {
      switch (levelDiff) {
        case 0: this.countCards = 10; break;
        case 1: this.countCards = 18;break;
        case 2: this.countCards = 24;break;
      } 
    }

    startGame(e) {
      console.log();
      this.setCardsArr = [];
      this.playingArea.innerHTML = null;
      this.startinGame = true;
      if (this.timer) {
        this.timer.clearClock();
      }
      this.timer = new Timer();
      this.guesedCards = 0;
      this.firstChosenCard = undefined;

      for(let i=0; i<this.countCards; i++) {
        let divCard = document.createElement('div');
        switch (this.countCards) {
          case 10: divCard.style.margin = '84px 55px'; break;
          case 18: divCard.style.margin = '25.5px 35px'; break;
          case 24: divCard.style.margin = '25.5px 10px'; break;
        } 
        divCard.classList.add("card");
        let imgOfSkirt = document.createElement('img');
        imgOfSkirt.src = `images/skirt-${this.indexOfSkirt}.jpg`;
        divCard.appendChild(imgOfSkirt);
        this.playingArea.appendChild(divCard);
        if (i < this.countCards/2) {
          this.setCardsArr.push({id:i, numImg:i});
        } else {
           this.setCardsArr.push({id:i, numImg:i-this.countCards/2});
        } 
      }
      this.setCardsArr = this.shuflingArrCards(this.setCardsArr);
        for (let i=0; i<this.setCardsArr.length; i++){
          Array.from(this.playingArea.children)[i].style.backgroundImage = `url(images/set${this.indexOfSkirt}-${this.setCardsArr[i]['numImg']}.jpg)`;
        }
        this.cardsOnScreen = Array.from(this.playingArea.children);  
    }

    computeGame(e) {
      if (e.target.parentElement.classList.contains("card") && this.permissionNext) {
        if (this.startinGame) {
          this.timer.startStop();
          this.loseGame();
          this.startinGame = false;
        }
        if (!this.firstChosenCard && this.firstChosenCard != 0 ) {
          e.target.classList.toggle('-opened');
          this.firstChosenCard = this.cardsOnScreen.indexOf(e.target.parentElement);
        } else if (this.firstChosenCard != this.cardsOnScreen.indexOf(e.target.parentElement)){
          e.target.classList.toggle('-opened');
          if (this.setCardsArr[this.firstChosenCard].numImg == this.setCardsArr[this.cardsOnScreen.indexOf(e.target.parentElement)].numImg &&
            this.firstChosenCard != this.cardsOnScreen.indexOf(e.target.parentElement)) {
            let fChCd = this.firstChosenCard;
            this.permissionNext = false;
            setTimeout(() => {
              e.target.parentElement.style.visibility = "hidden";
              this.cardsOnScreen[fChCd].style.visibility = "hidden";
              this.permissionNext = true;
              this.guesedCards += 2; 
              if (this.guesedCards == this.countCards) {
                  this.timer.startStop();
                  this.playingArea.innerHTML = null;
                  this.playingArea.innerHTML = '<h2 class="win"> Congratulation! You are winner! </h2>';      // winnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn   
              }
            }, 600);
            this.firstChosenCard = undefined;
          } else {
              let fChCd = this.firstChosenCard;
              this.permissionNext = false;
              setTimeout(() => {
                this.cardsOnScreen[fChCd].firstElementChild.classList.toggle('-opened');
                e.target.classList.toggle('-opened');
                this.permissionNext = true;}, 800);
              this.firstChosenCard = undefined;
          }
        }
      }
    }

    shuflingArrCards(inputArr) {
      for (let i = inputArr.length-1; i >=0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1)); 
        let itemAtIndex = inputArr[randomIndex].numImg; 
        inputArr[randomIndex].numImg = inputArr[i].numImg; 
        inputArr[i].numImg = itemAtIndex;
      }
      return inputArr;
    };

    loseGame() {
      this.periodToFall = setTimeout(() => { 
        this.timer.startStop();
        let divGameOver = document.createElement('div');
        divGameOver.classList.add("gameOver");
        divGameOver.innerHTML = '<h2> Ups! Be faster! </h2>';
        this.playingArea.appendChild(divGameOver);
      }, 180008);
    }
  };

  class Timer {
    constructor (){
      this.base = 60; 
      this.clocktimer;
      this.dateObj;
      this.stringMin;
      this.stringSec;
      this.ms; 
      this.stringTime=''; 
      this.minFromStart=1;
      this.minFace=1;
      this.secFromStart=0;
      this.secFace=0;
      this.ms=0;
      this.init=false; 
      this.formTimer = document.body.querySelector('#formTimer');
    }

    startStop() {
      if (!this.init) {
        this.clearClock();
        this.dateObj = new Date();
        this.startClock();
        this.init = true;
      } else {
        clearTimeout(this.clockTimer);
        this.init = false;
      }
    }

    clearClock() {
      clearTimeout(this.clockTimer);
      this.minFromStart=1;
      this.minFace=1;
      this.secFromStart=0;
      this.secFace=0;
      this.ms=0;
      this.init=false; 
      this.stringTime = '00:00.00'; 
      this.formTimer.watch.value = this.stringTime; 
    }

    startClock() {
      let curentDateObj = new Date();
      let currentInterval = curentDateObj.getTime() - this.dateObj.getTime() - 1000*this.secFromStart;
      if (currentInterval > 999) { this.secFromStart++; }
      
      if (this.secFromStart >= this.minFromStart*this.base) {
        this.secFace = 0;
        this.minFromStart++;
      } else {
        this.secFace = parseInt(this.secFromStart + this.ms/100);
        if (this.secFace >= this.base) { this.secFace = this.secFace - (this.minFromStart-1)*this.base; }
      }

      if (this.minFromStart > this.base) {
        this.minFace = 1;
      } else {
        this.minFace = parseInt(this.minFromStart + this.ms/100);
        if (this.minFace >= this.base) { this.minFace = this.minFace - (this.hourFromStart-1)*this.base; }
      }

      this.ms = Math.round(currentInterval/10);
      if (this.ms > 99) {this.ms = 0;}
      if (this.ms == 0) {this.ms = '00'}
      if (this.ms > 0 && this.ms  < 9) {this.ms = '0' + this.ms; }
      
      if (this.secFace > 0) {
        this.stringSec = this.secFace;
        if (this.secFace < 10) {
          this.stringSec = '0' + this.secFace;
        }
      } else {this.stringSec = '00';}

      this.stringMin = this.minFace - 1;

      if (this.stringMin > 0) {
        if (this.stringMin < 10) {
          this.stringMin = '0' +this.stringMin;
        }
      } else {this.stringMin = '00';}

      this.stringTime = `${this.stringMin}:${this.stringSec}.${this.ms}`;
      this.formTimer.watch.value = this.stringTime; 
      this.clockTimer = setTimeout(this.startClock.bind(this), 1); 
    }
  };

  let matchGame = new MatchGame();
  matchGame.addInitialListeners();

