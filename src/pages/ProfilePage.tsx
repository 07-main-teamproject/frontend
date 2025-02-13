import { useEffect } from "react";
import { useAtom } from "jotai";
import { profileAtom, isEditingAtom, loadingAtom, errorAtom } from "../store/profileAtom";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useAtom(profileAtom);
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/user/profile"); // 백엔드 API 요청
        setProfile((prev) => ({
          ...prev,
          ...res.data, // 백엔드에서 받은 데이터 반영
        }));
      } catch (err) {
        console.error("프로필 불러오기 실패:", err);
        setError("프로필을 불러오는 중 오류가 발생했습니다.");
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
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;

    const file = event.target.files[0];

    try {
      const base64 = await convertFileToBase64(file);
      setProfile((prev) => ({ ...prev, profileImage: base64 }));
      localStorage.setItem("profileImage", base64); // `localStorage`에 저장
    } catch (error) {
      console.error("이미지 변환 오류:", error);
    }
  };

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfile((prev) => ({ ...prev, profileImage: savedImage }));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const newValue = event.target.type === "number" ? Math.max(0, Number(value)) : value;
    setProfile((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put("/api/user/profile", {
        ...profile,
        profileImage: undefined, // 로컬 저장
      });

      alert("프로필이 저장되었습니다!");
      setIsEditing(false); // 수정 모드 비활성화
    } catch (error) {
      console.error("프로필 저장 실패:", error);
      setError("프로필 저장 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">프로필 설정 🏡</h2>

        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center bg-gray-50 p-4 rounded-lg shadow-sm gap-30">
          <label className="cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={!isEditing} />
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
            { label: "목표 몸무게 (kg)", name: "target_weight", type: "number" },
            { label: "알레르기", name: "allergies", type: "text", placeholder: "예: 견과류, 유제품..." },
            { label: "음식 선호도", name: "foodPreferences", type: "text", placeholder: "예: 한식, 양식, 중식..." },
          ].map((field, index) => (
            <div key={index} className="flex items-center space-x-4">
              <label className="w-32 text-gray-700 font-medium">{field.label}</label>
              {field.type === "select" ? (
                <select name={field.name} value={(profile as any)[field.name]} onChange={handleChange} className="flex-1 p-3 border rounded-lg focus:outline-none border-gray-300" disabled={!isEditing}>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input type={field.type} name={field.name} value={(profile as any)[field.name]} onChange={handleChange} min="0" placeholder={field.placeholder} className="flex-1 p-3 border rounded-lg focus:outline-none border-gray-300" disabled={!isEditing} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex space-x-4">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="w-full bg-[#64B17C] text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-[#569b6e] shadow-md">수정하기</button>
          ) : (
            <button onClick={handleSaveProfile} className="w-full bg-[#64B17C] text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-[#569b6e] shadow-md">저장하기</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
