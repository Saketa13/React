import { login } from '../services/auth.js';
import User from '../models/User.js';
import { hideError, showError } from '../utils/form.js';

class LoginPage {
    // same as saying this.loginForm = ... within the constructor
    loginForm = document.querySelector( 'form' );
    user = new User( '', '' );

    async loginToApp() {
        if( !this.user.isValid() ) {
            return;
        }
    
        await login( this.user.email, this.user.password );
        
        window.location = '/workshops';
    }

    onInputEmail = ( event ) => {
        const errors = this.user.setEmail( event.target.value );
        console.log( this.user );
        
        if( errors.length === 0 ) {
            hideError( event.target );
            return;
        }

        showError( event.target, errors.join( ', ' ) );
    }
    
    onInputPassword = ( event ) => {
        const errors = this.user.setPassword( event.target.value );
        console.log( this.user );

        if( errors.length === 0 ) {
            hideError( event.target );
            return;
        }

        showError( event.target, errors.join( ', ' ) );
    }

    // a method which is defined using arrow function syntax will ALWAYS have its context ("this") set to the object
    onSubmitLoginForm = ( event ) => {
        event.preventDefault();
        this.loginToApp( this.loginForm.email.value, this.loginForm.password.value );
    }

    addListeners() {
        this.loginForm.email.addEventListener( 'input', this.onInputEmail );
        this.loginForm.password.addEventListener( 'input', this.onInputPassword );
        this.loginForm.addEventListener( 'submit', this.onSubmitLoginForm );
    }

    init() {
        this.addListeners();
    }
}

// setup page on load
const page = new LoginPage();
page.init();

export default LoginPage;