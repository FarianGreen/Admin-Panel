import { Button, Form } from "antd";

type Props = {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
  style?:object
};

export const FormButton = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  onClick,
  style,
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        style={style}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
