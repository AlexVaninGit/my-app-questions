export const getAuthForm = () => {
    return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield">
                <input type="email" placeholder="Ваш email"  value="test@yandex.ru" id="email" >
                <input type="password" placeholder="Ваш пароль" value="test-auth" id="password" >
            </div>
            <button type="submit" class="mui-btn mui-btn--raised">Войти</button>
        </form>
    `
}

export const authWithEmailAndPassword = (email, password) => {
    const apiKey = 'AIzaSyDYr0LZDTUbAtFqUdhY5LeCKmUc92l5ff8'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        }),
        
        headers: {
            'Content-Type': 'application/json'
        }

    })
    .then(response => response.json())
    .then(data => data.idToken)
}