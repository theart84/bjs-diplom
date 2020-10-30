'use strict'

const newLogoutObj = new LogoutButton();
const newRatesBoard = new RatesBoard();
const newMoneyManager = new MoneyManager();
const newFavoritesWidget = new FavoritesWidget();

newLogoutObj.action = () => {
  ApiConnector.logout((response) => {
    if (response.success)
      location.reload();
  })
}
ApiConnector.current((response) => {
  if (response.success)
    ProfileWidget.showProfile(response.data);
})

newRatesBoard.getCourses = () => {
  ApiConnector.getStocks(response => {
    if (response.success) {
      newRatesBoard.clearTable();
      newRatesBoard.fillTable(response.data);
    }
  })
}
newRatesBoard.getCourses();
setInterval(newRatesBoard.getCourses, 60000);

newMoneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (!response.success)
      newMoneyManager.setMessage(response.success, `Средства добавлены не были!`);
    ProfileWidget.showProfile(response.data);
    newMoneyManager.setMessage(response.success, `Сумма добавлена!`);
  })
}

newMoneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data,response => {
    if (!response.success)
      newMoneyManager.setMessage(response.success, `Средства не конвертированы!`);
    ProfileWidget.showProfile(response.data);
    newMoneyManager.setMessage(response.success, `Средства конвертированы!`);
  })
}
newMoneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (!response.success)
      newMoneyManager.setMessage(response.success, `Средства не переведены!`);
    ProfileWidget.showProfile(response.data);
    newMoneyManager.setMessage(response.success, `Средства переведены!`);
  })
}

(function newDataFavorites() {
  ApiConnector.getFavorites(response => {
    if (response.success) {
      newFavoritesWidget.clearTable();
      newFavoritesWidget.fillTable(response.data);
      newMoneyManager.updateUsersList(response.data);
    }
  })
})();

newFavoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data,response => {
    if (!response.success)
      newFavoritesWidget.setMessage(response.success, `Пользователь не добавлен!`);
    newFavoritesWidget.clearTable();
    newFavoritesWidget.fillTable(response.data);
    newMoneyManager.updateUsersList(response.data);
    newFavoritesWidget.setMessage(response.success, `Пользователь добавлен!`);
  })
}

newFavoritesWidget.removeUserCallback = id => {
  ApiConnector.removeUserFromFavorites(id, response => {
    if (!response.success)
      newFavoritesWidget.setMessage(response.success, `Пользователь не удален!`);
    newFavoritesWidget.clearTable();
    newFavoritesWidget.fillTable(response.data);
    newMoneyManager.updateUsersList(response.data);
    newFavoritesWidget.setMessage(response.success, `Пользователь удален!`);
  })
}