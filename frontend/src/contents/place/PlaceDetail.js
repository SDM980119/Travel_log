
export function initHeartButtons() {
  document.querySelectorAll('.heart-btn').forEach(btn => {
    btn.onclick = () => {
      if (btn.textContent === '♡') {
        btn.textContent = '♥'
        btn.style.color = '#FF0000'
        btn.style.borderColor = '#FF0000'
      } else {
        btn.textContent = '♡'
        btn.style.color = ''
        btn.style.borderColor = '#ddd'
      }
    }
  })
}

export function initDetailButtons() {
  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.onclick = () => {
      alert('상세 정보 페이지로 이동합니다.')
    }
  })
}
