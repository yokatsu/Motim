import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage } from "../lib/contentParser";
import Cta from "@layouts/components/Cta";
import Link from "next/link";
import Image from "next/image";
import { markdownify } from "@lib/utils/textConverter";
import FeatureCard from "@layouts/components/FeatureCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/swiper.min.css";
import React from "react";
import MapHandler from "@layouts/components/map/";

const Home = ({ frontmatter }) => {
  const { banner, feature, services, partners, workflow, call_to_action } = frontmatter;
  const { title } = config.site;
  return (
    <Base title={title}>
     {partners.map((service, index) => {
        const isOdd = index % 2 > 0;
        return (
          <section
            key={index}
            className={`section pb-[0px] pt-[10px] ${isOdd ? " bg-theme-light" : ""}`}
          >
            <div className="container">
              <div className="items-center">
                {/* Carousel */}
                <div
                  className={`service-carousel ${!isOdd ? "md:order-2" : ""}`}
                >
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    pagination={
                      service.images.length > 1 ? { clickable: true } : false
                    }
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    init={service?.images > 1 ? false : true}
                  >
                    {/* Slides */}
                    {service?.images.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <Image className="mx-auto mb-[15px]" src={slide} alt="" width={1000} height={200} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Banner */}
      <section className="section pb-[50px]">
        <div className="container">
          
          <div className="row text-center">
           
            <div className="mx-auto lg:col-10">
              <h1 className="font-primary font-bold">{banner.title}</h1>
              <div className="flex justify-center">
              <blockquote className="twitter-tweet"><p lang="pt" dir="ltr">Você andaria de Moto</p>&mdash; Yuri GG (@yokatsu_) <a href="https://twitter.com/yokatsu_/status/1603024089588842496?ref_src=twsrc%5Etfw">December 14, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
              </div>

              <p className="mt-4">{markdownify(banner.content)}</p>
              <Link
                className="btn btn-primary mt-4"
                href={banner.button_solid.href}
                rel={banner.button_solid.rel}
              >
                {banner.button_solid.label}
              </Link>
              <Image
                className="mx-auto mt-12"
                src={banner.image}
                width={800}
                height={700}
                alt="Banner"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="section"> */}
      {/* <SwitcherHandler/> */}
        <MapHandler/>
     
      {/* </section> */}
      {/* Features */}
      <section className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>{markdownify(feature.title)}</h2>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {feature.features.map((item, index) => (
              <FeatureCard key={index} data={item} />
            ))}
          </div>
        </div>
      </section>
  
      {/* services */}
      {services.map((service, index) => {
        const isOdd = index % 2 > 0;
        return (
          <section
            key={index}
            className={`section ${isOdd ? " bg-theme-light" : ""}`}
          >
            <div className="container">
              <div className="items-center gap-8 md:grid md:grid-cols-2">
                {/* Carousel */}
                <div
                  className={`service-carousel ${!isOdd ? "md:order-2" : ""}`}
                >
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    pagination={
                      service.images.length > 1 ? { clickable: true } : false
                    }
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    init={service?.images > 1 ? false : true}
                  >
                    {/* Slides */}
                    {service?.images.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <Image src={slide} alt="" width={600} height={500} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Content */}
                <div
                  className={`service-content mt-5 md:mt-0 ${
                    !isOdd ? "md:order-1" : ""
                  }`}
                >
                  <h2 className="font-bold leading-[40px]">{service?.title}</h2>
                  <p className="mt-4 mb-2">{service?.content}</p>
                  <Link
                    href={service?.call_to_action.href}
                    className="cta-link inline-flex items-center text-primary"
                  >
                    {service?.call_to_action.label}
                    <Image
                      className="ml-1"
                      src="/images/arrow-right.svg"
                      width={18}
                      height={14}
                      alt="arrow"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* workflow */}
      <section className="section pb-0">
        <div className="mb-8 text-center">
          {markdownify(
            workflow.title,
            "h2",
            "mx-auto max-w-[400px] font-bold leading-[44px]"
          )}
          {markdownify(workflow.description, "p", "mt-3")}
        </div>
        <Image src={workflow.image} alt="" width={1920} height={296} />
      </section>

      {/* Cta */}
      <Cta cta={call_to_action} />
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
