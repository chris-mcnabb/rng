
import styles from "../../styles/website/Login.module.css";

import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import {useState} from 'react';
import useToggle from "../hooks/useToggle";
import {useDispatch} from "react-redux";

import {getSession} from "next-auth/react";
import {retrieveCart} from "../../redux/apiCalls";
import {useSelector} from "react-redux";

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const Login = ({showModal, setShowModal, location}) => {

    const [error, setError] = useState('')
    const [showError, setShowError] =useToggle()
    const cart = useSelector(state=>state.cart)
    const router = useRouter()
    const dispatch = useDispatch()
    const handleForward = (option) => {
        setShowModal()
        router.push(`/${option}`)
    }
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string()
            .required('Please Enter your password')
            .min(6),

    })
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async(data)=> {

        try{
            const res = await signIn('credentials', {
                redirect: false,
                username:  data.username,
                password:   data.password,
            });

            if(res.error){
                setError(res.error)
                setShowError()
            }else if(res.ok){
                const session = await getSession()
                retrieveCart(dispatch, session, cart)
                if(location === 'home'){
                    router.push('/')
                }
                if(location === 'checkout'){
                    router.push(`/cart/${cart.cartId}`)
                }
                setShowModal()

            }
        }catch(err){
            console.log(err)
        }
    }
    return (

        <div className={styles.wrapper}>
            <div className={styles.close} onClick={(()=>setShowModal())}>
                 <span>
                  X
              </span>
            </div>
            <h1 className={styles.title}>SIGN IN</h1>
            <form className={styles.form}  onSubmit={handleSubmit(onSubmit)}>

                <input className={styles.input}  {...register("username")} placeholder="username" />
                <p>{errors.username?.message}</p>
                <input className={styles.input} placeholder="password" {...register("password")} type='password' />
                <p>{errors.passowrd?.message}</p>
                <button className={styles.button} type="submit" >LOGIN</button>
                {showError && <span className={styles.error}>{error}</span>}
                <div className={styles.options}>


                        <span onClick={()=>handleForward('reset/password')}>Forgot Password</span>

                        <span onClick={()=>handleForward('reset/username')}>Forgot Username</span>


                        <span onClick={()=>handleForward('register')}>Create A New Account</span>

                </div>
            </form>
        </div>

    );
};

export default Login;
