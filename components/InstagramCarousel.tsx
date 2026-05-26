"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Instagram, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const instagramPosts = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    likes: "1.2k",
    comments: "45",
    description: "Our newly completed luxury apartments at Sankalp Heights. Experience the perfect blend of modern architecture and comfortable living! 🏙️✨ #SankalpConstructions #LuxuryLiving #RealEstate",
    author: "sankalp_constructions"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    likes: "856",
    comments: "23",
    description: "Another happy family finding their dream home with us. The joy on their faces makes all the hard work worth it! 🏡❤️ #HappyCustomers #DreamHome #Sankalp",
    author: "sankalp_constructions"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    likes: "2.4k",
    comments: "128",
    description: "Sneak peek into our upcoming eco-friendly villa project. Sustainable living without compromising on luxury. 🌿🏠 #EcoFriendly #SustainableLiving #VillaProjects",
    author: "sankalp_constructions"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    likes: "1.5k",
    comments: "67",
    description: "The stunning interiors of our flagship commercial hub. Designed to inspire productivity and innovation! 🏢💼 #CommercialRealEstate #OfficeSpace #ModernDesign",
    author: "sankalp_constructions"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    likes: "943",
    comments: "34",
    description: "Amenities that elevate your lifestyle. Check out the infinity pool at our latest residential complex! 🏊‍♂️🌅 #LuxuryAmenities #InfinityPool #ResortLiving",
    author: "sankalp_constructions"
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    likes: "3.1k",
    comments: "210",
    description: "Customer testimonial: 'Choosing Sankalp was the best decision for our family's future.' Thank you for the trust! 🤝🏢 #Testimonial #CustomerReview #Trust",
    author: "sankalp_constructions"
  }
];

export default function InstagramCarousel() {
  return (
    <section id="instagram-feed" className="py-20 bg-gray-50/50 overflow-hidden flex flex-col justify-center">
      <div className="w-full pl-4 sm:pl-6 lg:pl-8 mx-auto max-w-[1600px]">
        <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#711113] mb-3"
          >
            Live Updates from Instagram
          </motion.h2>
          <img src="/assets/Title-decorations.png" alt="Decoration" className="w-[150px] md:w-[200px] h-auto object-contain mt-1 mb-4" />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl text-center">
            See what our customers have to say! Catch up with our latest project updates, testimonials, and beautiful moments captured live on Instagram.
          </p>
        </div>

        <div className="relative w-full pb-12 group/slider">
          <button className="insta-prev absolute left-2 sm:left-4 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 backdrop-blur-md text-primary rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 group-hover/slider:opacity-100 transition-all hover:scale-110 disabled:opacity-0 disabled:cursor-not-allowed">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 pr-[2px]" />
          </button>
          <button className="insta-next absolute right-2 sm:right-4 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 backdrop-blur-md text-primary rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 group-hover/slider:opacity-100 transition-all hover:scale-110 disabled:opacity-0 disabled:cursor-not-allowed">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 pl-[2px]" />
          </button>
          {/* Swiper Carousel */}
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            navigation={{ prevEl: '.insta-prev', nextEl: '.insta-next' }}
            spaceBetween={24}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000, // Move -> Stop duration -> Move
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.5, spaceBetween: 24 }, // Show 3 full, 4th partially visible
            }}
            className="w-full !pb-16"
          >
            {instagramPosts.map((post) => (
              <SwiperSlide key={post.id} className="h-auto">
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden h-full flex flex-col group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)]">
                  {/* Header */}
                  <div className="p-4 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                        <div className="w-full h-full rounded-full border-2 border-white bg-primary flex items-center justify-center text-white font-bold text-xs">
                          SC
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900 leading-none mb-1">{post.author}</div>
                        <div className="text-xs text-gray-500 leading-none">Original Audio</div>
                      </div>
                    </div>
                    <Instagram className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  {/* Image */}
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                    <img 
                      src={post.imageUrl} 
                      alt={`Instagram post ${post.id}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Actions & Content */}
                  <div className="p-4 flex-grow flex flex-col bg-white z-10 relative">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1.5 text-gray-700 hover:text-pink-600 transition-colors cursor-pointer">
                        <Heart className="w-6 h-6" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                        <MessageCircle className="w-6 h-6" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-800 line-clamp-3 leading-relaxed">
                      <span className="font-semibold mr-2">{post.author}</span>
                      {post.description}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
