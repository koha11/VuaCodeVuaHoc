var submitBtn = document.querySelector('#submit')

var listUsersBlock = document.querySelector('#list-users')

var userApi = 'http://localhost:3000/users'

start = () => {
  getUsers(renderUsers)     //renderUsers la 1 cb

  handleSubmitForm() //chạy hàm tạo user

  //hàm xóa là 1 hàm Dom event kích hoạt khi click nên ko gần khai để chạy

}


//function
getUsers = (callback) => {   //nhan callback lam doi so
  fetch(userApi)      //get Api
    .then((response) => response.json()) //convert API to JS
    .then(callback)                       //nhan doi so la cb va tra gia tri la` users
}

renderUsers = (users) => {
  console.log(users)
  var htmls = convertToHtml(users)

  listUsersBlock.innerHTML = htmls.join('')
}

createUser = (data, callback) => {
  var options = {     //những option bắt buộc của method post
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(userApi, options)                 //mình cứ tưởng tượng cái argument đầu của fetch giống như url trong postman vậy
    .then((response) => response.json())
    .then(callback)
}


handleSubmitForm = () => {

  submitBtn.onclick = () => {
    var name = document.querySelector('input[name="name"]').value
    var age = document.querySelector('input[name="age"]').value
    var address = document.querySelector('input[name="address"]').value
    var img = document.querySelector('input[name="img"]').value
    //lay du lieu nhap vao tu input

    //chuyen du lieu nhan dc vao 1 obj
    var formData = {
      name: name,
      age: age,
      address: address,
      img: img 
    }

    clearInput()

    //POST du lieu nhan dc len api
    createUser(formData, (user) => {
      var arr =[]
      arr.push(user)                    //chuyển obj vào trong mảng
      getAndConvertHtmlAgain(arr)
      // getUsers(renderUsers) 
      //hạ sách vì phải call lại API, do mình ngu quá vẫn ch tìm được cách khả thi hơn
    })
  }
}

//cách up thêm user mà ko cần phải call api lại nhma chưa tối ưu lắm
getAndConvertHtmlAgain = (arr) => {
  var getter =  listUsersBlock.innerHTML  //lấy html đã render từ trc
  arr = convertToHtml(arr)            
  newGetter = arr.join('')                 //chuyển thành string
  listUsersBlock.innerHTML = getter + newGetter 
}

//function chuyển arr thành html
convertToHtml = (arr) => 
  arr.map((user) => 
  `<li class="user-${user.id}">
    <h4 class = "name">${user.name}</h4>
    <p class = "age">${user.age}</p>
    <p class = "address">${user.address}</p>
    <button onclick="handleDeleteUser(${user.id})">Delete</button>
    <button onclick="getUpdateInput(${user.id})">Update</button>
  </li>`)

// quy trình để xóa user
handleDeleteUser = (id) => {
  clearInput()

  var options = {                         //option để thực hiện 1 method 
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(userApi + '/' + id, options)            ///khi xóa buộc url phải là tên api/id
    .then((response) => response.json())
    .then(() => {
       var user = document.querySelector('.user-' + id)     //biến user là những user có id mà ta đã gửi api với method delete về cho server
      if(user) {
        user.remove()         //xóa luôn cái html của user dc select
      }
    })
}

getUpdateInput = (id) => {
  var userItem = document.querySelector('.user-' + id)
  submitBtn.innerText = 'SAVE'

  var name = userItem.querySelector('.name')
  var age = userItem.querySelector('.age')
  var address = userItem.querySelector('.address')
  // var img = userItem.querySelector('input[name="img"]')

  document.querySelector('input[name="name"]').value =  name.innerText
  document.querySelector('input[name="age"]').value = age.innerText 
  document.querySelector('input[name="address"]').value = address.innerText
  // var imgInput = document.querySelector('input[name="img"]') = 

  submitBtn.onclick = () => {
    var name = document.querySelector('input[name="name"]').value
    var age = document.querySelector('input[name="age"]').value
    var address = document.querySelector('input[name="address"]').value
    var img = document.querySelector('input[name="img"]').value

    var formData = {
      name: name,
      age: age,
      address: address,
      img: img 
    }

    submitBtn.innerText = 'SUBMIT'

    clearInput()

    handleUpdateUser(formData, id)
  }
}

handleUpdateUser = (data, id, cb) => {
  var options = {                         //option để thực hiện 1 method 
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(userApi + '/' + id, options)            ///khi xóa buộc url phải là tên api/id
    .then((response) => response.json())
    .then(() => {
      getUsers(renderUsers)
    })
  
}


clearInput = () => {
  document.querySelector('input[name="name"]').value =  ''
  document.querySelector('input[name="age"]').value = ''
  document.querySelector('input[name="address"]').value = ''
  document.querySelector('input[name="img"]').value = ''
}
 
//tạo hàm update(tự động chỏ vào input khi click vào btn update) và cách chỉ render lại 1 obj mới thêm vào chứ ko phải cả mảng



start()

var testBlock = document.querySelector('.test')
var arrTest = [123, ' ', 'anh yêu em']
var hihiihi = {name: 'kh', age: 17} 
var testInput = document.querySelector('input[name="name"]')
var testBtn = document.querySelector('.test-btn')

testBtn.onclick = function() {
  testInput.value = 'abccccc'
}











