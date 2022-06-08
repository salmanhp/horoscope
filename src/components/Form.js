import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


export default function Form() {
    const initialState = { sign: "", username: "", date: "", email: "" };
    const [formValues, setFormValues] = useState(initialState);
    const [data, setData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const signSelectItems = [
        { label: 'Aries', value: 'aries' },
        { label: 'Taurus', value: 'taurus' },
        { label: 'Gemini', value: 'gemini' },
        { label: 'Cancer', value: 'cancer' },
        { label: 'Leo', value: 'leo' },
        { label: 'Virgo', value: 'virgo' },
        { label: 'Libra', value: 'libra' },
        { label: 'Scorpio', value: 'scorpio' },
        { label: 'Sagittarius', value: 'sagittarius' },
        { label: 'Capricorn', value: 'capricorn' },
        { label: 'Aquarius', value: 'aquarius' },
        { label: 'Pisces', value: 'pisces' }
    ];

    const dateSelectItems = [
        { label: 'Today', value: 'today' },
        { label: 'Tomorrow', value: 'tomorrow' },
        { label: 'Yesterday', value: 'yesterday' }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

    };

    const getData = async (event) => {
        event.preventDefault();
        setFormErrors(validate(formValues));

        try {
            const options = {
                method: 'POST',
                headers: {
                    'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
                    'X-RapidAPI-Key': '8534822e83msh9e2ce4e5a49d189p13c353jsnc4fa125e1b37'
                }
            };

            const response = await fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${formValues.sign}&day=${formValues.date}`, options);
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.log(error);
        }
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.sign) {
            errors.sign = "Sign is Required!";
        }
        if (!values.username) {
            errors.username = "User Name is Required!";
        }
        if (!values.date) {
            errors.date = "Date is Required!";
        }
        if (!values.email) {
            errors.email = "Email is Required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid Email Format!";
        }
        return errors;
    }

    return (
        <div className='card-details flex mt-5 mx-7'>
            <div className="card flex-1">
                <form onSubmit={getData}>
                    <span className="inp p-float-label mb-5">
                        <InputText id="in" required className='w-8' name='username' value={formValues.username} onChange={handleChange} />
                        <label htmlFor="in">Username</label>
                        <span className='text-xs text-pink-500'>{formErrors.username}</span>
                    </span>
                    <span className="p-float-label mb-5">
                        <InputText className='w-8' required name='email' id="in" value={formValues.email} onChange={handleChange} />
                        <label htmlFor="in">Email address</label>
                        <span className='text-xs text-pink-500'>{formErrors.email}</span>
                    </span>
                    <span>
                        <Dropdown value={formValues.sign} name='sign' className='w-8 mb-5' options={signSelectItems} onChange={handleChange} placeholder="Select a Sign" />
                        <span className='text-xs text-pink-500'>{formErrors.sign}</span>
                    </span>


                    <span>
                        <Dropdown value={formValues.date} name='date' className='w-8 mb-5' options={dateSelectItems} onChange={handleChange} placeholder="Select date" />
                        <span className='text-xs text-pink-500'>{formErrors.date}</span>
                    </span>


                    <Button type="submit" label="Submit" className="w-8" />
                </form>

            </div>
            <div className="view p-3 flex-1 bg-green-300">
                <h1>Your Horoscope</h1>
                <div>
                    <h3>Name: {formValues.username}</h3>
                    <h3>Date Range: {data.date_range}</h3>
                    <h3>Sign: {formValues.sign}</h3>
                    <p>{data.description}</p>
                </div>
            </div>
        </div>
    )
};

