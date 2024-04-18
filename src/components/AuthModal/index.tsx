import styles from './AuthModal.module.scss'
import {useMemo, useState} from "react";
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';
import {useRouter} from "next/navigation";
import Button from "@/components/ui/Button";
import {Gruppo} from "next/font/google";
import {useRegister} from "@/react-query/auth/useRegister";
import FormikInput from "@/components/ui/FormikInput";
import {useLogIn} from "@/react-query/auth/useLogin";

type AuthPageType = {
    onClose: () => void
}

const formConfig = {
    signIn: {
        name: 'SignIn',
        title: 'Войти в',
        button: 'Войти',
        nextBtn: 'Зарегистрироваться',
        text: 'Еще нет аккаунта?',
    },
    signUp: {
        name: 'SignUp',
        title: 'Создать аккаунт',
        button: 'Зарегистрироваться',
        nextBtn: 'Войти',
        text: 'Уже есть аккаунт?'
    }
};
type FormValues = {
    email: string;
    password: string;
}
const validationSchema = Yup.object({
    email: Yup.string().email('Неверный формат электронной почты').required('Электронная почта обязательна'),
    password: Yup.string().min(8, 'Пароль должен быть не менее 8 символов').required('Пароль обязателен'),
});
const logoFonts = Gruppo({subsets: ["latin"], weight: ['400', '400']});


export default function AuthModal({onClose}: AuthPageType) {
    type FormConfigKey = keyof typeof formConfig;
    const [currentPage, setCurrentPage] = useState<FormConfigKey>('signIn')

    const toggleForm = () => {
        setCurrentPage(currentPage === 'signIn' ? 'signUp' : 'signIn');
    }

    const {title, button, text, nextBtn} = useMemo(() => formConfig[currentPage], [currentPage]);


    const initialValues: FormValues = {
        email: '',
        password: ''
    }
    const router = useRouter()


    const {mutate: register} = useRegister()
    const {mutate: login} = useLogIn()


    const handleSubmit = (values: FormValues, {resetForm}: FormikHelpers<FormValues>) => {
        const action = currentPage === 'signUp' ? register : login;
        action(values, {
            onSuccess: () => {
                resetForm();
                router.refresh()
                onClose()
            },
        });
    }

    return (
        <div className={styles.auth}>
            <div className={styles.content}>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {() => (
                        <Form className={styles.form}>
                            <div className={styles.title}>{title} <span className={logoFonts.className}>XDOC</span>
                            </div>

                            <div className={styles.field}>
                                <label>Email</label>
                                <FormikInput name={'email'} placeholder={'пример@почта.ру'}/>
                            </div>
                            <div className={styles.field}>
                                <label>Password</label>
                                <FormikInput name={'password'} placeholder={'*********'} type={'password'}/>
                            </div>

                            <Button type={'submit'} className={styles.btn}
                                    variant={'green'}>{button}</Button>
                            <div className={styles.text}>{text}</div>
                            <Button onClick={toggleForm} className={styles.btn}
                                    variant={'white'} type={'button'}>{nextBtn}</Button>
                        </Form>
                    )}
                </Formik>
                <div>
                </div>
            </div>
        </div>);
};

