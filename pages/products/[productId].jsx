import RootLayout from "@/src/Layouts/RootLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useContext, useEffect, useRef, useState } from "react";
import { addToCartUrl } from "@/src/Utils/Urls/ProductUrl";
import Swal from "sweetalert2";
import { AuthContext } from "@/src/Context/UserContext";
import useProducts from "@/src/Hooks/useProducts";
import useCar from "@/src/Hooks/useCar";
import { PaymentIcons } from "@/src/Assets";
import { FaWhatsapp } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { PolicyIcons, MapIcons, DelivaryIcons } from "@/src/Assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecomendationProduct from "@/src/Components/RecomendationProduct/RecomendationProduct";

const ProductDetailsPage = () => {
  const [mOn, setMOn] = useState(false);
  const { productData } = useProducts();
  const { CarData } = useCar();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { productId } = router.query;
  const phoneNumber = "+91 99964 44445";
  const WhatsAppIcon = () => {
    return <FaWhatsapp />;
  };
  let mainProductData;

  const filterproductData = productData?.filter((data) => {
    return data?._id === productId;
  });

  if (filterproductData && filterproductData.length > 0) {
    mainProductData = filterproductData[0];
  } else {
    console.error(`No data found for ID: ${productId}`);
  }

  let product;

  if (filterproductData && filterproductData.length > 0) {
    product = filterproductData[0];
  } else {
    console.error(`No data found for ID: ${productId}`);
  }
  const addToCart = async (id) => {
    const convertPrice = parseInt(product?.price);
    // Check if the user is logged in
    if (!user) {
      // User is not logged in, show an alert
      Swal.fire({
        icon: "error",
        title: "Please log in to add the product to your cart",
        showConfirmButton: true
      });
      return;
    }

    const res = await fetch(addToCartUrl(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product: product?._id,
        quantity: 1,
        totalPrice: convertPrice,
        email: user?.email,
        status: "unpaid"
      })
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Your product added to cart",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/cart");
    }
  };

  const sliderRef = useRef(null);

  const WhatsAppLink = ({ phoneNumber, message }) => {
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    return (
      <a
        href={whatsappUrl}
        className="text-lg bg-green-500 p-2 text-white rounded-sm hover:bg-green-600 flex my-6 items-center justify-center align-middle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon /> <span className="ml-2 ">+91 99964 44445</span>
      </a>
    );
  };

  const handelBuyNow = async (id) => {
    const convertPrice = parseInt(product?.price);
    // Check if the user is logged in
    if (!user) {
      // User is not logged in, show an alert
      Swal.fire({
        icon: "error",
        title: "Please log in to add the product to your cart",
        showConfirmButton: true
      });
      return;
    }

    const res = await fetch(addToCartUrl(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product: product?._id,
        quantity: 1,
        totalPrice: convertPrice,
        email: user?.email,
        status: "unpaid"
      })
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Your product added to cart",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/checkout");
    }
  };

  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  const discount = product?.discount || 0;

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // State for car selection
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedModelData, setSelectedModelData] = useState(null);

  // State for LED variant selection
  const [selectedLowBeamVariantData, setSelectedLowBeamVariantData] = useState(null);
  const [selectedHighBeamVariantData, setSelectedHighBeamVariantData] = useState(null);
  const [selectedLedVariantData, setSelectedLedVariantData] = useState(null);
  const [selectLowBeamWattage, setSelectLowBeamWattage] = useState(null);
  const [selectHighBeamWattage, setSelectHighBeamWattage] = useState(null);
  const [availableWattage, setAvailableWattage] = useState([]);
  const [availableLowBeamVariant, setAvailableLowBeamVariant] = useState([]);
  const [availableHighBeamVariant, setAvailableHighBeamVariant] = useState([]);

  // Car selection handlers
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedCar(null);
    setSelectedGeneration(null);
    setSelectedModel(null);
    setSelectedModelData(null);
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setSelectedGeneration(null);
    setSelectedModel(null);
    setSelectedModelData(null);
  };

  const handleGenerationSelect = (generation) => {
    setSelectedGeneration(generation);
    setSelectedModel(null);
    setSelectedModelData(null);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);

    // Find and set the selected model data
    const modelData = CarData
      ?.flatMap(car => car.generation?.flatMap(gen => gen?.model))
      ?.find(m => m?.modelName === model);
    setSelectedModelData(modelData);
  };

  // LED variant selection handlers
  useEffect(() => {
    if (product?.led[0]?.variant) {
      const variants = product.led[0].variant;
      const wattages = [...new Set(variants.map(v => v.wattage))].sort((a, b) => a - b);

      setAvailableWattage(wattages.map(w => `${w}`));
      setAvailableLowBeamVariant(wattages.map(w => `${w}`));
      setAvailableHighBeamVariant(wattages.map(w => `${w}`));

      // Set default variant
      const defaultVariant = variants[0];
      setSelectedLedVariantData(defaultVariant);
      setSelectLowBeamWattage(`${defaultVariant.wattage}`);
      setSelectHighBeamWattage(`${defaultVariant.wattage}`);
      updateSelectedVariant(`${defaultVariant.wattage}`, `${defaultVariant.wattage}`);
    }
  }, [product]);


  // Update LED variant selection
  const updateSelectedVariant = (lowBeamWattage, highBeamWattage) => {
    const lowBeamVariant = product?.led[0]?.variant.find(v => `${v.wattage}` === lowBeamWattage);
    setSelectedLowBeamVariantData(lowBeamVariant);

    const highBeamVariant = product?.led[0]?.variant.find(v => `${v.wattage}` === highBeamWattage);
    setSelectedHighBeamVariantData(highBeamVariant);
  };

  const handleLowBeamWattageChange = wattage => {
    setSelectLowBeamWattage(wattage);
    updateSelectedVariant(wattage, selectHighBeamWattage);
  };

  const handleHighBeamWattageChange = wattage => {
    setSelectHighBeamWattage(wattage);
    updateSelectedVariant(selectLowBeamWattage, wattage);
  };

  const handleSingleBeamWattageChange = wattage => {
    setSelectLowBeamWattage(wattage);
    setSelectHighBeamWattage(wattage);
    updateSelectedVariant(wattage, wattage);
  };


  // ======= led price 

  const isBeamsSeparate = selectedModelData?.beams?.isLowAndHighBeamsSeparate;
  const basedPriceForLed = selectedLedVariantData?.basePrice || 0;
  const lowBeemsBasedPrice = selectedLowBeamVariantData?.basePrice || 0;
  const highBeemBasedPrice = selectedHighBeamVariantData?.basePrice || 0;

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let price = isBeamsSeparate ? (lowBeemsBasedPrice + highBeemBasedPrice) : basedPriceForLed;
    let discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  const totalPriceForLed = calculateTotalPrice();
  const mainPriceForLed = isBeamsSeparate ? (lowBeemsBasedPrice + highBeemBasedPrice) : basedPriceForLed;

  // ========= for the android ==========

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedProcessor, setSelectedProcessor] = useState('');
  const [selectedRam, setSelectedRam] = useState('');
  const [selectedRom, setSelectedRom] = useState('');
  const [selectedCarplay, setSelectedCarplay] = useState('');
  const [isSelected360CameraSupported, setIsSelected360CameraSupported] = useState('');
  const [isSelectedSim, setIsSelectedSim] = useState('');

  const [availableProcessors, setAvailableProcessors] = useState([]);
  const [availableRams, setAvailableRams] = useState([]);
  const [availableRoms, setAvailableRoms] = useState([]);
  const [availableCarplays, setAvailableCarplays] = useState([]);
  const [available360CameraSupport, setAvailable360CameraSupport] = useState([]);
  const [availableSimSupport, setAvailableSimSupport] = useState([]);

  useEffect(() => {
    const processors = new Set(product?.android[0]?.variant.map(v => v.processorLabel));
    const rams = new Set(product?.android[0]?.variant.map(v => v.ram));
    const roms = new Set(product?.android[0]?.variant.map(v => v.rom));
    const carplays = new Set(product?.android[0]?.variant.map(v => v.isAppleCarplayAndAndroidAutoSupported ? v.wirelessWired : 'Not Supported'));
    const cameraSupports = new Set(product?.android[0]?.variant.map(v => v.is360CameraSupported));
    const simSupports = new Set(product?.android[0]?.variant.map(v => v.isSimSupported));

    setAvailableProcessors([...processors]);
    setAvailableRams([...rams].sort((a, b) => parseInt(a) - parseInt(b)).map(r => `${r} GB`));
    setAvailableRoms([...roms].sort((a, b) => parseInt(a) - parseInt(b)).map(r => `${r} GB`));
    setAvailableCarplays([...carplays]);
    setAvailable360CameraSupport([...cameraSupports]);
    setAvailableSimSupport([...simSupports]);

    if (product?.android[0]?.variant.length > 0) {
      const defaultVariant = product.android[0].variant[0];
      setSelectedVariant(defaultVariant);
      setSelectedProcessor(defaultVariant.processorLabel);
      setSelectedRam(`${defaultVariant.ram} GB`);
      setSelectedRom(`${defaultVariant.rom} GB`);
      setSelectedCarplay(defaultVariant.isAppleCarplayAndAndroidAutoSupported ? defaultVariant.wirelessWired : 'Not Supported');
      setIsSelected360CameraSupported(defaultVariant.is360CameraSupported);
      setIsSelectedSim(defaultVariant.isSimSupported);
    }
  }, [product]);

  useEffect(() => {
    const updatedVariant = product?.android[0]?.variant.find(v =>
      v.processorLabel === selectedProcessor &&
      `${v.ram} GB` === selectedRam &&
      `${v.rom} GB` === selectedRom &&
      (v.isAppleCarplayAndAndroidAutoSupported ? v?.wirelessWired : 'Not Supported') === selectedCarplay &&
      v.is360CameraSupported === isSelected360CameraSupported &&
      v.isSimSupported === isSelectedSim
    );
    setSelectedVariant(updatedVariant);
  }, [selectedProcessor, selectedRam, selectedRom, selectedCarplay, isSelected360CameraSupported, isSelectedSim, product]);

  const handleProcessorChange = processor => {
    setSelectedProcessor(processor);

    // Find the first variant matching the selected processor
    const firstVariantForProcessor = product?.android[0]?.variant.find(v => v.processorLabel === processor);

    if (firstVariantForProcessor) {
      setSelectedVariant(firstVariantForProcessor);
      setSelectedRam(`${firstVariantForProcessor.ram} GB`);
      setSelectedRom(`${firstVariantForProcessor.rom} GB`);
      setSelectedCarplay(firstVariantForProcessor.isAppleCarplayAndAndroidAutoSupported ? firstVariantForProcessor.wirelessWired : 'Not Supported');
      setIsSelected360CameraSupported(firstVariantForProcessor.is360CameraSupported);
      setIsSelectedSim(firstVariantForProcessor.isSimSupported);
    } else {
      // Reset other selections if no variant matches the processor
      setSelectedRam('');
      setSelectedRom('');
      setSelectedCarplay('');
      setIsSelected360CameraSupported('');
      setIsSelectedSim('');
    }
  };

  const handleRamChange = ram => setSelectedRam(ram);
  const handleRomChange = rom => setSelectedRom(rom);
  const handleCarplayChange = carplay => setSelectedCarplay(carplay);
  const handleCameraSupportChange = support => setIsSelected360CameraSupported(support);
  const handleSimSupportChange = support => setIsSelectedSim(support);

  const isOptionAvailable = (option, type) => {
    if (type === 'support') {
      // For 360 Camera Support or Sim Support
      return product?.android[0]?.variant.some(v =>
        v.processorLabel === selectedProcessor &&
        ((type === '360Camera' && v.is360CameraSupported === option) ||
          (type === 'Sim' && v.isSimSupported === option))
      );
    } else {
      // For Carplay, RAM, ROM, etc.
      return product?.android[0]?.variant.some(v =>
        v.processorLabel === selectedProcessor &&
        (type === 'carplay' ? (v.isAppleCarplayAndAndroidAutoSupported ? v.wirelessWired : 'Not Supported') === option : `${v[type]} GB` === option)
      );
    }
  };

  const basedPriceForAndroid = selectedVariant?.basePrice || 0;
  const canbusPriceForAndroid = selectedModelData?.canbus?.isCanbusRequired ? (selectedModelData?.canbus?.canbusPrice || 0) : 0;
  const framecostForAndroid = selectedModelData?.frameCost || 0;
  const totalPirceAndroid = basedPriceForAndroid + canbusPriceForAndroid + framecostForAndroid
  const androidPrice = basedPriceForAndroid - (discount * basedPriceForAndroid / 100) + framecostForAndroid + canbusPriceForAndroid;



  return (
    <RootLayout>
      <section className="container">
        {mOn ? (
          <div className="bg-white p-4 border rounded-xl md:w-[600px] pb-4 fixed top-[50%] -translate-y-1/2  left-0 right-0 z-[200] shadow-xl shadow-[gray] w-[90%] m-auto">
            <button
              onClick={() => setMOn(!mOn)}
              className="text-2xl float-right"
            >
              x
            </button>
            <div className="mx-auto my-auto">
              <h2 className="text-sm animate-pulse mt-12 mx-12 text-black text-center">
                This website is under maintaienence if you want to buy this
                product then share screenshot to this whatsaap number
              </h2>
              <WhatsAppLink
                phoneNumber={phoneNumber}
                message={`I want to Buy ${product?.name} worth Rs ${product?.price} From You, can you please inform me More`}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <section className="py-2 mb-8">
          <div className="mx-auto px-4">
            <div className="lg:col-gap-12 xl:col-gap-16  grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5">
              <div className="lg:col-span-3 lg:row-end-1">
                <div className="img-box shadow w-full items-center rounded bg-[#f1e8e8] p-2 flex justify-center">
                  {selectedImage ? (
                    <Image
                      src={selectedImage || product?.images[0]}
                      alt={product?.productName}
                      width={500}
                      height={300}
                      className="w-full h-full cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130"
                    />
                  ) : (
                    <Image
                      src={product?.images[0]}
                      alt={product?.productName}
                      width={500}
                      height={300}
                      className="w-full h-full cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130"
                    />
                  )}
                </div>

                <br />
                <div className="h-[15%] w-full">
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    images
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper flex "
                  >
                    {product?.images &&
                      product?.images?.map((image, index) => {
                        return (
                          <SwiperSlide
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className="cursor-pointer flex justify-center items-center"
                          >
                            <div
                              className={`p-1 rounded-full w-full cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 ${selectedImage === image
                                ? "bg-opacity-100 "
                                : "bg-opacity-50"
                                }`}
                            >
                              <Image
                                src={image}
                                alt={product?.productName}
                                width={150}
                                height={150}
                                className="cursor-pointer border p-4 rounded hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130 objectFit"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              </div>

              <div className="lg:col-span-4 lg:row-span-2 lg:row-end-2">
                <h1 className="text-2xl font-semibold">
                  {product?.productName}
                </h1>
                <hr
                  className='my-2'
                />
                {/* <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                  <h1 className="font-bold text-slate-900">
                    {product?.discount
                      ? `₹ ${Math.floor(
                        product?.price -
                        (product?.price * product?.discount) / 100
                      )}`
                      : `₹ ${Math.floor(product?.price)}`}
                  </h1>
                  <span className="font-bold text-gray-400 ">
                    MRP:₹ <span className='line-through'>{Math.floor(product?.price)}</span>
                  </span>
                  <span className="text-green-500 font-bold">
                    {Math.floor(product?.discount)} % off
                  </span>
                </div> */}
                {
                  product?.android[0]?.isAndroid && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(androidPrice)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(totalPirceAndroid)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        {
                          selectedModelData?.beams?.isLowAndHighBeamsSeparate && (
                            <span>
                              {`Since you car supports 2 Lights, therefore cost of 2 lights is applicable`}
                            </span>
                          )
                        }
                      </p>
                    </>
                  )
                }

                {
                  product?.led[0]?.isLed && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(totalPriceForLed)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(mainPriceForLed)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        {
                          selectedModelData?.canbus?.isCanbusRequired && (
                            <span>
                              {`Since Canbus is also required, so extra cost of Rs. ${canbusPriceForAndroid} is added`}
                            </span>
                          )
                        }
                      </p>
                    </>
                  )
                }
                {/* ========== Varient Select For Android======== */}
                <div>
                  <div>
                    {product?.android[0]?.isAndroid && (
                      <div className='my-4'>
                        {/* Select Your Processor */}
                        <div>
                          <label className="font-bold text-slate-900">Select Your Processor</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableProcessors.map((processor, index) => (
                              <div
                                key={index}
                                className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedProcessor === processor ? 'selected' : ''}`}
                                onClick={() => handleProcessorChange(processor)}
                              >
                                {processor}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Select Your Ram */}
                        <div>
                          <label className="font-bold text-slate-900">Select Your Ram</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableRams.map((ram, index) => (
                              <div
                                key={index}
                                className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedRam === ram ? 'selected' : ''} ${!isOptionAvailable(ram, 'ram') ? 'disabled' : ''}`}
                                onClick={() => isOptionAvailable(ram, 'ram') && handleRamChange(ram)}
                              >
                                {ram}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Select Your Rom */}
                        <div>
                          <label className="font-bold text-slate-900">Select Your ROM</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableRoms.map((rom, index) => (
                              <div
                                key={index}
                                className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedRom === rom ? 'selected' : ''} ${!isOptionAvailable(rom, 'rom') ? 'disabled' : ''}`}
                                onClick={() => isOptionAvailable(rom, 'rom') && handleRomChange(rom)}
                              >
                                {rom}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Carplay Selection */}
                        <div>
                          <label className="font-bold text-slate-900">Select Your Carplay</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableCarplays.map((carplay, index) => (
                              <div
                                key={index}
                                className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedCarplay === carplay ? 'selected' : ''} ${!isOptionAvailable(carplay, 'carplay') ? 'disabled' : ''}`}
                                onClick={() => handleCarplayChange(carplay)}
                              >
                                {carplay}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <hr
                  className='my-2'
                />
                {/* ======== cars input here ========== */}
                <div>
                  <div className="mt-4">
                    <h1 className="font-bold text-slate-900">
                      Select Your Brand
                    </h1>
                    <select
                      onChange={(e) => handleBrandSelect(e.target.value)}
                      className="border-2 my-2 border-gray-300 rounded-md p-2 w-full"
                    >
                      <option value="">Select Brand</option>
                      {CarData &&
                        [...new Set(CarData.map((car) => car?.carBrand))].map(
                          (brand) => (
                            <option key={brand} value={brand}>
                              {brand}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                  {selectedBrand && (
                    <div>
                      <h1 className="font-bold text-slate-900">
                        Select Your Car
                      </h1>
                      <select
                        onChange={(e) => handleCarSelect(e.target.value)}
                        className="border-2 my-2 border-gray-300 rounded-md p-2 w-full"
                      >
                        <option value="">Select Car</option>
                        {CarData &&
                          CarData?.filter(
                            (car) => car?.carBrand === selectedBrand
                          )?.map((car) => (
                            <option key={car?.carName} value={car?.carName}>
                              {car?.carName}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {selectedCar && (
                    <div>
                      <h1 className="font-bold text-slate-900">
                        Select Your Car Generation
                      </h1>
                      <select
                        onChange={(e) => handleGenerationSelect(e.target.value)}
                        className="border-2 my-2 border-gray-300 rounded-md p-2 w-full"
                      >
                        <option value="">Select Generation</option>

                        {CarData &&
                          CarData?.filter(
                            (car) => car?.carName === selectedCar
                          ).map((car) =>
                            car.generation?.map((gen, index) => {
                              const genaretionFrom =
                                gen?.startYear + " - " + gen?.endYear;
                              return (
                                <option
                                  key={gen?._id + index}
                                  value={`Generation ${index + 1
                                    } (${genaretionFrom})`}
                                >
                                  {`Generation ${index + 1
                                    } (${genaretionFrom})`}
                                </option>
                              );
                            })
                          )}
                      </select>
                    </div>
                  )}

                  {selectedGeneration && (
                    <div>
                      <h1 className="font-bold text-slate-900">
                        Select Your Car Model
                      </h1>
                      <select
                        onChange={(e) => handleModelSelect(e.target.value)}
                        className="border-2 my-2 border-gray-300 rounded-md p-2 w-full"
                      >
                        <option value="">Select Model</option>
                        {CarData &&
                          CarData?.filter(
                            (car) =>
                              car?.carBrand === selectedBrand &&
                              car?.carName === selectedCar
                          )?.map((car) =>
                            car.generation
                              .filter((gen, index) => {
                                const genaretionFrom =
                                  gen?.startYear + " - " + gen?.endYear;
                                const generationFromD = `Generation ${index + 1
                                  } (${genaretionFrom})`;
                                return generationFromD === selectedGeneration;
                              })
                              .flatMap((gen) =>
                                gen.model.map((carModel, modelIndex) => (
                                  <option
                                    key={carModel.modelName + modelIndex}
                                    value={carModel.modelName}
                                  >
                                    {carModel.modelName}
                                  </option>
                                ))
                              )
                          )}
                      </select>
                    </div>
                  )}
                </div>

                {/* ======== Led varient ========= */}
                <div>
                  {selectedModelData && product?.led[0]?.isLed && (
                    <div>
                      {selectedModelData?.beams?.isLowAndHighBeamsSeparate ? (
                        <>
                          {/* Low Beam Wattage Selection */}
                          <div>
                            <label className="font-bold text-slate-900">Select Low Beam Variant (Wattage)</label>
                            <div className="flex items-center gap-4 my-2">
                              {availableLowBeamVariant.map((wattage, index) => (
                                <div
                                  key={index}
                                  className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectLowBeamWattage === wattage ? 'selected' : ''}`}
                                  onClick={() => handleLowBeamWattageChange(wattage)}
                                >
                                  {wattage}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* High Beam Wattage Selection */}
                          <div>
                            <label className="font-bold text-slate-900">Select High Beam Variant (Wattage)</label>
                            <div className="flex items-center gap-4 my-2">
                              {availableHighBeamVariant.map((wattage, index) => (
                                <div
                                  key={index}
                                  className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectHighBeamWattage === wattage ? 'selected' : ''}`}
                                  onClick={() => handleHighBeamWattageChange(wattage)}
                                >
                                  {wattage}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        // Single Beam Wattage Selection
                        <div>
                          <label className="font-bold text-slate-900">Select Variant (Wattage)</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableWattage.map((wattage, index) => (
                              <div
                                key={index}
                                className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectLowBeamWattage === wattage ? 'selected' : ''}`}
                                onClick={() => handleSingleBeamWattageChange(wattage)}
                              >
                                {wattage}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* ======== Led varient ========= */}

                <hr
                  className='my-2'
                />

                <div className="mt-4 flex flex-col items-center  space-y-4 border-t border-b py-4  w-full">
                  <button
                    onClick={() => setMOn(!mOn)}
                    className="font-semibold hover:before:bg-blackborder-black relative h-[50px] w-full rounded overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-white hover:before:left-0 hover:before:w-full"
                  >
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      <BsCart className="text-[1.2rem]" /> Buy Now
                    </span>
                  </button>

                  <button
                    onClick={() => setMOn(!mOn)}
                    className="font-semibold hover:before:bg-blackborder-black relative h-[50px] w-full rounded overflow-hidden border border-black bg-black px-3 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full"
                  >
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      <BsCart className="text-[1.2rem]" /> Add to Cart
                    </span>
                  </button>
                </div>

                <div>
                  <h1 className="mt-8 text-3xl font-bold">Features</h1>
                  <div className="flex flex-col my-2 gap-4">
                    {product?.productFeatures?.map((fct, index) => {
                      return (
                        <div className="flex gap-2 flex-col">
                          <h1 className="font-bold">
                            {" "}
                            {index + 1}. {fct?.heading} :
                          </h1>
                          <hr />
                          <h2>✅ {fct?.description}</h2>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <hr className="my-4" />
                <ul className="mt-8 space-y-2">
                  <li className="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg
                      className="mr-2 block h-5 w-5 align-middle text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        className=""
                      />
                    </svg>
                    Proudly made in india
                  </li>
                  <li className="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg
                      className="mr-2 block h-5 w-5 align-middle text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        className=""
                      />
                    </svg>
                    Cruelty free materials
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-3">
                <div className="border-b border-gray-300">
                  <nav className="flex gap-4">
                    <a
                      href="#"
                      title=""
                      className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                    >
                      {" "}
                      Description{" "}
                    </a>
                  </nav>
                </div>
                <div className="mt-8 flow-root sm:mt-12">
                  <h1 className="text-3xl font-bold">Details</h1>
                  <div className="flex flex-col my-2  gap-4">
                    {
                      product?.android[0]?.isAndroid && selectedVariant && (
                        <div className="flex gap-2 flex-col">
                          <h1 className="text-[1.2rem]">
                            <span className="font-bold">
                              ✅ Processor :
                            </span>
                            <span className='mx-2'>
                              {selectedVariant?.processorName}
                            </span>
                          </h1>
                          <h1 className="text-[1.2rem]">
                            <span className="font-bold">
                              ✅ Processor Type :
                            </span>
                            <span className='mx-2'>
                              {selectedVariant?.processorLabel}
                            </span>
                          </h1>
                          <h1 className="text-[1.2rem]">
                            <span className="font-bold">
                              ✅ RAM :
                            </span>
                            <span className='mx-2'>
                              {selectedVariant?.ram} GB
                            </span>
                          </h1>
                          <h1 className="text-[1.2rem]">
                            <span className="font-bold">
                              ✅ ROM :
                            </span>
                            <span className='mx-2'>
                              {selectedVariant?.rom} GB
                            </span>
                          </h1>
                          <h1 className="text-[1.2rem]">
                            <span className="font-bold">
                              ✅ Apple Carplay & Android Auto Support :
                            </span>
                            <span className='mx-2'>

                              {
                                selectedVariant?.isAppleCarplayAndAndroidAutoSupported ? (
                                  <span>
                                    {selectedVariant?.wirelessWired}
                                  </span>
                                ) : "Not Supported"
                              }
                            </span>
                          </h1>
                          <h1 className="text-[1.2rem]">
                            <span className="font-bold">
                              ✅ DVR Support :
                            </span>
                            <span className='mx-2'>
                              {selectedVariant?.isDVRSupported ? "Yes" : "No"}
                            </span>
                          </h1>
                          <h1 className="text-[1.2rem]">
                            <span className='font-bold'>
                              ✅ 360 Camera Support :
                            </span>
                            <span className="mx-2">
                              {selectedVariant?.is360CameraSupported}
                            </span>
                          </h1>
                          <h1 className="text-[1.2rem]">
                            <span className='font-bold'>
                              ✅ Sim Support :
                            </span>
                            <span className='mx-2'>
                              {selectedVariant?.isSimSupported}
                            </span>
                          </h1>
                          <h1 className="text-[1.2rem]">
                            <span className="font-bold">
                              ✅ Warranty Available :
                            </span>
                            <span className='mx-2'>
                              {selectedVariant?.isWarrantyAvailable}
                            </span>
                          </h1>
                          <h1 className="text-[1.2rem]">
                            {
                              selectedVariant?.isWarrantyAvailable === "Yes" && (
                                <>
                                  <span className='font-bold'>
                                    ✅ Warranty Period :
                                  </span>
                                  <span className='mx-2'>
                                    {selectedVariant?.warrantyPeriod} Year
                                  </span>
                                </>
                              )
                            }
                          </h1>
                          <h1 className="text-[1.2rem]">
                            <span className='font-bold'>
                              ✅ Price :
                            </span>
                            <span className="mx-2">
                              Rs. {selectedVariant?.basePrice}
                            </span>
                          </h1>
                        </div>
                      )
                    }

                    <div>
                      {

                        selectedModelData?.beams?.isLowAndHighBeamsSeparate ? (
                          <>
                            {

                              selectedModelData && product?.led[0]?.isLed && selectedLowBeamVariantData && selectedHighBeamVariantData && (
                                <div className="flex gap-2 flex-col">
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Wattage For Low Beem:
                                    </span>
                                    <span className='mx-2'>
                                      {selectedLowBeamVariantData?.wattage}
                                    </span>
                                  </h1>

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Wattage For High Beem:
                                    </span>
                                    <span className='mx-2'>
                                      {selectedHighBeamVariantData?.wattage}
                                    </span>
                                  </h1>

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Sockets Support Low Beem:
                                    </span>
                                    <span className='mx-2 flex gap-2 items-center'>
                                      {selectedLowBeamVariantData?.socketsSupported.map((soket) => {
                                        return (
                                          <span className='border p-3 rounded'>{soket}</span>
                                        )
                                      })}
                                    </span>
                                  </h1>

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Sockets Support High Beem:
                                    </span>
                                    <span className='mx-2 flex gap-2 items-center'>
                                      {selectedHighBeamVariantData?.socketsSupported.map((soket) => {
                                        return (
                                          <span className='border p-3 rounded'>{soket}</span>
                                        )
                                      })}
                                    </span>
                                  </h1>


                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Base Price Low Beem:
                                    </span>
                                    <span className='mx-2'>
                                      Rs. {selectedLowBeamVariantData?.basePrice}
                                    </span>
                                  </h1>


                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Base Price High Beem:
                                    </span>
                                    <span className='mx-2'>
                                      Rs. {selectedHighBeamVariantData?.basePrice}
                                    </span>
                                  </h1>

 

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Brand :
                                    </span>
                                    <span className='mx-2'>
                                      DAPS
                                    </span>
                                  </h1>

                                </div>
                              )
                            }
                          </>
                        ) : (
                          <>
                            {
                              selectedModelData && product?.led[0]?.isLed && selectedLedVariantData && (
                                <div className="flex gap-2 flex-col">
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Wattage :
                                    </span>
                                    <span className='mx-2'>
                                      {selectedLedVariantData?.wattage}
                                    </span>
                                  </h1>
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Sockets Support :
                                    </span>
                                    <span className='mx-2 flex gap-2 items-center'>
                                      {selectedLedVariantData?.socketsSupported.map((soket) => {
                                        return (
                                          <span className='border p-3 rounded'>{soket}</span>
                                        )
                                      })}
                                    </span>
                                  </h1>
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Base Price :
                                    </span>
                                    <span className='mx-2'>
                                      Rs. {selectedLedVariantData?.basePrice}
                                    </span>
                                  </h1>
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Brand :
                                    </span>
                                    <span className='mx-2'>
                                      DAPS
                                    </span>
                                  </h1>

                                </div>
                              )
                            }
                          </>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-light my-6 text-3xl text-black">
              Quick
              <strong className="font-extrabold text-[#29679e] mx-2">
                Product Highlights
              </strong>
            </h3>
            {/* ===== porduct aPlus Content======  */}
            <div className="flex flex-col items-center gap-4 justify-center">
              <div>
                <Image
                  src={product?.aPlusContent?.imageOne}
                  alt={product?.productName}
                  width={300}
                  height={300}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <Image
                  src={product?.aPlusContent?.imageTwo}
                  alt={product?.productName}
                  width={300}
                  height={300}
                  className="w-full md:w-[49.47%]"
                />
                <Image
                  src={product?.aPlusContent?.imageThree}
                  alt={product?.productName}
                  width={300}
                  height={300}
                  className="w-full md:w-[49.47%]"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <Image
                  src={product?.aPlusContent?.imageFour}
                  alt={product?.productName}
                  width={300}
                  height={300}
                  className="w-full md:w-[49.47%]"
                />
                <Image
                  src={product?.aPlusContent?.imageFive}
                  alt={product?.productName}
                  width={300}
                  height={300}
                  className="w-full md:w-[49.47%]"
                />
              </div>

              <div>
                <Image
                  src={product?.aPlusContent?.imageSix}
                  alt={product?.productName}
                  width={300}
                  height={300}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <RecomendationProduct />
      </section>
    </RootLayout>
  );
};

export default ProductDetailsPage;
