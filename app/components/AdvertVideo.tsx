const AdvertVideo = () => {
     return (
          <div>
               <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full md:h-90 rounded-lg object-cover border-2 border-green-300"
               >
                    <source src="/videos/advert.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
          </div>
     );
};

export default AdvertVideo;
