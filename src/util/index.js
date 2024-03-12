const getFirebaseUserError = (error) => {
  const errorCode = error.code

  if (errorCode === 'auth/invalid-email') return 'Invalid email!'
  else if (errorCode === 'auth/wrong-password') return 'Wrong password!'
  else if (errorCode === 'auth/user-not-found') return 'User not found!'
  else if (errorCode === 'auth/user-disabled') return 'User is blocked!'
  else if (errorCode === 'auth/email-already-in-use)')
    return 'Email already in use!'
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

export { getFirebaseUserError, Status, ActionType }
