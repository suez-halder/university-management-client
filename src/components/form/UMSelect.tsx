import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
    label: string;
    name: string;
};

const UMSelect = ({ label, name }: TSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field }) => (
                <Form.Item label={label}>
                    <Select
                        style={{ width: "100%" }}
                        {...field}
                        options={[
                            { value: "jack", label: "Jack" },
                            { value: "lucy", label: "Lucy" },
                            { value: "Yiminghe", label: "yiminghe" },
                        ]}
                    />
                </Form.Item>
            )}
        />
    );
};

export default UMSelect;
