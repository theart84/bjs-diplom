'use strict'

const newUser = new UserForm();

newUser.loginFormCallback = data => {
  ApiConnector.login(data, (response) => {
    if (!response.success)
      newUser.setLoginErrorMessage(response.error);
    location.reload();
  })
}

newUser.registerFormCallback = data => {
  ApiConnector.register(data, (response) => {
    if (!response.success)
      newUser.setRegisterErrorMessage(response.error);
    location.reload();
  })
}
