Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

const word = {}
word.setting = 'tab'
word.font = 'hebrew'
word.cssFontFamily = function () {
  switch (this.font) {
    case 'hebrew':
      return 'SBLHebrew'
      break;
    case 'greek':
      return 'SBLGreek'
      break;
    case 'norwegian':
      return "sans-serif"
      break;
  }
}
word.cssFontSize = function () {
  switch (this.font) {
    case 'hebrew':
      return '2.5rem'
      break;
    case 'greek':
      return '2rem'
      break;
    case 'norwegian':
      return "1.5rem"
      break;
  }
}
word.border = false
word.cssBorder = function () {
  switch (this.border) {
    case true:
      return '1px solid lightgray'
      break;
    case false:
      return '1px solid transparent'
      break;
  }
}
word.getSettings = function () {
  const radioButtons = document.getElementsByName('selectOpt')

  for (button of radioButtons){
    if (button.checked) {
      this.setting = button.value
      return this.setting
    }
  }

}
word.createLines = function () {
  this.arrayLines = this.input.split('\n')
}
word.createList = function () {
  this.list = []
  let splitOption
  switch (this.setting) {
    case 'tab':
      splitOption = '\t'
      break;
    case 'comma':
      splitOption = ','
      break;
  }

  for (let i = 0; i < this.arrayLines.length; i++) {
    this.list.push(this.arrayLines[i].split(splitOption))
    console.log(this.list);
  }
}
word.createLanguageList = function () {
  this.hebrew = []
  this.norwegian = []

  for (x of this.list) {
    if (x.length != 1) {
      this.hebrew.push(x[0])
      this.norwegian.push(x[1])
    }
  }

  if (this.hebrew.length % 2 != 0 || this.hebrew.length == 1) {
    this.hebrew.push('')
  }
  if (this.norwegian.length % 2 != 0 || this.norwegian.length == 1) {
    this.norwegian.push('')
  }

  let length = this.norwegian.length
    for (let i = 0; i < length; i++) {
      if (i % 2 == 0) {
        this.norwegian.move(i,i+1)
      }
    }

    console.log(this.hebrew);
    console.log(this.norwegian);
}
word.createArray = function () {
  let length = Math.ceil(this.hebrew.length/12)
  let heb = this.hebrew
  let nor = this.norwegian

  for (let i = 1; i <= length; i++) {
    let arrayH
    let arrayN
    if (this.hebrew.length < 12) {
      arrayH = heb.splice(0,this.hebrew.length)
      arrayN = nor.splice(0,this.norwegian.length)
    }
    else {
      arrayH = heb.splice(0,12)
      arrayN = nor.splice(0,12)
    }
    this.hebrew = arrayH
    this.norwegian = arrayN
    this.createPage(arrayH,arrayN)
  }

}
word.wrapper = document.querySelector('.cardWrapper')
word.createPage = function (arrayH,arrayN) {
  let hebrew = document.createElement('div')
  hebrew.className = 'page hebrew'
  hebrew.style.fontFamily = this.cssFontFamily()
  hebrew.style.fontSize = this.cssFontSize()
  let norwegian = document.createElement('div')
  norwegian.className = 'page norwegian'

  let hebWrap = document.createElement('div')
  hebWrap.className = 'hebWrap'
  let norWrap = document.createElement('div')
  norWrap.className = 'norWrap'

  for (let i = 0; i < arrayH.length; i++) {
    const hebElement = document.createElement('div')
    hebElement.className = 'card hebrew'
    hebElement.style.border = this.cssBorder()
    hebElement.innerText = arrayH[i]

    const norElement = document.createElement('div')
    norElement.className = 'card norwegian'
    norElement.style.border = this.cssBorder()
    norElement.innerText = arrayN[i]

    hebrew.appendChild(hebElement)

    hebWrap.appendChild(hebrew)

    norwegian.appendChild(norElement)

    norWrap.appendChild(norwegian)
  }
  this.wrapper.appendChild(hebWrap)
  this.wrapper.appendChild(norWrap)
}

word.processInput = function () {
  word.input = document.querySelector('.gloserInput').value
  //word.getSettings()
  word.createLines()
  word.createList()
  word.createLanguageList()
  word.createArray()
}
word.reset = function () {
  // this.input = ""
  // this.norwegian = []
  // this.hebrew = []
  // this.list = []
  // this.arrayLines = []
  this.wrapper.innerHTML = ""
}



const generateBtn = document.querySelector('.generate')
generateBtn.addEventListener('click',(e) => {
  word.reset()
  word.processInput()
  window.print()
});

const sortButtons = document.querySelectorAll('.sort')
for (x of sortButtons) {
  x.addEventListener('click',(e) => {
    sortButtons.forEach(btn => {
      btn.classList.remove('checked')
    })
    e.target.classList.toggle('checked')
    word.setting = e.target.dataset.value
  })
}

const fontButtons = document.querySelectorAll('.font')
for (x of fontButtons) {
  x.addEventListener('click',(e) => {
    fontButtons.forEach(btn => {
      btn.classList.remove('checked')
    })
    e.target.classList.toggle('checked')
    word.font = e.target.dataset.value
  })
}

const borderButton = document.querySelector('.border')
  borderButton.addEventListener('click',(e) => {
    e.target.classList.toggle('checked')
    if (e.target.classList.contains('checked')) {
      word.border = true
    }
    else {
      word.border = false
    }
})
