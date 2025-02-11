import { useEffect, useState } from "react";
import axios from "axios";

interface ProfileData {
  profileImage: string;
  nickname: string;
  gender: "남성" | "여성";
  age: number;
  height: number;
  weight: number;
  target_weight: number;
  allergies: string;
  foodPreferences: string;
}

const API_BASE_URL = "/api/user/profile/";

const ProfilePage = () => {
  const defaultProfile: ProfileData = {
    profileImage: "",
    nickname: "",
    gender: "남성",
    age: 0,
    height: 0,
    weight: 0,
    target_weight: 0,
    allergies: "",
    foodPreferences: "",
  };

  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false)

  //  프로필 조회
  useEffect(() => {
    axios
      .get<ProfileData>(API_BASE_URL)
      .then((res) => setProfile(res.data || defaultProfile))
      .catch(() => setError("프로필을 불러오는 중 오류가 발생했습니다."))
      .finally(() => setLoading(false));
  }, []);

  // 프로필 이미지 변경
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await axios.put(`${API_BASE_URL}upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile((prev) => ({ ...prev, profileImage: res.data.profileImage }));
    } catch (err) {
      setError("이미지 업로드 실패");
    }
  };

  // 입력값 변경 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true)
  }

  // 프로필 저장
  const handleSave = async () => {
    try {
      await axios.put(API_BASE_URL, profile);
      alert("프로필이 저장되었습니다!");
    } catch (err) {
      setError("프로필 저장 실패");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">프로필 설정 🏡</h2>

        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center bg-gray-50 p-4 rounded-lg shadow-sm gap-25">

          <label className="cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <div className="w-24 h-24 rounded-full border-2 border-[#64B17C] flex items-center justify-center overflow-hidden">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="프로필" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-sm">📷 이미지</span>
              )}
            </div>
          </label>

          <p className="text-xl font-semibold text-gray-800">{profile.nickname || "사용자"}</p>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
          {[
            { label: "성별", name: "gender", type: "select", options: ["남성", "여성"] },
            { label: "나이", name: "age", type: "number" },
            { label: "키 (cm)", name: "height", type: "number" },
            { label: "몸무게 (kg)", name: "weight", type: "number" },
            { label: "목표 몸무게 (kg)", name: "target_weight", type: "number"},
            { label: "알레르기", name: "allergies", type: "text", placeholder: "예: 견과류, 유제품..." },
            { label: "음식 선호도", name: "foodPreferences", type: "text", placeholder: "예: 한식, 양식, 중식..." },
          ].map((field, index) => (
            <div key={index} className="flex items-center space-x-4">
              <label className="w-32 text-gray-700 font-medium">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={(profile as any)[field.name]}
                  onChange={handleChange}
                  className="flex-1 p-3 border rounded-lg focus:outline-none border-gray-300"
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
                  placeholder={field.placeholder}
                  className="flex-1 p-3 border rounded-lg focus:outline-none border-gray-300"
                  disabled={!isEditing}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex space-x-4">
          {!isEditing ? (
            <button onClick={handleEdit} className="w-full bg-[#64B17C] text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-[#569b6e] shadow-md">
              수정하기
            </button> ) : (
            <button onClick={handleSave} className="w-full bg-[#64B17C] text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-[#569b6e] shadow-md">
              저장하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
