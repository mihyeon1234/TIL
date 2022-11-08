const browse = navigator.userAgent.toLowerCase();
if (browse.indexOf('trident') !== -1 || browse.indexOf('msie') !== -1) {
  document.getElementById('root').innerHTML =
    '<div style="display: flex; padding: 50px;"><div style="margin: 0px auto;"><div>본 사이트는 크롬 버전에 최적화되어있습니다.</div><div>크롬으로 접속해주세요 😉</div></div></div>';
}
