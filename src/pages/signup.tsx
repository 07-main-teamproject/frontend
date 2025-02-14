import { useForm } from 'react-hook-form';
import { validationRules } from '../components/VaildationRules';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  nickname: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const passwordValue = watch('password');

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        회원가입
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">이메일</label>
          <input
            type="email"
            {...register('email', validationRules.email)}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">비밀번호</label>
          <input
            type="password"
            {...register('password', validationRules.password)}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            비밀번호 확인
          </label>
          <input
            type="password"
            {...register(
              'confirmPassword',
              validationRules.confirmPassword(passwordValue),
            )}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">이름</label>
          <input
            type="text"
            {...register('username', validationRules.name)}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.username
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">닉네임</label>
          <input
            type="text"
            {...register('nickname', validationRules.nickname)}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.nickname
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          {errors.nickname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nickname.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
