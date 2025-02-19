import { Link } from 'react-router-dom';

interface MealCardProps {
  id: number;
  image?: string;
  title: string;
  description: string;
  buttonText?: string;
}

const MealCard: React.FC<MealCardProps> = ({
  id,
  image,
  title,
  description,
  buttonText = '자세히 보기',
}) => {
  const imageUrl = image
    ? `${import.meta.env.BASE_URL}assets/${image}`
    : `${import.meta.env.BASE_URL}assets/image.jpg`;

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-64">
      {/* 이미지 */}
      <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
        {image ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-500">이미지 없음</span>
        )}
      </div>

      {/* 텍스트 정보 */}
      <h3 className="text-lg font-semibold mt-3">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>

      {/* 버튼 (식단 상세 페이지로 이동) */}
      <Link to={`/CardDetail/${id}`}>
        <div className="mt-4 bg-[#64B17C] text-white py-2 px-4 rounded-full w-full hover:bg-green-600 text-center">
          {buttonText}
        </div>
      </Link>
    </div>
  );
};

export default MealCard;
