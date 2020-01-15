import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { withRouter } from 'react-router-dom';
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const Step1 = props => {
    //const scriptURL = 'hhttps://script.google.com/macros/s/AKfycbwbrIjWVJfPDC4AZGHmopV3sDXDRvrZ7BniEVP2shUn0EjJDFV9/exec' //Production URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbzpbG1CcPH5y7BGW6cJ5r2VivimxL7EQl96RBx8Cp6qRj1MW7zm/exec" //Test URL https://docs.google.com/spreadsheets/d/1CoQ2ZOVJLT9U9OkgdEvxuX3vNg-wZwLjbOEYr0Ivfhc/edit#gid=0
    const { register, handleSubmit, errors, watch } = useForm({
        mode: "onBlur"
    });

    const numCars = watch("vehicles", props.cars);
    const numDrivers = watch("addDrivers", props.cars);
    const { action, state } = useStateMachine(updateAction);
    const [submitBut, setsubmitBut] = useState(false);
    const yearPlaceholder = new Date().getFullYear();

    const onSubmit = (payload, e) => {
        e.preventDefault();
        action(payload)
        console.log('Submit event', e)
        //alert(JSON.stringify(data))

        let allData = {
            ...state,
            data: {
                ...state.data,
                ...payload
            }
        };
        allData = allData.data;
        //alert(JSON.stringify(allData))

        var form_data = new FormData();
        for (var key in allData) {
            form_data.append(key, allData[key]);
        }
        setsubmitBut(true)
        fetch(scriptURL, { method: 'POST', body: form_data })
            .then(response => success(allData, response))
            .catch(error => fuckup(error))
    };

    function success(data, response) {
        console.log('Success!', response);
        //React Hook Form Wizard https://codesandbox.io/s/form-wizard-pages-kkg7m
        props.history.push("./result")
    }

    function fuckup(error) {
        console.error('Error!', error.message);
        setsubmitBut(false)
        alert("Something Screwed Up. Please Try Again.");
    }
    return (
        <div id="form-page-2" className="form-page-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Form Page 2/2</h3>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="dob" style={{ display: 'block' }}>Date of Birth:</label>
                            <input id="dob" name="dob" type="date" placeholder="MM/DD/YYYY" className="form-control input-md"
                                ref={register({ required: true })}
                                defaultValue={state.data.dob}
                            />
                            {errors.dob && <div className="form_error">Please Enter a valid birth date (mm/dd/yyyy)</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="gender" style={{ display: 'block' }}>Gender:</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="gender-female" value="F"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.gender === "F"}
                                    />
                                    <label className="form-check-label" htmlFor="gender-female">Female</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="gender-male" value="M"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.gender === "M"}
                                    />
                                    <label className="form-check-label" htmlFor="gender-male">Male</label>
                                </div>
                            </div>
                            {errors.gender && <div className="form_error">Please choose your gender</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="married" style={{ display: 'block' }}>Married?</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="married" id="married-yes" value="Yes"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.married === "Yes"}


                                    />
                                    <label className="form-check-label" htmlFor="married-yes">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="married" id="married-no" value="No"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.married === "No"}


                                    />
                                    <label className="form-check-label" htmlFor="married-no">No</label>
                                </div>
                            </div>
                            {errors.married && <div className="form_error">Please select your marrital status</div>}
                        </div>

                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-8">
                            <label htmlFor="address" style={{ display: 'block' }} hidden>Address:</label>
                            <input id="address" name="address" type="text" placeholder="Address" className="form-control input-md"
                                ref={register({ required: true })}
                                defaultValue={state.data.address}
                            />
                            {errors.address && <div className="form_error">Please enter your address</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="address2" style={{ display: 'block' }} hidden>Unit/Apt:</label>
                            <input id="address2" name="address2" type="text" placeholder="Unit/Apt" className="form-control input-md"
                                ref={register({ required: false })}
                                defaultValue={state.data.address2}
                            />
                            {errors.address2 && <div className="form_error">Please enter your unit/apt number</div>}
                        </div>

                    </div>
                </div>


                <div className="form-group">
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="city" style={{ display: 'block' }} hidden>City:</label>
                            <input id="city" name="city" type="text" placeholder="City" className="form-control input-md"
                                ref={register({ required: true })}
                                defaultValue={state.data.city}
                            />
                            {errors.city && <div className="form_error">Please enter your city</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="state" style={{ display: 'block' }} hidden>State</label>
                            <select id="state" name="state" className="custom-select"
                                ref={register({ required: true, minLength: 1 })}
                                defaultValue={state.data.state || ""}
                            >
                                <option value="">Please Select</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV" selected>Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                            {errors.state && <div className="form_error">Please choose a state</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="zip" style={{ display: 'block' }} hidden>Zip Code:</label>
                            <input id="zip" name="zip" type="text" placeholder="Zip Code" className="form-control input-md"
                                ref={register({ required: true, minLength: 5, maxLength: 5 })}
                                defaultValue={state.data.zip}
                            />
                            {errors.zip && <div className="form_error">Please enter a 5-digit zip code</div>}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-8">
                            <label className="control-label" htmlFor="vehicles">How many vehicles do you own?</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="vehicles" id="vehicles-0" value="0"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.vehicles === "0" || "0"}
                                    />
                                    <label className="form-check-label" htmlFor="vehicles-0">0</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="vehicles" id="vehicles-1" value="1"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.vehicles === "1"}
                                    />
                                    <label className="form-check-label" htmlFor="vehicles-0">1</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="vehicles" id="vehicles-2" value="2"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.vehicles === "2"}
                                    />
                                    <label className="form-check-label" htmlFor="vehicles-1">2</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="vehicles" id="vehicles-3" value="3"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.vehicles === "3"}
                                    />
                                    <label className="form-check-label" htmlFor="vehicles-2">3</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="vehicles" id="vehicles-4" value="4"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.vehicles === "4"}
                                    />
                                    <label className="form-check-label" htmlFor="vehicles-3">4</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="vehicles" id="vehicles-5" value="5"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.vehicles === "5"}
                                    />
                                    <label className="form-check-label" htmlFor="vehicles-4">5+</label>
                                </div>
                            </div>
                            {errors.vehicles && <div className="form_error">Number of Vehicles is required</div>}
                        </div>
                    </div>
                </div>

                {numCars > 0 &&
                    <div className="form-group">
                        <div className="row col-headers">
                            <div className="col-md-2"><label htmlFor="Additional Vehicle # Column Header">Add. Vehicle #</label></div>
                            <div className="col-md-2"><label>Vehicle Year</label></div>
                            <div className="col-md-4"><label>Vehicle Make</label></div>
                            <div className="col-md-4"><label>Vehicle Model</label></div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Vehicle 1:</div>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="carYear1" hidden>Vehicle 1 Year:</label>
                                <input id="carYear1" name="carYear1" type="text" placeholder={yearPlaceholder} className="form-control input-md"
                                    ref={register({
                                        required: true,
                                        pattern: /^(19[0-9]{2}|20[0-1][[0-9]|202[0-9])$/
                                    })}
                                    defaultValue={state.data.carYear1}
                                />
                                {errors.carYear1 && <div className="form_error">Please enter vehicle year</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carMake1" hidden>Vehicle 1 Make:</label>
                                <select id="carMake1" name="carMake1" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.carMake1}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='Acura'>Acura</option>
                                    <option value='Alfa Romeo'>Alfa Romeo</option>
                                    <option value='Aston Martin'>Aston Martin</option>
                                    <option value='Audi'>Audi</option>
                                    <option value='Bentley'>Bentley</option>
                                    <option value='BMW'>BMW</option>
                                    <option value='Bugatti'>Bugatti</option>
                                    <option value='Buick'>Buick</option>
                                    <option value='Cadillac'>Cadillac</option>
                                    <option value='Caterham'>Caterham</option>
                                    <option value='Chevrolet'>Chevrolet</option>
                                    <option value='Chrysler'>Chrysler</option>
                                    <option value='Dodge'>Dodge</option>
                                    <option value='Equus'>Equus</option>
                                    <option value='Ferrari'>Ferrari</option>
                                    <option value='Fiat'>Fiat</option>
                                    <option value='Fisker'>Fisker</option>
                                    <option value='Ford'>Ford</option>
                                    <option value='Genesis'>Genesis</option>
                                    <option value='GMC'>GMC</option>
                                    <option value='Honda'>Honda</option>
                                    <option value='Hyundai'>Hyundai</option>
                                    <option value='Infiniti'>Infiniti</option>
                                    <option value='Jaguar'>Jaguar</option>
                                    <option value='Jeep'>Jeep</option>
                                    <option value='Karma'>Karma</option>
                                    <option value='Kia'>Kia</option>
                                    <option value='Koenigsegg'>Koenigsegg</option>
                                    <option value='Lamborghini'>Lamborghini</option>
                                    <option value='Land Rover'>Land Rover</option>
                                    <option value='Lexus'>Lexus</option>
                                    <option value='Lincoln'>Lincoln</option>
                                    <option value='Lotus'>Lotus</option>
                                    <option value='Maserati'>Maserati</option>
                                    <option value='Mazda'>Mazda</option>
                                    <option value='McLaren'>McLaren</option>
                                    <option value='Mercedes-Benz'>Mercedes-Benz</option>
                                    <option value='Mini'>Mini</option>
                                    <option value='Mitsubishi'>Mitsubishi</option>
                                    <option value='Morgan'>Morgan</option>
                                    <option value='Nissan'>Nissan</option>
                                    <option value='Pagani'>Pagani</option>
                                    <option value='Panoz'>Panoz</option>
                                    <option value='Porsche'>Porsche</option>
                                    <option value='Ram'>Ram</option>
                                    <option value='Rezvani'>Rezvani</option>
                                    <option value='Rolls Royce'>Rolls Royce</option>
                                    <option value='Saleen'>Saleen</option>
                                    <option value='Smart'>Smart</option>
                                    <option value='Subaru'>Subaru</option>
                                    <option value='Tesla'>Tesla</option>
                                    <option value='Toyota'>Toyota</option>
                                    <option value='Volkswagen'>Volkswagen</option>
                                    <option value='Volvo'>Volvo</option>
                                </select>
                                {errors.carMake1 && <div className="form_error">Please choose vehicle maker</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carModel1" hidden>Vehicle 1 Model:</label>
                                <input id="carModel1" name="carModel1" type="carModel1" placeholder="F-150" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.carModel1}
                                />
                                {errors.carModel1 && <div className="form_error">Please enter vehicle model</div>}
                            </div>
                        </div>
                    </div>
                }
                {numCars > 1 &&
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Vehicle 2:</div>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="carYear2" hidden>Vehicle 2 Year:</label>
                                <input id="carYear2" name="carYear2" type="text" placeholder={yearPlaceholder} className="form-control input-md"
                                    ref={register({
                                        required: true,
                                        pattern: /^(19[0-9]{2}|20[0-1][[0-9]|202[0-9])$/
                                    })}
                                    defaultValue={state.data.carYear2}
                                />
                                {errors.carYear2 && <div className="form_error">Please enter vehicle year</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carMake2" hidden>Vehicle 2 Make:</label>
                                <select id="carMake2" name="carMake2" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.carMake2}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='Acura'>Acura</option>
                                    <option value='Alfa Romeo'>Alfa Romeo</option>
                                    <option value='Aston Martin'>Aston Martin</option>
                                    <option value='Audi'>Audi</option>
                                    <option value='Bentley'>Bentley</option>
                                    <option value='BMW'>BMW</option>
                                    <option value='Bugatti'>Bugatti</option>
                                    <option value='Buick'>Buick</option>
                                    <option value='Cadillac'>Cadillac</option>
                                    <option value='Caterham'>Caterham</option>
                                    <option value='Chevrolet'>Chevrolet</option>
                                    <option value='Chrysler'>Chrysler</option>
                                    <option value='Dodge'>Dodge</option>
                                    <option value='Equus'>Equus</option>
                                    <option value='Ferrari'>Ferrari</option>
                                    <option value='Fiat'>Fiat</option>
                                    <option value='Fisker'>Fisker</option>
                                    <option value='Ford'>Ford</option>
                                    <option value='Genesis'>Genesis</option>
                                    <option value='GMC'>GMC</option>
                                    <option value='Honda'>Honda</option>
                                    <option value='Hyundai'>Hyundai</option>
                                    <option value='Infiniti'>Infiniti</option>
                                    <option value='Jaguar'>Jaguar</option>
                                    <option value='Jeep'>Jeep</option>
                                    <option value='Karma'>Karma</option>
                                    <option value='Kia'>Kia</option>
                                    <option value='Koenigsegg'>Koenigsegg</option>
                                    <option value='Lamborghini'>Lamborghini</option>
                                    <option value='Land Rover'>Land Rover</option>
                                    <option value='Lexus'>Lexus</option>
                                    <option value='Lincoln'>Lincoln</option>
                                    <option value='Lotus'>Lotus</option>
                                    <option value='Maserati'>Maserati</option>
                                    <option value='Mazda'>Mazda</option>
                                    <option value='McLaren'>McLaren</option>
                                    <option value='Mercedes-Benz'>Mercedes-Benz</option>
                                    <option value='Mini'>Mini</option>
                                    <option value='Mitsubishi'>Mitsubishi</option>
                                    <option value='Morgan'>Morgan</option>
                                    <option value='Nissan'>Nissan</option>
                                    <option value='Pagani'>Pagani</option>
                                    <option value='Panoz'>Panoz</option>
                                    <option value='Porsche'>Porsche</option>
                                    <option value='Ram'>Ram</option>
                                    <option value='Rezvani'>Rezvani</option>
                                    <option value='Rolls Royce'>Rolls Royce</option>
                                    <option value='Saleen'>Saleen</option>
                                    <option value='Smart'>Smart</option>
                                    <option value='Subaru'>Subaru</option>
                                    <option value='Tesla'>Tesla</option>
                                    <option value='Toyota'>Toyota</option>
                                    <option value='Volkswagen'>Volkswagen</option>
                                    <option value='Volvo'>Volvo</option>
                                </select>
                                {errors.carMake2 && <div className="form_error">Please choose vehicle maker</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carModel2" style={{ display: 'block' }} hidden>Model</label>
                                <input id="carModel1" name="carModel2" type="carModel2" placeholder="F-150" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.carModel2}
                                />
                                {errors.carModel2 && <div className="form_error">Please enter vehicle model</div>}
                            </div>
                        </div>
                    </div>
                }

                {numCars > 2 &&
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Vehicle 3:</div>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="carYear3" hidden>Vehicle 3 Year:</label>
                                <input id="carYear3" name="carYear3" type="text" placeholder={yearPlaceholder} className="form-control input-md"
                                    ref={register({
                                        required: true,
                                        pattern: /^(19[0-9]{2}|20[0-1][[0-9]|202[0-9])$/
                                    })}
                                    defaultValue={state.data.carYear3}
                                />
                                {errors.carYear3 && <div className="form_error">Please enter vehicle year</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carMake3" hidden>Vehicle 3 Make:</label>
                                <select id="carMake3" name="carMake3" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.carMake3}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='Acura'>Acura</option>
                                    <option value='Alfa Romeo'>Alfa Romeo</option>
                                    <option value='Aston Martin'>Aston Martin</option>
                                    <option value='Audi'>Audi</option>
                                    <option value='Bentley'>Bentley</option>
                                    <option value='BMW'>BMW</option>
                                    <option value='Bugatti'>Bugatti</option>
                                    <option value='Buick'>Buick</option>
                                    <option value='Cadillac'>Cadillac</option>
                                    <option value='Caterham'>Caterham</option>
                                    <option value='Chevrolet'>Chevrolet</option>
                                    <option value='Chrysler'>Chrysler</option>
                                    <option value='Dodge'>Dodge</option>
                                    <option value='Equus'>Equus</option>
                                    <option value='Ferrari'>Ferrari</option>
                                    <option value='Fiat'>Fiat</option>
                                    <option value='Fisker'>Fisker</option>
                                    <option value='Ford'>Ford</option>
                                    <option value='Genesis'>Genesis</option>
                                    <option value='GMC'>GMC</option>
                                    <option value='Honda'>Honda</option>
                                    <option value='Hyundai'>Hyundai</option>
                                    <option value='Infiniti'>Infiniti</option>
                                    <option value='Jaguar'>Jaguar</option>
                                    <option value='Jeep'>Jeep</option>
                                    <option value='Karma'>Karma</option>
                                    <option value='Kia'>Kia</option>
                                    <option value='Koenigsegg'>Koenigsegg</option>
                                    <option value='Lamborghini'>Lamborghini</option>
                                    <option value='Land Rover'>Land Rover</option>
                                    <option value='Lexus'>Lexus</option>
                                    <option value='Lincoln'>Lincoln</option>
                                    <option value='Lotus'>Lotus</option>
                                    <option value='Maserati'>Maserati</option>
                                    <option value='Mazda'>Mazda</option>
                                    <option value='McLaren'>McLaren</option>
                                    <option value='Mercedes-Benz'>Mercedes-Benz</option>
                                    <option value='Mini'>Mini</option>
                                    <option value='Mitsubishi'>Mitsubishi</option>
                                    <option value='Morgan'>Morgan</option>
                                    <option value='Nissan'>Nissan</option>
                                    <option value='Pagani'>Pagani</option>
                                    <option value='Panoz'>Panoz</option>
                                    <option value='Porsche'>Porsche</option>
                                    <option value='Ram'>Ram</option>
                                    <option value='Rezvani'>Rezvani</option>
                                    <option value='Rolls Royce'>Rolls Royce</option>
                                    <option value='Saleen'>Saleen</option>
                                    <option value='Smart'>Smart</option>
                                    <option value='Subaru'>Subaru</option>
                                    <option value='Tesla'>Tesla</option>
                                    <option value='Toyota'>Toyota</option>
                                    <option value='Volkswagen'>Volkswagen</option>
                                    <option value='Volvo'>Volvo</option>
                                </select>
                                {errors.carMake3 && <div className="form_error">Please choose vehicle maker</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carModel3" hidden>Model 3 Model:</label>
                                <input id="carModel1" name="carModel3" type="carModel3" placeholder="F-150" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.carModel3}
                                />
                                {errors.carModel3 && <div className="form_error">Please enter vehicle model</div>}
                            </div>
                        </div>
                    </div>
                }

                {numCars > 3 &&
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Vehicle 4:</div>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="carYear4" hidden>Vehicle 4 Year:</label>
                                <input id="carYear4" name="carYear4" type="text" placeholder={yearPlaceholder} className="form-control input-md"
                                    ref={register({
                                        required: true,
                                        pattern: /^(19[0-9]{2}|20[0-1][[0-9]|202[0-9])$/
                                    })}
                                    defaultValue={state.data.carYear4}
                                />
                                {errors.carYear4 && <div className="form_error">Please enter vehicle year</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carMake4" hidden>Vehicle 4 Make:</label>
                                <select id="carMake4" name="carMake4" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.carMake4}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='Acura'>Acura</option>
                                    <option value='Alfa Romeo'>Alfa Romeo</option>
                                    <option value='Aston Martin'>Aston Martin</option>
                                    <option value='Audi'>Audi</option>
                                    <option value='Bentley'>Bentley</option>
                                    <option value='BMW'>BMW</option>
                                    <option value='Bugatti'>Bugatti</option>
                                    <option value='Buick'>Buick</option>
                                    <option value='Cadillac'>Cadillac</option>
                                    <option value='Caterham'>Caterham</option>
                                    <option value='Chevrolet'>Chevrolet</option>
                                    <option value='Chrysler'>Chrysler</option>
                                    <option value='Dodge'>Dodge</option>
                                    <option value='Equus'>Equus</option>
                                    <option value='Ferrari'>Ferrari</option>
                                    <option value='Fiat'>Fiat</option>
                                    <option value='Fisker'>Fisker</option>
                                    <option value='Ford'>Ford</option>
                                    <option value='Genesis'>Genesis</option>
                                    <option value='GMC'>GMC</option>
                                    <option value='Honda'>Honda</option>
                                    <option value='Hyundai'>Hyundai</option>
                                    <option value='Infiniti'>Infiniti</option>
                                    <option value='Jaguar'>Jaguar</option>
                                    <option value='Jeep'>Jeep</option>
                                    <option value='Karma'>Karma</option>
                                    <option value='Kia'>Kia</option>
                                    <option value='Koenigsegg'>Koenigsegg</option>
                                    <option value='Lamborghini'>Lamborghini</option>
                                    <option value='Land Rover'>Land Rover</option>
                                    <option value='Lexus'>Lexus</option>
                                    <option value='Lincoln'>Lincoln</option>
                                    <option value='Lotus'>Lotus</option>
                                    <option value='Maserati'>Maserati</option>
                                    <option value='Mazda'>Mazda</option>
                                    <option value='McLaren'>McLaren</option>
                                    <option value='Mercedes-Benz'>Mercedes-Benz</option>
                                    <option value='Mini'>Mini</option>
                                    <option value='Mitsubishi'>Mitsubishi</option>
                                    <option value='Morgan'>Morgan</option>
                                    <option value='Nissan'>Nissan</option>
                                    <option value='Pagani'>Pagani</option>
                                    <option value='Panoz'>Panoz</option>
                                    <option value='Porsche'>Porsche</option>
                                    <option value='Ram'>Ram</option>
                                    <option value='Rezvani'>Rezvani</option>
                                    <option value='Rolls Royce'>Rolls Royce</option>
                                    <option value='Saleen'>Saleen</option>
                                    <option value='Smart'>Smart</option>
                                    <option value='Subaru'>Subaru</option>
                                    <option value='Tesla'>Tesla</option>
                                    <option value='Toyota'>Toyota</option>
                                    <option value='Volkswagen'>Volkswagen</option>
                                    <option value='Volvo'>Volvo</option>
                                </select>
                                {errors.carMake4 && <div className="form_error">Please choose vehicle maker</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carModel4" hidden>Model 4 Model:</label>
                                <input id="carModel1" name="carModel4" type="carModel4" placeholder="F-150" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.carModel4}
                                />
                                {errors.carModel4 && <div className="form_error">Please enter vehicle model</div>}
                            </div>
                        </div>
                    </div>
                }

                {numCars > 4 &&
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Vehicle 5:</div>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="carYear5" hidden>Vehicle 5 Year:</label>
                                <input id="carYear5" name="carYear5" type="text" placeholder={yearPlaceholder} className="form-control input-md"
                                    ref={register({
                                        required: true,
                                        pattern: /^(19[0-9]{2}|20[0-1][[0-9]|202[0-9])$/
                                    })}
                                    defaultValue={state.data.carYear5}
                                />
                                {errors.carYear5 && <div className="form_error">Please enter vehicle year</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carMake5" hidden>Vehicle 5 Make:</label>
                                <select id="carMake5" name="carMake5" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.carMake5}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='Acura'>Acura</option>
                                    <option value='Alfa Romeo'>Alfa Romeo</option>
                                    <option value='Aston Martin'>Aston Martin</option>
                                    <option value='Audi'>Audi</option>
                                    <option value='Bentley'>Bentley</option>
                                    <option value='BMW'>BMW</option>
                                    <option value='Bugatti'>Bugatti</option>
                                    <option value='Buick'>Buick</option>
                                    <option value='Cadillac'>Cadillac</option>
                                    <option value='Caterham'>Caterham</option>
                                    <option value='Chevrolet'>Chevrolet</option>
                                    <option value='Chrysler'>Chrysler</option>
                                    <option value='Dodge'>Dodge</option>
                                    <option value='Equus'>Equus</option>
                                    <option value='Ferrari'>Ferrari</option>
                                    <option value='Fiat'>Fiat</option>
                                    <option value='Fisker'>Fisker</option>
                                    <option value='Ford'>Ford</option>
                                    <option value='Genesis'>Genesis</option>
                                    <option value='GMC'>GMC</option>
                                    <option value='Honda'>Honda</option>
                                    <option value='Hyundai'>Hyundai</option>
                                    <option value='Infiniti'>Infiniti</option>
                                    <option value='Jaguar'>Jaguar</option>
                                    <option value='Jeep'>Jeep</option>
                                    <option value='Karma'>Karma</option>
                                    <option value='Kia'>Kia</option>
                                    <option value='Koenigsegg'>Koenigsegg</option>
                                    <option value='Lamborghini'>Lamborghini</option>
                                    <option value='Land Rover'>Land Rover</option>
                                    <option value='Lexus'>Lexus</option>
                                    <option value='Lincoln'>Lincoln</option>
                                    <option value='Lotus'>Lotus</option>
                                    <option value='Maserati'>Maserati</option>
                                    <option value='Mazda'>Mazda</option>
                                    <option value='McLaren'>McLaren</option>
                                    <option value='Mercedes-Benz'>Mercedes-Benz</option>
                                    <option value='Mini'>Mini</option>
                                    <option value='Mitsubishi'>Mitsubishi</option>
                                    <option value='Morgan'>Morgan</option>
                                    <option value='Nissan'>Nissan</option>
                                    <option value='Pagani'>Pagani</option>
                                    <option value='Panoz'>Panoz</option>
                                    <option value='Porsche'>Porsche</option>
                                    <option value='Ram'>Ram</option>
                                    <option value='Rezvani'>Rezvani</option>
                                    <option value='Rolls Royce'>Rolls Royce</option>
                                    <option value='Saleen'>Saleen</option>
                                    <option value='Smart'>Smart</option>
                                    <option value='Subaru'>Subaru</option>
                                    <option value='Tesla'>Tesla</option>
                                    <option value='Toyota'>Toyota</option>
                                    <option value='Volkswagen'>Volkswagen</option>
                                    <option value='Volvo'>Volvo</option>
                                </select>
                                {errors.carMake5 && <div className="form_error">Please choose vehicle maker</div>}
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="carModel5" hidden>Model 5 Model:</label>
                                <input id="carModel1" name="carModel5" type="carModel5" placeholder="F-150" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.carModel5}
                                />
                                {errors.carModel5 && <div className="form_error">Please enter vehicle model</div>}
                            </div>
                        </div>
                    </div>
                }
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-8">
                            <label className="control-label" htmlFor="addDrivers">Number of Additional Drivers:</label>
                            <div className="radio-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="addDrivers" id="addDrivers-0" value="0"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.addDrivers === "0" || "0"}
                                    />
                                    <label className="form-check-label" htmlFor="addDrivers-0">0</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="addDrivers" id="addDrivers-1" value="1"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.addDrivers === "1"}
                                    />
                                    <label className="form-check-label" htmlFor="addDrivers-1">1</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="addDrivers" id="addDrivers-2" value="2"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.addDrivers === "2"}
                                    />
                                    <label className="form-check-label" htmlFor="addDrivers-2">2</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="addDrivers" id="addDrivers-3" value="3"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.addDrivers === "3"}
                                    />
                                    <label className="form-check-label" htmlFor="addDrivers-3">3</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="addDrivers" id="addDrivers-4" value="4"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.addDrivers === "4"}
                                    />
                                    <label className="form-check-label" htmlFor="addDrivers-4">4</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="addDrivers" id="addDrivers-5" value="5"
                                        ref={register({ required: true })}
                                        defaultChecked={state.data.addDrivers === "5"}
                                    />
                                    <label className="form-check-label" htmlFor="addDrivers-5">5</label>
                                </div>
                            </div>
                            {errors.addDrivers && <div className="form_error">Number of additional drivers is required</div>}
                        </div>
                    </div>
                </div>

                {numDrivers > 0 &&
                    <div className="form-group">
                        <div className="row col-headers">
                            <div className="col-md-2"><label>Add. Driver #</label></div>
                            <div className="col-md-4"><label>Add. Driver's Name</label></div>
                            <div className="col-md-3"><label>Add. Driver's DOB</label></div>
                            <div className="col-md-3"><label>Your Relationship</label></div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Driver 1:</div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="driverName1" hidden>Additional Driver #1 Name:</label>
                                <input id="driverName1" name="driverName1" type="text" placeholder="Full Name" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverName1}
                                />
                                {errors.driverName1 && <div className="form_error">Please enter additional driver's name</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverDOB1" hidden>Additonal Driver #1 Date of Birth:</label>
                                <input id="driverDOB1" name="driverDOB1" type="date" placeholder="DOB: MM/DD/YYYY" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverDOB1}
                                />
                                {errors.driverDOB1 && <div className="form_error">Please enter valid DOB (mm/dd/yyyy)</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverRel1" hidden>Relation to Additional Driver #1:</label>
                                <select id="driverRel1" name="driverRel1" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.driverRel1}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='spouse'>Spouse</option>
                                    <option value='child'>Child</option>
                                    <option value='sibling'>Sibling</option>
                                    <option value='parent'>Parent</option>
                                    <option value='other'>Other</option>
                                </select>
                                {errors.driverRel1 && <div className="form_error">Please select your relationship</div>}
                            </div>
                        </div>
                    </div>
                }

                {numDrivers > 1 &&
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Driver 2:</div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="driverName2" hidden>Additional Driver #2 Name:</label>
                                <input id="driverName2" name="driverName2" type="text" placeholder="Full Name" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverName2}
                                />
                                {errors.driverName2 && <div className="form_error">Please enter additional driver's name</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverDOB2" hidden>Additonal Driver #2 Date of Birth:</label>
                                <input id="driverDOB2" name="driverDOB2" type="date" placeholder="DOB: MM/DD/YYYY" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverDOB2}
                                />
                                {errors.driverDOB2 && <div className="form_error">Please enter valid DOB (mm/dd/yyyy)</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverRel2" hidden>Relation to Additional Driver #2:</label>
                                <select id="driverRel2" name="driverRel2" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.driverRel2}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='spouse'>Spouse</option>
                                    <option value='child'>Child</option>
                                    <option value='sibling'>Sibling</option>
                                    <option value='parent'>Parent</option>
                                    <option value='other'>Other</option>
                                </select>
                                {errors.driverRel2 && <div className="form_error">Please select your relationship</div>}
                            </div>
                        </div>
                    </div>
                }

                {numDrivers > 2 &&
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Driver 3:</div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="driverName3" hidden>Additional Driver #3 Name:</label>
                                <input id="driverName3" name="driverName3" type="text" placeholder="Full Name" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverName3}
                                />
                                {errors.driverName3 && <div className="form_error">Please enter additional driver's name</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverDOB3" hidden>Additonal Driver #3 Date of Birth:</label>
                                <input id="driverDOB3" name="driverDOB3" type="date" placeholder="DOB: MM/DD/YYYY" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverDOB3}
                                />
                                {errors.driverDOB3 && <div className="form_error">Please enter valid DOB (mm/dd/yyyy)</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverRel3" hidden>Relation to Additional Driver #3:</label>
                                <select id="driverRel3" name="driverRel3" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.driverRel3}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='spouse'>Spouse</option>
                                    <option value='child'>Child</option>
                                    <option value='sibling'>Sibling</option>
                                    <option value='parent'>Parent</option>
                                    <option value='other'>Other</option>
                                </select>
                                {errors.driverRel3 && <div className="form_error">Please select your relationship</div>}
                            </div>
                        </div>
                    </div>
                }

                {numDrivers > 3 &&
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Driver 4:</div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="driverName4" hidden>Additional Driver #4 Name:</label>
                                <input id="driverName4" name="driverName4" type="text" placeholder="Full Name" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverName4}
                                />
                                {errors.driverName4 && <div className="form_error">Please enter additional driver's name</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverDOB4" hidden>Additonal Driver #4 Date of Birth:</label>
                                <input id="driverDOB4" name="driverDOB4" type="date" placeholder="DOB: MM/DD/YYYY" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverDOB4}
                                />
                                {errors.driverDOB4 && <div className="form_error">Please enter valid DOB (mm/dd/yyyy)</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverRel4" hidden>Relation to Additional Driver #4:</label>
                                <select id="driverRel4" name="driverRel4" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.driverRel4}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='spouse'>Spouse</option>
                                    <option value='child'>Child</option>
                                    <option value='sibling'>Sibling</option>
                                    <option value='parent'>Parent</option>
                                    <option value='other'>Other</option>
                                </select>
                                {errors.driverRel4 && <div className="form_error">Please select your relationship</div>}
                            </div>
                        </div>
                    </div>
                }

                {numDrivers > 4 &&
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="vNum">Driver 5:</div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="driverName5" hidden>Additional Driver #5 Name:</label>
                                <input id="driverName5" name="driverName5" type="text" placeholder="Full Name" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverName5}
                                />
                                {errors.driverName5 && <div className="form_error">Please enter additional driver's name</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverDOB5" hidden>Additonal Driver #5 Date of Birth:</label>
                                <input id="driverDOB5" name="driverDOB5" type="date" placeholder="DOB: MM/DD/YYYY" className="form-control input-md"
                                    ref={register({ required: true })}
                                    defaultValue={state.data.driverDOB5}
                                />
                                {errors.driverDOB5 && <div className="form_error">Please enter valid DOB (mm/dd/yyyy)</div>}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="driverRel5" hidden>Relation to Additional Driver #5:</label>
                                <select id="driverRel5" name="driverRel5" className="custom-select"
                                    ref={register({ required: true, minLength: 1 })}
                                    defaultValue={state.data.driverRel5}
                                >
                                    <option value="" selected>Please Select</option>
                                    <option value='spouse'>Spouse</option>
                                    <option value='child'>Child</option>
                                    <option value='sibling'>Sibling</option>
                                    <option value='parent'>Parent</option>
                                    <option value='other'>Other</option>
                                </select>
                                {errors.driverRel5 && <div className="form_error">Please select your relationship</div>}
                            </div>
                        </div>
                    </div>
                }
                <div className="form-group">
                    <div className="row">
                        <div className="col text-center">
                            <button id="submit" name="submit" className="btn btn-primary" type="submit" disabled={submitBut} >{submitBut ? 'Sending...' : 'Get a Quote'}</button>
                            <div className="submit-message" hidden={!submitBut} >We're submitting your data...</div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default withRouter(Step1);