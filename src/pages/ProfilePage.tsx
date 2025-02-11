import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    image: "",
    nickname: "사용자",
    gender: "",
    age: 0,
    height: 0,
    weight: 0,
    allergies: "",
    foodPreferences: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">프로필 설정</h2>

      <div className="bg-gray-100 p-5 rounded-lg flex items-center space-x-4 shadow-md">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <img
            src={profile.image || "https://via.placeholder.com/150"}
            alt="프로필"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 hover:opacity-80 active:scale-95 transition-all"
          />
        </label>
        {isEditing && (
          <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} className="hidden" />
        )}
        <div className="flex-1 text-xl font-semibold text-gray-700">{profile.nickname}</div>
      </div>

      <div className="bg-gray-50 p-5 rounded-lg shadow-md mt-5">
        {[
          { label: "성별", name: "gender", type: "select", options: ["남성", "여성"] },
          { label: "나이", name: "age", type: "number" },
          { label: "키 (cm)", name: "height", type: "number" },
          { label: "몸무게 (kg)", name: "weight", type: "number" },
          { label: "알레르기", name: "allergies", type: "text" },
          { label: "음식 선호도", name: "foodPreferences", type: "text" },
        ].map((field) => (
          <div key={field.name} className="flex items-center gap-4 mb-4">
            <label className="w-1/3 text-gray-700 font-medium">{field.label}:</label>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={profile[field.name as keyof typeof profile]}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-2/3 border border-gray-300 p-2 rounded-lg focus:ring-[#64B17C] focus:border-[#64B17C] disabled:bg-gray-200"
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
                value={profile[field.name as keyof typeof profile]}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-2/3 border border-gray-300 p-2 rounded-lg focus:ring-[#64B17C] focus:border-[#64B17C] disabled:bg-gray-200"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-6 w-full bg-[#64B17C] text-white py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all"
      >
        {isEditing ? "저장" : "수정"}
      </button>
    </div>
  );
};

export default ProfilePage;
