import useBrand from "@/src/Hooks/useBrand";
import { addCarUrl } from "@/src/Utils/Urls/CommonUrl";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";

const AddCar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      generations: [{ models: [{ beams: {}, foglight: {}, canbus: {} }] }],
    },
  });
  const [isLowAndHighBeamsSeparate, setIsLowAndHighBeamsSeparate] =
  useState(false);
  const [isFoglightSupported, setIsFoglightSupported] = useState(false);
  const [isCanbusRequired, setIsCanbusRequired] = useState(false);

  const [formData, setFormData] = useState({
    carName: "",
    carBrand: "",
    generation: [
      {
        startYear: "",
        endYear: "",
        models: [
          {
            modelName: "",
            beams: {
              isLowAndHighBeamsSeparate: isLowAndHighBeamsSeparate,
              lowBeamSocketSupportedName: "",
              highBeamSocketSupportedName: "",
              beamSoketSupportedName: "",
            },
            foglight: {
              isFoglightSupported: isFoglightSupported,
              foglightSocketSupportedName: "",
            },
            canbus: {
              isCanbusRequired: isCanbusRequired,
              canbusPrice: 0,
            },
            frameCost: 0,
          },
        ],
      },
    ],
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleGenerationInputChange = (generationIndex, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      generation: prevData.generation.map((gen, index) =>
        index === generationIndex ? { ...gen, [field]: value } : gen
      ),
    }));
  };

  const handleModelInputChange = (
    generationIndex,
    modelIndex,
    field,
    value
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      generation: prevData.generation.map((gen, genIndex) =>
        genIndex === generationIndex
          ? {
              ...gen,
              models: gen.models.map((model, index) =>
                index === modelIndex ? { ...model, [field]: value } : model
              ),
            }
          : gen
      ),
    }));
  };

  const handleAddGeneration = () => {
    setFormData((prevData) => ({
      ...prevData,
      generation: [
        ...prevData.generation,
        {
          startYear: "",
          endYear: "",
          models: [
            {
              modelName: "",
              beams: {
                isLowAndHighBeamsSeparate: isLowAndHighBeamsSeparate,
                lowBeamSocketSupportedName: "",
                highBeamSocketSupportedName: "",
                beamSocketSupportedName: "",
              },
              foglight: {
                isFoglightSupported: isFoglightSupported,
                foglightSocketSupportedName: "",
              },
              canbus: {
                isCanbusRequired: isCanbusRequired,
                canbusPrice: 1,
              },
              frameCost: 1,
            },
          ],
        },
      ],
    }));
  };

  const handleAddModel = (generationIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      generation: prevData.generation.map((gen, genIndex) =>
        genIndex === generationIndex
          ? {
              ...gen,
              models: [
                ...gen.models,
                {
                  modelName: "",
                  beams: {
                    isLowAndHighBeamsSeparate: isLowAndHighBeamsSeparate,
                    lowBeamSocketSupportedName: "",
                    highBeamSocketSupportedName: "",
                    beamSocketSupportedName: "",
                  },
                  foglight: {
                    isFoglightSupported: isFoglightSupported,
                    foglightSocketSupportedName: "",
                  },
                  canbus: {
                    isCanbusRequired: isCanbusRequired,
                    canbusPrice: 1,
                  },
                  frameCost: 1,
                },
              ],
            }
          : gen
      ),
    }));
  };

  const handleRemoveGeneration = (generationIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      generation: prevData.generation.filter(
        (gen, index) => index !== generationIndex
      ),
    }));
  };

  const handleRemoveModel = (generationIndex, modelIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      generation: prevData.generation.map((gen, genIndex) =>
        genIndex === generationIndex
          ? {
              ...gen,
              models: gen.models.filter((model, index) => index !== modelIndex),
            }
          : gen
      ),
    }));
  };

 

  const [loading, setLoading] = useState(false);

  const { brandData } = useBrand();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(addCarUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData
        }),
      });

      console.log(res, "res++");

      if (res.ok) {
        const dataRes = await res.json();
        if (dataRes) {
          Swal.fire({
            position: "center",
            timerProgressBar: true,
            title: "Successfully Product Added!",
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
           
        } else {
          throw new Error("Something went wrong!");
        }
      } else {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex flex-col gap-4">
            <div className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
              <input
                type="text"
                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                placeholder="Car Name"
                name="CarName"
                value={formData.carName}
                onChange={(e) => handleInputChange("carName", e.target.value)}
              />
            </div>

            <div>
              <select
                className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md p-4"
                value={formData.carBrand}
                onChange={(e) => handleInputChange("carBrand", e.target.value)}
              >
                <option>Select Brand</option>
                <hr />
                {brandData?.map((brand) => {
                  return (
                    <option key={brand._id} value={brand?.brandName}>
                      {brand?.brandName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* ============ */}

          <div className="border p-4 rounded">
            {formData.generation.map((generation, generationIndex) => (
              <div key={generationIndex}>
                <label className='text-[1.2rem]'>
                  Start Year:
                </label>
                <div className="border-[2px] border-[#000] text-[15px] font-[500] my-4 text-gray-700 outline-none w-full rounded-lg shadow-md ">
                <input
                  type="text"
                  className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                  placeholder="Start Year"
                  name="startYear"
                  value={generation.startYear}
                  onChange={(e) =>
                        handleGenerationInputChange(
                          generationIndex,
                          "startYear",
                          e.target.value
                        )
                      }
                />
              </div> 
                <label className='text-[1.2rem] '>
                  End Year:
                </label>
              <div className="border-[2px] my-4 border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
                <input
                  type="text"
                  className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                  placeholder="End Year"
                  name="endYear"
                  value={generation.endYear}
                    onChange={(e) =>
                      handleGenerationInputChange(
                        generationIndex,
                        "endYear",
                        e.target.value
                      )
                    }
                />
              </div> 
               <div className='border rounded p-4'>
                    <h1 className='text-[1.5rem]  font-semibold my-3' >Model</h1>
                <div className='border rounded p-4'>
                {generation.models.map((model, modelIndex) => (
                  <div key={modelIndex}>
                  <label className='text-[1.2rem] '>
                    Model Name:
                   </label>
                  <div className="border-[2px] my-4 border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
                    <input
                      type="text"
                      className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                      placeholder="Model Name"
                      name="modelName"
                      value={model.modelName}
                      onChange={(e) =>
                        handleModelInputChange(
                          generationIndex,
                          modelIndex,
                          "modelName",
                          e.target.value
                        )
                      }
                    />
                  </div> 
            
                  <div className='flex items-center gap-2'>
                      <label className='text-[1.2rem]'>
                        Is Low and High Beams Separate:
                      </label>   
                      <input
                        type="checkbox"
                        checked={isLowAndHighBeamsSeparate}
                        onChange={(e) => setIsLowAndHighBeamsSeparate(e.target.checked)}
                        className="w-[2.5rem] h-[1.5rem]"
                      />
                  </div>

                  {
                    isLowAndHighBeamsSeparate && (
                      <>
                        <div className="mt-2">
                          <label className='text-[1.2rem] '>
                              Low Beam Soket Supported Name:
                          </label>
                          <div className="border-[2px] mb-4 border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
                            <input
                              type="text"
                              className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                              placeholder="Low Beam Socket Supporte dName"
                              name="lowBeamSocketSupportedName"
                              value={model.beams.lowBeamSocketSupportedName}
                              onChange={(e) => handleModelInputChange(
                                generationIndex,
                                modelIndex,
                                "model.beams.lowBeamSocketSupportedName",
                                e.target.value
                              )}
                            />
                          </div> 
                        </div>
                        <div className="mt-2">
                          <label className='text-[1.2rem] '>
                            High Beam Soket Supported Name:
                          </label>
                          <div className="border-[2px] mb-4 border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
                            <input
                              type="text"
                              className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                              placeholder="High Beam Socket Supporte dName"
                              name="highBeamSocketSupportedName"
                              value={model.beams.highBeamSocketSupportedName}
                              onChange={(e) => handleModelInputChange(
                                generationIndex,
                                modelIndex,
                                "model.beams.highBeamSocketSupportedName",
                                e.target.value
                              )}
                            />
                          </div> 
                        </div>
                      </>
                    ) 
                  }  
                  {
                    !isLowAndHighBeamsSeparate && (
                      <div className="mt-2">
                          <label className='text-[1.2rem] '>
                              Beam Soket Supported Name:
                          </label>
                          <div className="border-[2px] mb-4 border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
                            <input
                              type="text"
                              className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                              placeholder="Socket Supporte dName"
                              name="beamSoketSupportedName"
                              value={model.beams.beamSoketSupportedName}
                              onChange={(e) => handleModelInputChange(
                                generationIndex,
                                modelIndex,
                                "model.beams.beamSoketSupportedName",
                                e.target.value
                              )}
                            />
                          </div> 
                        </div>
                    )
                  }  

                  <div className='flex items-center gap-2'>
                      <label className='text-[1.2rem]'>
                       Is Foglight Supported:
                      </label>   
                      <input
                        type="checkbox"
                        checked={isFoglightSupported}
                        onChange={(e) => setIsFoglightSupported(e.target.checked)}
                        className="w-[2.5rem] h-[1.5rem]"
                      />
                  </div>

                  {
                    isFoglightSupported && (
                      <>
                        <div className="mt-2">
                          <label className='text-[1.2rem] '>
                          Foglight Socket Supported Name:
                          </label>
                          <div className="border-[2px] mb-4 border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
                            <input
                              type="text"
                              className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                              placeholder="Foglight Socket Supported Name"
                              name="foglightSocketSupportedName"
                              value={model.foglight.foglightSocketSupportedName}
                              onChange={(e) => handleModelInputChange(
                                generationIndex,
                                modelIndex,
                                "model.foglight.foglightSocketSupportedName",
                                e.target.value
                              )}
                            />
                          </div> 
                        </div>
                        
                      </>
                    )
                  }


                  <div className='flex items-center gap-2'>
                      <label className='text-[1.2rem]'>
                      Is Canbus Required:
                      </label>   
                      <input
                        type="checkbox"
                        checked={isCanbusRequired}
                        onChange={(e) => setIsCanbusRequired(e.target.checked)}
                        className="w-[2.5rem] h-[1.5rem]"
                      />
                  </div>

                  {
                    isCanbusRequired && (
                      <div className="mt-2">
                          <label className='text-[1.2rem] '>
                          Canbus Price:
                          </label>
                          <div className="border-[2px] mb-4 border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
                            <input
                              type="number"
                              className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                              placeholder="Canbus Price"
                              name="canbusPrice"
                              value={model.canbus.canbusPrice}
                              onChange={(e) => handleModelInputChange(
                                generationIndex,
                                modelIndex,
                                "model.canbus.canbusPrice",
                                e.target.value
                              )}
                            />
                          </div> 
                        </div>   
                    )
                  }

                      <div className="mt-2">
                          <label className='text-[1.2rem] '>
                          Frame Cost:
                          </label>
                          <div className="border-[2px] mb-4 border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md ">
                            <input
                              type="number"
                              className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                              placeholder="Frame Cost"
                              name="frameCost"
                              value={model.frameCost}
                              onChange={(e) => handleModelInputChange(
                                generationIndex,
                                modelIndex,
                                "model.frameCost",
                                e.target.value
                              )}
                            />
                          </div> 
                        </div>   

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveModel(generationIndex, modelIndex)
                      }
                      className='border rounded text-[1.2rem] text-red-500 px-6 py-2'
                    >
                      Remove Model
                    </button>
                  </div>
                ))}
                </div> 

                <div className='my-4'>
                <button
                  type="button"
                  onClick={() => handleAddModel(generationIndex)}
                  className='border rounded text-[1.2rem]  px-6 py-2'
                >
                  Add Model
                </button>
                </div>     
                </div>

               

                <button
                  type="button"
                  onClick={() => handleRemoveGeneration(generationIndex)}
                  className='border rounded text-[1.2rem] text-red-500 px-6 py-2 my-4'
                >
                  Remove Generation
                </button>
              </div>
            ))}
            <div className='my-4'>
                <button
                  type="button"
                  onClick={() => handleAddGeneration()}
                  className='border rounded text-[1.2rem]  px-6 py-2'
                >
                  Add Generation
                </button>
                </div>     
          </div>


          <div className="mt-4">
            <button className="mb-5 common-btn">
              {loading ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCar;
 