import React from "react"

function Login() {



    function handleUserChange(e) {
        this.setState({ username: e.target.value })
    }

    function handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }
    function signIn() {
        alert('Email address is ' + this.state.username + ' Password is ' + this.state.password);
    }

    axios.post('/auth/login', {
        username: this.state.username,
        password: this.state.password
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    return (
        <div className="container">
            <div className="Auth-form-container" style={{ width: '40%' }}>
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="form-group mt-3">
                            <label>UserName</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter username"
                                onChange={handleUserChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" onClick={this.signIn} className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            Forgot <a href="#">password?</a>
                        </p>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;