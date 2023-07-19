

const Input = ({ name, type, handleChange, placeholder, errors, values, className, ...props }) => {

    return (
        <>
            <input
                name={name}
                type={type}
                onChange={handleChange}
                value={values[name] || ''}
                className={`${className} ${errors[name] ? `${className} form__input-error` : className}`}
                placeholder={placeholder}
                required
                autoComplete="off"
                ref={props.inputRef}
                minLength="2"
                maxLength="200"
            />
            <span
                className={errors[name] ? 'form__input-error form__input-error_active' : 'form__input-error'}
            >{errors[name]}
            </span>
        </>
    )
}

export default Input;






