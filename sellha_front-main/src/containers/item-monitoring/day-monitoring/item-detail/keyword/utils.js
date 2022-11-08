import Swal from 'sweetalert2';

export function getRankingPage(rank) {
  const pageNum = Math.ceil(rank / 40);
  const rankingNum = rank - Math.floor(rank / 40) * 40 || 40;
  return { pageNum, rankingNum };
}

export function showAlert(message, type) {
  return Swal.fire({
    html: message,
    confirmButtonText: '확인',
    confirmButtonColor: '#FFC83A',
    showClass: {
      popup: 'animate__animated animate__fadeIn animate__fast',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut animate__fast',
    },
    timer: type && 1500,
    timerProgressBar: type,
  });
}

export function checkKeywordState(keywordList, keyword) {
  const { totalList, addList } = keywordList;
  return totalList.indexOf(keyword) < 0 && addList.indexOf(keyword) < 0;
}
