const Cards = () => {
  return (
    <div data-aos="fade-up" data-aos-duration = '1000' className="card bg-[#f7f4ef] p-6 shadow-xl">
    <figure><img className="h-56 w-full rounded-lg object-cover" src={image} alt="Shoes" /></figure>
    <div className="mt-2">
      <h2 className="text-xl  text-[#34373f] font-semibold my-2">{item_name}</h2>
      <p className="text-lg font-medium"># {}</p>
      <hr className='my-4' />
      <div className='flex justify-between mb-4'>
        <div className="flex gap-1 items-center">
          {}
        </div>
        <div>
          {}
        </div>
      </div>
      <p className="mb-4">{}</p>
    </div>
  </div>
  );
};

export default Cards;