function setCookie(name: string, value: string) {
  if (typeof window === "undefined") return null
  var expires = "";
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export default setCookie