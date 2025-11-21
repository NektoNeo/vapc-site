import Typography from "../Typography/Typography";
import styles from "./Form.module.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";
import Button from "../Button";
import classNames from "classnames";
import { toast } from "react-toastify";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { apiUrl } from "../../config/api";

const Form = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formError, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    product: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sendMail = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const localStoragePc = localStorage.getItem("PC");
    if (!form.name.length) {
      toast.error("Укажите имя");
      return setFormErrors({
        ...formError,
        name: true,
      });
    }
    if (!form.email.length) {
      toast.error("Укажите Email");
      return setFormErrors({
        ...formError,
        email: true,
      });
    }
    if (!form.phone.length) {
      toast.error("Оставьте телефон для связи");
      return setFormErrors({
        ...formError,
        phone: true,
      });
    }
    setFormErrors({
      name: "",
      phone: "",
      email: "",
    });

    if (!executeRecaptcha) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Execute recaptcha not yet available');
      }
      setIsSubmitting(false);
      toast.error("Пожалуйста, подождите, система защиты загружается...");
      return;
    }
    
    const token = await executeRecaptcha('click');

    if (!token) {
      if (process.env.NODE_ENV === 'development') {
        console.error("reCAPTCHA токен не получен.");
      }
      setIsSubmitting(false);
      toast.error("Ошибка проверки безопасности. Попробуйте еще раз.");
      return;
    }

    try {
      const response = await fetch(apiUrl("/sendMail/"), {
        method: "POST",
        body: JSON.stringify({...form, product: localStoragePc, recaptchaToken: token }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setForm({
        name: '',
        email: '',
        phone: '',
        product: '',
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Ошибка отправки формы: ${errorMessage}`);
      }
  
      toast.success("Отправили заявку! Свяжемся в ближайшее время.");
    } catch (error) {
      toast.error(error.message || "Ошибка отправки формы. Попробуйте еще раз.");
      if (process.env.NODE_ENV === 'development') {
        console.error("Ошибка отправки формы:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.form}>
      <Typography
        className={styles.formTypography}
        type="h3"
        text="Оставьте заявку, чтобы получить консультацию"
      />
      <div className={styles.formBlock}>
        <input
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
          className={classNames(styles.formInput, {
            [styles.formInputError]: formError.name,
          })}
          placeholder="Имя"
          value={form.name}
        />
        <PhoneInput
          className={classNames(styles.formInput, {
            [styles.formInputError]: formError.phone,
          })}
          placeholder="Телефон"
          defaultCountry="RU"
          value={form.phone}
          onChange={(val) => {
            setForm({ ...form, phone: val });
          }}
          error={
            form.phone
              ? isValidPhoneNumber(form.phone)
                ? undefined
                : "Invalid phone number"
              : "Введите номер телефона"
          }
        />
        <input
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          className={classNames(styles.formInput, {
            [styles.formInputError]: formError.email,
          })}
          type="email"
          placeholder="E-mail"
          value={form.email}
        />
      </div>
      <div className={styles.formButtonWrapper}>
        <Button 
          type="pink" 
          className={styles.formButton} 
          onClick={sendMail}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправляем..." : "Получить консультацию"}
        </Button>
      </div>
    </div>
  );
};

export default Form;
