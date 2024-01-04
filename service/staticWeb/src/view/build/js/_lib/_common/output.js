/* /_common/output.js */

/* request */
const _request = (url, opt) => {
  return fetch(url, opt).then((res) => {
    if (res.error || !res.body || !res.json) {
      return null
    }
    return res.json()
  }).catch((e) => {
    console.error('[fatal] error @postRequest:', e)
    return null
  })
}

export const postRequest = (url, param = {}) => {
  const opt = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30 * 1000,
  }
  if (param) {
    opt.body = JSON.stringify(param)
  }
  return _request(url, opt)
}

export const postFormRequest = (url, formData) => {
  const opt = {
    method: 'POST',
    body: formData,
  }

  return _request(url, opt)
}

/* nav */
export const setOnClickNavManu = () => {
  const toggleElm = document.querySelector('#commonNavToggle')
  const navContentElm = document.querySelector('#commonNavContent')
  toggleElm.onclick = () => {
    if ([...navContentElm.classList.values()].indexOf('hidden') >= 0) {
      navContentElm.classList.remove('hidden')
    } else {
      navContentElm.classList.add('hidden')
    }
  }
}


/* notification */
let notificationIsVisible = false
export const showNotification = async (apiEndpoint, showModal, getRequest) => {
  if (notificationIsVisible) {
    return
  }
  notificationIsVisible = true
  const durationShow = 0.5
  const durationHide = 0.2
  const resultFetchGlobalNotification = await getRequest(`${apiEndpoint}/notification/list`)

  const notificationContainerElm = document.querySelector('#notificationContainer')
  notificationContainerElm.clearChildren()
  const notificationTemplateElm = document.querySelector('#notificationTemplate')
  const notificationList = Object.values(resultFetchGlobalNotification?.result?.notificationList || {}).reverse()
  notificationList.forEach((row, i) => {
    const notificationElm = notificationTemplateElm.cloneNode(true)
    notificationElm.classList.remove('hidden')
    notificationElm.querySelector('[data-id="subject"]').innerText = row.subject
    notificationElm.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const modalTemplateElm = document.querySelector('#modalTemplate')
      const modalElm = modalTemplateElm.cloneNode(true)
      modalElm.classList.remove('hidden')
      modalElm.querySelector('[data-id="modalTitle"]').innerText = row.subject
      modalElm.querySelector('[data-id="modalContent"]').appendChild(document.createTextNode(row.detail))
      showModal(modalElm)
    }
    setTimeout(() => {
      notificationElm.style.transitionDuration = `${durationShow}s`
      notificationElm.style.opacity = 0
      notificationContainerElm.appendChild(notificationElm)
      setTimeout(() => {
        notificationElm.style.opacity = 1
      }, 100)
    }, durationShow * i * 1000)
    setTimeout(() => {
      notificationElm.style.transitionDuration = `${durationHide}s`
      notificationElm.style.opacity = 0
    }, durationShow * notificationList.length * 1000 + 3 * 1000 + durationHide * i * 1000)
  })

  setTimeout(() => {
    notificationContainerElm.clearChildren()
    notificationIsVisible = false
  }, (durationShow + durationHide) * notificationList.length * 1000 + 3 * 1000)

  const notificationIdList = Object.keys(resultFetchGlobalNotification?.result?.notificationList || {})
  if (notificationIdList.length === 0) {
    return
  }
  const param = { notificationIdList }
  await postRequest(`${apiEndpoint}/notification/open`, param)
}

