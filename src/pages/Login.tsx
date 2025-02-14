import { useForm } from 'react-hook-form';
import { validationRules } from '../components/ValidationRules';
import { Link } from 'react-router-dom';

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
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#A7E2B4] to-[#64B17C]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          로그인
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              이메일
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-[#64B17C] 
                         focus:border-[#64B17C] focus:shadow-md transition-shadow duration-200"
              {...register('email', validationRules.email)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              비밀번호
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-[#64B17C] 
                         focus:border-[#64B17C] focus:shadow-md transition-shadow duration-200"
              {...register('password', validationRules.password)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#64B17C] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-300"
          >
            로그인
          </button>
        </form>

        <div className="flex space-x-10 justify-center mt-4">
          <button className="w-14 h-14 flex items-center justify-center rounded-full shadow-md hover:shadow-lg active:scale-95 transition">
            <img
              src="/images/google-icon.png"
              alt="Kakao Login"
              className="w-14 h-14"
            />
          </button>

          <button className="w-14 h-14 flex items-center justify-center rounded-full shadow-md hover:shadow-lg active:scale-95 transition">
            <img
              src="/images/naver-icon.png"
              alt="Naver Login"
              className="w-14 h-14"
            />
          </button>

          <button className="w-14 h-14 flex items-center justify-center rounded-full shadow-md hover:shadow-lg active:scale-95 transition">
            <img
              src="/images/kakao-icon.png"
              alt="Kakao Login"
              className="w-14 h-14"
            />
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          아직 회원이 아니신가요?{' '}
          <Link
            to="/signup"
            className="text-[#64B17C] font-medium hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
