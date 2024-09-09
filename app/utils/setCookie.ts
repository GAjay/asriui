function setCookie(name: string, value: string) {
  if (typeof window === "undefined") return null
  var expires = new Date();
  expires.setDate(expires.getDate()+30);
  // document.cookie = name + "=" + (value || "") + expires + "; path=/";
  document.cookie = name + "=" + (value || "")+"; path=/; expires="+expires.toUTCString();
}
export default setCookie
