import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { withRouter } from 'react-router-dom';
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const Step1 = props => {
    //const scriptURL = 'https://script.google.com/macros/s/AKfycbwbrIjWVJfPDC4AZGHmopV3sDXDRvrZ7BniEVP2shUn0EjJDFV9/exec' //Production URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbzpbG1CcPH5y7BGW6cJ5r2VivimxL7EQl96RBx8Cp6qRj1MW7zm/exec" //Test URL https://docs.google.com/spreadsheets/d/1CoQ2ZOVJLT9U9OkgdEvxuX3vNg-wZwLjbOEYr0Ivfhc/edit#gid=0
    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur"
    });
    const { action, state } = useStateMachine(updateAction);
    const [submitBut, setsubmitBut] = useState(false);

    const onSubmit = (data, e) => {
        e.preventDefault();
        action(data)
        console.log('Submit event', e)
        //alert(JSON.stringify(data))
        var form_data = new FormData();
        for (var key in data) {
            form_data.append(key, data[key]);
        }
        setsubmitBut(true)
        fetch(scriptURL, { method: 'POST', body: form_data })
            .then(response => success(data, response))
            .catch(error => fuckup(error))
    };

    function success(data, response) {
        console.log('Success!', response);
        //React Hook Form Wizard https://codesandbox.io/s/form-wizard-pages-kkg7m
        props.history.push("./form2")
    }

    function fuckup(error) {
        console.error('Error!', error.message);
        setsubmitBut(false)
        alert("Something Screwed Up. Please Try Again.");
    }
    return (

        <div id="form-page-1" className="form-page-1">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 hidden>Form Page 1</h3>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email" name="email" type="email" placeholder="your@emailaddress.com" className="form-control input-md"
                                ref={register({
                                    required: true,
                                    pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                                })}
                                defaultValue={state.data.email}
                            //onChange={e => setTheEmail(e.target.value)}

                            />
                            {errors.email && <div className="form_error">Please Enter a Valid Email address</div>}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">

                        <div className="col-md-5">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName" name="firstName" type="text" placeholder="Alex"
                                className="form-control input-md" ref={register({ required: true })}
                                defaultValue={state.data.firstName}
                            />
                            {errors.firstName && <div className="form_error">First Name is required</div>}
                        </div>

                        <div className="col">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName" name="lastName" type="text" placeholder="Smith" className="form-control input-md"
                                ref={register({ required: true })}
                                defaultValue={state.data.lastName}
                            />
                            {errors.lastName && <div className="form_error">Last Name is required</div>}

                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-5">
                            <label htmlFor="insured">Are you currently insured?</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="insured" id="insured-0" value="Yes"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.insured === "Yes"}
                                    />
                                    <label className="form-check-label " htmlFor="insured-0"> I'm Currently Insured</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="insured" id="insured-1" value="No"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.insured === "No"}
                                    />
                                    <label className="form-check-label" htmlFor="insured-1"> I'm NOT Insured</label>
                                </div>
                            </div>
                            {errors.insured && <div className="form_error">Insurance Status is required</div>}
                        </div>

                        <div className="col">
                            <label className="control-label" htmlFor="interest">How can we help you?</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input interest" type="radio" name="interest" id="interest-0" value="1"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.interest === "1"}
                                    />
                                    <label className="form-check-label" htmlFor="interest-0">I want to save money on insurance.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input interest" type="radio" name="interest" id="interest-1" value="2"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.interest === "2"}
                                    />
                                    <label className="form-check-label interest" htmlFor="interest-1">I want better insurance.</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input interest" type="radio" name="interest" id="interest-2" value="3"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.interest === "3"}
                                    />
                                    <label className="form-check-label" htmlFor="interest-2">I'm want personalized service.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="interest" id="interest-3" value="4"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.interest === "4"}
                                    />
                                    <label className="form-check-label" htmlFor="interest-3">I'm just curious.</label>
                                </div>
                            </div>
                            {errors.interest && <div className="form_error">Please choose how we can help</div>}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-5">
                            <label htmlFor="phone">Phone Number</label>
                            <input id="phone" name="phone" type="text" placeholder="702-555-5555" className="form-control input-md"
                                ref={register({
                                    required: true,
                                    pattern: /^([+]?[1]?[-.\s]?)([(]?)([2-9]\d{2})([)]?[-.\s]?)(\d{3})([-.\s]?)(\d{4})$/
                                })}
                                onBlur={e => {
                                    const value = e.target.value;
                                    const phoneRegex = /^([+]?[1]?[-.\s]?)([(]?)([2-9]\d{2})([)]?[-.\s]?)(\d{3})([-.\s]?)(\d{4})$/;
                                    if (phoneRegex.test(value)) {
                                        var normalizedNum = value.replace(phoneRegex, "$3-$5-$7");
                                        //alert("The formatted Phone Number is: " + normalizedNum);
                                        e.target.value = normalizedNum;
                                    } else {
                                        //alert("phone number wasn't valid! (" + normalizedNum + ")");
                                    }
                                }}
                                defaultValue={state.data.phone}
                            />
                            {errors.phone && <div className="form_error">Please Enter a valid US phone number</div>}
                        </div>
                        <div className="col">
                            <label htmlFor="contactMethod">How would you like to be contacted?</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="contactMethod" id="contactMethod-email" value="email"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.contactMethod === "email"}
                                    />
                                    <label className="form-check-label" htmlFor="contactMethod-email">Email</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="contactMethod" id="contactMethod-phone" value="phone"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.contactMethod === "phone"}
                                    />
                                    <label className="form-check-label" htmlFor="contactMethod-phone">Phone Call</label>
                                </div>
                            </div>
                            {errors.contactMethod && <div className="form_error">Please choose how you'd prefer to be contacted</div>}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col text-center">
                            <button id="submit" name="submit" className="btn btn-primary" type="submit" disabled={submitBut} >{submitBut ? 'Sending...' : 'Get a Quote'}</button>
                            <div className="submit-message" hidden={!submitBut} >We're processing the first page...</div>
                        </div>
                    </div>
                </div>

            </form>
        </div>

    )
}

export default withRouter(Step1);