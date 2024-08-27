function setCookie(name: string, value: string) {
  var expires = "";

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export default setCookie