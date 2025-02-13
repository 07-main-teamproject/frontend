import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  profileAtom,
  isEditingAtom,
  loadingAtom,
  errorAtom,
} from '../store/profileAtom';
import axios from 'axios';

const defaultProfileImage = '';

const VALID_ALLERGIES = ['유제품', '글루텐', '견과류'];
const VALID_PREFERENCES = ['채식', '비건', '저염식', '고단백'];

const ProfilePage = () => {
  const [profile, setProfile] = useAtom(profileAtom);
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/user/profile');
        const backendProfile = res.data;

        setProfile((prev) => ({
          ...prev,
          ...backendProfile,
          profileImage: backendProfile.profileImage || defaultProfileImage,
        }));
      } catch (err) {
        console.error('프로필 불러오기 실패:', err);
        setError('프로필을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string); // 변환 성공 시 Base64 반환
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!isEditing) return;
    if (!event.target.files?.[0]) return;

    const file = event.target.files[0];

    try {
      const base64 = await convertFileToBase64(file);
      setProfile((prev) => ({ ...prev, profileImage: base64 }));
      localStorage.setItem('profileImage', base64); // `localStorage`에 저장
    } catch (error) {
      console.error('이미지 변환 오류:', error);
    }
  };

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfile((prev) => ({ ...prev, profileImage: savedImage }));
    }
  }, []); // 새로고침 시 유지

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const isNumberField = ['age', 'height', 'weight', 'target_weight'].includes(
      name,
    );
    const newValue = isNumberField ? Math.max(0, Number(value)) : value;

    setProfile((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: 'allergies' | 'foodPreferences',
  ) => {
    const { value, checked } = event.target;

    setProfile((prev) => {
      const updatedValues: string[] = checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value);

      return { ...prev, [category]: updatedValues };
    });
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put('/api/user/profile', {
        ...profile,
        profileImage: undefined, // 로컬 저장
      });

      alert('프로필이 저장되었습니다!');
      setIsEditing(false); // 수정 모드 비활성화
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      setError('프로필 저장 중 오류가 발생했습니다.');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        로딩 중...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          프로필 설정 🏡
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:justify-center bg-gray-50 p-4 rounded-lg shadow-sm gap-10">
          <label
            className={`cursor-pointer ${
              isEditing ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={!isEditing}
            />
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#64B17C] flex items-center justify-center overflow-hidden">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">📷 이미지</span>
              )}
            </div>
          </label>
          <p className="text-xl font-semibold text-gray-800">
            {profile.nickname || '사용자'}
          </p>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
          {[
            {
              label: '성별',
              name: 'gender',
              type: 'select',
              options: ['남성', '여성'],
            },
            { label: '나이', name: 'age', type: 'number' },
            { label: '키 (cm)', name: 'height', type: 'number' },
            { label: '몸무게 (kg)', name: 'weight', type: 'number' },
            {
              label: '목표 몸무게 (kg)',
              name: 'target_weight',
              type: 'number',
            },
          ].map((field, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4"
            >
              <label className="w-full sm:w-32 text-gray-700 font-medium text-center sm:text-left">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={(profile as any)[field.name]}
                  onChange={handleChange}
                  className="w-full sm:flex-1 p-3 border rounded-lg focus:outline-none border-gray-300"
                  disabled={!isEditing}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={(profile as any)[field.name]}
                  onChange={handleChange}
                  min="0"
                  className="w-full sm:flex-1 p-3 border rounded-lg focus:outline-none border-gray-300"
                  disabled={!isEditing}
                />
              )}
            </div>
          ))}

          <div className="mt-4">
            <label className="text-gray-700 font-medium">알레르기</label>
            <div className="flex flex-wrap mt-2">
              {VALID_ALLERGIES.map((allergy) => (
                <label
                  key={allergy}
                  className="flex items-center space-x-2 mr-4"
                >
                  <input
                    type="checkbox"
                    value={allergy}
                    checked={profile.allergies.includes(allergy)} // 🔥 배열 기반으로 변경
                    onChange={(e) => handleCheckboxChange(e, 'allergies')}
                    disabled={!isEditing}
                    className="w-4 h-4 text-[#64B17C] border-gray-300 focus:ring focus:ring-green-200"
                  />
                  <span className="text-gray-600">{allergy}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-700 font-medium">음식 선호도</label>
            <div className="flex flex-wrap mt-2">
              {VALID_PREFERENCES.map((preference) => (
                <label
                  key={preference}
                  className="flex items-center space-x-2 mr-4"
                >
                  <input
                    type="checkbox"
                    value={preference}
                    checked={profile.foodPreferences.includes(preference)} // 🔥 배열로 관리
                    onChange={(e) => handleCheckboxChange(e, 'foodPreferences')}
                    disabled={!isEditing}
                    className="w-4 h-4 text-[#64B17C] border-gray-300 focus:ring focus:ring-green-200"
                  />
                  <span className="text-gray-600">{preference}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full lg:w-full bg-[#64B17C] text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-[#569b6e] shadow-md"
            >
              수정하기
            </button>
          ) : (
            <button
              onClick={handleSaveProfile}
              className="w-full lg:w-full bg-[#64B17C] text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-[#569b6e] shadow-md"
            >
              저장하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
