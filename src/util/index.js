const getFirebaseUserError = (error) => {
  const errorCode = error.code

  if (errorCode === 'auth/invalid-email') return 'Invalid email!'
  else if (errorCode === 'auth/wrong-password') return 'Wrong password!'
  else if (errorCode === 'auth/user-not-found') return 'User not found!'
  else if (errorCode === 'auth/user-disabled') return 'User is blocked!'
  else if (errorCode === 'auth/email-already-in-use)')
    return 'Email already in use!'
  else return 'Undefined error!'
}

const Status = {
  IDLE: 'idle',
  PENDING: 'loading',
  FULLFILED: 'fullfiled',
  FAILED: 'failed'
}

const ActionType = {
  INCREASE: 'increase',
  DECREASE: 'decrease'
}

async function sendPushNotification(expoPushToken, title, messageBody, data) {
  if (!expoPushToken || !title || !messageBody) return

  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body: messageBody,
    data
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
}
export { getFirebaseUserError, Status, ActionType, sendPushNotification }
