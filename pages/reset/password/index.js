import  {useState} from 'react';
import styles from "../../../styles/website/Login.module.css";
import axios from "axios";


const Password = () => {

    const [email, setEmail] = useState({})
    const [success, setSuccess] = useState('')
    const handleClick = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post(process.env.DOMAIN+`/api/reset`, {email, request: 'password'})
            setSuccess(res.data)
        }catch(err){
            console.log(err)
        }

    }
    return (
       <div className={styles.resetContainer}>
           {success.length > 0 && <h1 className={styles.title}>Please Check Your Email to Reset Password</h1>}
           {success.length === 0 && <div className={styles.wrapper}>

               <h1 className={styles.resetTitle}>Please Enter Your Email Address:</h1>
               <form className={styles.form}>


                   <input className={styles.input} placeholder="email" type="text" name='email'
                          onChange={(e) => setEmail(e.target.value)}/>
                   <button className={styles.button} onClick={handleClick}>SUBMIT</button>
                   <div className={styles.options}>


                   </div>
               </form>
           </div>}
       </div>
    );
};

export default Password;
Password.layout = "L3";
