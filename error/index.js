class byggFirmaError extends Error{}

class InvalidCredentials extends byggFirmaError{
  constructor(){
    super()
    this.message = `Invalid credentials`
    this.errorCode = 403
  }
}

// class Unauthorized extends byggFirmaError{
//   constructor(){
//     super()
//     this.message = `Unauthorized`
//     this.errorCode = 401
//   }
// }

class Forbidden extends byggFirmaError{
  constructor(){
    super()
    this.message = `Forbidden`
    this.errorCode = 403
  }
}

// class TokenExpired extends byggFirmaError{
//   constructor(){
//     super()
//     this.message = `Token expired, please log in again`
//     this.errorCode = 401
//   }
// }

class TaskNotFound extends byggFirmaError{
  constructor(){
    super()
    this.message = `Taks with data provided not found`
    this.errorCode = 404
  }
}

// class MissingHeader extends byggFirmaError{
//   constructor(){
//     super()
//     this.message = `Content-Type header is missing`
//     this.errorCode = 400
//   }
// }

// FINDDDDDD....
class InvalidFile extends byggFirmaError{
  constructor(message){
    super()
    this.message = message
    this.errorCode = 400
  }
}

// FINNNDDDDD....
class FileExists extends byggFirmaError{
  constructor(fileName){
    super()
    this.message = fileName + " already exists. Please change the name and upload again"
    this.errorCode = 500
  }
}

module.exports = {
  byggFirmaError,
  InvalidCredentials,
  // Unauthorized,
  // TokenExpired,
  TaskNotFound,
  Forbidden,
  // MissingHeader,
  InvalidFile,
  FileExists
}