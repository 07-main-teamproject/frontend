import { useForm } from 'react-hook-form';
import { validationRules } from '../components/ValidationRules';
import { SignupApi } from '../Api/Signup';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  nickname: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const passwordValue = watch('password');

  // 회원가입 처리
  const onSubmit = async (data: FormData) => {
    try {
      const response = await SignupApi.signup({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        name: data.username,
      });

      alert('회원가입이 완료되었습니다!');
      console.log('회원가입 성공:', response);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 relative">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border border-green-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          건강한 회원가입 🍀
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              이메일
            </label>
            <input
              type="email"
              {...register('email', validationRules.email)}
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${
                errors.email
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-[#64B17C] focus:ring-[#64B17C] hover:border-green-500'
              }`}
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
              {...register('password', validationRules.password)}
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${
                errors.password
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-[#64B17C] focus:ring-[#64B17C] hover:border-green-500'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              {...register(
                'confirmPassword',
                validationRules.confirmPassword(passwordValue),
              )}
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${
                errors.confirmPassword
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-[#64B17C] focus:ring-[#64B17C] hover:border-green-500'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">이름</label>
            <input
              type="text"
              {...register('username', validationRules.name)}
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${
                errors.username
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-[#64B17C] focus:ring-[#64B17C] hover:border-green-500'
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              닉네임
            </label>
            <input
              type="text"
              {...register('nickname', validationRules.nickname)}
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${
                errors.nickname
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-[#64B17C] focus:ring-[#64B17C] hover:border-green-500'
              }`}
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nickname.message}
              </p>
            )}
          </div>

          <p className="text-gray-600 text-sm text-center">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-[#64B17C]">
              로그인
            </Link>
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#64B17C] text-white py-3 rounded-lg text-lg font-semibold transition duration-200 hover:bg-[#569b6e] shadow-md"
          >
            {isSubmitting ? '가입 중...' : '가입하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
