console.log('Hello There');

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

const word = {}
word.createLines = function () {
  this.arrayLines = this.input.split('\n')
}
word.createList = function () {
  this.list = []
  for (let i = 0; i < this.arrayLines.length; i++) {
    this.list.push(this.arrayLines[i].split('\t'))
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
  if (this.hebrew.length % 2 != 0) {
    this.hebrew.push('')
  }
  if (this.norwegian.length % 2 != 0) {
    this.norwegian.push('')
  }
  let length = this.norwegian.length
  for (let i = 0; i < length; i++) {
    if (i % 2 == 0) {
      this.norwegian.move(i,i+1)
    }
  }
}
word.wrapper = document.querySelector('.cardWrapper')

word.createPage = function (arrayH,arrayN) {
  let hebrew = document.createElement('div')
  hebrew.className = 'page hebrew'
  let norwegian = document.createElement('div')
  norwegian.className = 'page norwegian'

  let hebWrap = document.createElement('div')
  hebWrap.className = 'hebWrap'
  let norWrap = document.createElement('div')
  norWrap.className = 'norWrap'

  for (let i = 0; i < arrayH.length; i++) {
    const hebElement = document.createElement('div')
    hebElement.className = 'card hebrew'
    hebElement.innerText = arrayH[i]

    const norElement = document.createElement('div')
    norElement.className = 'card norwegian'
    norElement.innerText = arrayN[i]

    hebrew.appendChild(hebElement)

    hebWrap.appendChild(hebrew)

    norwegian.appendChild(norElement)

    norWrap.appendChild(norwegian)
  }
  this.wrapper.appendChild(hebWrap)
  this.wrapper.appendChild(norWrap)
}
word.createArray = function () {
  let length = Math.ceil(this.list.length/12)
  for (let i = 1; i <= length;i++) {
    console.log(i);
    let arrayH
    let arrayN
    if (this.list.length < 12) {
      //console.log(this.lis2t.splice(0,this.list.length));
      arrayH = this.hebrew.splice(0,this.list.length)
      arrayN = this.norwegian.splice(0,this.list.length)
    }
    else {
      //console.log(this.list.splice(0,8));
      arrayH = this.hebrew.splice(0,12)
      arrayN = this.norwegian.splice(0,12)
    }
    console.log(arrayH,arrayN);
    this.createPage(arrayH,arrayN)

  }
}
let input
const generateBtn = document.querySelector('.generate')
generateBtn.addEventListener('click',(e) => {
  word.input = document.querySelector('.gloserInput').value
  word.createLines(word.input)
  word.createList(word.arrayLines)
  word.createLines(word.input)
  word.createLanguageList()
  word.createArray()
  //console.log(word);
})
