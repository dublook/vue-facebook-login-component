// https://developers.facebook.com/docs/apps/versions/
// https://developers.facebook.com/docs/javascript/quickstart/
// https://developers.facebook.com/docs/javascript/reference/FB.init/

/* global window, document */

export function initFbSdk(options) {
  return new Promise((resolve, reject) => {
    window.fbAsyncInit = function () {
      const defaults = { cookie: true, xfbml: true }
      options = { ...defaults, ...options }
      window.FB.init(options)
      resolve()
    };
    function handleFbScriptLoadError(error) {
      reject(error);
    }
    /* eslint-disable */
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/ja_JP/sdk.js'
      js.onerror = handleFbScriptLoadError
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    /* eslint-enable */
  })
}

export function getFbSdk(options) {
  return new Promise((resolve, reject) => {
    if (window.FB) {
      resolve(window.FB)
    } else {
      initFbSdk(options)
        .then(() => resolve(window.FB))
        .catch((error) => reject(error))
    }
  })
}

export function fbLogin(options) {
  return new Promise(resolve => {
    window.FB.login(response => resolve(response), options)
  })
}

export function getFbLoginStatus() {
  return new Promise(resolve => {
    window.FB.getLoginStatus(response => resolve(response))
  })
}

export function fbLogout() {
  return new Promise(resolve => {
    window.FB.logout(response => resolve(response))
  })
}
