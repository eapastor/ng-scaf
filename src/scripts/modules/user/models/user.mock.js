(function () {
  'use strict';

  ngApp.run(run);

  function run(tasMocks, Session) {
    tasMocks.generator('entity', 'user', user);

    tasMocks.set('get:user', user);
    tasMocks.set('get:users', users);
    tasMocks.set('put:user', user);
    tasMocks.set('post:sign:in', signIn);

    /**
     * @methodOf Mocks.entity
     */
    function user(params, data) {
      return {
        id   : tasMocks.simple.uuid(params && params.id),
        email: tasMocks.simple.email(),
        name : tasMocks.simple.name('Name')
      };
    }

    function users(params, data) {
      return tasMocks.simple.arr(tasMocks.simple.real(1, 30), user);
    }

    function signIn(params, data) {
      Session.set('JSESSIONID', tasMocks.simple.uuid());
      return user(params, data);
    }

  }

})();