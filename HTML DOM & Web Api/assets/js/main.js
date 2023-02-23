var headingNode = document.getElementsByClassName('heading')
console.log(headingNode[0])
var testNode = document.getElementById('test')
console.log(testNode)

// ví dụ về  innerText và textContent
var testHeading = document.querySelector('.text-heading')
console.log(testHeading.innerText)
testHeading.innerText = `

Test headinggggggg
`

console.log(headingNode[1].textContent)
headingNode[1].textContent = ` 



HTML DOM DOM 1111

`;

//innerHTML outerHTML
console.log(headingNode[2].innerHTML)
headingNode[2].innerHTML = '<i>HTML DOM 2 nhma NGHIÊNG</i>'
console.log(headingNode[3].outerHTML)
headingNode[3].outerHTML = 'sida vãi đạn'

//NODE Property
var nodePro = document.querySelector('.node-properties')
console.log(nodePro) //trả về element(thực chất là 1 object)
console.log([nodePro])  //trả về mảng để thấy rõ dc bản chất của element dc trả về
nodePro.autocapitalize = true

//NODE Style
var nodeStyle = headingNode[4]

nodeStyle.style.backgroundColor = 'red'
Object.assign(nodeStyle.style, {
  backgroundColor: 'red',
  color: 'white'
})

//example DOM events
headingNode[5].onclick = function() {
  this.style.color = 'red'
}


var inputTextElement = document.querySelector('input[type="text"]')
inputTextElement.onchange = function(e) {
  console.log(e.target.value)  //trả về giá trị của input
}

var inputBoxElement = document.querySelector('input[type="checkbox"]')
inputBoxElement.onchange = function(e) {
  console.log(e.target.checked)  //ktra xem checkbox có dc tick hay chưa
}

var inputSelectElement = document.querySelector('select')
inputSelectElement.onchange = function(e) {
  console.log(e.target.value)
}

inputTextElement.onkeyup = function(e) {
  console.log('onkeyup: ', e.target.value) 
}

var inputTextElementOne = document.querySelector('#input1')
inputTextElementOne.onkeydown = function(e) {
  console.log('onkeydown, which: ', e.which) 
}

inputTextElementOne.onkeypress = function(e) {
  console.log('onkeypress: ', e.target.value) 
}

//TH muốn dùm ESC hoặc ENTER để in ra kết quả
var inputTextElementTwo = document.querySelector('#input2')
inputTextElementTwo.onkeypress = function(e) {
  console.log(e.target.value)

  switch(e.which) {
    case 27:
      console.log('Bạn đã out ra khỏi cuộc trơi này rồi');
      break;
    case 13:
      console.log('Bạn đã chọn kết quả này');
  }
}

//preventDefault
var linkElements = document.links
for (var linkElement of linkElements) {
    linkElement.onclick = function(e) {
      console.log(e.target)
      if (e.target.href.startsWith("https://www.facebook.com/")) {
        e.preventDefault()
      }
  }
}

//JSON
console.log('JSON:')
var jsonText1 = '"Tui là Lê Phương My"'
console.log(jsonText1)
console.log(JSON.parse(jsonText1))
var jsonText2 = 'true'
console.log(jsonText2)
console.log(JSON.parse(jsonText2))
var jsonText3 = 'null'
console.log(jsonText3)
console.log(JSON.parse(jsonText3))
var jsonText4 = '["Tui là","Lê Phương My"]'
console.log(jsonText4)
console.log(JSON.parse(jsonText4))
var jsonText5 = '{"tui":"là","Lê Phương":"My"}'
console.log(jsonText5)
console.log(JSON.parse(jsonText5))
var jsonText6 = '3123123123'
console.log(jsonText6)
console.log(JSON.parse(jsonText6))
var a = true
console.log(JSON.stringify(a))

//PROMISE
var myPromise1 = new Promise(function(myResovle, myReject) {
  setTimeout(function() {
    console.log('PROMISE')
    myResovle(console.log(1))
  }, 3000)
})
myPromise1.then(
  function(value) {
    console.log(2)
  }
)

var myPromise2 = new Promise(function(myResovle, myReject) {
  var randomNumber = Math.floor(Math.random()*100)
  console.log(randomNumber)
  if(randomNumber > 50) {
    myResovle('ban da trung thuong')
  }
  else{
    myReject('thu lai vao lan sau nhe')
  }})
myPromise2
  .then(
  function(value) {
    console.log(value)
})
  .catch(
    function(fail) {
      console.log(fail)
})

function demSo(num, ms) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(num)
    }, ms)
  })
}

demSo(12, 3000)
  .then(
    (result) => {
      console.log(result)
      return demSo(result*result, 2000)
    }
  )
  .then(
    (result) => {
      console.log(result)
      return demSo(result*result, 2000)
    }
  )

//VÍ DỤ THỰC TẾ VỀ PROMISE
var users = [                               //comments với users là fake API
  {
      id: 1,
      name: 'member1'
  },
  {
      id: 2,
      name: 'member2'
  },
  {
      id: 3,
      name: 'member3'
  }
]

