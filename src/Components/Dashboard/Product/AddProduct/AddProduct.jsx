import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "antd";
const { TextArea } = Input;
import { Button } from "antd";
import { Select } from "antd";
import Swal from "sweetalert2";
import useProducts from "@/src/Hooks/useProducts";
import { createProductUrl } from "@/src/Utils/Urls/ProductUrl";
import { FaTrashAlt } from "react-icons/fa";
import useProcessor from "@/src/Hooks/useProcessor";
import useCar from "@/src/Hooks/useCar";
import useSocket from "@/src/Hooks/useSocket";

const AddProduct = () => {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { categoryData } = useProducts();
  const { ProcessorData } = useProcessor();
  const { CarData } = useCar();
  const { SocketData } = useSocket();
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [status, setStatus] = useState("");
  const [isAndroid, setIsAndroid] = useState(false);
  const [showAndroidDetails, setShowAndroidDetails] = useState(false);

  // ===
  const productDetailTamplate = {
    heading: "",
    description: "",
  };
  const [description, setDescription] = useState([productDetailTamplate]);

  const addDetails = () => {
    setDescription([...description, productDetailTamplate]);
  };

  const removeDetails = (index) => {
    const newDetails = description.filter((description, i) => i !== index);
    setDescription(newDetails);
  };

  const onChangeDetail = (event, index) => {
    const updatedDetal = lend.map((lend, i) =>
      index === i
        ? Object.assign(lend, { [event.target.name]: event.target.value })
        : lend
    );
    setDescription(updatedDetal);
  };

  const featuresTamplate = {
    heading: "",
    description: "",
  };

  const [features, setFeatures] = useState([featuresTamplate]);

  const addFeatures = () => {
    setFeatures([...features, featuresTamplate]);
  };

  const removeFeatures = (index) => {
    const newFeatures = features.filter((features, i) => i !== index);
    setFeatures(newFeatures);
  };

  const onChangeFeatures = (event, index) => {
    const updatedFeatures = lend.map((lend, i) =>
      index === i
        ? Object.assign(lend, { [event.target.name]: event.target.value })
        : lend
    );
    setFeatures(updatedFeatures);
  };

  // ============== android
  const [
    isAppleCarplayAndAndroidAutoSupported,
    setIsAppleCarplayAndAndroidAutoSupported,
  ] = useState(false);
  const [isDVRSupported, setIsDVRSupported] = useState(false);

  const [variantsAndroid, setVariantsAndroid] = useState([
    {
      processorName: "",
      processLabel: "",
      carsSupported: [],
      ram: "",
      rom: "",
      isAppleCarplayAndAndroidAutoSupported:
        isAppleCarplayAndAndroidAutoSupported,
      wirelessWired: "",
      isDVRSupported: isDVRSupported,
      is360CameraSupported: "",
      isSimSupported: "",
      isWarrantyAvailable: "",
      warrantyPeriod: "",
      basePrice: 0,
    },
  ]);

  const [android, setAndroid] = useState([
    {
      isAndroid: isAndroid,
      screenSize: "",
      variant: variantsAndroid,
    },
  ]);

  const onChangeAndroidVariant = (event, androidIndex, variantIndex) => {
    const updatedAndroid = [...android];
    updatedAndroid[androidIndex].variant[variantIndex] = {
      ...updatedAndroid[androidIndex].variant[variantIndex],
      [event.target.name]: event.target.value,
    };
    setAndroid(updatedAndroid);
  };

  const handleAndroidCheckboxChange = (e) => {
    setIsAndroid(e.target.checked);
    setShowAndroidDetails(e.target.checked);
  };

  const removeAndroidVariant = (androidIndex, variantIndex) => {
    const updatedAndroid = [...android];
    updatedAndroid[androidIndex].variant.splice(variantIndex, 1);
    setAndroid(updatedAndroid);
  };

  const addAndroid = () => {
    setAndroid([
      ...android,
      { isAndroid: false, screenSize: "", variant: [...variantsAndroid] },
    ]);
  };

  const addAndroidVariant = () => {
    const updatedVariants = [
      ...variantsAndroid,
      {
        processorName: "",
        processLabel: "",
        carsSupported: [],
        ram: "",
        rom: "",
        isAppleCarplayAndAndroidAutoSupported: false,
        wirelessWired: "",
        isDVRSupported: false,
        is360CameraSupported: "",
        isSimSupported: "",
        isWarrantyAvailable: "",
        warrantyPeriod: "",
        basePrice: 0,
      },
    ];
    setVariantsAndroid(updatedVariants);

    const updatedAndroid = [...android];
    updatedAndroid[0].variant = updatedVariants;
    setAndroid(updatedAndroid);
  };

  const removeAndroid = (index) => {
    const newAndroid = [...android];
    newAndroid.splice(index, 1);
    setAndroid(newAndroid);
  };

  const onChangeAndroid = (event, index) => {
    const updatedAndroid = [...android];
    updatedAndroid[index] = {
      ...updatedAndroid[index],
      [event.target.name]: event.target.value,
    };
    setAndroid(updatedAndroid);
  };

  // =================== led
  const [ledVariant, setLedVariant] = useState([
    {
      wattage: "",
      socketsSupported: [],
      basePrice: 0,
    },
  ]);

  const addLedVariant = () => {
    setLedVariant([
      ...ledVariant,
      { wattage: "", socketsSupported: [], basePrice: 0 },
    ]);
  };

  const removeLedVariant = (index) => {
    const newVariants = [...ledVariant];
    newVariants.splice(index, 1);
    setLedVariant(newVariants);
  };

  const onChangeLedVariant = (event, index) => {
    const updatedVariants = [...ledVariant];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [event.target.name]: event.target.value,
    };
    setLedVariant(updatedVariants);
  };

  const [isLed, setIsLed] = useState(false);

  const [led, setLed] = useState({
    isLed: isLed,
    variant: ledVariant,
  });

  // ======== amplifiers
  const [amplifiersVariant, setAmplifiersVariant] = useState([
    {
      totalChannels: "",
      wattage: "",
      basePrice: 0,
    },
  ]);

  const addAmplifierVariant = () => {
    setAmplifiersVariant([
      ...amplifiersVariant,
      { totalChannels: "", wattage: "", basePrice: 0 },
    ]);
  };

  const removeAmplifierVariant = (index) => {
    const newVariants = [...amplifiersVariant];
    newVariants.splice(index, 1);
    setAmplifiersVariant(newVariants);
  };

  const onChangeAmplifierVariant = (event, index) => {
    const updatedVariants = [...amplifiersVariant];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [event.target.name]: event.target.value,
    };
    setAmplifiersVariant(updatedVariants);
  };

  const [isAmplifiers, setIsAmplifiers] = useState(false);

  const handleAmplifiersCheckboxChange = (e) => {
    setIsAmplifiers(e.target.checked);
  };

  const [amplifiers, setAmplifiers] = useState({
    isAmplifiers: isAmplifiers,
    variant: amplifiersVariant,
  });

  // ========== HID

  const [HIDVariant, setHIDVariant] = useState([
    {
      wattage: "",
      lightColor: "",
      basePrice: 0,
    },
  ]);

  const addHIDVariant = () => {
    setHIDVariant([
      ...HIDVariant,
      {
        wattage: "",
        lightColor: "",
        basePrice: 0,
      },
    ]);
  };

  const removeHIDVariant = (index) => {
    const newVariants = [...HIDVariant];
    newVariants.splice(index, 1);
    setHIDVariant(newVariants);
  };

  const onChangeHIDVariant = (event, index) => {
    const updatedVariants = [...HIDVariant];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [event.target.name]: event.target.value,
    };
    setHIDVariant(updatedVariants);
  };

  const [isHID, setIsHID] = useState(false);

  const [HID, setHID] = useState({
    isHID: isHID,
    variant: HIDVariant,
  });

  // ======= camera
  const [areThereGuidelines, setAreThereGuidelines] = useState(false);

  const [cameraVariant, setCameraVariant] = useState([
    {
      cameraQuality: "",
      areThereGuidelines: areThereGuidelines,
      guidelinesType: "",
      fieldOfViewType: "",
      processorsSupported: [],
      basePrice: 0,
    },
  ]);

  const addCameraVariant = () => {
    setCameraVariant((prevVariants) => [
      ...prevVariants,
      {
        cameraQuality: "",
        areThereGuidelines: false,
        guidelinesType: "",
        fieldOfViewType: "",
        processorsSupported: [],
        basePrice: 0,
      },
    ]);
  };

  const removeCameraVariant = (index) => {
    setCameraVariant((prevVariants) => {
      const newVariants = [...prevVariants];
      newVariants.splice(index, 1);
      return newVariants;
    });
  };

  const onChangeCameraVariant = (event, index) => {
    setCameraVariant((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [event.target.name]: event.target.value,
      };
      return updatedVariants;
    });
  };

  const [isCamera, setIsCamera] = useState(false);

  const [camera, setCamera] = useState({
    isCamera: isCamera,
    variant: cameraVariant,
  });

  // =============dampingSheets

  const [isDampingSheets, setIsDampingSheets] = useState(false);

  const handleDampingSheetsCheckboxChange = (e) => {
    setIsDampingSheets(e.target.checked);
  };

  const [dampingSheets, setDampingSheets] = useState([
    {
      isDampingSheets: isDampingSheets,
      thickness: "",
      sheetsInOneBox: "",
      basePrice: 1,
    },
  ]);

  const addDamping = () => {
    setDampingSheets([
      ...dampingSheets,
      {
        isDampingSheets: isDampingSheets,
        thickness: "",
        sheetsInOneBox: "",
        basePrice: 1,
      },
    ]);
  };

  const removeDamping = (index) => {
    const newDamping = [...dampingSheets];
    newDamping.splice(index, 1);
    setDampingSheets(newDamping);
  };

  const onChangeDamping = (event, index) => {
    const updatedDampingSheets = [...dampingSheets];
    updatedDampingSheets[index] = {
      ...updatedDampingSheets[index],
      [event.target.name]: event.target.value,
    };
    setDampingSheets(updatedDampingSheets);
  };

  // ========== chargers
  const [isChargers, setIsChargers] = useState(false);

  const handleChargersCheckboxChange = (e) => {
    setIsChargers(e.target.checked);
  };

  const [chargers, setChargers] = useState([
    {
      isChargers: isChargers,
      wattage: "",
      basePrice: 1,
    },
  ]);

  const addChargers = () => {
    setChargers([
      ...chargers,
      {
        isChargers: isChargers,
        wattage: "",
        basePrice: 1,
      },
    ]);
  };

  const removeChargers = (index) => {
    const newChargers = [...chargers];
    newChargers.splice(index, 1);
    setChargers(newChargers);
  };

  const onChangeChargers = (event, index) => {
    const updatedChargers = [...chargers];
    updatedChargers[index] = {
      ...updatedChargers[index],
      [event.target.name]: event.target.value,
    };
    setChargers(updatedChargers);
  };

  // ======== speakers
  const [isSpeakers, setIsSpeakers] = useState(false);

  const handleSpeakersCheckboxChange = (e) => {
    setIsSpeakers(e.target.checked);
  };

  const [speakers, setSpeakers] = useState([
    {
      isSpeakers: isSpeakers,
      speakerSize: "",
      basePrice: 1,
    },
  ]);

  const addSpeakers = () => {
    setSpeakers([
      ...speakers,
      {
        isSpeakers: isSpeakers,
        speakerSize: "",
        basePrice: 1,
      },
    ]);
  };

  const removeSpeakers = (index) => {
    const newSpeakers = [...speakers];
    newSpeakers.splice(index, 1);
    setSpeakers(newSpeakers);
  };

  const onChangeSpeakers = (event, index) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index] = {
      ...updatedSpeakers[index],
      [event.target.name]: event.target.value,
    };
    setSpeakers(updatedSpeakers);
  };

  // ======== bassTube

  const [isBassTube, setIsBassTube] = useState(false);

  const handleBassTubeCheckboxChange = (e) => {
    setIsBassTube(e.target.checked);
  };

  const [bassTube, setBassTube] = useState([
    {
      isBassTube: isBassTube,
      wattage: "",
      speakerSize: "",
      basePrice: 1,
    },
  ]);

  const addBassTube = () => {
    setBassTube([
      ...bassTube,
      {
        isBassTube: isBassTube,
        wattage: "",
        speakerSize: "",
        basePrice: 1,
      },
    ]);
  };

  const removeBassTube = (index) => {
    const newBassTube = [...bassTube];
    newBassTube.splice(index, 1);
    setBassTube(newBassTube);
  };

  const onChangeBassTube = (event, index) => {
    const updatedBassTube = [...bassTube];
    updatedBassTube[index] = {
      ...updatedBassTube[index],
      [event.target.name]: event.target.value,
    };
    setIsBassTube(updatedBassTube);
  };

  // ========fMBT

  const [isFMBT, setIsFMBT] = useState(false);

  const handleFMBTCheckboxChange = (e) => {
    setIsFMBT(e.target.checked);
  };

  const [fMBT, setFMBT] = useState([
    {
      isFmBt: isFMBT,
      controlOption: "",
      basePrice: 1,
    },
  ]);

  const addFMBT = () => {
    setFMBT([
      ...bassTube,
      {
        isFmBt: isFMBT,
        controlOption: "",
        basePrice: 1,
      },
    ]);
  };

  const removeFMBT = (index) => {
    const newFMBT = [...fMBT];
    newFMBT.splice(index, 1);
    setFMBT(newFMBT);
  };

  const onChangeFMBT = (event, index) => {
    const updatedFMBT = [...fMBT];
    updatedFMBT[index] = {
      ...updatedFMBT[index],
      [event.target.name]: event.target.value,
    };
    setFMBT(updatedFMBT);
  };

  // ==== Cloudinary ====
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

  const [imageFiles, setImageFiles] = useState([]);

  // const handleFileChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   const updatedFiles = selectedFiles.map((file) => {
  //     const publicId = `${cloud_folder}/${file.name.replace(/\s+/g, "_")}`;
  //     file.uploadPreset = publicId;
  //     return file;
  //   });
  //   setImageFiles(updatedFiles);
  // };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploadProgress: 0,
    }));
    setImageFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const [uploading, setUploading] = useState(false);

  const onSubmit = async () => {
    try {
      // setLoading(true);
      // const uploadedUrls = [];
      // for (const imageFile of imageFiles) {
      //   const formData = new FormData();
      //   formData.append("file", imageFile);
      //   formData.append(
      //     "upload_preset",
      //     `${cloud_folder}/Products/${imageFile?.name}`
      //   );
      //   formData.append("upload_preset", upload_preset);
      //   formData.append("cloud_name", cloud_name);

      //   const imgRes = await fetch(cloud_api, {
      //     method: "POST",
      //     body: formData,
      //   });

      //   if (!imgRes.ok) {
      //     const errorResponse = await imgRes.text();
      //     throw new Error(
      //       `Error uploading image: ${imgRes.status} - ${imgRes.statusText}\n${errorResponse}`
      //     );
      //   }

      //   const imgdata = await imgRes.json();
      //   const imgurl = imgdata?.secure_url;
      //   if (imgurl) {
      //     uploadedUrls.push(imgurl);
      //   } else {
      //     throw new Error(
      //       "Failed to retrieve the image URL from Cloudinary response."
      //     );
      //   }
      // }

      setLoading(true);
      const uploadedUrls = [];

      for (const imageFile of imageFiles) {
        const formData = new FormData();
        formData.append("file", imageFile.file); // Use imageFile.file instead of the entire imageFile
        formData.append(
          "upload_preset",
          `${cloud_folder}/Products/${imageFile.file?.name}`
        );
        formData.append("upload_preset", upload_preset);
        formData.append("cloud_name", cloud_name);

        const imgRes = await fetch(cloud_api, {
          method: "POST",
          body: formData,
          // Add event listener to track upload progress
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setImageFiles((prevFiles) =>
              prevFiles.map((prevFile) =>
                prevFile.file === imageFile.file
                  ? { ...prevFile, uploadProgress: progress }
                  : prevFile
              )
            );
          },
        });

        if (!imgRes.ok) {
          const errorResponse = await imgRes.text();
          throw new Error(
            `Error uploading image: ${imgRes.status} - ${imgRes.statusText}\n${errorResponse}`
          );
        }

        const imgdata = await imgRes.json();
        const imgurl = imgdata?.secure_url;
        if (imgurl) {
          uploadedUrls.push(imgurl);
        } else {
          throw new Error(
            "Failed to retrieve the image URL from Cloudinary response."
          );
        }
      }

      const productData = {
        productName: name,
        productCategory: category,
        images: uploadedUrls,
        discount: discountPercentage,
        status: status,
        productDetails: description,
        productFeatures: features,
        android: android,
        fMBT: fMBT,
        bassTube: bassTube,
        led: led,
        speakers: speakers,
        chargers: chargers,
        amplifiers: amplifiers,
        dampingSheets: dampingSheets,
        HID: HID,
        camera: camera,
      };

      const res = await fetch(createProductUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const dataRes = await res.json();
      if (!dataRes) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Something went wrong!",
          iconColor: "#ED1C24",
          toast: true,
          icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully Added!",
          iconColor: "#ED1C24",
          toast: true,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [imageFiles]);

  // =========

  const handleSelectAllLed = () => {
    const allSocketIds = SocketData?.map((socket) => socket?._id) || [];
    handleSelectAllLed(index, allSocketIds); // Pass the index and socket IDs to the function
  };

  const handleRemoveAllLed = () => {
    onChangeLedVariant(
      {
        target: {
          name: "socketsSupported",
          value: [],
        },
      },
      index
    );
  };

  return (
    <section className="my-4">
      <div className="flex flex-col w-full gap-4 mx-auto add-book-form">
        <div className="add-book-form w-full md:w-[60%] mx-auto flex flex-col gap-4 ">
          <Input
            placeholder="Product Name"
            name="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            name="productCategory"
            id="productCategory"
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option className="my-2">Category</option>
            <hr className="my-2 p-4" />
            {categoryData?.map((category) => (
              <option
                key={category?._id}
                value={category?.name}
                className="border-2 border-gray-300 rounded-md p-4 my-2"
              >
                {category?.name}
              </option>
            ))}
          </select>
          <Input
            placeholder="Discount Percentage"
            name="discount"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />

          <Input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <div className="flex flex-col gap-4 border p-2 rounded">
            <h1 className="my-2">Description</h1>
            {description.map((description, index) => {
              return (
                <section key={index} className="">
                  <div className="form-control w-full">
                    <div className="border p-2">
                      <input
                        type="text"
                        name="Heading"
                        onChange={(event) => onChangeDetail(event, index)}
                        value={description.heading}
                        placeholder="Heading"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="form-control w-full my-2">
                    <div className="border p-2">
                      <input
                        type="text"
                        name="description"
                        onChange={(event) => onChangeDetail(event, index)}
                        value={description.description}
                        placeholder="Description"
                        className="input input-bordered w-full border"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      className="common-btn flex items-center gap-2"
                      onClick={() => removeDetails(index)}
                    >
                      <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                      Delete
                    </button>
                  </div>
                </section>
              );
            })}
            <button className="common-btn" onClick={() => addDetails()}>
              Add More Details
            </button>
          </div>

          <div className="flex flex-col gap-4 border p-2 rounded">
            <h1 className="my-2">Features</h1>
            {features.map((features, index) => {
              return (
                <section key={index} className="">
                  <div className="form-control w-full">
                    <div className="border p-2">
                      <input
                        type="text"
                        name="Heading"
                        onChange={(event) => onChangeFeatures(event, index)}
                        value={features.heading}
                        placeholder="Heading"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="form-control w-full my-2">
                    <div className="border p-2">
                      <input
                        type="text"
                        name="description"
                        onChange={(event) => onChangeFeatures(event, index)}
                        value={features.description}
                        placeholder="Description"
                        className="input input-bordered w-full border"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      className="common-btn flex items-center gap-2"
                      onClick={() => removeFeatures(index)}
                    >
                      <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                      Delete
                    </button>
                  </div>
                </section>
              );
            })}
            <button className="common-btn" onClick={() => addFeatures()}>
              Add More Features
            </button>
          </div>

          <div>
            <label className="flex items-center">
              Is Android
              <input
                type="checkbox"
                checked={isAndroid}
                onChange={handleAndroidCheckboxChange}
                className="border mx-2 my-4"
              />
            </label>

            {showAndroidDetails && (
              <div className="flex flex-col gap-4 border p-2 rounded">
                {android?.map((androidData, index) => {
                  return (
                    <section key={index}>
                      <div className="form-control w-full my-2">
                        <div className="border p-2 rounded">
                          <input
                            type="text"
                            name="screenSize"
                            onChange={(event) => onChangeAndroid(event, index)}
                            value={androidData.screenSize}
                            placeholder="Screen Size"
                            className="input input-bordered w-full p-2 rounded"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 border p-2 rounded">
                        {androidData?.variant?.map((variantData, vIndex) => (
                          <section key={vIndex}>
                            <select
                              name="processorName"
                              id="processorName"
                              className="border-2 border-gray-300 rounded-md p-2 w-full"
                              onChange={(event) =>
                                onChangeAndroidVariant(event, index, vIndex)
                              }
                            >
                              <option className="my-2">Processor Name</option>
                              {ProcessorData?.map((processor) => (
                                <option
                                  key={processor?._id}
                                  value={processor?.processorName}
                                  className="border-2 border-gray-300 rounded-md p-4 my-2"
                                >
                                  {processor?.processorName}
                                </option>
                              ))}
                            </select>

                            <div className="border my-4 rounded">
                              <input
                                type="text"
                                name="processLabel"
                                onChange={(event) =>
                                  onChangeAndroidVariant(event, index, vIndex)
                                }
                                value={variantData.processLabel}
                                placeholder="Process Label"
                                className="input input-bordered w-full  p-2 rounded"
                              />
                            </div>

                            <Select
                              mode="multiple"
                              allowClear
                              style={{
                                width: "100%",
                              }}
                              placeholder="Cars Supported"
                              onChange={(values) =>
                                onChangeAndroidVariant(
                                  {
                                    target: {
                                      name: "carsSupported",
                                      value: values,
                                    },
                                  },
                                  index,
                                  vIndex
                                )
                              }
                              value={variantData.carsSupported}
                              options={[
                                { value: "selectAll", label: "Select All" },
                                ...CarData.map((car) => ({
                                  value: car?._id,
                                  label: car?.carName,
                                })),
                                { value: "removeAll", label: "Remove All" },
                              ]}
                              onSelect={(value) => {
                                if (value === "selectAll") {
                                  onChangeAndroidVariant(
                                    {
                                      target: {
                                        name: "carsSupported",
                                        value: CarData.map((car) => car?._id),
                                      },
                                    },
                                    index,
                                    vIndex
                                  );
                                } else if (value === "removeAll") {
                                  onChangeAndroidVariant(
                                    {
                                      target: {
                                        name: "carsSupported",
                                        value: [],
                                      },
                                    },
                                    index,
                                    vIndex
                                  );
                                }
                              }}
                            />

                            <div className="border my-4 rounded">
                              <input
                                type="text"
                                name="ram"
                                onChange={(event) =>
                                  onChangeAndroidVariant(event, index, vIndex)
                                }
                                value={variantData.ram}
                                placeholder="RAM"
                                className="input input-bordered w-full  p-2 rounded"
                              />
                            </div>
                            <div className="border my-4 rounded">
                              <input
                                type="text"
                                name="rom"
                                onChange={(event) =>
                                  onChangeAndroidVariant(event, index, vIndex)
                                }
                                value={variantData.rom}
                                placeholder="ROM"
                                className="input input-bordered w-full p-2 rounded"
                              />
                            </div>

                            <label className="flex items-center">
                              Is Apple Carplay And Android Auto Supported
                              <input
                                type="checkbox"
                                checked={isAppleCarplayAndAndroidAutoSupported}
                                onChange={(e) =>
                                  setIsAppleCarplayAndAndroidAutoSupported(
                                    e.target.checked
                                  )
                                }
                                className="border mx-2 my-4"
                              />
                            </label>

                            {isAppleCarplayAndAndroidAutoSupported && (
                              <>
                                <select
                                  name="processorName"
                                  id="processorName"
                                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                                  onChange={(event) =>
                                    onChangeAndroidVariant(event, index, vIndex)
                                  }
                                  value={variantData?.wirelessWired}
                                >
                                  <option className="my-2">
                                    Select Wireless Wired
                                  </option>
                                  <option className="my-2" value={"Wireless"}>
                                    Wireless
                                  </option>
                                  <option className="my-2" value={"Wired"}>
                                    Wired
                                  </option>
                                </select>
                              </>
                            )}

                            <label className="flex items-center">
                              Is DVR Supported
                              <input
                                type="checkbox"
                                checked={isDVRSupported}
                                onChange={(e) =>
                                  setIsDVRSupported(e.target.checked)
                                }
                                className="border mx-2 my-4"
                              />
                            </label>

                            <select
                              name="is360CameraSupported"
                              id="is360CameraSupported"
                              className="border-2 my-2 border-gray-300 rounded-md p-2 w-full"
                              onChange={(event) =>
                                onChangeAndroidVariant(event, index, vIndex)
                              }
                              value={variantData?.is360CameraSupported}
                            >
                              <option className="my-2">
                                Is 360 Camera Supported
                              </option>
                              <option className="my-2" value={"Yes"}>
                                Yes
                              </option>
                              <option className="my-2" value={"No"}>
                                No
                              </option>
                            </select>

                            <select
                              name="processorName"
                              id="processorName"
                              className="border-2 my-2 border-gray-300 rounded-md p-2 w-full"
                              onChange={(event) =>
                                onChangeAndroidVariant(event, index, vIndex)
                              }
                              value={variantData?.isSimSupported}
                            >
                              <option className="my-2">
                                Select Is Sim Supported
                              </option>
                              <option className="my-2" value={"Yes"}>
                                Yes
                              </option>
                              <option className="my-2" value={"No"}>
                                No
                              </option>
                            </select>

                            <select
                              name="processorName"
                              id="processorName"
                              className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
                              onChange={(event) =>
                                onChangeAndroidVariant(event, index, vIndex)
                              }
                              value={variantData?.isWarrantyAvailable}
                            >
                              <option className="my-2">
                                Select Is Warranty Available
                              </option>
                              <option className="my-2" value={"Yes"}>
                                Yes
                              </option>
                              <option className="my-2" value={"No"}>
                                No
                              </option>
                            </select>

                            <div className="border my-4 rounded">
                              <input
                                type="text"
                                name="warrantyPeriod"
                                onChange={(event) =>
                                  onChangeAndroidVariant(event, index, vIndex)
                                }
                                value={variantData.warrantyPeriod}
                                placeholder="Warranty Period"
                                className="input input-bordered w-full p-2 rounded"
                              />
                            </div>

                            <div className="border my-4 rounded">
                              <input
                                type="number"
                                name="basePrice"
                                onChange={(event) =>
                                  onChangeAndroidVariant(event, index, vIndex)
                                }
                                value={variantData.basePrice}
                                placeholder="Base Price"
                                className="input input-bordered w-full p-2 rounded"
                              />
                            </div>

                            {/* ======== ====== */}
                            <div className="my-4">
                              <button
                                className="common-btn flex items-center gap-2"
                                onClick={() => removeAndroidVariant(vIndex)}
                              >
                                <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                                Remove Variant
                              </button>
                            </div>
                          </section>
                        ))}

                        <button
                          className="common-btn"
                          onClick={() => addAndroidVariant(index)}
                        >
                          Add Android Variant
                        </button>
                      </div>

                      <div className="my-4">
                        <button
                          className="common-btn flex items-center gap-2"
                          onClick={() => removeAndroid(index)}
                        >
                          <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                          Remove
                        </button>
                      </div>
                    </section>
                  );
                })}
                <button className="common-btn" onClick={() => addAndroid()}>
                  Add Android
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center">
              Is LED
              <input
                type="checkbox"
                checked={isLed}
                onChange={(e) => setIsLed(e.target.checked)}
                className="border mx-2 my-4"
              />
            </label>
            {isLed && (
              <>
                <div className="flex flex-col gap-4 border p-2 rounded">
                  {led?.variant?.map((ledData, index) => {
                    return (
                      <section key={index}>
                        <div className="flex flex-col gap-4 border p-2 rounded">
                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="wattage"
                              onChange={(event) =>
                                onChangeAndroidVariant(event, index)
                              }
                              value={ledData.wattage}
                              placeholder="Wattage"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <Select
                            mode="multiple"
                            allowClear
                            style={{
                              width: "100%",
                            }}
                            placeholder="Sockets Supported"
                            onChange={(values) =>
                              onChangeLedVariant(
                                {
                                  target: {
                                    name: "socketsSupported",
                                    value: values,
                                  },
                                },
                                index
                              )
                            }
                            value={ledData.socketsSupported}
                            options={SocketData?.map((socket) => {
                              return {
                                value: socket?._id,
                                label: socket?.socketName,
                              };
                            })}
                          />

                          <div className="border my-4 rounded">
                            <input
                              type="number"
                              name="basePrice"
                              onChange={(event) =>
                                onChangeLedVariant(event, index)
                              }
                              value={ledData?.basePrice}
                              placeholder="Base Price"
                              className="input input-bordered w-full p-2 rounded"
                            />
                          </div>
                          <div className="my-4">
                            <button
                              className="common-btn flex items-center gap-2"
                              onClick={() => removeLedVariant(index)}
                            >
                              <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                              Remove Variant
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                  <button
                    className="common-btn"
                    onClick={() => addLedVariant()}
                  >
                    Add Led Variant
                  </button>
                </div>
              </>
            )}
          </div>

          <div>
            <label className="flex items-center">
              Is Amplifiers
              <input
                type="checkbox"
                checked={isAmplifiers}
                onChange={(e) => setIsAmplifiers(e.target.checked)}
                className="border mx-2 my-4"
              />
            </label>

            {isAmplifiers && (
              <>
                <div className="flex flex-col gap-4 border p-2 rounded">
                  {amplifiers?.variant?.map((amplifiersData, index) => {
                    return (
                      <section key={index}>
                        <div className="flex flex-col gap-4 border p-2 rounded">
                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="Total Channels"
                              onChange={(event) =>
                                onChangeAmplifierVariant(event, index)
                              }
                              value={amplifiersData.totalChannels}
                              placeholder="TotalChannels"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="Wattage"
                              onChange={(event) =>
                                onChangeAmplifierVariant(event, index)
                              }
                              value={amplifiersData.wattage}
                              placeholder="Wattage"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="number"
                              name="basePrice"
                              onChange={(event) =>
                                onChangeAmplifierVariant(event, index)
                              }
                              value={amplifiersData?.basePrice}
                              placeholder="Base Price"
                              className="input input-bordered w-full p-2 rounded"
                            />
                          </div>
                          <div className="my-4">
                            <button
                              className="common-btn flex items-center gap-2"
                              onClick={() => removeAmplifierVariant(index)}
                            >
                              <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                              Remove Variant
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                  <button
                    className="common-btn"
                    onClick={() => addAmplifierVariant()}
                  >
                    Add Variant
                  </button>
                </div>
              </>
            )}
          </div>

          {/* =============== */}

          <div>
            <label className="flex items-center">
              Is HID
              <input
                type="checkbox"
                checked={isHID}
                onChange={(e) => setIsHID(e.target.checked)}
                className="border mx-2 my-4"
              />
            </label>
            {isHID && (
              <>
                <div className="flex flex-col gap-4 border p-2 rounded">
                  {HID?.variant?.map((HIDData, index) => {
                    return (
                      <section key={index}>
                        <div className="flex flex-col gap-4 border p-2 rounded">
                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="Light Color"
                              onChange={(event) =>
                                onChangeHIDVariant(event, index)
                              }
                              value={HIDData.lightColor}
                              placeholder="Light Color"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="Wattage"
                              onChange={(event) =>
                                onChangeHIDVariant(event, index)
                              }
                              value={HIDData.wattage}
                              placeholder="Wattage"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="number"
                              name="basePrice"
                              onChange={(event) =>
                                onChangeHIDVariant(event, index)
                              }
                              value={HIDData?.basePrice}
                              placeholder="Base Price"
                              className="input input-bordered w-full p-2 rounded"
                            />
                          </div>
                          <div className="my-4">
                            <button
                              className="common-btn flex items-center gap-2"
                              onClick={() => removeHIDVariant(index)}
                            >
                              <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                              Remove Variant
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                  <button
                    className="common-btn"
                    onClick={() => addHIDVariant()}
                  >
                    Add Variant
                  </button>
                </div>
              </>
            )}
          </div>

          <div>
            <label className="flex items-center">
              Is Camera
              <input
                type="checkbox"
                checked={isCamera}
                onChange={(e) => setIsCamera(e.target.checked)}
                className="border mx-2 my-4"
              />
            </label>

            {isCamera && (
              <>
                <div className="flex flex-col gap-4 border p-2 rounded">
                  {camera?.variant?.map((cameraData, index) => {
                    return (
                      <section key={index}>
                        <div className="flex flex-col gap-4 border p-2 rounded">
                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="Camera Quality"
                              onChange={(event) =>
                                onChangeCameraVariant(event, index)
                              }
                              value={cameraData.cameraQuality}
                              placeholder="Camera Quality"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <label className="flex items-center">
                            Are There Guidelines
                            <input
                              type="checkbox"
                              checked={areThereGuidelines}
                              onChange={(e) =>
                                setAreThereGuidelines(e.target.checked)
                              }
                              className="border mx-2 my-4"
                            />
                          </label>

                          {areThereGuidelines && (
                            <select
                              name="guidelinesType"
                              id="guidelinesType"
                              className="border-2 my-2 border-gray-300 rounded-md p-2 w-full"
                              onChange={(event) =>
                                onChangeCameraVariant(event, index)
                              }
                              value={cameraData?.guidelinesType}
                            >
                              <option className="my-2">
                                Select Guidelines
                              </option>
                              <option className="my-2" value={"Static"}>
                                Static
                              </option>
                              <option className="my-2" value={"Dynamic"}>
                                Dynamic
                              </option>
                            </select>
                          )}

                          <select
                            name="fieldOfViewType"
                            id="fieldOfViewType"
                            className="border-2 my-2 border-gray-300 rounded-md p-2 w-full"
                            onChange={(event) =>
                              onChangeCameraVariant(event, index)
                            }
                            value={cameraData?.fieldOfViewType}
                          >
                            <option className="my-2">
                              Select Field Of View Type
                            </option>
                            <option className="my-2" value={"Wide"}>
                              Wide
                            </option>
                            <option className="my-2" value={"UltraWide"}>
                              UltraWide
                            </option>
                          </select>

                          <Select
                            mode="multiple"
                            allowClear
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select processor"
                            onChange={(values) =>
                              onChangeCameraVariant(
                                {
                                  target: {
                                    name: "processorsSupported",
                                    value: values,
                                  },
                                },
                                index
                              )
                            }
                            value={cameraData.processorsSupported}
                            options={ProcessorData?.map((processor) => {
                              return {
                                value: processor?._id,
                                label: processor?.processorName,
                              };
                            })}
                          />

                          <div className="border my-4 rounded">
                            <input
                              type="number"
                              name="basePrice"
                              onChange={(event) =>
                                onChangeCameraVariant(event, index)
                              }
                              value={cameraData?.basePrice}
                              placeholder="Base Price"
                              className="input input-bordered w-full p-2 rounded"
                            />
                          </div>

                          <div className="my-4">
                            <button
                              className="common-btn flex items-center gap-2"
                              onClick={() => removeCameraVariant(index)}
                            >
                              <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                              Remove Variant
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                  <button
                    className="common-btn"
                    onClick={() => addCameraVariant()}
                  >
                    Add Variant
                  </button>
                </div>
              </>
            )}
          </div>

          <div>
            <label className="flex items-center">
              Is DampingSheets
              <input
                type="checkbox"
                checked={isDampingSheets}
                onChange={(e) => setIsDampingSheets(e.target.checked)}
                className="border mx-2 my-4"
              />
            </label>

            {isDampingSheets && (
              <>
                <div className="flex flex-col gap-4 border p-2 rounded">
                  {dampingSheets?.map((dampingSheetsData, index) => {
                    return (
                      <section key={index}>
                        <div className="flex flex-col gap-4 border p-2 rounded">
                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="thickness"
                              onChange={(event) =>
                                onChangeDamping(event, index)
                              }
                              value={dampingSheetsData.thickness}
                              placeholder="Thickness"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="sheetsInOneBox"
                              onChange={(event) =>
                                onChangeDamping(event, index)
                              }
                              value={dampingSheetsData.sheetsInOneBox}
                              placeholder="Sheets In One Box"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="number"
                              name="basePrice"
                              onChange={(event) =>
                                onChangeDamping(event, index)
                              }
                              value={dampingSheetsData?.basePrice}
                              placeholder="Base Price"
                              className="input input-bordered w-full p-2 rounded"
                            />
                          </div>

                          <div className="my-4">
                            <button
                              className="common-btn flex items-center gap-2"
                              onClick={() => removeDamping(index)}
                            >
                              <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                              Remove Damping
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                  <button className="common-btn" onClick={() => addDamping()}>
                    Add Damping
                  </button>
                </div>
              </>
            )}
          </div>

          <div>
            <label className="flex items-center">
              Is Chargers
              <input
                type="checkbox"
                checked={isChargers}
                onChange={(e) => setIsChargers(e.target.checked)}
                className="border mx-2 my-4"
              />
            </label>

            {isChargers && (
              <>
                <div className="flex flex-col gap-4 border p-2 rounded">
                  {chargers?.map((chargersData, index) => {
                    return (
                      <section key={index}>
                        <div className="flex flex-col gap-4 border p-2 rounded">
                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="wattage"
                              onChange={(event) =>
                                onChangeChargers(event, index)
                              }
                              value={chargersData.wattage}
                              placeholder="Wattage"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="number"
                              name="basePrice"
                              onChange={(event) =>
                                onChangeChargers(event, index)
                              }
                              value={chargersData?.basePrice}
                              placeholder="Base Price"
                              className="input input-bordered w-full p-2 rounded"
                            />
                          </div>

                          <div className="my-4">
                            <button
                              className="common-btn flex items-center gap-2"
                              onClick={() => removeChargers(index)}
                            >
                              <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                              Remove Chargers
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                  <button className="common-btn" onClick={() => addChargers()}>
                    Add Chargers
                  </button>
                </div>
              </>
            )}
          </div>

          <div>
            <label className="flex items-center">
              Is Speakers
              <input
                type="checkbox"
                checked={isSpeakers}
                onChange={(e) => setIsSpeakers(e.target.checked)}
                className="border mx-2 my-4"
              />
            </label>

            {isSpeakers && (
              <>
                <div className="flex flex-col gap-4 border p-2 rounded">
                  {speakers?.map((speakersData, index) => {
                    return (
                      <section key={index}>
                        <div className="flex flex-col gap-4 border p-2 rounded">
                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="speakerSize"
                              onChange={(event) =>
                                onChangeSpeakers(event, index)
                              }
                              value={speakersData.speakerSize}
                              placeholder="Speaker Size"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="number"
                              name="basePrice"
                              onChange={(event) =>
                                onChangeSpeakers(event, index)
                              }
                              value={speakersData?.basePrice}
                              placeholder="Base Price"
                              className="input input-bordered w-full p-2 rounded"
                            />
                          </div>
                          <div className="my-4">
                            <button
                              className="common-btn flex items-center gap-2"
                              onClick={() => removeSpeakers(index)}
                            >
                              <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                              Remove Speakers
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                  <button className="common-btn" onClick={() => addSpeakers()}>
                    Add Speakers
                  </button>
                </div>
              </>
            )}
          </div>

          <div>
            <label className="flex items-center">
              Is BassTube
              <input
                type="checkbox"
                checked={isBassTube}
                onChange={(e) => setIsBassTube(e.target.checked)}
                className="border mx-2 my-4"
              />
            </label>

            {isBassTube && (
              <>
                <div className="flex flex-col gap-4 border p-2 rounded">
                  {bassTube?.map((bassTubeData, index) => {
                    return (
                      <section key={index}>
                        <div className="flex flex-col gap-4 border p-2 rounded">
                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="wattage"
                              onChange={(event) =>
                                onChangeBassTube(event, index)
                              }
                              value={bassTubeData.wattage}
                              placeholder="Wattage"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="speakerSize"
                              onChange={(event) =>
                                onChangeBassTube(event, index)
                              }
                              value={bassTubeData?.speakerSize}
                              placeholder="Speaker Size"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="number"
                              name="basePrice"
                              onChange={(event) =>
                                onChangeBassTube(event, index)
                              }
                              value={bassTubeData?.basePrice}
                              placeholder="Base Price"
                              className="input input-bordered w-full p-2 rounded"
                            />
                          </div>
                          <div className="my-4">
                            <button
                              className="common-btn flex items-center gap-2"
                              onClick={() => removeBassTube(index)}
                            >
                              <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                              Remove Bass Tube
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                  <button className="common-btn" onClick={() => addBassTube()}>
                    Add Bass Tube
                  </button>
                </div>
              </>
            )}
          </div>

          <div>
            <label className="flex items-center">
              Is FMBT
              <input
                type="checkbox"
                checked={isFMBT}
                onChange={(e) => setIsFMBT(e.target.checked)}
                className="border mx-2 my-4"
              />
            </label>

            {isFMBT && (
              <>
                <div className="flex flex-col gap-4 border p-2 rounded">
                  {fMBT?.map((fMBTData, index) => {
                    return (
                      <section key={index}>
                        <div className="flex flex-col gap-4 border p-2 rounded">
                          <div className="border my-4 rounded">
                            <input
                              type="text"
                              name="controlOption"
                              onChange={(event) => onChangeFMBT(event, index)}
                              value={fMBTData.controlOption}
                              placeholder="Control Option"
                              className="input input-bordered w-full  p-2 rounded"
                            />
                          </div>

                          <div className="border my-4 rounded">
                            <input
                              type="number"
                              name="basePrice"
                              onChange={(event) => onChangeFMBT(event, index)}
                              value={fMBTData?.basePrice}
                              placeholder="Base Price"
                              className="input input-bordered w-full p-2 rounded"
                            />
                          </div>
                          <div className="my-4">
                            <button
                              className="common-btn flex items-center gap-2"
                              onClick={() => removeFMBT(index)}
                            >
                              <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                              Remove FMBT
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                  <button className="common-btn" onClick={() => addFMBT()}>
                    Add FMBT
                  </button>
                </div>
              </>
            )}
          </div>

          {/* =============== */}

          <div className="w-full h-full">
            <div className="rounded-lg shadow-xl bg-gray-50 p-4">
              <label className="inline-block mb-2 text-gray-500">
                Upload Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full max-w-xs md:max-w-md h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Attach file{" "}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="px-4 pb-4"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {/* preview the selected images here  */}
            {/* 
            <div className="flex flex-wrap gap-4 mt-4">
              {imageFiles.map((file) => (
                <div
                  key={file.name}
                  className="relative w-32 h-32 overflow-hidden rounded-md"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
              ))}
            </div> */}

            {/* Show upload progress */}
            {uploading && (
              <div className="mt-4">
                <p>Uploading...</p>
                <div className="progress-bar">
                  {imageFiles.map((file, index) => (
                    <div
                      key={index}
                      className="progress"
                      style={{ width: `${file.uploadProgress}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Show image previews */}
            <div className="flex flex-wrap gap-4 mt-4">
              {imageFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 overflow-hidden rounded-md"
                >
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            type="default"
            htmlType="submit"
            style={{
              marginTop: "20px",
            }}
          >
            {loading ? "Loading..." : "Add Product"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
