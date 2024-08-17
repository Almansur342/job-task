const About = () => {
  return (
    <div className="container px-8 my-10">
      <h1 className="text-3xl font-bold underline mb-2">About Us</h1>
       <p className="text-lg text-gray-600 font-medium mb-5">Welcome to Filter Flex, your ultimate destination for a seamless shopping experience! At Filter Flex, we believe that finding the perfect product should be as effortless as possible. Our platform is designed to give you complete control over your shopping journey with powerful filtering and sorting options.</p>
       <h1 className="text-2xl font-semibold">Our Mission</h1>
       <p className="text-lg text-gray-600 font-medium mb-5 ">Our mission is to enhance your shopping experience by providing a user-friendly interface that allows you to filter products by brand, category, and price range. Whether you’re looking for the latest tech gadgets, trendy fashion items, or everyday essentials, Filter Flex ensures that you can easily find exactly what you need.</p>
       <div>
         <h2 className="text-2xl font-semibold">What We Offer</h2>
         <ul className="list-disc ml-10 space-y-2">
          <li>Comprehensive Filters: Narrow down your search with our advanced filtering options. Choose products by brand, category, or price range to find the perfect match.</li>
          <li>Smart Search: Quickly locate products by name using our intuitive search feature.</li>
          <li>Sorting Options: Sort products by price, newest arrivals, or other criteria to see what’s trending or find the best deals.</li>
         </ul>
       </div>
    </div>
  );
};

export default About;