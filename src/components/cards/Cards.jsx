import { formatDistanceToNow } from "date-fns";
import { FaStar } from "react-icons/fa";

const Cards = ({product}) => {
  const {productName,productImage,description,price,ratings,category,creationDate} = product || {}

  const parsedDate = new Date(creationDate);
  let timeAgo = 'Invalid date';
  try {
    timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
  }

  return (
    <div data-aos="fade-up" data-aos-duration = '1000' className="card bg-[#f7f4ef] p-6 shadow-xl">
    <figure><img className="h-56 w-full rounded-lg object-cover" src={productImage} alt="Shoes" /></figure>
    <div className="mt-2">
      <h2 className="text-xl  text-[#34373f] font-semibold my-2">{productName}</h2>
      <p>{description}</p>
      <p className="text-lg font-medium"># {category}</p>
      <hr className='my-4' />
      <div className='flex justify-between mb-4'>
        <div className="flex gap-1 items-center">
          $ {price}
        </div>
        <div className="flex items-center gap-2">
         <FaStar></FaStar>
          {ratings}
        </div>
      </div>
      <p className="mb-4 font-semibold">Creation time: {timeAgo}</p>
    </div>
  </div>
  );
};

export default Cards;