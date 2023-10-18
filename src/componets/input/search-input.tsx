import "./finder-input.css";

type Props = {
  clas: string;
  text?: string;
  placeholder?: string;
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  register?: any;
  errors?: any;
};
export const CustomInput = ({
  clas,
  text,
  placeholder,
  label,
  type,
  name,
  value,
  onChange,
  register,
  errors,
}: Props) => {
  if (!register) {
    return (
      <div className="wrapper__finder-input">
        <div className="icon-input-position">
          <span className="material-symbols-outlined">{text}</span>
          <label className="label">
            {label}
            <input
              className={clas}
              type={type}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
              autoComplete="off"
            />
          </label>
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper__finder-input">
      <div className="icon-input-position">
        <span className="material-symbols-outlined">{text}</span>
        <label className="label">
          {label}
          <input
            className={clas}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            {...register(name, { required: "Поле обязательно к заполнению" })}
          />
        </label>
        {errors?.name && <p className="red-error">{errors.name.message}</p>}
      </div>
    </div>
  );
};
