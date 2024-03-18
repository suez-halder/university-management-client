import { Button } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
    const { register, handleSubmit } = useForm();

    const [login, { data, error }] = useLoginMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const userInfo = {
            id: data.userId,
            password: data.password,
        };

        const res = await login(userInfo);
        console.log(res);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="id">ID: </label>
                <input type="text" id="id" {...register("userId")} />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" {...register("password")} />
            </div>
            <Button htmlType="submit">Login</Button>
        </form>
    );
};

export default Login;
