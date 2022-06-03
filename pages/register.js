import styles from '../styles/website/Register.module.css'
import {useState, useMemo} from "react";
import axios from "axios";
const initialUser = ['customer']
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import countryList from 'react-select-country-list'
import phone from 'phone'
import postalCodes from 'zipcodes-regex'
const Register = () => {
    const options = useMemo(() => countryList().getData(), [])

    const [country, setCountry] = useState('')
    const [wrongNumber, setWrongNumber] = useState(false)
    const [message, setMessage] = useState('')
    const [userType, setUserType]= useState(initialUser)
    const [number, setNumber] = useState('')

    const [code, setCode] =useState(postalCodes.NL)

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required(),
        email: yup.string().email().required(),
        country: yup.string().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        postalCode: yup.string().required()
            .matches({code}, 'Post Code does not match country format'),
        phone: yup.string().required('Please enter your phone number'),
        password: yup.string()
            .required("Required")
            .min(8, "Must be 8 characters or more")
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number"),
        confirmPassword: yup.string()
            .required()
            .oneOf([yup.ref("password"), null], "Passwords must match"),



    })
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async(data) => {
        console.log(data)
        try{
            const res = await axios.post(process.env.DOMAIN+`/api/users`,
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                    personal: {
                      phone: data.phone,
                      email: data.email,
                      username: data.username
                    },
                    address: {
                        address: data.address,
                        city: data.city,
                        postalCode: data.postalCode,
                        country: data.country
                },
                    userType,
                });
            console.log(res.data)
            setMessage(res.data)
            if(res.statusText === 'Created'){
                // router.push('/')
            }
        }catch(err){
            console.log(err)
        }
        reset()


    };



    const handleNumber = (e) => {
        setWrongNumber(false)
        const number = (phone(e.target.value, {country: 'NL'}))
        if(number.isValid){
            setNumber(number.phoneNumber)
        }
        if(!number.isValid){
            setWrongNumber(true)
        }
    }
    return (
        <div className={styles.container}>
            {message.length > 0 && <h1 className={styles.title}> {message}</h1>}
            {message.length === 0 &&   <div className={styles.wrapper}>
                <h1 className={styles.title}> CREATE ACCOUNT</h1>


                <form className={styles.formWrapper}  onSubmit={handleSubmit(onSubmit)}>
                    <div  className={styles.form}>
                        <input className={styles.input} {...register("firstName")} placeholder="voornaam" />
                        <p>{errors.firstName?.message}</p>
                        <input className={styles.input} {...register("lastName")} placeholder="achternaam" />
                        <p>{errors.lastName?.message}</p>

                        <input className={styles.input}  {...register("username")} placeholder="username" />
                        <p>{errors.username?.message}</p>
                        <input className={styles.input} placeholder="email" {...register("email")} />
                        <p>{errors.email?.message}</p>

                        <input className={styles.input} placeholder="password" type='password'{...register("password")}/>
                        <p>{errors.password?.message}</p>
                        <input className={styles.input} placeholder="confirm password" type='password' {...register("confirmPassword")}/>
                        <p>{errors.confirmPassword?.message}</p>


                        <select className={styles.input} {...register("country")} onChange={(e) => {
                            setCountry(e.target.value)
                            setCode(postalCodes[e.target.value])
                        }}>
                            <option value="NL">NL</option>
                            <option value="DE">DE</option>
                            <option value="BE">BE</option>
                            {options.map((country, idx)=>(
                                <option key={idx} value={country.value}>{country.value}</option>
                            ))}
                        </select>
                        <p>{errors.country?.message}</p>
                        <input className={styles.input} placeholder="phone" {...register("phone")} />
                        <p>{errors.phone?.message}</p>

                        <input className={styles.input} {...register("address")} placeholder="address" type="text" />
                        <p>{errors.address?.message}</p>
                        <input className={styles.input} {...register("city")} placeholder="city" type="text" />
                        <p>{errors.city?.message}</p>

                        {country === 'US' ?
                            <>
                                <input className={styles.input} {...register("state")} placeholder="state" type="text"/>
                                <p>{errors.state?.message}</p>
                                <input className={styles.input} {...register("postalCode")} placeholder="zip code" type="password" />
                                <p>{errors.postalCode?.message}</p>
                            </>
                            :  <>
                                <input className={styles.input} {...register("postalCode")}  placeholder="postal code" type="text" />
                                <p>{errors.postalCode?.message}</p>
                            </>
                        }
                    </div>

                    <div>
                        <button className={styles.button} type='submit'>REGISTER</button>
                    </div>


                </form>
                <div>

                </div>
            </div>}
        </div>
    );
};

export default Register;
Register.layout = "L3";

