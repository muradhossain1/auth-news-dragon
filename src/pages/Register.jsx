import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const Register = () => {

    const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        // const name = e.target.name.value 
        const form = new FormData(e.target)
        const name = form.get('name')
        if(name.length < 5 ){
            setError({ ...error, name:"Must be more then 5 character long"});
            return;
        }
        const photo = form.get("photo")
        const email = form.get('email')
        const password = form.get('password')
        // console.log(name, photo, email, password);

        createNewUser(email, password)
            .then(result => {
                // console.log(result.user)
                setUser(result.user)
                updateUserProfile({ photoURL :photo, displayName : name})
                .then(() => {navigate('/')})
                .catch(err => console.log(err))
            })
            .catch(error => console.log(error.message))
    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0  rounded-none pb-8">
                <h2 className="text-2xl font-semibold text-center p-10">Register Your Account</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                    </div>
                    {error.name && (
                        <label className="label text-xs text-red-600">{error.name}</label>
                    )}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo Url</span>
                        </label>
                        <input type="text" name="photo" placeholder="photo-url" className="input input-bordered" required />
                    </div>
                    {/* email  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-neutral rounded-none">Register</button>
                    </div>
                </form>
                <p className="text-center font-semibold"> Allready Have An Account? <Link to='/auth/login' className="hover:link text-red-500 ml-1">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;