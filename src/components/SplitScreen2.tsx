import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
const SplitScreen2 = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Left Side with Curved Right Edge */}
      <div className="w-1/2 relative">
        <img
          src="https://pitreonline.com/wp-content/uploads/2019/01/6823214-large.jpg"
          alt="Left Side"
          className="w-full h-full object-cover clip-left-shape"
        />
      </div>

      {/* Right Side with Curved Left Edge */}
      <div className="w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/1054666/pexels-photo-1054666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Right Side"
          className="w-full h-full object-cover clip-right-shape"
        />
      </div>
    </div>
    // <div className="relative flex h-screen w-full overflow-hidden">
    //   {/* Left Side */}
    //   <div className="w-1/2 relative">
    //     <Image
    //       src="https://pitreonline.com/wp-content/uploads/2019/01/6823214-large.jpg"
    //       alt="Left Side"
    //       fill
    //       className="object-cover"
    //     />
    //   </div>

    //   {/* Right Side */}
    //   <div className="w-1/2 relative">
    //     <Image
    //       src="https://images.pexels.com/photos/1054666/pexels-photo-1054666.jpeg"
    //       alt="Right Side"
    //       fill
    //       className="object-cover"
    //     />
    //   </div>

    //   {/* Curved Overlay SVG */}
    //   <svg
    //     className="absolute inset-0 z-10 w-full h-full pointer-events-none"
    //     viewBox="0 0 100 100"
    //     preserveAspectRatio="none">
    //     <path
    //       d="M50,0 Q40,50 50,100"
    //       stroke="black"
    //       strokeWidth="0.5"
    //       fill="none"
    //     />
    //   </svg>
    // </div>
  );
};

export default SplitScreen2;
