'use strict';

// This class is used for logins

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Login = function () {
  function Login(hash) {
    var _this = this;

    _classCallCheck(this, Login);

    this.sessions = [];
    this.users = [];
    this.passwords = [];
    Object.keys(hash).map(function (k) {
      return { k: k, v: hash[k] };
    }).map(function (e) {
      console.log(e.k);
      console.log(e.v);
      _this.users = _this.users.concat([e.k]);
      _this.passwords = _this.passwords.concat([e.v]);
    });
  }

  _createClass(Login, [{
    key: 'logout',
    value: function logout(user) {
      var _this2 = this;

      this.sessions.forEach(function (session, i) {
        if (session === user) {
          _this2.sessions[i] = null;
        }
      });
      this.sessions = this.sessions.filter(function (session) {
        return session !== null;
      });
    }

    // Checks if user exists

  }, {
    key: 'userExists',
    value: function userExists(user) {
      // Temp variable for storing the user if found
      var temp = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.users[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          if (i === user) {
            temp = user;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var exists = temp !== '' && temp === user;
      return exists;
    }

    // Register user

  }, {
    key: 'registerUser',
    value: function registerUser(user, password) {
      var lastIndex = this.users.length;
      this.users[lastIndex] = user;
      this.passwords[lastIndex] = password;
    }
  }, {
    key: 'removeUser',
    value: function removeUser(user) {
      var index = this.idx(user, this.users);
      this.users[index] = null;
      this.passwords[index] = null;
      this.users = this.users.filter(function (user) {
        return user !== null;
      });
      this.passwords = this.passwords.filter(function (password) {
        return password !== null;
      });
    }
  }, {
    key: 'checkPassword',
    value: function checkPassword(user, password) {
      var index = this.idx(user, this.users);
      var passwordCorrect = this.passwords[index] === password;
      return passwordCorrect;
    }
  }, {
    key: 'updatePassword',
    value: function updatePassword(user, oldPassword, newPassword) {
      // First we check if the user exists
      var user1 = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.users[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var i = _step2.value;

          if (i === user) {
            user1 = user;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (user1 === user) {
        var index = this.idx(user, this.users);
        if (this.passwords[index] === oldPassword) {
          this.passwords[index] = newPassword;
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'login',
    value: function login(user, password) {
      var index = this.idx(user, this.users);
      if (this.passwords[index] === password) {
        this.sessions.push(user);
      }
    }

    // Gets index of an element in an array

  }, {
    key: 'idx',
    value: function idx(element, array) {
      var cont = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = array[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var i = _step3.value;

          if (i === element) {
            return cont;
          }
          cont += 1;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return cont;
    }
  }]);

  return Login;
}();

var registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};

var login = new Login(registeredUsers);

login.registerUser('user4', 'pass4');
login.login('user4', 'pass4');
login.updatePassword('user3', 'pass3', 'pass5');
login.login('user3', 'pass5');
login.logout('user4');
login.logout('user3');