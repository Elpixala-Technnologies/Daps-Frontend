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
import { FaWhatsapp } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecomendationProduct from "@/src/Components/RecomendationProduct/RecomendationProduct";
import { checkoutOrderUrl, paymentverificationUrl } from "@/src/Utils/Urls/PaymentUrl";
import axios from 'axios';
import useAddress from "@/src/Hooks/useAddress";
import { addOrderUrl } from "@/src/Utils/Urls/OrderUrl";

const ProductDetailsPage = () => {
  const [mOn, setMOn] = useState(false);
  const { productData } = useProducts();
  const { CarData } = useCar();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { addressData } = useAddress()
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
  const [selectBeamSingelWattage, setSelectBeamSingelWattage] = useState(null)
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

      setAvailableWattage(wattages?.map(w => `${w}`));
      setAvailableLowBeamVariant(wattages?.map(w => `${w}`));
      setAvailableHighBeamVariant(wattages?.map(w => `${w}`));

      // Set default variant
      const defaultVariant = variants[0];
      setSelectedLedVariantData(defaultVariant);
      setSelectLowBeamWattage(`${defaultVariant.wattage}`);
      setSelectHighBeamWattage(`${defaultVariant.wattage}`);
      setSelectBeamSingelWattage(`${defaultVariant.wattage}`)
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
  const handleSingleBeamWattageChange = (wattage) => {
    setSelectBeamSingelWattage(wattage)
    // updateSelectedVariant(selectLowBeamWattage, selectHighBeamWattage, wattage);
    const newVariant = product?.led[0]?.variant?.find(v => `${v?.wattage}` === wattage);
    if (newVariant) {
      setSelectedLedVariantData(newVariant);
    }
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

  // ========== Hids Varient ============

  // HID variant selection handlers
  // useEffect(() => {
  //   if (product?.HID[0]?.variant) {
  //     const variants = product.HID[0].variant;
  //     const wattages = [...new Set(variants.map(v => v.wattage))].sort((a, b) => a - b);
  //     const lightColor = [...new Set(variants.map(v => v?.lightColor))]

  //     setAvailableHIDWattage(wattages.map(w => `${w}`));
  //     setAvailableHIDLowBeamVariant(wattages.map(w => `${w}`));
  //     setAvailableHIDHighBeamVariant(wattages.map(w => `${w}`));

  //     setAvailableHIDWattageLightColor(lightColor.map(l => l))
  //     setAvailableHIDLowBeamWattageLightColor(lightColor.map(l => l))
  //     setAvailableHIDHighBeamWattageLightColor(lightColor.map(l => l))

  //     // Set default variant
  //     const defaultVariant = variants[0];
  //     setSelectedHIDVariantData(defaultVariant);
  //     setSelectHIDLowBeamData(defaultVariant)
  //     setSelectHIDHighBeamData(defaultVariant)
  //     setSelectHIDLowBeamWattage(`${defaultVariant.wattage}`);
  //     setSelectHIDHighBeamWattage(`${defaultVariant.wattage}`)
  //     setSelectHIDWattage(`${defaultVariant.wattage}`)
  //     setSelectHIDLowBeamWattageLightColor(`${defaultVariant?.lightColor}`)
  //     setSelectHIDHighBeamWattageLightColor(`${defaultVariant?.lightColor}`)
  //     updateSelectedHIDVariant(`${defaultVariant.wattage}`, `${defaultVariant.wattage}`, `${defaultVariant.lightColor}`, `${defaultVariant.lightColor}`);

  //   }
  // }, [product]);

  // Update HID variant selection
  // const updateSelectedHIDVariant = (lowBeamWattage, highBeamWattage, lowBeamlightColor, highBeamLightColor) => {
  //   const lowBeamVariant = product?.HID[0]?.variant?.find(v => `${v.wattage}` === lowBeamWattage && `${v?.lightColor}` === lowBeamlightColor);
  //   setSelectHIDLowBeamData(lowBeamVariant);

  //   const highBeamVariant = product?.HID[0]?.variant.find(v => `${v.wattage}` === highBeamWattage && `${v.lightColor}` === highBeamLightColor);
  //   setSelectHIDHighBeamData(highBeamVariant);

  // };

  // const handleLowBeamHIDWattageChange = (wattage) => {
  //   setSelectHIDLowBeamWattage(wattage);
  //   updateSelectedHIDVariant(wattage, selectHIDHighBeamWattage, selectHIDLowBeamWattageLightColor, selectHIDHighBeamWattageLightColor);
  // };

  // const handleHighBeamHIDWattageChange = (wattage) => {
  //   setSelectHIDHighBeamWattage(wattage);
  //   updateSelectedHIDVariant(selectHIDLowBeamWattage, wattage, selectHIDLowBeamWattageLightColor, selectHIDHighBeamWattageLightColor);
  // };

  // const handleHIDLowBeamLightColorChange = (lightColor) => {
  //   setSelectHIDLowBeamWattageLightColor(lightColor);
  //   if (selectHIDLowBeamWattage) {
  //     updateSelectedHIDVariant(selectHIDLowBeamWattage, selectHIDHighBeamWattage, lightColor, selectHIDHighBeamWattageLightColor);
  //   }
  // };

  // const handleHIDHighBeamLightColorChange = (lightColor) => {
  //   setSelectHIDHighBeamWattageLightColor(lightColor);
  //   if (selectHIDHighBeamWattage) {
  //     updateSelectedHIDVariant(selectHIDLowBeamWattage, selectHIDHighBeamWattage, selectHIDLowBeamWattageLightColor, lightColor);
  //   }
  // };


  // //  this is for singel
  // const handleSingleBeamHIDWattageChange = wattage => {
  //   setSelectHIDWattage(wattage)
  //   const newVariant = product?.HID[0]?.variant?.find(v => `${v?.wattage}` === wattage);
  //   if (newVariant) {
  //     setSelectedHIDVariantData(newVariant);
  //   }
  // };

  // const handelSingelBeamHIDLightColorChange = lightColor => {
  //   setSelectHIDWattageLightColor(lightColor)
  //   const newVariant = product?.HID[0]?.variant?.find(v => `${v?.lightColor}` === lightColor);
  //   if (newVariant) {
  //     setSelectedHIDVariantData(newVariant);
  //   }
  // }
  // // ======= hid price 
  // const basedPriceForHid = selectedHIDVariantData?.basePrice || 0;
  // const lowBeemsBasedPriceHid = selectHIDLowBeamData?.basePrice || 0;
  // const highBeemBasedPriceHid = selectHIDHighBeamData?.basePrice || 0;

  // // Function to calculate total price
  // const calculateTotalPriceHid = () => {
  //   let price = isBeamsSeparate ? (lowBeemsBasedPriceHid + highBeemBasedPriceHid) : basedPriceForHid;
  //   let discountAmount = (price * discount) / 100;
  //   return price - discountAmount;
  // };

  // const totalPriceForHid = calculateTotalPriceHid();
  // const mainPriceForHid = isBeamsSeparate ? (lowBeemsBasedPriceHid + highBeemBasedPriceHid) : basedPriceForHid;


  // State for HID variant selection
  const [selectedHIDVariantData, setSelectedHIDVariantData] = useState(null);
  const [selectHIDLowBeamData, setSelectHIDLowBeamData] = useState(null);
  const [selectHIDHighBeamData, setSelectHIDHighBeamData] = useState(null);
  const [selectHIDLowBeamWattage, setSelectHIDLowBeamWattage] = useState(null);
  const [selectHIDHighBeamWattage, setSelectHIDHighBeamWattage] = useState(null);
  const [selectHIDWattage, setSelectHIDWattage] = useState(null);
  const [selectHIDWattageLightColor, setSelectHIDWattageLightColor] = useState(null)
  const [selectHIDLowBeamWattageLightColor, setSelectHIDLowBeamWattageLightColor] = useState(null);
  const [selectHIDHighBeamWattageLightColor, setSelectHIDHighBeamWattageLightColor] = useState(null);

  const [availableHIDWattage, setAvailableHIDWattage] = useState([]);
  const [availableHIDLowBeamVariant, setAvailableHIDLowBeamVariant] = useState([]);
  const [availableHIDHighBeamVariant, setAvailableHIDHighBeamVariant] = useState([]);
  const [availableHIDWattageLightColor, setAvailableHIDWattageLightColor] = useState([])
  const [availableHIDLowBeamWattageLightColor, setAvailableHIDLowBeamWattageLightColor] = useState(null);
  const [availableHIDHighBeamWattageLightColor, setAvailableHIDHighBeamWattageLightColor] = useState(null);

  useEffect(() => {
    if (product?.HID[0]?.variant.length > 0) {
      // Initialize available options
      const variants = product.HID[0].variant;
      const wattages = [...new Set(variants.map(v => v.wattage))].sort((a, b) => a - b);
      const lightColor = [...new Set(variants.map(v => v?.lightColor))]

      // Set states for available options
      setAvailableHIDWattage(wattages.map(w => `${w}`));
      setAvailableHIDLowBeamVariant(wattages.map(w => `${w}`));
      setAvailableHIDHighBeamVariant(wattages.map(w => `${w}`));

      setAvailableHIDWattageLightColor(lightColor.map(l => l))
      setAvailableHIDLowBeamWattageLightColor(lightColor.map(l => l))
      setAvailableHIDHighBeamWattageLightColor(lightColor.map(l => l))

      // Set the first variant as the default variant
      updateVariantHID(product.HID[0]?.variant[0]);
    }
  }, [product]);

  const handleOptionChangeHID = (option, featureType) => {
    if (!isOptionAvailableHID(option, featureType)) {
      return;
    }

    const newVariant = product.HID[0].variant.find(v => {
      switch (featureType) {
        case 'lowBeam':
          return `${v.wattage} W` === option;
        case 'highBeam':
          return `${v.wattage} W` === option;
        case 'wattage':
          return `${v.wattage} W` === option;
        case 'lowBeemColor':
          return v.lightColor === option;
        case 'highBeemColor':
          return v.lightColor === option;
        case 'lightColor':
          return v.lightColor === option;
        default:
          return false;
      }
    });

    if (newVariant) {
      updateVariantHID(newVariant);
    }
  };

  const updateVariantHID = (variant) => {
    setSelectedHIDVariantData(variant);
    setSelectHIDLowBeamData(`${variant.wattage} W`);
    setSelectHIDHighBeamData(`${variant.wattage} W`);
    setSelectHIDWattage(`${variant.wattage} W`);
    setSelectHIDWattageLightColor(variant.lightColor);
    setSelectHIDLowBeamWattageLightColor(variant.lightColor);
    setSelectHIDHighBeamWattageLightColor(variant.lightColor);

  };

  const isOptionAvailableHID = (option, type) => {
    return product.HID[0].variant.some(v => {
      switch (type) {
        case 'lowBeam':
          return `${v.wattage} W` === option;
        case 'highBeam':
          return `${v.wattage} W` === option;
        case 'lowBeemColor':
          return v.lightColor === option;
        case 'highBeemColor':
          return v.lightColor === option;
        case 'wattage':
          return `${v.wattage} W` === option;
        case 'lightColor':
          return v.lightColor === option;
        default:
          return false;
      }
    });
  };

  const basedPriceForHid = selectedHIDVariantData?.basePrice || 0;
  const lowBeemsBasedPriceHid = selectHIDLowBeamData?.basePrice || 0;
  const highBeemBasedPriceHid = selectHIDHighBeamData?.basePrice || 0;

  // Function to calculate total price
  const calculateTotalPriceHid = () => {
    let price = isBeamsSeparate ? (lowBeemsBasedPriceHid + highBeemBasedPriceHid) : basedPriceForHid;
    let discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  const totalPriceForHid = calculateTotalPriceHid();
  const mainPriceForHid = isBeamsSeparate ? (lowBeemsBasedPriceHid + highBeemBasedPriceHid) : basedPriceForHid;



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
    if (product?.android[0]?.variant.length > 0) {
      // Initialize available options
      const processors = new Set(product.android[0].variant.map(v => v.processorLabel));
      const rams = new Set(product.android[0].variant.map(v => v.ram));
      const roms = new Set(product.android[0].variant.map(v => v.rom));
      const carplays = new Set(product.android[0].variant.map(v => v.isAppleCarplayAndAndroidAutoSupported ? v.wirelessWired : 'Not Supported'));
      const cameraSupports = new Set(product.android[0].variant.map(v => v.is360CameraSupported));
      const simSupports = new Set(product.android[0].variant.map(v => v.isSimSupported));

      // Set states for available options
      setAvailableProcessors([...processors]);
      setAvailableRams([...rams].sort((a, b) => parseInt(a) - parseInt(b)).map(r => `${r} GB`));
      setAvailableRoms([...roms].sort((a, b) => parseInt(a) - parseInt(b)).map(r => `${r} GB`));
      setAvailableCarplays([...carplays]);
      setAvailable360CameraSupport([...cameraSupports]);
      setAvailableSimSupport([...simSupports]);

      // Set the first variant as the default variant
      updateVariant(product.android[0].variant[0]);
    }
  }, [product]);


  const handleOptionChangeAndroid = (option, featureType) => {
    if (!isOptionAvailable(option, featureType)) {
      return; // Do nothing if the option is disabled
    }

    const newVariant = product.android[0].variant.find(v => {
      switch (featureType) {
        case 'processor':
          return v.processorLabel === option;
        case 'ram':
          return `${v.ram} GB` === option;
        case 'rom':
          return `${v.rom} GB` === option;
        case 'carplay':
          return (v.isAppleCarplayAndAndroidAutoSupported ? v.wirelessWired : 'Not Supported') === option;
        case '360Camera':
          return v.is360CameraSupported === option;
        case 'sim':
          return v.isSimSupported === option;
        default:
          return false;
      }
    });

    if (newVariant) {
      updateVariant(newVariant);
    }
  };

  const updateVariant = (variant) => {
    setSelectedVariant(variant);
    setSelectedProcessor(variant.processorLabel);
    setSelectedRam(`${variant.ram} GB`);
    setSelectedRom(`${variant.rom} GB`);
    setSelectedCarplay(variant.isAppleCarplayAndAndroidAutoSupported ? variant.wirelessWired : 'Not Supported');
    setIsSelected360CameraSupported(variant.is360CameraSupported);
    setIsSelectedSim(variant.isSimSupported);
  };

  const isOptionAvailable = (option, type) => {
    return product.android[0].variant.some(v => {
      switch (type) {
        case 'processor':
          return v.processorLabel === option;
        case 'ram':
          return v.processorLabel === selectedProcessor && `${v.ram} GB` === option;
        case 'rom':
          return v.processorLabel === selectedProcessor && `${v.rom} GB` === option;
        case 'carplay':
          return v.processorLabel === selectedProcessor && (v.isAppleCarplayAndAndroidAutoSupported ? v.wirelessWired : 'Not Supported') === option;
        case '360Camera':
          return v.processorLabel === selectedProcessor && v.is360CameraSupported === option;
        case 'sim':
          return v.processorLabel === selectedProcessor && v.isSimSupported === option;
        default:
          return false;
      }
    });
  };

  const basedPriceForAndroid = selectedVariant?.basePrice || 0;
  const canbusPriceForAndroid = selectedModelData?.canbus?.isCanbusRequired ? (selectedModelData?.canbus?.canbusPrice || 0) : 0;
  const framecostForAndroid = selectedModelData?.frameCost || 0;
  const totalPirceAndroid = basedPriceForAndroid + canbusPriceForAndroid + framecostForAndroid
  const androidPrice = basedPriceForAndroid - (discount * basedPriceForAndroid / 100) + framecostForAndroid + canbusPriceForAndroid;

  // ========= this is for camera variant ==========

  const [selectedCameraVariantData, setSelectedCameraVariantData] = useState(null);
  const [selectedCameraQuality, setSelectedCameraQuality] = useState(null);
  const [selectedCameraGuideline, setSelectedCameraGuideline] = useState(null);
  const [selectedCameraFieldView, setSelectedCameraFieldView] = useState(null);

  const [availableCameraQuality, setAvailableCameraQuality] = useState([]);
  const [availableCameraGuideline, setAvailableCameraGuideline] = useState([]);
  const [availableCameraFieldView, setAvailableCameraFieldView] = useState([]);

  useEffect(() => {
    if (product?.camera[0]?.variant.length > 0) {
      initializeAvailableOptions();
      updateSelectionWithVariant(product.camera[0].variant[0]);
    }
  }, [product]);

  const initializeAvailableOptions = () => {
    const uniqueCameraQualities = new Set();
    const uniqueCameraGuidelines = new Set();
    const uniqueCameraFieldViews = new Set();

    product.camera[0].variant.forEach(v => {
      uniqueCameraQualities.add(v.cameraQuality);
      uniqueCameraGuidelines.add(v.areThereGuidelines ? v.guidelinesType : "No");
      uniqueCameraFieldViews.add(v.fieldOfViewType);
    });

    setAvailableCameraQuality([...uniqueCameraQualities]);
    setAvailableCameraGuideline([...uniqueCameraGuidelines]);
    setAvailableCameraFieldView([...uniqueCameraFieldViews]);
  };

  const updateSelectionWithVariant = (variant) => {
    setSelectedCameraVariantData(variant);
    setSelectedCameraQuality(variant.cameraQuality);
    setSelectedCameraGuideline(variant.areThereGuidelines ? variant.guidelinesType : "No");
    setSelectedCameraFieldView(variant.fieldOfViewType);
  };

  const isOptionAvailableForCamera = (option, featureType) => {
    return product?.camera[0]?.variant.some(variant => {
      switch (featureType) {
        case 'quality':
          return variant.cameraQuality === option;
        case 'guideline':
          return (variant.areThereGuidelines ? variant.guidelinesType : "No") === option;
        case 'fieldView':
          return variant.fieldOfViewType === option;
        default:
          return false;
      }
    });
  };

  const handleOptionChange = (option, featureType) => {
    if (!isOptionAvailableForCamera(option, featureType)) {
      return; // Do nothing if the option is disabled
    }

    const newVariant = product.camera[0].variant.find(v => {
      switch (featureType) {
        case 'quality':
          return v.cameraQuality === option;
        case 'guideline':
          return (v.areThereGuidelines ? v.guidelinesType : "No") === option;
        case 'fieldView':
          return v.fieldOfViewType === option;
        default:
          return false;
      }
    });

    if (newVariant) {
      updateSelectionWithVariant(newVariant);
    }
  };

  const basedPriceForCamera = selectedCameraVariantData?.basePrice || 0;

  // Function to calculate total price
  const calculateTotalPriceCamera = () => {
    let discountAmount = (basedPriceForCamera * discount) / 100;
    return basedPriceForCamera - discountAmount;
  };

  const totalPriceForCamera = calculateTotalPriceCamera();
  // ========= this is for camera varient ==========

  // ========= this is for  amplifire ==========
  const [selectedAmplifierVariantData, setSelectedAmplifierVariantData] = useState(null);
  const [availableTotalChannels, setAvailableTotalChannels] = useState([]);
  const [availableWattageForAmplifier, setAvailableWattageForAmplifier] = useState([]);

  const [selectedTotalChannels, setSelectedTotalChannels] = useState(null);
  const [selectedWattageForAmplifier, setSelectedWattageForAmplifier] = useState(null);

  useEffect(() => {
    if (product?.amplifiers[0]?.variant.length > 0) {
      initializeAvailableOptionsAmplifiers();
      updateSelectionWithVariantAmplifiers(product.amplifiers[0].variant[0]);
    }
  }, [product]);

  const initializeAvailableOptionsAmplifiers = () => {
    const uniqueTotalChannels = new Set();
    const uniqueWattage = new Set();

    product.amplifiers[0].variant.forEach(v => {
      uniqueTotalChannels.add(v.totalChannels);
      uniqueWattage.add(v.wattage);
    });

    setAvailableTotalChannels([...uniqueTotalChannels]);
    setAvailableWattageForAmplifier([...uniqueWattage]);
  };

  const updateSelectionWithVariantAmplifiers = (variant) => {
    setSelectedAmplifierVariantData(variant);
    setSelectedTotalChannels(variant?.totalChannels);
    setSelectedWattageForAmplifier(variant?.wattage);
  };

  const isOptionAvailableForAmplifiers = (option, featureType) => {
    return product?.amplifiers[0]?.variant.some(variant => {
      switch (featureType) {
        case 'totalChannels':
          return variant.totalChannels === option;
        case 'wattage':
          return variant.wattage === option;
        default:
          return false;
      }
    });
  };

  const handleOptionChangeAmplifiers = (option, featureType) => {
    if (!isOptionAvailableForAmplifiers(option, featureType)) {
      return; // Do nothing if the option is disabled
    }

    const newVariant = product.amplifiers[0].variant.find(v => {
      switch (featureType) {
        case 'totalChannels':
          return v.totalChannels === option;
        case 'wattage':
          return v.wattage === option;
        default:
          return false;
      }
    });

    if (newVariant) {
      updateSelectionWithVariantAmplifiers(newVariant);
    }
  };

  const basedPriceForAmplifire = selectedAmplifierVariantData?.basePrice || 0;

  // Function to calculate total price
  const calculateTotalPriceAmplifire = () => {
    let discountAmount = (basedPriceForAmplifire * discount) / 100;
    return basedPriceForAmplifire - discountAmount;
  };

  const totalPriceForAmplifire = calculateTotalPriceAmplifire();

  // ========= this is for isFmBt varient ==========
  const basedPriceForFmBt = product?.fMBT[0]?.basePrice || 0;

  // Function to calculate total price
  const calculateTotalPriceFmBt = () => {
    let discountAmount = (basedPriceForFmBt * discount) / 100;
    return basedPriceForFmBt - discountAmount;
  };

  const totalPriceForFmBt = calculateTotalPriceFmBt();


  // ========= this is for bassTube varient ==========
  const basedPriceForbassTube = product?.bassTube[0]?.basePrice || 0;

  // Function to calculate total price
  const calculateTotalPriceBassTube = () => {
    let discountAmount = (basedPriceForbassTube * discount) / 100;
    return basedPriceForbassTube - discountAmount;
  };

  const totalPriceForBassTube = calculateTotalPriceBassTube();


  // ========= this is for speakers varient ==========
  const basedPriceForSpeakers = product?.speakers[0]?.basePrice || 0;

  // Function to calculate total price
  const calculateTotalPriceSpeakers = () => {
    let discountAmount = (basedPriceForSpeakers * discount) / 100;
    return basedPriceForSpeakers - discountAmount;
  };

  const totalPriceForSpeakers = calculateTotalPriceSpeakers();

  // ========= this is for chargers varient ==========
  const basedPriceForChargers = product?.chargers[0]?.basePrice || 0;

  // Function to calculate total price
  const calculateTotalPriceChargers = () => {
    let discountAmount = (basedPriceForChargers * discount) / 100;
    return basedPriceForChargers - discountAmount;
  };

  const totalPriceForChargers = calculateTotalPriceChargers();


  // ========= this is for DampingSheets varient ==========
  const basedPriceForDampingSheets = product?.dampingSheets[0]?.basePrice || 0;

  // Function to calculate total price
  const calculateTotalPriceDampingSheets = () => {
    let discountAmount = (basedPriceForDampingSheets * discount) / 100;
    return basedPriceForDampingSheets - discountAmount;
  };

  const totalPriceForDampingSheets = calculateTotalPriceDampingSheets();

  // ============ Poroduct verient details
  const productVarientDetails = {
    led: {
      variantData: selectedLedVariantData,
      totalPrice: totalPriceForLed,
      mainPrice: mainPriceForLed,
      isBeamsSeparate: isBeamsSeparate,
    },
    hid: {
      variantData: selectedHIDVariantData,
      totalPrice: totalPriceForHid,
      mainPrice: mainPriceForHid,
      isBeamsSeparate: isBeamsSeparate,
    },
    android: {
      variantData: selectedVariant,
      totalPrice: androidPrice,
      basedPrice: basedPriceForAndroid,
      canbusPrice: canbusPriceForAndroid,
      frameCost: framecostForAndroid,
    },
    camera: {
      variantData: selectedCameraVariantData,
      totalPrice: totalPriceForCamera,
      basedPrice: basedPriceForCamera,
    },
    amplifiers: {
      variantData: selectedAmplifierVariantData,
      totalPrice: totalPriceForAmplifire,
      basedPrice: basedPriceForAmplifire,
    },
    fmBt: {
      variantData: product?.fMBT?.map(fm => ({
        controlOption: fm?.controlOption,
        price: fm?.basePrice
      })),
      basedPrice: basedPriceForFmBt,
      totalPrice: totalPriceForFmBt,
    },
    bassTube: {
      variantData: product?.bassTube?.map(bass => ({
        wattage: bass?.wattage,
        speakerSize: bass?.speakerSize,
        price: bass?.basePrice
      })),
      basedPrice: basedPriceForbassTube,
      totalPrice: totalPriceForBassTube,
    },
    speakers: {
      variantData: product?.speakers?.map(speaker => ({
        speakerSize: speaker?.speakerSize,
        price: speaker?.basePrice
      })),
      basedPrice: basedPriceForSpeakers,
      totalPrice: totalPriceForSpeakers,
    },
    chargers: {
      variantData: product?.chargers?.map(charger => ({
        thickness: charger?.thickness,
        sheetsInOneBox: charger?.sheetsInOneBox,
        price: charger?.basePrice
      })),
      basedPrice: basedPriceForChargers,
      totalPrice: totalPriceForChargers,
    },
    dampingSheets: {
      variantData: product?.dampingSheets?.map(dampingSheet => ({
        wattage: dampingSheet?.wattage,
        price: dampingSheet?.basePrice
      })),
      basedPrice: basedPriceForDampingSheets,
      totalPrice: totalPriceForDampingSheets,
    }
  };

  const selectedCarInfo = {
    carBrand: selectedBrand,
    carName: selectedCar,
    carGeneration: selectedGeneration,
    carModel: selectedModel,
    carModelData: selectedModelData,
  }
  // =========== add to card =============

  const selectedProductPrice = () => {
    if (product?.dampingSheets[0]?.isDampingSheets) {
      return totalPriceForDampingSheets
    } else if (product?.speakers[0]?.isSpeakers) {
      return totalPriceForSpeakers
    } else if (product?.bassTube[0]?.isBassTube) {
      return totalPriceForBassTube
    } else if (product?.fMBT[0]?.isFmBt) {
      return totalPriceForFmBt
    } else if (product?.android[0]?.isAndroid) {
      return androidPrice
    } else if (product?.led[0]?.isLed) {
      return totalPriceForLed
    } else if (product?.HID[0]?.isHID) {
      return totalPriceForHid
    } else if (product?.camera[0]?.isCamera) {
      return totalPriceForCamera
    } else if (product?.amplifiers[0]?.isAmplifiers) {
      return totalPriceForAmplifire
    }
  }

  // Call the function to get the selected product price
  const priceTotalSelectedProduct = selectedProductPrice();


  const addToCart = async (id) => {
    const convertPrice = parseInt(product?.price);
    // Check if the user is logged in
    console.log(id, "form add to cart ")

    if (!user) {
      // User is not logged in, show an alert
      Swal.fire({
        icon: "error",
        title: "Please log in to add the product to your cart",
        showConfirmButton: true
      });
      return;
    }

    const cardData = {
      product: product?._id,
      carInfo: selectedCarInfo,
      productDetails: productVarientDetails,
      quantity: 1,
      totalPrice: priceTotalSelectedProduct,
      email: user?.email,
      discount: discount,
      basedPrice: priceTotalSelectedProduct,
      status: "unpaid"
    }

    const res = await fetch(addToCartUrl(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cardData)
    });

    const data = await res.json();

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

  //  ======= payment ======
  const checkoutHandler = async (amount) => {
    const { data: { order } } = await axios.post(checkoutOrderUrl, {
      amount
    });

    const handlePaymentSuccess = async (response) => {
      // Construct the order object
      const orderData = {
        shippingAddress: addressData[0],
        clientName: user?.displayName,
        clientPhone: user?.phone,
        paymentDetails: JSON.stringify({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        }),
        productDetails: [
          {
            productDetails: productVarientDetails,
            productId: product?._id,
            quantity: 1,
            price: priceTotalSelectedProduct,
            discount: discount,
          }
        ],
        carInfo: selectedCarInfo,
        product: product?._id,
        totalPrice: priceTotalSelectedProduct,
        email: user?.email,
        quantity: 1,
        status: 'pending',
      };

      // Call your order API
      try {
        const orderResponse = await axios.post(addOrderUrl, orderData);
        console.log('Order created:', orderResponse.data);
        router.push(`/paymentsuccess`);
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };

    const productSummary = `${product?.productName}, Price: ₹${priceTotalSelectedProduct}, Discount: ${discount}%`;

  // Razorpay options
    const options = {
      key: process.env.RAZORPAY_API_KEY,
      amount: order.amount,
      currency: "INR",
      name: user?.displayName,
      description: productSummary, 
      image: product?.images[0],
      order_id: order?.id,
      callback_url: paymentverificationUrl,
      prefill: {
        name: user?.displayName,
        email: user?.email,
        contact: user?.email
      },
      notes: {
        "address": addressData[0],
        "productDetails": JSON.stringify({
          productId: product?._id,
          variant: productVarientDetails,
          quantity: 1,
          price: priceTotalSelectedProduct,
          discount: discount
        })
      },
      theme: {
        "color": "#121212"
      },
      handler: handlePaymentSuccess,
    };

    // Initialize and open Razorpay payment gateway
    const razor = new window.Razorpay(options);
    razor.open();
  };



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

                {
                  product?.dampingSheets[0]?.isDampingSheets && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(totalPriceForDampingSheets)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(basedPriceForDampingSheets)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        <span>
                          {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
                        </span>
                      </p>
                    </>
                  )
                }

                {
                  product?.speakers[0]?.isSpeakers && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(totalPriceForSpeakers)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(basedPriceForSpeakers)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        <span>
                          {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
                        </span>
                      </p>
                    </>
                  )
                }

                {
                  product?.bassTube[0]?.isBassTube && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(totalPriceForBassTube)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(basedPriceForbassTube)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        <span>
                          {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
                        </span>
                      </p>
                    </>
                  )
                }

                {
                  product?.fMBT[0]?.isFmBt && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(totalPriceForFmBt)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(basedPriceForFmBt)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        <span>
                          {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
                        </span>
                      </p>
                    </>
                  )
                }

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
                          selectedModelData?.canbus?.isCanbusRequired ? (
                            <span>
                              {`Since Canbus is also required, so extra cost of Rs. ${canbusPriceForAndroid} is added`}
                            </span>
                          ) : (
                            <span>
                              {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
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
                          selectedModelData?.beams?.isLowAndHighBeamsSeparate ? (
                            <span>
                              {`Since you car supports 2 Lights, therefore cost of 2 lights is applicable`}
                            </span>
                          ) : (
                            <span>
                              {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
                            </span>
                          )
                        }
                      </p>
                    </>
                  )
                }

                {
                  product?.HID[0]?.isHID && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(totalPriceForHid)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(mainPriceForHid)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        {
                          selectedModelData?.beams?.isLowAndHighBeamsSeparate ? (
                            <span>
                              {`Since you car supports 2 Lights, therefore cost of 2 lights is applicable`}
                            </span>
                          ) : (
                            <span>
                              {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
                            </span>
                          )
                        }
                      </p>
                    </>
                  )
                }

                {
                  product?.camera[0]?.isCamera && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(totalPriceForCamera)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(basedPriceForCamera)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        <span>
                          {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
                        </span>
                      </p>
                    </>
                  )
                }

                {
                  product?.amplifiers[0]?.isAmplifiers && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(totalPriceForAmplifire)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(basedPriceForAmplifire)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        <span>
                          {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
                        </span>
                      </p>
                    </>
                  )
                }

                {
                  product?.chargers[0]?.isChargers && (
                    <>
                      <div className="flex gap-2 mt-2 mb-0 text-[1.25rem]">
                        <h1 className="font-bold text-slate-900">
                          ₹ {Math.floor(totalPriceForChargers)}
                        </h1>
                        <span className="font-bold text-gray-400 ">
                          MRP:₹ <span className='line-through'>{Math.floor(basedPriceForChargers)}</span>
                        </span>
                        <span className="text-green-500 font-bold">
                          {Math.floor(product?.discount)} % off
                        </span>
                      </div>
                      <p className='text-[13px] mt-0'>
                        <span>
                          {`MRP incl. all taxes, Add'l charges may apply on discounted price`}
                        </span>
                      </p>
                    </>
                  )
                }

                {/* =========== Amplifiers Varient ========== */}
                <div>
                  {
                    product?.amplifiers[0]?.isAmplifiers && (
                      <div className='my-4'>
                        {/* Total Channels Selection */}
                        <div>
                          <label className="font-bold text-slate-900">Select Total Channel</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableTotalChannels.map((totalChannels, index) => {
                              const isOptionEnabled = isOptionAvailableForAmplifiers(totalChannels, 'totalChannels');
                              return (
                                <div
                                  key={index}
                                  className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedTotalChannels === totalChannels ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                  onClick={() => handleOptionChangeAmplifiers(totalChannels, 'totalChannels')}
                                >
                                  {totalChannels}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Wattage Selection */}
                        <div>
                          <label className="font-bold text-slate-900">Select Total Wattage</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableWattageForAmplifier?.map((wattage, index) => {
                              const isOptionEnabled = isOptionAvailableForAmplifiers(wattage, 'wattage');
                              return (
                                <div
                                  key={index}
                                  className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedWattageForAmplifier === wattage ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                  onClick={() => handleOptionChangeAmplifiers(wattage, 'wattage')}
                                >
                                  {wattage} W
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
                {/*============ varient select for camera======== */}
                <div>
                  {product?.camera[0]?.isCamera && (
                    <div className='my-4'>
                      {/* Select Your Camera Quality */}
                      <div>
                        <label className="font-bold text-slate-900">Select Your Camera Quality</label>
                        <div className="flex items-center gap-4 my-2">
                          {availableCameraQuality.map((cameraQuality, index) => {
                            const isOptionEnabled = isOptionAvailableForCamera(cameraQuality, 'quality');
                            return (
                              <div
                                key={index}
                                className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedCameraQuality === cameraQuality ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                onClick={() => handleOptionChange(cameraQuality, 'quality')}
                              >
                                {cameraQuality}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Select Your Camera Guidelines */}
                      <div>
                        <label className="font-bold text-slate-900">Select Your Camera Guidelines</label>
                        <div className="flex items-center gap-4 my-2">
                          {availableCameraGuideline.map((cameraGuide, index) => {
                            const isOptionEnabled = isOptionAvailableForCamera(cameraGuide, 'guideline');
                            return (
                              <div
                                key={index}
                                className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedCameraGuideline === cameraGuide ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                onClick={() => handleOptionChange(cameraGuide, 'guideline')}
                              >
                                {cameraGuide}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Select Your Camera Field Of View */}
                      <div>
                        <label className="font-bold text-slate-900">Select Your Camera Field Of View</label>
                        <div className="flex items-center gap-4 my-2">
                          {availableCameraFieldView.map((cameraView, index) => {
                            const isOptionEnabled = isOptionAvailableForCamera(cameraView, 'fieldView');
                            return (
                              <div
                                key={index}
                                className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedCameraFieldView === cameraView ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                onClick={() => handleOptionChange(cameraView, 'fieldView')}
                              >
                                {cameraView}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* ========== Varient Select For Android======== */}
                <div>
                  <div>
                    {product?.android[0]?.isAndroid && (

                      <div className='my-4'>
                        {/* Select Your Processor */}
                        <div>
                          <label className="font-bold text-slate-900">Select Your Processor</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableProcessors.map((processor, index) => {
                              const isOptionEnabled = isOptionAvailable(processor, 'processor');
                              return (
                                <div
                                  key={index}
                                  className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedProcessor === processor ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                  onClick={() => handleOptionChangeAndroid(processor, 'processor')}
                                >
                                  {processor}
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Select Your Ram */}
                        <div>
                          <label className="font-bold text-slate-900">Select Your Ram</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableRams.map((ram, index) => {
                              const isOptionEnabled = isOptionAvailable(ram, 'ram');
                              return (
                                <div
                                  key={index}
                                  className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedRam === ram ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                  onClick={() => handleOptionChangeAndroid(ram, 'ram')}
                                >
                                  {ram}
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Select Your Rom */}
                        <div>
                          <label className="font-bold text-slate-900">Select Your ROM</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableRoms.map((rom, index) => {
                              const isOptionEnabled = isOptionAvailable(rom, 'rom');
                              return (
                                <div
                                  key={index}
                                  className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedRom === rom ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                  onClick={() => handleOptionChangeAndroid(rom, 'rom')}
                                >
                                  {rom}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        {/* Carplay Selection */}
                        <div>
                          <label className="font-bold text-slate-900">Select Your Carplay</label>
                          <div className="flex items-center gap-4 my-2">
                            {availableCarplays.map((carplay, index) => {
                              const isOptionEnabled = isOptionAvailable(carplay, 'carplay');

                              return (
                                <div
                                  key={index}
                                  className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectedCarplay === carplay ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                  onClick={() => handleOptionChangeAndroid(carplay, 'carplay')}
                                >
                                  {carplay}
                                </div>
                              )
                            })}
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
                            {availableWattage?.map((wattage, index) => (
                              <div
                                key={index}
                                className={`border-[0.3px] rounded px-4 py-[2px] text-center min-w-[4.55rem] cursor-pointer ${selectBeamSingelWattage === wattage ? 'selected' : ''}`}
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

                {/* ============Hids Varient============= */}
                <div>
                  {selectedModelData && product?.HID[0]?.isHID && (
                    <div>
                      {selectedModelData?.beams?.isLowAndHighBeamsSeparate ? (
                        <>
                          {/* Low Beam Wattage Selection */}
                          <div>
                            <label className="font-bold text-slate-900">Select Low Beam Variant (Wattage)</label>
                            <div className="flex items-center gap-4 my-2">
                              {availableHIDLowBeamVariant.map((lowBeam, index) => {
                                const isOptionEnabled = isOptionAvailableHID(lowBeam, 'lowBeam');

                                return (
                                  <div
                                    key={index}
                                    className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectHIDLowBeamWattage === lowBeam ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                    onClick={() => handleOptionChangeHID(lowBeam, 'wattage')}
                                  >
                                    {lowBeam}
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="font-bold text-slate-900">Select Low Beam Variant (Light Color)</label>
                            <div className="flex items-center gap-4 my-2">
                              {availableHIDLowBeamWattageLightColor.map((lowBeemColor, index) => {
                                const isOptionEnabled = isOptionAvailableHID(lowBeemColor, 'lowBeemColor');

                                return (
                                  <div
                                    key={index}
                                    className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectHIDLowBeamWattageLightColor === lowBeemColor ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                    onClick={() => handleOptionChangeHID(lowBeemColor, 'lowBeemColor')}
                                  >
                                    {lowBeemColor}
                                  </div>
                                )
                              })}
                            </div>
                          </div>



                          {/* High Beam Light Color Selection */}
                          <div>
                            <label className="font-bold text-slate-900">Select Low Beam Variant (Light Color)</label>
                            <div className="flex items-center gap-4 my-2">
                              {availableHIDHighBeamVariant.map((highBeam, index) => {
                                const isOptionEnabled = isOptionAvailableHID(highBeam, 'highBeam');
                                return (
                                  <div
                                    key={index}
                                    className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectHIDHighBeamWattage === highBeam ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                    onClick={() => handleOptionChangeHID(highBeam, 'highBeam')}
                                  >
                                    {highBeam}
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="font-bold text-slate-900">Select High Beam Variant (Light Color)</label>
                            <div className="flex items-center gap-4 my-2">
                              {availableHIDHighBeamWattageLightColor.map((highBeemColor, index) => {
                                const isOptionEnabled = isOptionAvailableHID(highBeemColor, 'highBeemColor');

                                return (
                                  <div
                                    key={index}
                                    className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectHIDHighBeamWattageLightColor === highBeemColor ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                    onClick={() => handleOptionChangeHID(highBeemColor, 'highBeemColor')}
                                  >
                                    {highBeemColor}
                                  </div>
                                )
                              })}
                            </div>
                          </div>

 
                        </>
                      ) : (
                        // Single Beam Wattage Selection
                        <>
                          {/* Single Beam Wattage Selection */}
                          <div>
                            <label className="font-bold text-slate-900">Select Variant (Wattage)</label>
                            <div className="flex items-center gap-4 my-2">
                              {availableHIDWattage.map((wattage, index) => {
                                const isOptionEnabled = isOptionAvailableHID(wattage, 'wattage');
                                return (
                                  <div
                                    key={index}
                                    className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectHIDWattage === wattage ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                    onClick={() => handleOptionChangeHID(wattage, 'wattage')}
                                  >
                                    {wattage}
                                  </div>
                                )
                                
                              })}
                            </div>
                          </div>

                          {/* Single Beam Light Color Selection */}
                          <div>
                            <label className="font-bold text-slate-900">Select Variant (Light Color)</label>
                            <div className="flex items-center gap-4 my-2">
                              {availableHIDWattageLightColor.map((lightColor, index) => {
                                const isOptionEnabled = isOptionAvailableHID(lightColor, 'lightColor');

                                return (
                                  <div
                                    key={index}
                                    className={`border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem] cursor-pointer ${selectHIDWattageLightColor === lightColor ? 'selected' : ''} ${!isOptionEnabled ? 'disabled cursor-none' : ''}`}
                                    onClick={() => handleOptionChangeHID(lightColor, 'lightColor')}
                                  >
                                    {lightColor}
                                  </div>
                                )
                                 
                              })}
                            </div>
                          </div>
                        </>

                      )}
                    </div>
                  )}
                </div>
                {/* ============Hids Varient============= */}
                <hr
                  className='my-2'
                />

                <div className="mt-4 flex flex-col items-center space-y-4 border-t border-b py-4 w-full">
                  <button
                    onClick={() => checkoutHandler(priceTotalSelectedProduct)}
                    className={`font-semibold hover:before:bg-blackborder-black relative h-[50px] w-full rounded overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 ${selectedModel ? 'hover:text-white hover:shadow-white hover:before:left-0 hover:before:w-full' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!selectedModel}
                  >
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      <BsCart className="text-[1.2rem]" /> Buy Now
                    </span>
                  </button>

                  <button
                    onClick={() => addToCart(product?._id)}
                    className={`font-semibold hover:before:bg-blackborder-black relative h-[50px] w-full rounded overflow-hidden border border-black bg-black px-3 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 ${selectedModel ? 'hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!selectedModel}
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
                    <div>
                      <div>
                        {
                          product?.fMBT[0]?.isFmBt && (
                            <div>
                              {product?.fMBT?.map((fm) => {
                                return (
                                  <div className="flex gap-2 flex-col">
                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Control Option :
                                      </span>
                                      <span className='mx-2'>
                                        {fm?.controlOption}
                                      </span>
                                    </h1>

                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Control Option :
                                      </span>
                                      <span className='mx-2'>
                                        {fm?.controlOption}
                                      </span>
                                    </h1>

                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Price :
                                      </span>
                                      <span className='mx-2'>
                                        {fm?.basePrice}
                                      </span>
                                    </h1>
                                  </div>
                                )
                              })}
                            </div>
                          )
                        }
                      </div>

                      <div>
                        {
                          product?.bassTube[0]?.isBassTube && (
                            <div>
                              {product?.bassTube?.map((bass) => {
                                return (
                                  <div className="flex gap-2 flex-col">
                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Wattage :
                                      </span>
                                      <span className='mx-2'>
                                        {bass?.wattage}
                                      </span>
                                    </h1>

                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Speaker Size :
                                      </span>
                                      <span className='mx-2'>
                                        {bass?.speakerSize}
                                      </span>
                                    </h1>

                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Price :
                                      </span>
                                      <span className='mx-2'>
                                        {bass?.basePrice}
                                      </span>
                                    </h1>
                                  </div>
                                )
                              })}
                            </div>
                          )
                        }
                      </div>

                      <div>
                        {
                          product?.speakers[0]?.isSpeakers && (
                            <div>
                              {product?.speakers?.map((specker) => {
                                return (
                                  <div className="flex gap-2 flex-col">
                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Speaker Size :
                                      </span>
                                      <span className='mx-2'>
                                        {specker?.speakerSize}
                                      </span>
                                    </h1>
                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Price :
                                      </span>
                                      <span className='mx-2'>
                                        {specker?.basePrice}
                                      </span>
                                    </h1>
                                  </div>
                                )
                              })}
                            </div>
                          )
                        }
                      </div>

                      <div>
                        {
                          product?.dampingSheets[0]?.isDampingSheets && (
                            <div>
                              {product?.dampingSheets?.map((carger) => {
                                return (
                                  <div className="flex gap-2 flex-col">
                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Wattage :
                                      </span>
                                      <span className='mx-2'>
                                        {carger?.wattage} w
                                      </span>
                                    </h1>
                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Price :
                                      </span>
                                      <span className='mx-2'>
                                        {demping?.basePrice}
                                      </span>
                                    </h1>
                                  </div>
                                )
                              })}
                            </div>
                          )
                        }
                      </div>

                      <div>
                        {
                          product?.chargers[0]?.isChargers && (
                            <div>
                              {product?.chargers?.map((carger) => {
                                return (
                                  <div className="flex gap-2 flex-col">
                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Wattage :
                                      </span>
                                      <span className='mx-2'>
                                        {carger?.wattage} W
                                      </span>
                                    </h1>

                                    <h1 className="text-[1.2rem]">
                                      <span className="font-bold">
                                        ✅ Price :
                                      </span>
                                      <span className='mx-2'>
                                        Rs. {carger?.basePrice}
                                      </span>
                                    </h1>
                                  </div>
                                )
                              })}
                            </div>
                          )
                        }
                      </div>
                    </div>

                    <div>
                      {
                        product?.amplifiers[0]?.isAmplifiers && selectedAmplifierVariantData && (
                          <div className="flex gap-2 flex-col">
                            <h1 className="text-[1.2rem]">
                              <span className="font-bold">
                                ✅ Total Channels :
                              </span>
                              <span className='mx-2'>
                                {selectedAmplifierVariantData?.totalChannels}
                              </span>
                            </h1>

                            <h1 className="text-[1.2rem]">
                              <span className="font-bold">
                                ✅ Wattage :
                              </span>
                              <span className='mx-2'>
                                {selectedAmplifierVariantData?.wattage}
                              </span>
                            </h1>

                            <h1 className="text-[1.2rem]">
                              <span className="font-bold">
                                ✅ Price :
                              </span>
                              <span className='mx-2'>
                                {selectedAmplifierVariantData?.basePrice}
                              </span>
                            </h1>
                          </div>
                        )
                      }
                    </div>

                    <div>
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
                    </div>

                    <div>
                      {
                        product?.camera[0]?.isCamera && selectedCameraVariantData && (
                          <div className="flex gap-2 flex-col">

                            <h1 className="text-[1.2rem]">
                              <span className="font-bold">
                                ✅ Camera Quality :
                              </span>
                              <span className='mx-2'>
                                {selectedCameraVariantData?.cameraQuality}
                              </span>
                            </h1>
                            <h1 className="text-[1.2rem]">
                              <span className="font-bold">
                                ✅ Price :
                              </span>
                              <span className='mx-2'>
                                {selectedCameraVariantData?.basePrice}
                              </span>
                            </h1>
                            <h1 className="text-[1.2rem]">
                              <span className="font-bold">
                                ✅ Field Of View Type :
                              </span>
                              <span className='mx-2'>
                                {selectedCameraVariantData?.fieldOfViewType}
                              </span>
                            </h1>
                            <h1 className="text-[1.2rem]">
                              <span className="font-bold">
                                ✅ Guidelines :
                              </span>
                              <span className='mx-2'>
                                {
                                  selectedCameraVariantData?.isAppleCarplayAndAndroidAutoSupported ? (
                                    <span>
                                      {selectedCameraVariantData?.guidelinesType}
                                    </span>
                                  ) : "Not Supported"
                                }
                              </span>
                            </h1>
                          </div>
                        )
                      }
                    </div>

                    <div>
                      {
                        selectedModelData?.beams?.isLowAndHighBeamsSeparate ? (
                          <>
                            {
                              selectedModelData && product?.led[0]?.isLed && selectedLowBeamVariantData && selectedHighBeamVariantData && (
                                <div className="flex gap-2 flex-col">
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Wattage For Low Beam:
                                    </span>
                                    <span className='mx-2'>
                                      {selectedLowBeamVariantData?.wattage}
                                    </span>
                                  </h1>

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Wattage For High Beam:
                                    </span>
                                    <span className='mx-2'>
                                      {selectedHighBeamVariantData?.wattage}
                                    </span>
                                  </h1>

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Sockets Support Low Beam:
                                    </span>
                                    <span className='mx-2 flex gap-2 items-center'>
                                      {selectedLowBeamVariantData?.socketsSupported.map((soket) => {
                                        return (
                                          <span className='border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem]'>{soket}</span>
                                        )
                                      })}
                                    </span>
                                  </h1>

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Sockets Support High Beam:
                                    </span>
                                    <span className='mx-2 flex gap-2 items-center'>
                                      {selectedHighBeamVariantData?.socketsSupported.map((soket) => {
                                        return (
                                          <span className='border-[0.3px] rounded px-4 py-[3px] text-center min-w-[4.55rem]'>{soket}</span>
                                        )
                                      })}
                                    </span>
                                  </h1>

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Base Price Low Beam:
                                    </span>
                                    <span className='mx-2'>
                                      Rs. {selectedLowBeamVariantData?.basePrice}
                                    </span>
                                  </h1>

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Base Price High Beam:
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

                    <div>
                      {
                        selectedModelData?.beams?.isLowAndHighBeamsSeparate ? (
                          <>
                            {
                              selectedModelData && product?.HID[0]?.isHID && selectHIDHighBeamData && selectHIDLowBeamData && (
                                <div className="flex gap-2 flex-col">
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Wattage For Low Beam:
                                    </span>
                                    <span className='mx-2'>
                                      {selectHIDLowBeamData?.wattage}
                                    </span>
                                  </h1>

                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Wattage For High Beam:
                                    </span>
                                    <span className='mx-2'>
                                      {selectHIDHighBeamData?.wattage}
                                    </span>
                                  </h1>



                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Light Color Support:
                                    </span>
                                    <span className='mx-2 flex gap-2 items-center'>
                                      {selectHIDHighBeamData?.lightColor}
                                    </span>
                                  </h1>


                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Base Price Low Beam:
                                    </span>
                                    <span className='mx-2'>
                                      Rs. {selectHIDLowBeamData?.basePrice}
                                    </span>
                                  </h1>


                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Base Price High Beam:
                                    </span>
                                    <span className='mx-2'>
                                      Rs. {selectHIDHighBeamData?.basePrice}
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
                              selectedModelData && product?.led[0]?.isLed && selectedHIDVariantData && (
                                <div className="flex gap-2 flex-col">
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Wattage :
                                    </span>
                                    <span className='mx-2'>
                                      {selectedHIDVariantData?.wattage}
                                    </span>
                                  </h1>
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Sockets Support :
                                    </span>
                                    <span className='mx-2 flex gap-2 items-center'>

                                    </span>
                                  </h1>
                                  <h1 className="text-[1.2rem]">
                                    <span className="font-bold">
                                      ✅ Base Price :
                                    </span>
                                    <span className='mx-2'>
                                      Rs. {selectHIDHighBeamData?.basePrice}
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
              <div className='block w-full'>
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

              <div className="w-full block">
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
