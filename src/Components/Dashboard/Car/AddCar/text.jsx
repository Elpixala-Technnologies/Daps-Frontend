import React, { useState } from 'react';

const DynamicForm = () => {
  const [formData, setFormData] = useState({
    carName: '',
    carBrand: '',
    generation: [
      {
        startYear: '',
        endYear: '',
        models: [
          {
            modelName: '',
            beams: {
              isLowAndHighBeamsSeparate: true,
              lowBeamSocketSupportedName: '',
              highBeamSocketSupportedName: '',
              beamSocketSupportedName: ''
            },
            foglight: {
              isFoglightSupported: true,
              foglightSocketSupportedName: ''
            },
            canbus: {
              isCanbusRequired: true,
              canbusPrice: 1
            },
            frameCost: 1
          }
        ]
      }
    ]
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleGenerationInputChange = (generationIndex, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      generation: prevData.generation.map((gen, index) =>
        index === generationIndex ? { ...gen, [field]: value } : gen
      )
    }));
  };

  const handleModelInputChange = (generationIndex, modelIndex, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      generation: prevData.generation.map((gen, genIndex) =>
        genIndex === generationIndex
          ? {
              ...gen,
              models: gen.models.map((model, index) =>
                index === modelIndex ? { ...model, [field]: value } : model
              )
            }
          : gen
      )
    }));
  };

  const handleAddGeneration = () => {
    setFormData((prevData) => ({
      ...prevData,
      generation: [
        ...prevData.generation,
        {
          startYear: '',
          endYear: '',
          models: [
            {
              modelName: '',
              beams: {
                isLowAndHighBeamsSeparate: true,
                lowBeamSocketSupportedName: '',
                highBeamSocketSupportedName: '',
                beamSocketSupportedName: ''
              },
              foglight: {
                isFoglightSupported: true,
                foglightSocketSupportedName: ''
              },
              canbus: {
                isCanbusRequired: true,
                canbusPrice: 1
              },
              frameCost: 1
            }
          ]
        }
      ]
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
                  modelName: '',
                  beams: {
                    isLowAndHighBeamsSeparate: true,
                    lowBeamSocketSupportedName: '',
                    highBeamSocketSupportedName: '',
                    beamSocketSupportedName: ''
                  },
                  foglight: {
                    isFoglightSupported: true,
                    foglightSocketSupportedName: ''
                  },
                  canbus: {
                    isCanbusRequired: true,
                    canbusPrice: 1
                  },
                  frameCost: 1
                }
              ]
            }
          : gen
      )
    }));
  };

  const handleRemoveGeneration = (generationIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      generation: prevData.generation.filter((gen, index) => index !== generationIndex)
    }));
  };

  const handleRemoveModel = (generationIndex, modelIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      generation: prevData.generation.map((gen, genIndex) =>
        genIndex === generationIndex
          ? {
              ...gen,
              models: gen.models.filter((model, index) => index !== modelIndex)
            }
          : gen
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data as needed
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Car Name:
        <input
          type="text"
          value={formData.carName}
          onChange={(e) => handleInputChange('carName', e.target.value)}
        />
      </label>
      <label>
        Car Brand:
        <input
          type="text"
          value={formData.carBrand}
          onChange={(e) => handleInputChange('carBrand', e.target.value)}
        />
      </label>

      {formData.generation.map((generation, generationIndex) => (
        <div key={generationIndex}>
          <label>
            Start Year:
            <input
              type="text"
              value={generation.startYear}
              onChange={(e) =>
                handleGenerationInputChange(generationIndex, 'startYear', e.target.value)
              }
            />
          </label>
          <label>
            End Year:
            <input
              type="text"
              value={generation.endYear}
              onChange={(e) =>
                handleGenerationInputChange(generationIndex, 'endYear', e.target.value)
              }
            />
          </label>

          {generation.models.map((model, modelIndex) => (
            <div key={modelIndex}>
              <label>
                Model Name:
                <input
                  type="text"
                  value={model.modelName}
                  onChange={(e) =>
                    handleModelInputChange(
                      generationIndex,
                      modelIndex,
                      'modelName',
                      e.target.value
                    )
                  }
                />
              </label>

              {/* ... Add input fields for beams, foglight, canbus, and frame cost */}
              <button
                type="button"
                onClick={() => handleRemoveModel(generationIndex, modelIndex)}
              >
                Remove Model
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleAddModel(generationIndex)}
          >
            Add Model
          </button>

          <button
            type="button"
            onClick={() => handleRemoveGeneration(generationIndex)}
          >
            Remove Generation
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddGeneration}
      >
        Add Generation
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;



// ===============

{generations.map((generation, generationIndex) => (
  <div key={generationIndex}>
    <label>
      Start Year:
      <input
        type="text"
        value={generation.startYear}
        onChange={(e) =>
          handleInputChange(
            generationIndex,
            0,
            "startYear",
            e.target.value
          )
        }
      />
    </label>
    <label>
      End Year:
      <input
        type="text"
        value={generation.endYear}
        onChange={(e) =>
          handleInputChange(
            generationIndex,
            0,
            "endYear",
            e.target.value
          )
        }
      />
    </label>

    {generation.models.map((model, modelIndex) => (
      <div key={modelIndex}>
        {/* Add input fields for model details */}
        <label>
          Model Name:
          <input
            type="text"
            value={model.modelName}
            onChange={(e) =>
              handleInputChange(
                generationIndex,
                modelIndex,
                "modelName",
                e.target.value
              )
            }
          />
        </label>

        {/* ... Add input fields for beams, foglight, canbus, and frame cost */}

        <button
          type="button"
          onClick={() => handleAddModel(generationIndex)}
        >
          Add Model
        </button>
      </div>
    ))}
  </div>
))}