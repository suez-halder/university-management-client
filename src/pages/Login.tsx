import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UMForm from "../components/form/UMForm";
import UMInput from "../components/form/UMInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const { register, handleSubmit } = useForm({
    //     defaultValues: {
    //         userId: "A-0001",
    //         password: "admin123",
    //     },
    // });

    const defaultValues = {
        userId: "A-0001",
        password: "admin123",
    };

    const [login] = useLoginMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
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
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <UMForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <UMInput type="text" name="userId" label="ID: " />

                <UMInput type="text" name="password" label="Password: " />

                <Button htmlType="submit">Login</Button>
            </UMForm>
        </Row>
    );
};

export default Login;
