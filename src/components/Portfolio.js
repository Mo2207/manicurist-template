import Isotope from "isotope-layout";
import dynamic from "next/dynamic";
import Modal from "react-modal";
import { Fragment, useEffect, useRef, useState } from "react";
import SectionContainer from "../layout/SectionContainer";
import { dataImage } from "../utils";
import ImageView from "./ImagePopup";
// import { urlFor } from "@/libs/sanity";
import { Detail, Soundcloud } from "./Popup";
// import { PortableText } from "@portabletext/react";

// hard-coded data for portfolio section
const portfolioData = [
  {
    title: "Classic Manicure",
    category: "Classic Manicures",
    image: "/assets/img/portfolio/classic-manicure.jpg",
    content: [
      "Pamper your hands with our luxurious classic manicure services.",
      "Our expert technicians shape, buff, and polish your nails to perfection, leaving your hands looking flawless.",
      "Enjoy a relaxing experience that revitalizes your nails and cuticles for a polished and sophisticated finish."
    ],
  },
  {
    title: "Gel Polish Perfection",
    category: "Gel Polish Applications",
    image: "/assets/img/portfolio/gel-polish.jpg",
    content: [
      "Discover long-lasting shine with our premium gel polish application.",
      "Choose from a wide range of colors and finishes to match your style and occasion.",
      "Our skilled team ensures a flawless application that resists chipping and lasts for weeks."
    ],
  },
  {
    title: "Creative Nail Art",
    category: "Nail Art & Designs",
    image: "/assets/img/portfolio/nail-art.jpg",
    content: [
      "Unleash your creativity with our custom nail art and designs.",
      "From minimalist patterns to intricate details, our talented artists bring your vision to life.",
      "Let your nails become a canvas for unique and personalized expressions of style."
    ],
  },
  {
    title: "Acrylic Nail Enhancements",
    category: "Acrylic Nail Enhancements",
    image: "/assets/img/portfolio/acrylic-nails.jpg",
    content: [
      "Enhance the beauty of your hands with our durable acrylic nail services.",
      "Perfect for adding length, strength, and style, our acrylic nails are tailored to your preferences.",
      "Enjoy a flawless finish that complements your look, whether it's bold or natural."
    ],
  },
  {
    title: "Luxury Pedicure",
    category: "Luxury Pedicures",
    image: "/assets/img/portfolio/pedicure.jpg",
    content: [
      "Treat your feet to the ultimate relaxation with our luxury pedicure services.",
      "Our treatments include exfoliation, massage, and polish, leaving your feet soft and rejuvenated.",
      "Step out in style with perfectly groomed nails and a refreshing spa experience."
    ],
  },
  {
    title: "Bridal Nail Perfection",
    category: "Bridal Nail Packages",
    image: "/assets/img/portfolio/bridal-nails.jpg",
    content: [
      "Make your big day even more special with our bridal nail packages.",
      "Our expert technicians work with you to create the perfect look, from classic elegance to show-stopping designs.",
      "Ensure your hands and feet are photo-ready for every moment of your wedding celebration."
    ],
  },
];


