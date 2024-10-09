import { Button, Card, Carousel, Divider, message } from "antd";
import { useRef, useState, useEffect } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import temp1 from "../../assets/invoiceTemplates/1.jpg";
import temp2 from "../../assets/invoiceTemplates/2.jpg";
import temp3 from "../../assets/invoiceTemplates/3.jpg";
import temp4 from "../../assets/invoiceTemplates/4.jpg";
import temp5 from "../../assets/invoiceTemplates/5.jpg";
import temp6 from "../../assets/invoiceTemplates/6.jpg";
import { setDataFlag, setTemplateKey } from "../../features/Slices/invoiceSlice";


// Custom hook to get the current window width
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

export default function InvoiceTemplate() {
  const carouselRef = useRef(null); // Reference to the carousel
  const windowWidth = useWindowWidth();
  const [items, setItems] = useState(4); // Default to 4 items
  const [selectedCard, setSelectedCard] = useState(null); // To track selected card
  const dispatch = useDispatch();

  useEffect(() => {
    if (windowWidth <= 768) {
      setItems(1);
    } else {
      setItems(4);
    }
  }, [windowWidth]); // Update items when windowWidth changes

  const handlePrevious = () => {
    carouselRef.current.prev(); // Trigger previous slide
  };

  const handleNext = () => {
    carouselRef.current.next(); // Trigger next slide
  };

  const handleCardClick = (key) => {
    setSelectedCard(key); // Set the clicked card as selected
    dispatch(setTemplateKey(key)); // Dispatch the selected key to the store
    message.success(`You selected: ${key} ${templateNames[key]}`); // Display alert with the key
  };

  // Function to determine border color based on selection
  const getCardStyle = (key) => {
    return selectedCard === key
      ? { border: "2px solid #1890ff", transform: "scale(1.05)" } // primary color with hover effect
      : {};
  };

  const templateNames = [
    "Golden Glow",     // Yellow themed
    "Azure Clarity",   // Blue themed
    "Emerald Essence", // Green themed
    "Sandy Serenity",  // Beige themed
    "Forest Majesty",  // Dark Green themed
    "Steel Breeze"     // Grey & Blue themed
  ];

  useEffect(() => {
    if(selectedCard !== null){
      dispatch(setDataFlag(true)); // Set the flag to true
    }
    else{
      dispatch(setDataFlag(false)); // Set the flag to false
    }
  },[selectedCard,dispatch])
  return (
    <>
      <section style={{ padding: "1%" }} className="mb-3">
        <h1 className="font-semibold text-lg">Select Template</h1>
        <section style={{ maxWidth: "100%", overflow: "hidden" }}>
          <Carousel
            arrows={false} // Disable default arrows
            dots={false}
            slidesToShow={items} // Dynamic display based on window size
            slidesToScroll={1} // Scroll 1 card at a time
            ref={carouselRef} // Attach ref to the carousel
            className="custom-carousel"
            infinite={true}
          >
            {[temp1, temp2, temp3, temp4, temp5, temp6].map((temp, index) => (
              <div className="card-wrapper" key={index}>
                <Card
                  hoverable
                  cover={<img src={temp} alt={`Template ${index + 1}`} />}
                  bordered={true}
                  style={getCardStyle(index)} // Apply conditional style
                  onClick={() => handleCardClick(index)} // Handle click event
                >
                  <h3 style={{ textAlign: 'center', fontWeight: 'bold', opacity:0.5 }}>
                    {templateNames[index]}  {/* Display template name */}
                  </h3>
                </Card>
              </div>
            ))}
          </Carousel>
        </section>
        <p className="opacity-25 text-center ">swipe to explore</p>
        <section style={{ marginTop: "20px", textAlign: "end" }} className="flex items-center justify-center ">
          <Button size="small" onClick={handlePrevious}>
            <ArrowLeftOutlined />
          </Button>
          <Button
            size="small"
            onClick={handleNext}
            type="primary"
            style={{ marginLeft: "10px" }}
          >
            <ArrowRightOutlined />
          </Button>
        </section>
      </section>
      <Divider/>
    </>
  );
}
