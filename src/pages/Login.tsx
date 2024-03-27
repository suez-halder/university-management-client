import { Button } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            userId: "A-0001",
            password: "admin123",
        },
    });

    const [login] = useLoginMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Logging in..");

        try {
            const userInfo = {
                id: data.userId,
                password: data.password,
            };

            const res = await login(userInfo).unwrap();

            const user = verifyToken(res.data.accessToken) as TUser;
            // console.log(user);

            dispatch(
                setUser({
                    user: user,
                    token: res.data.accessToken,
                })
            );

            toast.success("Logged In Successfully!", {
                id: toastId,
                duration: 2000,
            });

            navigate(`/${user.role}/dashboard`);
        } catch (error) {
            toast.error("Something went wrong!", {
                id: toastId,
                duration: 2000,
            });
        }
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
