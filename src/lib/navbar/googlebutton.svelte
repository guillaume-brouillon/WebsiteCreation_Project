<script>
	import { supabase } from "../../supabaseClient";
    async function signInWithGoogle() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  });
      window.location.href = '/summary';
}
</script>

<link rel="stylesheet" type="googlebutton.css" href="//fonts.googleapis.com/css?family=Open+Sans" />
<button class="google-btn" on:click={signInWithGoogle} type="button">
    <div class="google-icon-wrapper">
      <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
    </div>
    <p class="btn-text"><b>Sign in with google</b></p>
</button>

<style>


.google-btn {
  width: 100%;
  height: 42px;
  background-color: var(--google-blue);
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
  display: flex;
}
  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: var(--white);
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    margin: auto;
    color: var(--white);
    font-size: 14px;
    letter-spacing: 0.2px;
    font-family: "Roboto";
  }
  .google-btn:hover {
    transform: scale(1.05);
    transition: 0.2s;
    box-shadow: var(--box-shadow);
  }
  .google-btn:active {
    background: var(--button-active-blue);
  }


@import url(https://fonts.googleapis.com/css?family=Roboto:500);
</style>