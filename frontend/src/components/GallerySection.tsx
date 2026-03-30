import React from 'react';
import { motion } from 'framer-motion';

const galleryImages = [
  '/src/assets/gallery/fashion-ecose2.jpg',
  '/src/assets/gallery/itorero-ecose.jpeg',
  '/src/assets/gallery/karate-students-ecose3.jpeg',
  '/src/assets/gallery/yoga-students-ecose.jpeg',
  '/src/assets/gallery/traditionel-ecose.jpeg',
  '/src/assets/gallery/students-ecosee.jpeg',
];

const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-white text-black">
      <div className="container mx-auto px-6 text-black">
        <div className="text-center max-w-3xl mx-auto mb-20 text-black">
          <span className="text-school-gold font-bold tracking-widest uppercase text-sm mb-4 block underline decoration-school-gold decoration-2 underline-offset-8">Campus Life</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">Our Gallery</h2>
          <p className="text-gray-500 text-lg">Glimpses of our vibrant campus, diverse activities, and traditional heritage.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg"
            >
              <img 
                src={src} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-bold tracking-[0.3em] uppercase border border-white/50 px-6 py-2">View Full Size</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
