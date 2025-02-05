import { useForm } from "react-hook-form";
import { validationRules } from "../components/VaildationRules";

interface LoginFormData {
  email: string;
  password: string;
}
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // 로그인 aip 여기에 추가
  };

  return (
    <div>
      <h2>로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이메일</label>
          <input type="email" {...register("email", validationRules.email)} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type="password"
            {...register("password", validationRules.password)}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">로그인</button>
      </form>

      <p>
        아직 회원이 아니신가요?
        {/* 회원가입 링크 연결 */}
      </p>
    </div>
  );
};

export default LoginForm;
