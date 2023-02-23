// file JS này có thể dùng cho nhiều web khác nhau nếu tạo form có bố cục giống file Form validation

//Đối tượng `Validator`
function Validator(options) {

  let selectorRules = {}

  // hàm set invalid cho input (ktra xem input có giá trị chưa)
  function validate(inputElement, rule) {
    let errorMessage
    let errorElement = inputElement.closest(options.formGroupSelector).querySelector(options.errorSelector)
      
    //Lấy ra các rule của selector
    let rules = selectorRules[rule.selector]

    //lặp qua từng rule (check)
    for(let i = 0; i < rules.length; ++i) {
      switch(inputElement.type){
        case 'radio':
        case 'checkbox':
          errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));  
          break;
        default:
          errorMessage = rules[i](inputElement.value)
      }
      
      if (errorMessage) break

    }

    if (errorMessage) { 
      errorElement.innerText = errorMessage
      inputElement.closest(options.formGroupSelector).classList.add('invalid') 
    }
    else{
      errorElement.innerText = ''
      inputElement.closest(options.formGroupSelector).classList.remove('invalid')  
    }

    return !errorMessage //convert string sang boolean (nếu có lỗi thì trả về false và ngược lại)
  } 

  //get element of form which need validate
  let formElement = document.querySelector(options.form);

  //Đối với từng form
  if (formElement) {

    //xử lí khi submit form
    formElement.onsubmit = function(e) {
      e.preventDefault() // ngăn chặn hành vi mặc định nhảy trang khi submit

      let isFormValid = true //set giá trị hợp lệ ban đầu của form

      //lặp qua từng rule
      options.rules.forEach((rule) => {
        let inputElement = formElement.querySelector(rule.selector);
        let isValid = validate(inputElement, rule) // giá trị boolean dc trả về khi form valid/invalid

        if (!isValid) { //trong TH form có lỗi
          isFormValid = false //set lại giá trị hợp lệ của form
        }
      })

      //Lấy dữ liệu khi giá trị của form đều hợp lệ
      if(isFormValid) {

        //TH submit với JS (dùng để call API)
        if (typeof options.onSubmit === 'function') {

          let enableInputs = formElement.querySelectorAll('[name]:not([disable])')

          let formValues = Array.from(enableInputs).reduce((values, input, index) => {

            switch(input.type){
              case 'checkbox':

                if(input.matches(':checked')){            

                  if(!Array.isArray(values[input.name])){
                    values[input.name] = []
                  }
                  
                  values[input.name].push(input.value)
                }   

                if(!values[input.name]) {
                  values[input.name] = ''
                  return values
                }

                break;

              case 'radio':
                if(input.matches(':checked')){
                  values[input.name] = input.value
                }    
                break;

              case 'file':
                values[input.name] = input.files
                break;

              default:
                values[input.name] = input.value
              }

            return values

          }, {})

          options.onSubmit(formValues)
        }
        //TH submit với hvi mặc định
        else{
          formElement.submit()
        }
      }

    }


    //Lặp qua mỗi rule và xử lý (lắng nghe)
    options.rules.forEach((rule) => {

      //lưu lại các rule cho mỗi input
      if(Array.isArray(selectorRules[rule.selector])) {   //Ktra selector đó xem có là arr ko, nếu có thì push phần tử thêm rule cho selector (>1 rule)
        selectorRules[rule.selector].push(rule.test)  //thêm rule cho selector
      }
      else{
        selectorRules[rule.selector] = [rule.test]  //biến selector thành 1 arr (khi chỉ mới có 1 rule)
      }


      let inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach((inputElement) => {

        let errorElement = inputElement.closest(options.formGroupSelector).querySelector(options.errorSelector)

            if (inputElement) {
              //xử lí khi user blur khỏi input
              inputElement.onblur = () => {
                validate(inputElement, rule)
              };
      
              //xử lí khi đang nhập thông tin
              inputElement.oninput = () => {
                errorElement.innerText = ''
                inputElement.closest(options.formGroupSelector).classList.remove('invalid')            
              }

              inputElement.onchange = () => {
                errorElement.innerText = ''
                inputElement.closest(options.formGroupSelector).classList.remove('invalid')    
            }
        }
      })
    })
  }
}

// Define rules
Validator.isRequired = (selector, message) => ({
  selector: selector,
  test: (value) =>{
    let result
    if(typeof value === 'string') result = value.trim() ? undefined : message || 'Vui lòng đăng nhập vào trường này'
    else result = value ? undefined : message || 'Vui lòng đăng nhập vào trường này'
    return result
  } //value này là value của selector
});

Validator.isEmail = (selector, message) => ({
  selector: selector,
  test: (value) => { 
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(value) ? undefined : message || "Trường này phải là email!"
  },
});

Validator.minLength = (selector, min, message) => ({
  selector: selector,
  test: (value) => { 
    return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`
  },
});

Validator.isConfirmed = (selector, getConfirmValue, message) => ({
  selector: selector,
  test: (value) => { 
    return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
  },
});




