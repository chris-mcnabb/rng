import {useState} from 'react';
import {useRouter} from "next/router";
import styles from "../../../styles/website/Login.module.css";
import useToggle from "../../../components/hooks/useToggle";
import axios from "axios";


const ResetPassword = () => {
    const [inputs, setInputs] = useState('')
    const [error, setError] = useToggle()
    const [reset, setReset] = useState('')
    const router = useRouter()
    const {id} = router.query
    const handleClick = async(e) => {
        e.preventDefault()

       console.log(inputs)
            try{
                const res = await axios.put(process.env.VERCEL_URL+`/api/users/${id}`,
                    {username: inputs}
                )
                setReset(res.data)
            }catch(err){
               setError()
            }

    }
    console.log(id)
    return (
        <div className={styles.resetContainer}>
            {reset.length >=1 && <h1 className={styles.title}>Username Successfully Reset!! You Can Now Login!!</h1>}
            {reset.length === 0 && <div className={styles.wrapper}>

                <h1 className={styles.resetTitle}>Please Enter Your New Username:</h1>
                <form className={styles.form}>


                    <input className={styles.input} placeholder="new username" type="text" name='username'
                           onChange={(e) => setInputs(e.target.value
                           )}/>

                    {error && <span className={styles.error}>Username already in Use. Please choose another.</span>}
                    <button className={styles.button} onClick={handleClick}>SUBMIT</button>
                    <div className={styles.options}>


                    </div>
                </form>
            </div>}
        </div>
    );
};

export default ResetPassword;
ResetPassword.layout = "L3";