const Portfolio = () => {
  const categories = [
    "Classic Manicures",
    "Gel Polish Applications",
    "Nail Art & Designs",
    "Acrylic Nail Enhancements",
    "Luxury Pedicures",
    "Bridal Nail Packages"
  ];

  const ModalVideo = dynamic(
    () => {
      return import("react-modal-video");
    },
    { ssr: false }
  );

  // Isotope
  const isotope = useRef(null);
  const [filterKey, setFilterKey] = useState("*");
  const [isIsotopeInitialized, setIsIsotopeInitialized] = useState(false);

  useEffect(() => {
    const imagesLoaded = require("imagesloaded");
    const portfolioList = document.querySelector(".gallery_zoom");

    if (portfolioList && !isIsotopeInitialized) {
      // Загружаем изображения перед инициализацией Isotope
      var imgLoad = imagesLoaded(".portfolio_list");
      imgLoad.on("done", function () {
        isotope.current = new Isotope(".gallery_zoom", {
          itemSelector: ".item__",
          masonry: {
            columnWidth: ".item__",
          },
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });
        setIsIsotopeInitialized(true);
      });
    }

    return () => {
      // Очищаем экземпляр Isotope при размонтировании компонента
      if (isotope.current) {
        isotope.current.destroy();
      }
    };
  }, [isIsotopeInitialized]);

  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };

  const activeBtn = (value) => (value === filterKey ? "active" : "");

  useEffect(() => {
    setTimeout(() => {
      dataImage();
    }, 2000);
  });

  const [modalContent, setModalContent] = useState({});
  const [category, setCategory] = useState(null);
  const filteredData = category ? portfolioData.filter(item => item.category === category) : portfolioData; // replaced sanity {data} with portfolioData
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  // Modal with title, image and content
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal(value) {
    setIsModalOpen(!isModalOpen);
    setModalContent(value);
  }

  function toggleModalThree() {
    setIsOpen3(!isOpen3);
  }

  function toggleModalFour() {
    setIsOpen4(!isOpen4);
  }

  return (
    <Fragment>
      <ImageView />
      <ModalVideo
        channel="vimeo"
        autoplay
        isOpen={isOpen2}
        videoId="337293658"
        animationSpeed={300}
        onClose={() => setIsOpen2(false)}
        modalVideoClose="mfp-close"
      />
      <ModalVideo
        channel="youtube"
        autoplay={true}
        isOpen={isOpen}
        videoId="7e90gBu4pas"
        animationSpeed={300}
        onClose={() => setIsOpen(false)}
        modalVideoClose="mfp-close"
      />
      <Soundcloud isOpen3={isOpen3} toggleModalThree={toggleModalThree} />
      <Detail isOpen4={isOpen4} toggleModalFour={toggleModalFour} />
      <SectionContainer navName="portfolio">
        <div className="section_inner">
          <div className="cavani_tm_portfolio w-full h-auto clear-both float-left mb-[70px]">
            <div className="cavani_tm_title w-full h-auto clear-both float-left overflow-hidden">
              <span className="inline-block relative font-poppins text-[#333] uppercase font-bold tracking-[8px]">
                Creative Portfolio
              </span>
            </div>
            <div className="portfolio_filter w-full h-auto clear-both float-left text-left relative px-0 pt-[55px] pb-[42px]">
              <ul>
                <li className="mr-[40px] inline-block">
                  {/* <a
                    href="#"
                    className={`current text-[#333] font-poppins font-medium transition-all duration-300 ${activeBtn("*")}`}
                    data-filter="*"
                    onClick={handleFilterKeyChange("*")}
                  >
                    All
                  </a> */}
                  <button
                    className={`current text-[#333] font-poppins font-medium transition-all duration-300 ${category === null && 'underline'}`}
                    onClick={() => setCategory(null)}
                  >
                    All
                  </button>
                </li>
                {/* <li className="mr-[40px] inline-block">
                  <a
                    href="#"
                    className={`text-[#333] font-poppins font-medium transition-all duration-300 ${activeBtn(
                      "eyebrow-wax"
                    )}`}
                    data-filter=".eyebrow-wax"
                    onClick={handleFilterKeyChange("eyebrow-wax")}
                  >
                    Eyebrow Wax
                  </a>
                </li>
                <li className="mr-[40px] inline-block">
                  <a
                    href="#"
                    className={`text-[#333] font-poppins font-medium transition-all duration-300 ${activeBtn(
                      "youtube"
                    )}`}
                    data-filter=".youtube"
                    onClick={handleFilterKeyChange("youtube")}
                  >
                    Eyebrow Tint & Shape
                  </a>
                </li>
                <li className="mr-[40px] inline-block">
                  <a
                    href="#"
                    className={`text-[#333] font-poppins font-medium transition-all duration-300 ${activeBtn(
                      "soundcloud"
                    )}`}
                    data-filter=".soundcloud"
                    onClick={handleFilterKeyChange("soundcloud")}
                  >
                    Eyebrows Lamination
                  </a>
                </li>
                <li className="mr-[40px] inline-block">
                  <a
                    href="#"
                    className={`text-[#333] font-poppins font-medium transition-all duration-300 ${activeBtn(
                      "image"
                    )}`}
                    data-filter=".image"
                    onClick={handleFilterKeyChange("image")}
                  >
                    Eyelash Lift and Tint
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    href="#"
                    className={`text-[#333] font-poppins font-medium transition-all duration-300 ${activeBtn(
                      "detail"
                    )}`}
                    data-filter=".detail"
                    onClick={handleFilterKeyChange("detail")}
                  >
                    Classic Fill
                  </a>
                </li> */}
                {categories.map((item, i) => (
                  <li key={`category-${i}`} className="inline-block">
                    <button
                      key={`category-${i}`}
                      className={`text-[#333] font-poppins font-medium transition-all duration-300 ${category === item && 'underline'}`}
                      onClick={() => setCategory(item)}
                    >{item}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="portfolio_list w-full h-auto clear-both float-left">
              <ul className="flex flex-wrap">
                {filteredData?.map((item, i) => {
                  return (
                    <li key={`portfolio-${i}`} className="youtube mb-[50px] w-1/2 float-left pl-[50px] item__">
                      <button onClick={() => toggleModal(item)}>
                      <div className="list_inner w-full h-auto clear-both float-left relative overflow-hidden">
                        <div className="image relative">
                          <img
                            className="relative min-w-full rounded-xl"
                            src={item.image} // hard-coded image
                            alt={item.title}
                          />
                          <div className="details rounded-1xl">
                            <h3 className="text-[16px] mb-[2px] font-semibold">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                      </button>
                    </li> 
                  )
                })}
                {/* <li className="youtube mb-[50px] w-1/2 float-left pl-[50px] item__">
                  <div className="list_inner w-full h-auto clear-both float-left relative overflow-hidden">
                    <div className="image relative">
                      <img
                        className="relative opacity-0 min-w-full"
                        src="assets/img/thumbs/1-1.jpg"
                        alt={true.toString()}
                      />
                      <div
                        className="main absolute inset-0 bg-no-repeat bg-cover bg-center"
                        data-img-url="assets/img/portfolio/1.jpg"
                      />
                      <div className="details">
                        <h3 className="text-[16px] mb-[2px] font-semibold">
                          Ave Brook
                        </h3>
                        <span className="text-[14px]">Youtube</span>
                      </div>
                      <a
                        onClick={() => setIsOpen(true)}
                        className="cavani_tm_full_link popup-youtube"
                        href="#"
                      />
                    </div>
                  </div>
                </li> */}
                {/* Остальные элементы галереи */}
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>
      {modalContent && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          contentLabel="Portfolio"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={300}
          openTimeoutMS={300}
        >
          <div className="cavani_tm_modalbox opened">
            <div className="box_inner">
              <div className="close">
                <a href="#" onClick={toggleModal}>
                  <i className="icon-cancel" />
                </a>
              </div>
              <div className="description_wrap rounded-xl">
                <div className="news_popup_informations w-full h-auto clear-both float-left">
                  {modalContent?.image && (
                    <div className="image">
                      <img
                      src={modalContent.image} // hard-coded image
                      alt={modalContent.title} // hard-coded title
                      />
                      <div
                        className="main"
                        style={{ backgroundImage: `url(${modalContent.image})`}} // hard-coded background image
                      />
                    </div>
                  )}
                  <div className="details">
                    <div className="title">
                      <h3>{modalContent.title}</h3>
                    </div>
                    <div />
                  </div>
                  <div className="text w-full float-left">
                    {/* <p className="mb-[15px]">{modalContent.text1}</p>
                    <p className="mb-[15px]">{modalContent.text2}</p>
                    <p>{modalContent.text3}</p> */}
                    {/* <PortableText
                      value={modalContent?.content}
                    /> */}
                    {modalContent.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};
export default Portfolio;
