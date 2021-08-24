export function isElectron () {
  return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1
}