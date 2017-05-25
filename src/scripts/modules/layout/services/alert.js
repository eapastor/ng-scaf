(function () {
  'use strict';

  ngApp.service('Alert', Alert);
  /**
   * @class Alert
   * @constructor
   */
  function Alert($uibModal) {
    this.show    = show;
    this.primary = primary;
    this.success = success;
    this.danger  = danger;

    /**
     * @methodOf Alert
     * @param {String} icoName
     * @param {String} icoColor
     * @param {String} htmlBody
     * @returns {Promise.<Boolean>}
     */
    function show(icoName, icoColor, htmlBody) {
      var modal = $uibModal.open({
        component: 'myAlert',
        size     : 'sm',
        resolve  : {
          icoName : () => icoName,
          icoColor: () => icoColor,
          htmlBody: () => htmlBody
        }
      });

      return modal.result.catch(success);

      function success() {
        return true;
      }
    }

    /**
     * @methodOf Alert
     * @param {String} icoName
     * @param {String} htmlBody
     * @returns {Promise.<Boolean>}
     */
    function primary(icoName, htmlBody) {
      return show(icoName, '#7d8fdb', htmlBody);
    }

    /**
     * @methodOf Alert
     * @param {String} icoName
     * @param {String} htmlBody
     * @returns {Promise.<Boolean>}
     */
    function success(icoName, htmlBody) {
      return show(icoName, '#32bcad', htmlBody);
    }

    /**
     * @methodOf Alert
     * @param {String} icoName
     * @param {String} htmlBody
     * @returns {Promise.<Boolean>}
     */
    function danger(icoName, htmlBody) {
      return show(icoName, '#f3715a', htmlBody);
    }

  }
})();