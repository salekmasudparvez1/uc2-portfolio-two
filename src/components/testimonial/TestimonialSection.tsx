import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleHeart,
  Star,
  Quote,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./testimonial.css";

import { EditableText } from "../text/EditableText";
import type { ITestimonial } from "../../data/portfolioData";

const navBtnClass =
  "flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full border border-[#a855f7]/30 bg-white text-[#a855f7] hover:bg-[#a855f7] hover:text-white transition";

const T = ({
  path,
  value,
  multiline = false,
  updateField,
}: {
  path: string;
  value?: string;
  multiline?: boolean;
  updateField?: (path: string, value: string) => void;
}) =>
  updateField ? (
    <EditableText
      value={value}
      onUpdate={(v) => updateField(path, v)}
      multiline={multiline}
    />
  ) : (
    <>{value}</>
  );

const TestimonialSection = ({
  testimonials,
  updateField,
}: {
  testimonials: ITestimonial[];
  updateField?: (path: string, value: string) => void;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center items-center gap-2 mb-3">
            <MessageCircleHeart className="text-[#a855f7]" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <T
                path="testimonialSection.title"
                value="Client Testimonials"
                updateField={updateField}
              />
            </h2>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto">
            <T
              path="testimonialSection.subtitle"
              value="Real feedback from people I’ve worked with."
              updateField={updateField}
            />
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          slidesOffsetBefore={12}
          slidesOffsetAfter={12}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={t.id} className="w-full">
              <div className="flex justify-center w-full">
                <div
                  className={`w-full lg:max-w-[360px] md:max-w-[600px] max-w-[300px] bg-white rounded-2xl p-6 border border-gray-900/10 shadow transition ${
                    idx === activeIndex
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-80"
                  }`}
                >
                  <Quote className="w-10 h-10 text-[#a855f7]/10 mb-2" />

                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#a855f7] text-[#a855f7]"
                      />
                    ))}
                  </div>

                  <p className="italic text-gray-700 min-h-[90px] text-sm">
                    “
                    <T
                      path={`testimonials[${idx}].review`}
                      value={t.review}
                      multiline
                      updateField={updateField}
                    />
                    ”
                  </p>

                  <div className="mt-5 pt-4 border-t flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#a855f7] text-white flex items-center justify-center font-semibold">
                      {t.name?.[0] || "?"}
                    </div>
                    <div>
                      <div className="font-semibold">
                        <T
                          path={`testimonials[${idx}].name`}
                          value={t.name}
                          updateField={updateField}
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        <T
                          path={`testimonials[${idx}].title`}
                          value={t.title}
                          updateField={updateField}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className={navBtnClass}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft />
          </button>
          <button
            className={navBtnClass}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
