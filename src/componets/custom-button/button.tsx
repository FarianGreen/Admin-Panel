import "./button.css";

type Props = {
  children?: React.ReactNode;
  className: string;
  onClick?: () => void;
  active?: boolean;
  icon?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
};

export const CustomButton = ({
  children,
  className,
  onClick,
  icon,
  htmlType,
}: Props) => {
  return (
    <button className={className} onClick={onClick} type={htmlType}>
      {children} {icon}
    </button>
  );
};
