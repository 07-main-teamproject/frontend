export const validationRules = {
    email: {
      required: '이메일은 필수입니다',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다',
      },
    },
    password: {
      required: '비밀번호는 필수입니다',
      minLength: {
        value: 8,
        message: '비밀번호는 최소 8자 이상이어야 합니다',
      },
      pattern: {
        value: /^(?=.[a-zA-Z])(?=.[0-9])(?=.[!@#$%^&])/,
        message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다',
      },
    },
    confirmPassword: (password: string) => ({
      required: '비밀번호를 다시 입력하세요',
      validate: (value: string) =>
        value === password || '비밀번호가 일치하지 않습니다',
    }),
    name: {
      required: '이름은 필수입니다',
      minLength: {
        value: 2,
        message: '이름은 최소 2자 이상이어야 합니다',
      },
      maxLength: {
        value: 10,
        message: '이름은 10자를 초과할 수 없습니다',
      },
      pattern: {
        value: /^[가-힣a-zA-Z]+$/,
        message: '이름은 한글 또는 영문만 가능합니다',
      },
    },
    nickname: {
      required: '닉네임은 필수입니다',
      minLength: {
        value: 2,
        message: '닉네임은 최소 2자 이상이어야 합니다',
      },
      maxLength: {
        value: 15,
        message: '닉네임은 15자를 초과할 수 없습니다',
      },
      pattern: {
        value: /^[가-힣a-zA-Z0-9]+$/,
        message: '닉네임은 한글, 영문, 숫자만 가능합니다',
      },
    },
  };