var comments = [
  {
      id: 1,
      user_id: 1,
      content: 'comment1 0f member 1'
  },
  {
      id: 2,
      user_id: 2,
      content: 'comment2 of member 2'
  },
  {
    id: 3,
    user_id: 1,
    content: 'comment3 of member 1'
  }
]

              //lấy ra commmets
function getComments() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(comments)
    }, 1000)
  })
}

             //lấy ra user mang id nào đó
function getUsersByIds(userIds) {
  return new Promise(function(resolve) {
    var result = users.filter(function(user) {
      return userIds.includes(user.id)})          //tìm ra id trùng với user id trong cmt và trả về nó
    setTimeout(function() {
      resolve(result)
    }, 1000)
  })
}

getComments()
  .then(function(comments) {
    var userIds = comments.map(function(comment) {
      return comment.user_id                              //tạo ra mảng mới gồm các user id trong comments
    })
    return getUsersByIds(userIds)                         // trả về promise(trả về 1 object với users và cmts đã lấy ra)      
        .then(function(users) {
          return {
            users: users,
            commments: comments
          }
        })
  })

  .then(function(data) {
    var commentBox = document.getElementById('comment-box')
    var html = ''

    data.commments.forEach(function(comment) {
      var user = data.users.find(function(user) {           //tìm ra id và user id trùng nhau, trả về 1 obj user có id trùng với cmt
        return user.id === comment.user_id
      })

      html += `<li>${user.name}: ${comment.content}</li>`     //ghép name với cmt có id giống nhau
    })

    commentBox.innerHTML = html                                 //in ra web
  })


//CŨNG LÀ VÍ DỤ TRÊN NHƯNG MÀ DÙNG PROMISE METHOD(PROMISE.ALL)
// lấy ra user id
//ktra xem user id trùng với id của user nào
//ghép lại
var promiseGetComments = new Promise(function(resolve) {
  setTimeout(() => resolve(comments), 3000)                   //settimeout dùng để fake độ trễ của mạng và trả về comments
}) 

var promiseGetUserIds = new Promise(function(resolve) {
  var userIds = comments.map((comment) => comment.user_id)        //lấy ra user_id của cmt 
  var user = users.filter((user) => userIds.includes(user.id))       //tìm những thằng user có user_id đó
  setTimeout(() => resolve(user), 4000)                            ////settimeout dùng để fake độ trễ của mạng và trả về users có mặt trong cmts
}) 

Promise.all([promiseGetComments, promiseGetUserIds])
  .then(function(result) {
    return {
      users: result[1],
      comments: result[0]                                               //lấy ra user và cmt tương ứng(tức là lấy ra những user có user_id hiện hữu trong cmt)
    }
  })

  .then((data) => {
    var commentBox2 = document.getElementById('comment-box-2')
    var html = ''
    data.comments.forEach((comment) =>{                                 //dùng forEach để ghép userId với cmt tương ứng
      var user = users.find((user) => user.id === comment.user_id)

      html += `<li>${user.name}: ${comment.content}</li>`
    })

    commentBox2.innerHTML = html
    commentBox2.style.color = 'red'
  })

//random mình nghịch chơi chứ ko cần dùng promise làm mình mò như con chó rách
var btn = document.querySelector('.btn')
var demo = document.querySelector('.demo')

var randNumber
function randNum() {
  randNumber = Math.floor(Math.random()*7)
  console.log('random number: ', randNumber)
  console.log(headingNode[randNumber].innerText)
  demo.innerHTML = headingNode[randNumber].innerText
  if(randNumber > 50 ) {
    console.log('trung roi')
  }
  else{
    console.log('hen lan sau')
  }
}

btn.onclick = randNum

//FETCH
var url = 'https://jsonplaceholder.typicode.com/todos/1'
fetch(url)
  .then(response => response.json())
  .then(json => console.log(json))

//ECMAScript6 (ES6)
//tagged template literals

function highlight([first,...strings], ...values) {  //lấy ptu đầu của mảng và phần còn lại của mảng / lấy tất cả giá trị ngoài mảng
  return values.reduce(
    (acc, curr) => [...acc, `<span>${curr}</span>`, strings.shift()], [first]           //shift xóa ptu đầu và trả lại ptu đã xóa(xóa 'tại khỏi strings và return 'tại')
  )                //trả về 1 mảng, qua 1 vòng lặp sẽ push ptu mới vô                   //acc là biến lưu trữ, nó sẽ lưu 'Học lập trình'
  .join('')                                                                             //curr là gtri có trong values (course, brand)
}                                                                                       //strings gồm 2 value nhma dùng shift nên sẽ lấy ra ptu đầu và loại bỏ nó ra khỏi mảng

var course = 'JavaScript'
var brand = 'F8'

html =  highlight`Học lập trình ${course} tại ${brand}!`
console.log(html)


