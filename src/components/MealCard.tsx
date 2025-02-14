import React from 'react';

interface MealCardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}
const MealCard: React.FC<MealCardProps> = ({
  image,
  title,
  description,
  buttonText,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-64">
      <>
        {/* 이미지 */}
        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* 텍스트 정보 */}
        <h3 className="text-lg font-semibold mt-3">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        {/* 버튼 */}
        <button className="mt-4 bg-[#64B17C] text-white py-2 px-4 rounded-full w-full hover:bg-green-600">
          {buttonText}
        </button>
      </>
    </div>
  );
};

export default MealCard;
