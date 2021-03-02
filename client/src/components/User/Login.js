import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./login_css/loginstyle.css";

// Requests
import POST_Request from '../../Helper/PostRequest'

/**
 * Level 1 Route - /user
 * @author TanayBhadula, ishivanshgoel
 */

function Login() {

    // fetch from store
    const user = true

    const history = useHistory()

    // state variables
    const[email, setEmail] = useState(null)
    const[password, setPassword] = useState(null)

    // form submission
    let handleSubmit = async (event)=>{
      event.preventDefault()
      console.log(email,password)

      let data = {
        email,
        password
      }

      const response = await POST_Request('login', data);

      if(response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
      } else{
        alert('error')
      }

    }

    return (

      !user ? (

      /*
          <div className="container p-0">
            <div className="row">
              <div className="col-12 offset-lg-3 col-lg-6 offset-md-2 col-md-8 p-0">
                 <form className="login__box" onSubmit={handleSubmit}>
                   <h1>Login</h1>
                   <input type="text" name="email" placeholder="Email" required onChange={(event)=>{setEmail(event.target.value)}}/>
                   <input type="password" name="password" placeholder="Password" required onChange={(event)=>setPassword(event.target.value)}/>
                   <input type="submit" name="login" value="Login"/>
                   <Link to="/register">New User? Sign Up.</Link>
                   <br className="d-block d-sm-none"/>
                 </form>
              </div>
            </div>
          </div>
        */

       <div className="login_container">
            <div className="editor-field editor-field__textbox">
              <div className="editor-field__label-container">
                <label className="editor-field__label">Name</label>
              </div>

              <div className="editor-field__container">
                <input type="text" className="editor-field__input" onFocus="generateNoise(this, 'input')"
                  onBlur="removeNoise(this, 'input')" required/>
              </div>
              <span className="editor-field__bottom"></span>
              <div className="editor-field__noise"></div>
            </div>
            <div className="editor-field editor-field__textbox">
              <div className="editor-field__label-container">
                <label className="editor-field__label">Password</label>
              </div>

              <div className="editor-field__container">
                <input type="password" className="editor-field__input" onFocus="generateNoise(this, 'input')"
                  onBlur="removeNoise(this, 'input')" required/>
              </div>
              <span className="editor-field__bottom"></span>
              <div className="editor-field__noise"></div>
            </div>
            <div className="btn btn--primary" onMouseOver="generateNoise(this, 'button')"
              onMouseOut="removeNoise(this, 'button')">
              <div className="btn__container">
                Login
              </div>
              <div className="btn__bottom"></div>
              <div className="btn__noise"></div>
            </div>
        </div>
      ):(
        <div>
          {
            history.push("/user/play")
          }
        </div>
      )
    )
}

export default Login
