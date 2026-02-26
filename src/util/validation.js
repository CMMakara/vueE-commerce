export function required(value , message = 'This field is required'){
    return value && String(value).trim() ? "" : message;
}

export function isEmail(value , message = 'This field is required'){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(value).trim()) ? "" : message;
}

export function isPassword(value) {
   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
   if (!value?.trim()) return 'Password is required';
   if (!passwordPattern.test(value.trim())) {
      return 'Password must contain uppercase, lowercase, number and special character';
   }
   return '';
}

export function minlength(value , length , message = `Minimum length is ${length} characters`){
    return String(value).trim().length >= length ? "" : message;
}

export function validation(value , rules = []){  
    for(let rule of rules){
        let err = rule(value)

        if(err){
            return err;
        }
    }
}

