function login() {
  return (`
    <section class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form id="loginForm" method="POST">
          <div class="form-group" >
            <label for="username">Usuário:</label>
            <input type="text" id="username" name="username">
          </div>
          <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password">
          </div>
          <button class="login-button" id="sendButton">Entrar</button>
        </form>
        <div id="errorText"></div>
      </div>
    </section>
  `);
}

export default login;

  