class byggFirmaError extends Error {}

class InvalidCredentials extends byggFirmaError {
  constructor() {
    super();
    this.message = `Invalid credentials`;
    this.errorCode = 403;
  }
}

class Unauthorized extends byggFirmaError {
  constructor() {
    super();
    this.message = `Unauthorized`;
    this.errorCode = 401;
  }
}

class Forbidden extends byggFirmaError {
  constructor() {
    super();
    this.message = `Forbidden`;
    this.errorCode = 403;
  }
}

class TokenExpired extends byggFirmaError {
  constructor() {
    super();
    this.message = `Token expired, please log in again`;
    this.errorCode = 401;
  }
}

class TaskNotFound extends byggFirmaError {
  constructor() {
    super();
    this.message = `Task with data provided not found`;
    this.errorCode = 404;
  }
}

module.exports = {
  byggFirmaError,
  InvalidCredentials,
  Unauthorized,
  TokenExpired,
  TaskNotFound,
  Forbidden,
};
