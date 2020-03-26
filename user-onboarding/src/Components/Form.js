import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Please enter a valid email").required("Email is a required field"),
    role: yup.string().required("Must select a role"),
    password: yup.string().required("Must enter a password"),
    terms: yup.bool().oneOf([true], "Please agree to Terms of Use")
});

function Form(props) {

    //initial state of form
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        role:"",
        password: "",
        terms: ""
    })
    //state for error validation
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        role:"",
        password: "",
        terms: ""
    })
    //state for submit button
    const [buttonDisabled, setButtonDisabled] = useState(true);

    //state for our post request so we can concole.log(post)
    const [post, setPost] = useState([]);
    const [users, setUsers] = useState ([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const validateChange = event => {
        yup.reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                console.log("in errors",err);
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                });
            })
    };

    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
        validateChange(event);
        setFormState(newFormData);
    };

    const formSubmit = event => {
        event.preventDefault();
        axios.post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data);
                console.log("success", post);
                setUsers([...users, res.data])
                setFormState({
                    name: "",
                    email: "",
                    role:"",
                    password: "",
                    terms: ""
                });
            })
            .catch(err => {
                console.log(err.res);
            });
    };

    return (
        <div id="form">

            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name
                <input data-cy="name" id="name" type="text" name="name" value={formState.name} onChange={inputChange} />
                {errors.name.length > 0 ? (<p data-cy="nameError">{errors.name}</p>):null}
                </label>
                <label htmlFor="email">
                    Email
                <input data-cy="email" id="email" type="email" name="email" value={formState.email} onChange={inputChange} />
                {errors.email.length > 0 ? (<p data-cy="emailError">{errors.email}</p>) : null}
                </label>
                <label htmlFor="role">
                    Role
                    <select data-cy="role" name="role" onChange={inputChange}>
                        <option></option>
                        <option value="Front-End Engineer">Front-End Engineer</option>
                        <option value="Back-End Engineer">Back-End Engineer</option>
                        <option value="UI Designer">UI Designer</option>
                        <option value="Mobile Engineer">Mobile Engineer</option>
                        <option value="Data Scientist">Data Scientist</option>
                    </select>
                    {errors.role.length > 0 ? (<p data-cy="roleError">{errors.role}</p>):null}
                </label>
                <label htmlFor="password">
                    Password
                <input data-cy="password" id="password" type="password" name="password" value={formState.password} onChange={inputChange} />
                {errors.password.length > 0 ? (<p data-cy="passwordError">{errors.password}</p>):null}
                </label>
                <label htmlFor="terms">
                    <input data-cy="terms" id="terms" type="checkbox" name="terms" checked={formState.terms} onChange={inputChange} />
                    Terms and Conditions
            </label>
                <button data-cy="submit" disabled={buttonDisabled}>Submit</button>
            </form>
            <div>
                <h1>Users</h1>
                {users.map((element, index) => {
                    return (
                        <div data-cy={index}>Name: {element.name} Email: {element.email} Role: {element.role}</div>
                    );
                })}
            </div>
        </div>
    );
}

export default Form;