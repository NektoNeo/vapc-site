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
    if (isSubmitting) return; // Предотвращаем повторную отправку
    
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
      toast.error("Укажите Ваш Email");
      return setFormErrors({
        ...formError,
        email: true,
      });
    }
    if (!form.phone.length) {
      toast.error("Укажите ваш номер телефона");
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
      console.log('Execute recaptcha not yet available');
      return;
    }
    
    const token = await executeRecaptcha('click');

    if (!token) {
      console.error("reCAPTCHA токен не получен.");
      // Можно вывести сообщение об ошибке пользователю
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
      })
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Получаем текст ответа
        throw new Error(`Ошибка отправки: ${errorMessage}`);
      }
  
      toast.success("Сообщение успешно отправлено!");
    } catch (error) {
      toast.error(`${error.message}`)
      console.error("Ошибка отправки формы:", error);
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
              : "Заполните поле корректно"
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
          {isSubmitting ? "Отправка..." : "Оставить заявку"}
        </Button>
      </div>
    </div>
  );
};

export default Form;
